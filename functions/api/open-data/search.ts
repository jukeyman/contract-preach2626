import { json, normalizeQuery, options } from '../../_shared/http'

type Env = {
  OPEN_CORPORATES_API_KEY?: string
  OPENSANCTIONS_API_KEY?: string
  DATA_GOV_API_KEY?: string
  FEDFUNDING_CACHE?: KVNamespace
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const { q, source, limit } = normalizeQuery(request)
  const cacheKey = `open-data:${source}:${q}:${limit}`

  if (env.FEDFUNDING_CACHE) {
    const cached = await env.FEDFUNDING_CACHE.get(cacheKey)
    if (cached) return json({ ...JSON.parse(cached), cached: true })
  }

  const result = await searchOpenData(source, q, limit, env).catch((error) => ({
    source,
    live: false,
    status: 502,
    checkedAt: new Date().toISOString(),
    warning: error instanceof Error ? `Open data lookup failed: ${error.message}` : 'Open data lookup failed.',
    results: [],
  }))

  if (env.FEDFUNDING_CACHE && result.live) {
    await env.FEDFUNDING_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: 60 * 60 * 24 })
  }

  return json(result, { status: result.live ? 200 : 206 })
}

export const onRequestOptions: PagesFunction = async () => options()

async function searchOpenData(source: string, q: string, limit: number, env: Env) {
  if (source === 'opensanctions') return searchOpenSanctions(q, limit, env)
  if (source === 'microlink') return searchMicrolink(q)
  if (source === 'college-scorecard') return searchCollegeScorecard(q, limit, env)
  if (source === 'universities') return searchUniversities(q)
  if (source === 'wikidata') return searchWikidata(q, limit)
  if (source === 'wikipedia') return searchWikipedia(q, limit)
  if (source === 'archive') return searchArchive(q)
  if (source === 'teleport') return searchTeleport(q, limit)
  if (source === 'opencorporates') return searchOpenCorporates(q, limit, env)

  return {
    source,
    live: false,
    warning:
      'Unknown open-data source. Use opensanctions, microlink, college-scorecard, universities, wikidata, wikipedia, archive, teleport, or opencorporates.',
    results: [],
  }
}

async function searchOpenSanctions(q: string, limit: number, env: Env) {
  if (!env.OPENSANCTIONS_API_KEY) {
    return {
      source: 'OpenSanctions Risk Search',
      live: false,
      warning: 'Set OPENSANCTIONS_API_KEY in Cloudflare Pages to enable live sanctions and watchlist lookups.',
      results: [],
    }
  }
  const url = new URL('https://api.opensanctions.org/search/default')
  url.searchParams.set('q', q)
  url.searchParams.set('limit', String(limit))
  return packResponse('OpenSanctions Risk Search', await fetch(url.toString(), {
    headers: { Authorization: `ApiKey ${env.OPENSANCTIONS_API_KEY}` },
  }))
}

async function searchMicrolink(q: string) {
  const target = q.startsWith('http') ? q : `https://${q}`
  const url = new URL('https://api.microlink.io/')
  url.searchParams.set('url', target)
  url.searchParams.set('screenshot', 'false')
  return packResponse('Microlink Website Evidence', await fetch(url.toString()))
}

async function searchCollegeScorecard(q: string, limit: number, env: Env) {
  const url = new URL('https://api.data.gov/ed/collegescorecard/v1/schools')
  url.searchParams.set('school.name', q)
  url.searchParams.set('per_page', String(limit))
  url.searchParams.set('fields', 'id,school.name,school.city,school.state,school.school_url,latest.student.size')
  if (env.DATA_GOV_API_KEY) url.searchParams.set('api_key', env.DATA_GOV_API_KEY)
  return packResponse('College Scorecard', await fetch(url.toString()))
}

async function searchUniversities(q: string) {
  const url = new URL('http://universities.hipolabs.com/search')
  url.searchParams.set('name', q)
  return packResponse('Universities List', await fetch(url.toString()))
}

async function searchWikidata(q: string, limit: number) {
  const url = new URL('https://www.wikidata.org/w/api.php')
  url.searchParams.set('action', 'wbsearchentities')
  url.searchParams.set('search', q)
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', String(limit))
  return packResponse('Wikidata Entity Context', await fetchWithUserAgent(url.toString()))
}

async function searchWikipedia(q: string, limit: number) {
  const url = new URL('https://en.wikipedia.org/w/api.php')
  url.searchParams.set('action', 'query')
  url.searchParams.set('generator', 'search')
  url.searchParams.set('gsrsearch', q)
  url.searchParams.set('gsrlimit', String(limit))
  url.searchParams.set('prop', 'extracts|info')
  url.searchParams.set('exintro', '1')
  url.searchParams.set('explaintext', '1')
  url.searchParams.set('inprop', 'url')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')
  return packResponse('Wikipedia Context', await fetchWithUserAgent(url.toString()))
}

async function searchArchive(q: string) {
  const url = new URL('https://archive.org/wayback/available')
  url.searchParams.set('url', q)
  return packResponse('Archive.org Wayback Availability', await fetchWithUserAgent(url.toString()))
}

async function searchTeleport(q: string, limit: number) {
  const url = new URL('https://api.teleport.org/api/cities/')
  url.searchParams.set('search', q)
  url.searchParams.set('limit', String(limit))
  return packResponse('Teleport Location Context', await fetch(url.toString()))
}

async function searchOpenCorporates(q: string, limit: number, env: Env) {
  if (!env.OPEN_CORPORATES_API_KEY) {
    return {
      source: 'OpenCorporates',
      live: false,
      warning: 'Set OPEN_CORPORATES_API_KEY in Cloudflare Pages to enable live entity lookups.',
      results: [],
    }
  }

  const url = new URL('https://api.opencorporates.com/v0.4/companies/search')
  url.searchParams.set('q', q)
  url.searchParams.set('per_page', String(limit))
  url.searchParams.set('api_token', env.OPEN_CORPORATES_API_KEY)
  return packResponse('OpenCorporates Entity Search', await fetch(url.toString()))
}

async function packResponse(source: string, response: Response) {
  const contentType = response.headers.get('Content-Type') || ''
  const raw = contentType.includes('application/json') ? await response.json().catch(() => null) : await response.text()
  return {
    source,
    live: response.ok,
    status: response.status,
    checkedAt: new Date().toISOString(),
    warning: response.ok ? undefined : `Open-data API returned HTTP ${response.status}. Verify endpoint, key, rate limit, and upstream status.`,
    results: normalizeResults(raw),
    raw,
  }
}

function normalizeResults(raw: unknown) {
  if (!raw || typeof raw !== 'object') return []
  if (Array.isArray(raw)) return raw
  const value = raw as Record<string, unknown>
  if (Array.isArray(value.results)) return value.results
  if (Array.isArray(value.search)) return value.search
  if (Array.isArray(value.companies)) return value.companies
  if (value.query && typeof value.query === 'object') {
    const pages = (value.query as Record<string, unknown>).pages
    if (pages && typeof pages === 'object') return Object.values(pages)
  }
  if (value._links && typeof value._links === 'object') {
    const cityItems = (value._links as Record<string, unknown>)['city:search-results'] as unknown
    if (Array.isArray(cityItems)) return cityItems
  }
  if (value.archived_snapshots && typeof value.archived_snapshots === 'object') return [value.archived_snapshots]
  if (value.data && typeof value.data === 'object') return [value.data]
  return []
}

function fetchWithUserAgent(url: string) {
  return fetch(url, {
    headers: {
      'User-Agent': 'TheContractingPreacher/1.0 (info@thecontractingpreacher.com)',
    },
  })
}
