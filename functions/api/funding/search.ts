import { json, normalizeQuery, options } from '../../_shared/http'

type Env = {
  SAM_API_KEY?: string
  SAMS_API_KEY?: string
  SIMPLER_GRANTS_API_KEY?: string
  DATA_GOV_API_KEY?: string
  FEDFUNDING_CACHE?: KVNamespace
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { q, source, limit } = normalizeQuery(request)
  const cacheKey = `funding:${source}:${q}:${limit}`

  if (env.FEDFUNDING_CACHE) {
    const cached = await env.FEDFUNDING_CACHE.get(cacheKey)
    if (cached) {
      return json({ ...JSON.parse(cached), cached: true })
    }
  }

  const result = await searchSource(source, q, limit, env).catch((error) => ({
    source,
    live: false,
    status: 502,
    checkedAt: new Date().toISOString(),
    warning:
      error instanceof Error
        ? `Upstream federal API request failed: ${error.message}`
        : 'Upstream federal API request failed.',
    results: [],
  }))

  if (env.FEDFUNDING_CACHE && result.live) {
    await env.FEDFUNDING_CACHE.put(cacheKey, JSON.stringify(result), {
      expirationTtl: ttlForSource(source),
    })
  }

  return json(result, { status: result.live ? 200 : 206 })
}

export const onRequestOptions: PagesFunction = async () => options()

async function searchSource(source: string, q: string, limit: number, env: Env) {
  if (source === 'contracts') return searchSam(q, limit, env)
  if (source === 'grants') return searchGrants(q, limit, env)
  if (source === 'awards') return searchAwards(q, limit)
  if (source === 'sbir') return searchSbir(q, limit)
  if (source === 'nofo') return searchFederalRegister(q, limit)
  return {
    source,
    live: false,
    warning: 'Unknown source. Use contracts, grants, awards, sbir, or nofo.',
    results: [],
  }
}

async function searchSam(q: string, limit: number, env: Env) {
  const key = env.SAM_API_KEY || env.SAMS_API_KEY
  if (!key) {
    return {
      source: 'SAM.gov Contract Opportunities',
      live: false,
      warning: 'Set SAM_API_KEY or SAMS_API_KEY in Cloudflare Pages to enable live SAM.gov contract search.',
      results: [],
    }
  }

  const today = new Date()
  const prior = new Date(today)
  prior.setDate(today.getDate() - 30)
  const params = new URLSearchParams({
    api_key: key,
    limit: String(limit),
    title: q,
    postedFrom: formatSamDate(prior),
    postedTo: formatSamDate(today),
  })
  const response = await fetch(`https://api.sam.gov/opportunities/v2/search?${params.toString()}`)
  return packResponse('SAM.gov Contract Opportunities', response)
}

async function searchGrants(q: string, limit: number, env: Env) {
  if (env.SIMPLER_GRANTS_API_KEY) {
    const response = await fetch('https://api.simpler.grants.gov/v1/opportunities/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': env.SIMPLER_GRANTS_API_KEY,
      },
      body: JSON.stringify({
        pagination: { page_size: limit, page_offset: 1 },
        query: q,
      }),
    })
    return packResponse('Simpler.Grants.gov', response)
  }

  const response = await fetch('https://api.grants.gov/v1/api/search2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rows: limit,
      keyword: q,
      oppStatuses: 'forecasted|posted',
      resultType: 'json',
    }),
  })
  const packed = await packResponse('Legacy Grants.gov Search2', response)
  return {
    ...packed,
    warning: 'SIMPLER_GRANTS_API_KEY is not configured, so the open legacy Grants.gov Search2 fallback was used.',
  }
}

async function searchAwards(q: string, limit: number) {
  const response = await fetch('https://api.usaspending.gov/api/v2/search/spending_by_award/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filters: {
        keywords: [q],
        time_period: [{ start_date: '2021-01-01', end_date: new Date().toISOString().slice(0, 10) }],
        award_type_codes: ['A', 'B', 'C', 'D'],
      },
      fields: ['Award ID', 'Recipient Name', 'Award Amount', 'Awarding Agency', 'Start Date', 'End Date'],
      page: 1,
      limit,
      sort: 'Award Amount',
      order: 'desc',
    }),
  })
  return packResponse('USAspending.gov Award History', response)
}

async function searchSbir(q: string, limit: number) {
  const params = new URLSearchParams({
    keyword: q,
    rows: String(limit),
  })
  const response = await fetch(`https://api.www.sbir.gov/public/api/solicitations?${params.toString()}`)
  return packResponse('SBIR.gov Solicitations', response)
}

async function searchFederalRegister(q: string, limit: number) {
  const params = new URLSearchParams({
    per_page: String(limit),
    order: 'newest',
    'conditions[term]': q,
    'conditions[type][]': 'NOTICE',
  })
  const response = await fetch(`https://www.federalregister.gov/api/v1/documents.json?${params.toString()}`)
  return packResponse('Federal Register NOFO Feed', response)
}

async function packResponse(source: string, response: Response) {
  const contentType = response.headers.get('Content-Type') || ''
  const raw = contentType.includes('application/json') ? await response.json().catch(() => null) : await response.text()
  return {
    source,
    live: response.ok,
    status: response.status,
    checkedAt: new Date().toISOString(),
    warning: response.ok ? undefined : `Official API returned HTTP ${response.status}. Verify key, rate limit, endpoint shape, and upstream service status.`,
    results: normalizeResults(raw),
    raw,
  }
}

function normalizeResults(raw: unknown) {
  if (!raw || typeof raw !== 'object') return []
  const value = raw as Record<string, unknown>
  if (Array.isArray(value.results)) return value.results
  if (Array.isArray(value.opportunities)) return value.opportunities
  if (Array.isArray(value.awards)) return value.awards
  if (Array.isArray(value.data)) return value.data
  const nestedData = value.data as Record<string, unknown> | undefined
  if (nestedData && Array.isArray(nestedData.oppHits)) return nestedData.oppHits
  if (nestedData && Array.isArray(nestedData.results)) return nestedData.results
  return []
}

function ttlForSource(source: string) {
  if (source === 'awards') return 60 * 60 * 24 * 7
  if (source === 'nofo') return 60 * 60
  return 60 * 60 * 6
}

function formatSamDate(date: Date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${mm}/${dd}/${date.getFullYear()}`
}
