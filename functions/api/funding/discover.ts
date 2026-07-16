import { json, normalizeQuery, options } from '../../_shared/http'

type Env = {
  SAM_API_KEY?: string
  SAMS_API_KEY?: string
  SIMPLER_GRANTS_API_KEY?: string
  DATA_GOV_API_KEY?: string
  FEDFUNDING_CACHE?: KVNamespace
}

type SourceStatus = {
  source: string
  live: boolean
  status?: number
  warning?: string
  count: number
}

type UnifiedOpportunity = {
  id: string
  source: string
  type: 'contract' | 'grant' | 'award' | 'sbir' | 'notice'
  title: string
  agency?: string
  closeDate?: string
  amount?: string
  url?: string
  summary?: string
  raw?: unknown
}

type SearchPack = {
  source: string
  live: boolean
  status?: number
  warning?: string
  results: UnifiedOpportunity[]
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { q, limit, url } = normalizeQuery(request)
  const naics = (url.searchParams.get('naics') || '').trim().slice(0, 12)
  const state = (url.searchParams.get('state') || '').trim().slice(0, 2).toUpperCase()
  const cacheKey = `funding:discover:${q}:${limit}:${naics}:${state}`

  if (env.FEDFUNDING_CACHE) {
    const cached = await env.FEDFUNDING_CACHE.get(cacheKey)
    if (cached) return json({ ...JSON.parse(cached), cached: true })
  }

  const searches = [
    safeSearch(() => searchSam(q, limit, env, naics, state), 'SAM.gov Contract Opportunities'),
    safeSearch(() => searchGrants(q, limit, env), 'Grants.gov Opportunities'),
    safeSearch(() => searchAwards(q, limit, state), 'USAspending.gov Award History'),
    safeSearch(() => searchSbir(q, limit), 'SBIR.gov Solicitations'),
    safeSearch(() => searchFederalRegister(q, limit), 'Federal Register NOFO Feed'),
  ]

  const packs = await Promise.all(searches)
  const results = packs.flatMap((pack) => pack.results)
  const sources: SourceStatus[] = packs.map((pack) => ({
    source: pack.source,
    live: pack.live,
    status: pack.status,
    warning: pack.warning,
    count: pack.results.length,
  }))

  const response = {
    source: 'Unified Federal Opportunity Finder',
    live: packs.some((pack) => pack.live),
    query: q,
    filters: { naics: naics || undefined, state: state || undefined },
    searchedAt: new Date().toISOString(),
    warnings: sources.filter((item) => item.warning).map((item) => `${item.source}: ${item.warning}`),
    sources,
    results: rankResults(results, q),
  }

  if (env.FEDFUNDING_CACHE && response.live) {
    await env.FEDFUNDING_CACHE.put(cacheKey, JSON.stringify(response), { expirationTtl: 60 * 60 * 6 })
  }

  return json(response, { status: response.live ? 200 : 206 })
}

export const onRequestOptions: PagesFunction = async () => options()

async function safeSearch(search: () => Promise<SearchPack>, source: string): Promise<SearchPack> {
  try {
    return await search()
  } catch (error) {
    return {
      source,
      live: false,
      warning: error instanceof Error ? error.message : 'Official API request failed.',
      results: [],
    }
  }
}

async function searchSam(q: string, limit: number, env: Env, naics: string, state: string): Promise<SearchPack> {
  const key = env.SAM_API_KEY || env.SAMS_API_KEY
  if (!key) {
    return {
      source: 'SAM.gov Contract Opportunities',
      live: false,
      warning: 'Set SAM_API_KEY or SAMS_API_KEY to enable live federal contract opportunity search.',
      results: [],
    }
  }

  const today = new Date()
  const prior = new Date(today)
  prior.setDate(today.getDate() - 45)
  const params = new URLSearchParams({
    api_key: key,
    limit: String(limit),
    title: q,
    postedFrom: formatSamDate(prior),
    postedTo: formatSamDate(today),
  })
  if (naics) params.set('ncode', naics)
  if (state) params.set('state', state)

  const raw = await fetchJson(`https://api.sam.gov/opportunities/v2/search?${params.toString()}`)
  const records = toArray(raw.opportunitiesData || raw.opportunities || raw.data || raw.results)
  return {
    source: 'SAM.gov Contract Opportunities',
    live: true,
    status: 200,
    results: records.slice(0, limit).map((item, index) => normalizeSam(item, index)),
  }
}

async function searchGrants(q: string, limit: number, env: Env): Promise<SearchPack> {
  if (env.SIMPLER_GRANTS_API_KEY) {
    const raw = await fetchJson('https://api.simpler.grants.gov/v1/opportunities/search', {
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
    const records = toArray(raw.data?.results || raw.results || raw.opportunities)
    return {
      source: 'Simpler.Grants.gov',
      live: true,
      status: 200,
      results: records.slice(0, limit).map((item, index) => normalizeGrant(item, index, 'Simpler.Grants.gov')),
    }
  }

  const raw = await fetchJson('https://api.grants.gov/v1/api/search2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rows: limit,
      keyword: q,
      oppStatuses: 'forecasted|posted',
      resultType: 'json',
    }),
  })
  const records = toArray(raw.data?.oppHits || raw.data?.results || raw.oppHits || raw.results)
  return {
    source: 'Legacy Grants.gov Search2',
    live: true,
    status: 200,
    warning: 'SIMPLER_GRANTS_API_KEY is not configured, so the open legacy Grants.gov Search2 fallback was used.',
    results: records.slice(0, limit).map((item, index) => normalizeGrant(item, index, 'Legacy Grants.gov Search2')),
  }
}

async function searchAwards(q: string, limit: number, state: string): Promise<SearchPack> {
  const filters: Record<string, unknown> = {
    keywords: [q],
    time_period: [{ start_date: '2021-01-01', end_date: new Date().toISOString().slice(0, 10) }],
    award_type_codes: ['A', 'B', 'C', 'D'],
  }
  if (state) filters.place_of_performance_locations = [{ country: 'USA', state }]

  const raw = await fetchJson('https://api.usaspending.gov/api/v2/search/spending_by_award/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filters,
      fields: ['Award ID', 'Recipient Name', 'Award Amount', 'Awarding Agency', 'Start Date', 'End Date'],
      page: 1,
      limit,
      sort: 'Award Amount',
      order: 'desc',
    }),
  })
  const records = toArray(raw.results || raw.data?.results || raw.awards)
  return {
    source: 'USAspending.gov Award History',
    live: true,
    status: 200,
    results: records.slice(0, limit).map((item, index) => normalizeAward(item, index)),
  }
}

async function searchSbir(q: string, limit: number): Promise<SearchPack> {
  const params = new URLSearchParams({ keyword: q, rows: String(limit) })
  const raw = await fetchJson(`https://api.www.sbir.gov/public/api/solicitations?${params.toString()}`)
  const records = toArray(raw)
  return {
    source: 'SBIR.gov Solicitations',
    live: true,
    status: 200,
    results: records.slice(0, limit).map((item, index) => normalizeSbir(item, index)),
  }
}

async function searchFederalRegister(q: string, limit: number): Promise<SearchPack> {
  const params = new URLSearchParams({
    per_page: String(limit),
    order: 'newest',
    'conditions[term]': q,
    'conditions[type][]': 'NOTICE',
  })
  const raw = await fetchJson(`https://www.federalregister.gov/api/v1/documents.json?${params.toString()}`)
  const records = toArray(raw.results)
  return {
    source: 'Federal Register NOFO Feed',
    live: true,
    status: 200,
    results: records.slice(0, limit).map((item, index) => normalizeNotice(item, index)),
  }
}

async function fetchJson(url: string, init?: RequestInit) {
  const response = await fetch(url, init)
  const text = await response.text()
  const data = text ? JSON.parse(text) : null
  if (!response.ok) {
    throw new Error(`Official API returned HTTP ${response.status}. Verify key, rate limit, endpoint shape, and upstream service status.`)
  }
  return data
}

function normalizeSam(item: Record<string, unknown>, index: number): UnifiedOpportunity {
  const id = text(item.noticeId || item.solicitationNumber || item.uiLink || `sam-${index}`)
  return {
    id,
    source: 'SAM.gov',
    type: 'contract',
    title: text(item.title || item.solicitationTitle || 'Untitled contract opportunity'),
    agency: text(item.fullParentPathName || item.department || item.subTier || item.office) || undefined,
    closeDate: text(item.responseDeadLine || item.responseDeadline || item.archiveDate) || undefined,
    url: text(item.uiLink || item.links?.[0]?.href) || undefined,
    summary: text(item.description || item.typeOfSetAsideDescription || item.naicsCode) || undefined,
    raw: item,
  }
}

function normalizeGrant(item: Record<string, unknown>, index: number, source: string): UnifiedOpportunity {
  const id = text(item.id || item.opportunityId || item.oppId || item.number || item.opportunityNumber || `grant-${index}`)
  return {
    id,
    source,
    type: 'grant',
    title: text(item.title || item.opportunityTitle || item.oppTitle || item.synopsis?.opportunity_title || 'Untitled grant opportunity'),
    agency: text(item.agencyName || item.agency || item.agencyCode || item.synopsis?.agency_name) || undefined,
    closeDate: text(item.closeDate || item.closeoutDate || item.postDate || item.synopsis?.close_date) || undefined,
    url: id ? `https://www.grants.gov/search-results-detail/${encodeURIComponent(id)}` : undefined,
    summary: text(item.description || item.summary || item.synopsis?.summary_description || item.cfdas?.[0]?.programTitle) || undefined,
    raw: item,
  }
}

function normalizeAward(item: Record<string, unknown>, index: number): UnifiedOpportunity {
  const id = text(item['Award ID'] || item.generated_internal_id || item.award_id || `award-${index}`)
  return {
    id,
    source: 'USAspending.gov',
    type: 'award',
    title: text(item['Recipient Name'] || item.recipient_name || 'Historical federal award'),
    agency: text(item['Awarding Agency'] || item.awarding_agency_name || item.awarding_agency) || undefined,
    closeDate: text(item['End Date'] || item.end_date) || undefined,
    amount: money(item['Award Amount'] || item.award_amount || item.total_obligation),
    url: id ? `https://www.usaspending.gov/award/${encodeURIComponent(id)}` : undefined,
    summary: 'Historical award intelligence for competitor, agency, and pricing research.',
    raw: item,
  }
}

function normalizeSbir(item: Record<string, unknown>, index: number): UnifiedOpportunity {
  const id = text(item.solicitation_id || item.solicitation_number || item.id || `sbir-${index}`)
  return {
    id,
    source: 'SBIR.gov',
    type: 'sbir',
    title: text(item.solicitation_title || item.title || item.topic_title || 'Untitled SBIR/STTR solicitation'),
    agency: text(item.agency || item.branch || item.program) || undefined,
    closeDate: text(item.close_date || item.proposal_due_date || item.due_date) || undefined,
    url: text(item.solicitation_url || item.url) || 'https://www.sbir.gov/solicitations',
    summary: text(item.solicitation_description || item.topic_description || item.description) || undefined,
    raw: item,
  }
}

function normalizeNotice(item: Record<string, unknown>, index: number): UnifiedOpportunity {
  const id = text(item.document_number || item.html_url || `notice-${index}`)
  return {
    id,
    source: 'Federal Register',
    type: 'notice',
    title: text(item.title || 'Federal Register notice'),
    agency: text((item.agencies as Array<Record<string, unknown>> | undefined)?.[0]?.name) || undefined,
    closeDate: text(item.comments_close_on || item.publication_date) || undefined,
    url: text(item.html_url || item.pdf_url) || undefined,
    summary: text(item.abstract || item.excerpts) || undefined,
    raw: item,
  }
}

function rankResults(results: UnifiedOpportunity[], query: string) {
  const lowerQuery = query.toLowerCase()
  return results
    .map((result) => {
      const haystack = `${result.title} ${result.agency || ''} ${result.summary || ''}`.toLowerCase()
      const relevance = lowerQuery
        .split(/\s+/)
        .filter(Boolean)
        .reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0)
      const activeBoost = result.type === 'contract' || result.type === 'grant' || result.type === 'sbir' ? 2 : 0
      return { ...result, relevanceScore: relevance + activeBoost }
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
}

function toArray(value: unknown): Array<Record<string, unknown>> {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
}

function text(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number') return String(value)
  return ''
}

function money(value: unknown): string | undefined {
  const amount = Number(value)
  if (!Number.isFinite(amount)) return undefined
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

function formatSamDate(date: Date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${mm}/${dd}/${date.getFullYear()}`
}
