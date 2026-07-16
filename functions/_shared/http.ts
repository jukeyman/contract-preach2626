export const jsonHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
}

export function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      ...jsonHeaders,
      ...(init.headers || {}),
    },
  })
}

export function options() {
  return new Response(null, {
    status: 204,
    headers: jsonHeaders,
  })
}

export function requireAdmin(request: Request, expected?: string) {
  if (!expected) return true
  const header = request.headers.get('Authorization') || ''
  const token = header.replace(/^Bearer\s+/i, '').trim()
  return token.length > 0 && token === expected
}

export function normalizeQuery(request: Request) {
  const url = new URL(request.url)
  return {
    url,
    q: (url.searchParams.get('q') || 'small business').trim().slice(0, 120),
    source: (url.searchParams.get('source') || 'contracts').trim().toLowerCase(),
    limit: Math.min(Math.max(Number(url.searchParams.get('limit') || 10), 1), 25),
  }
}
