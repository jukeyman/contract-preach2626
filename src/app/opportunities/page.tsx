'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Database,
  ExternalLink,
  Filter,
  Loader2,
  Search,
} from 'lucide-react'
import Button from '@/components/ui/Button'

type SourceStatus = {
  source: string
  live: boolean
  warning?: string
  count: number
}

type Opportunity = {
  id: string
  source: string
  type: string
  title: string
  agency?: string
  closeDate?: string
  amount?: string
  url?: string
  summary?: string
  relevanceScore?: number
}

type DiscoveryResponse = {
  source?: string
  live?: boolean
  query?: string
  warnings?: string[]
  sources?: SourceStatus[]
  results?: Opportunity[]
}

export default function OpportunitiesPage() {
  const [query, setQuery] = useState('cybersecurity')
  const [naics, setNaics] = useState('')
  const [state, setState] = useState('')
  const [results, setResults] = useState<DiscoveryResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const runSearch = async () => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams({ q: query, limit: '8' })
    if (naics.trim()) params.set('naics', naics.trim())
    if (state.trim()) params.set('state', state.trim())

    try {
      const response = await fetch(`/api/funding/discover?${params.toString()}`)
      const data = await response.json().catch(() => ({}))
      if (!response.ok && response.status !== 206) throw new Error(data.error || 'Opportunity search failed.')
      setResults(data)
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : 'Opportunity search failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-offWhite">
      <section className="bg-brand-navy py-14 text-white">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-lightGold">
              Federal Opportunity Finder
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Find contracts, grants, SBIR/STTR funding, NOFOs, and award intelligence in one search.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-200">
              Search the federal opportunity stack from the site: SAM.gov contracts, Grants.gov, USAspending award
              history, SBIR.gov solicitations, and Federal Register notices. Missing keys are reported source by source
              instead of breaking the whole search.
            </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-5">
            <div className="grid gap-3 text-sm">
              <StatusLine label="Live opportunity feeds" value="SAM.gov, Grants.gov, SBIR.gov, Federal Register" />
              <StatusLine label="Award intelligence" value="USAspending competitor and agency history" />
              <StatusLine label="CRM handoff" value="Use results inside admin pipeline and client roadmap work" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-8">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_160px_120px_auto] lg:items-end">
            <label>
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-navy">
                <Search className="h-4 w-4 text-brand-gold" />
                Keyword, agency, capability, or problem
              </span>
              <input
                className="input-field"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="cybersecurity, construction, training, logistics..."
              />
            </label>
            <label>
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-navy">
                <Filter className="h-4 w-4 text-brand-gold" />
                NAICS
              </span>
              <input className="input-field" value={naics} onChange={(event) => setNaics(event.target.value)} placeholder="541512" />
            </label>
            <label>
              <span className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-navy">
                <Building2 className="h-4 w-4 text-brand-gold" />
                State
              </span>
              <input className="input-field" value={state} onChange={(event) => setState(event.target.value)} placeholder="SC" maxLength={2} />
            </label>
            <Button type="button" onClick={runSearch} loading={loading}>
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
              Search All
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
            <Link href="/admin" className="font-bold text-brand-navy hover:text-brand-gold">
              Open admin CRM
            </Link>
            <span>·</span>
            <Link href="/intake" className="font-bold text-brand-navy hover:text-brand-gold">
              Add a client intake
            </Link>
            <span>·</span>
            <Link href="/intelligence" className="font-bold text-brand-navy hover:text-brand-gold">
              View integration map
            </Link>
          </div>
        </div>
      </section>

      {error && (
        <section className="container-custom pb-6">
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">{error}</div>
        </section>
      )}

      {results && (
        <>
          <section className="container-custom grid gap-4 pb-8 md:grid-cols-2 xl:grid-cols-5">
            {(results.sources || []).map((source) => (
              <article key={source.source} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <Database className="h-5 w-5 text-brand-gold" />
                  {source.live ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <h2 className="mt-3 text-sm font-bold text-brand-navy">{source.source}</h2>
                <p className="mt-2 text-2xl font-bold text-brand-gold">{source.count}</p>
                {source.warning && <p className="mt-2 text-xs leading-5 text-yellow-800">{source.warning}</p>}
              </article>
            ))}
          </section>

          <section className="container-custom pb-14">
            <div className="flex flex-col justify-between gap-3 pb-4 md:flex-row md:items-end">
              <div>
                <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-darkGold">
                  Unified Results
                </p>
                <h2 className="mt-2 text-3xl font-bold text-brand-navy">
                  {(results.results || []).length} federal leads for “{results.query || query}”
                </h2>
              </div>
              <Link href="/free-consultation" className="btn-primary">
                Turn Search Into Strategy
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="space-y-4">
              {(results.results || []).map((item) => (
                <article key={`${item.source}-${item.id}`} className="rounded-lg border border-gray-200 bg-white p-5">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-bold uppercase text-brand-darkGold">
                          {item.type}
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-600">
                          {item.source}
                        </span>
                        {item.amount && (
                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold uppercase text-green-700">
                            {item.amount}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 font-accent text-xl font-bold text-brand-navy">{item.title}</h3>
                      <p className="mt-2 text-sm text-gray-600">
                        {item.agency || 'Agency not listed'} {item.closeDate ? `· Date: ${item.closeDate}` : ''}
                      </p>
                      {item.summary && <p className="mt-3 text-sm leading-6 text-gray-600">{item.summary.slice(0, 420)}</p>}
                    </div>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-brand-navy px-4 text-sm font-bold text-white transition-colors hover:bg-brand-gold"
                      >
                        Open Source
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
              {!results.results?.length && (
                <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
                  No results returned from the currently configured sources. Check source warnings, keys, filters, and rate limits.
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-bold text-brand-lightGold">{label}</div>
      <div className="mt-1 text-gray-100">{value}</div>
    </div>
  )
}
