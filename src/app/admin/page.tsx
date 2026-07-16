'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  Loader2,
  RefreshCcw,
  Search,
  ShieldCheck,
  Users,
  Bot,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { CRM_PIPELINE_STAGES, FEDERAL_FUNDING_SOURCES } from '@/lib/fedfunding'

type Lead = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  industry: string
  services: string
  goals: string
  samStatus: string
  readinessScore: number
  stage: string
  strengths: string[]
  risks: string[]
  createdAt: string
}

type FundingResult = {
  source: string
  live: boolean
  warning?: string
  warnings?: string[]
  sources?: Array<{ source: string; live: boolean; warning?: string; count: number }>
  results?: unknown[]
  raw?: unknown
}

export default function AdminPage() {
  const [accessCode, setAccessCode] = useState('')
  const [savedAccessCode, setSavedAccessCode] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [loadingLeads, setLoadingLeads] = useState(false)
  const [leadError, setLeadError] = useState('')
  const [query, setQuery] = useState('cybersecurity')
  const [source, setSource] = useState('contracts')
  const [funding, setFunding] = useState<FundingResult | null>(null)
  const [loadingFunding, setLoadingFunding] = useState(false)

  useEffect(() => {
    const existing = window.localStorage.getItem('tcp-admin-code') || ''
    setAccessCode(existing)
    setSavedAccessCode(existing)
  }, [])

  const metrics = useMemo(() => {
    const averageScore = leads.length
      ? Math.round(leads.reduce((sum, lead) => sum + lead.readinessScore, 0) / leads.length)
      : 0
    const riskCount = leads.reduce((sum, lead) => sum + lead.risks.length, 0)
    const activeCount = leads.filter((lead) => lead.stage !== 'win-retention').length
    return { averageScore, riskCount, activeCount }
  }, [leads])

  const saveCode = () => {
    window.localStorage.setItem('tcp-admin-code', accessCode)
    setSavedAccessCode(accessCode)
    void loadLeads(accessCode)
  }

  const loadLeads = async (code = savedAccessCode) => {
    setLoadingLeads(true)
    setLeadError('')
    try {
      const response = await fetch('/api/crm/leads', {
        headers: { Authorization: `Bearer ${code}` },
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Unable to load CRM leads.')
      setLeads(data.leads || [])
    } catch (error) {
      setLeadError(error instanceof Error ? error.message : 'Unable to load CRM leads.')
    } finally {
      setLoadingLeads(false)
    }
  }

  const searchFunding = async () => {
    setLoadingFunding(true)
    setFunding(null)
    try {
      const endpoint = source.startsWith('open:')
        ? `/api/open-data/search?source=${encodeURIComponent(source.replace('open:', ''))}&q=${encodeURIComponent(query)}`
        : source === 'all'
          ? `/api/funding/discover?q=${encodeURIComponent(query)}&limit=8`
        : `/api/funding/search?source=${encodeURIComponent(source)}&q=${encodeURIComponent(query)}`
      const response = await fetch(endpoint)
      const data = await response.json().catch(() => ({}))
      setFunding(data)
    } finally {
      setLoadingFunding(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-offWhite">
      <section className="bg-brand-navy py-12 text-white">
        <div className="container-custom flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-lightGold">
              Admin CRM
            </p>
            <h1 className="mt-3 text-4xl font-bold md:text-5xl">Dr. McKnight command center.</h1>
            <p className="mt-4 max-w-3xl text-gray-200">
              Intake queue, readiness scoring, opportunity search, and weekly pipeline operating view.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link href="/agent" className="bg-brand-gold text-brand-navy hover:bg-brand-lightGold px-6 py-3 rounded-lg font-accent font-bold transition-all inline-flex items-center">
              AI Agent Workspace
              <Bot className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/intake" className="btn-primary">
              Add Client
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-custom py-8">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <label>
              <span className="mb-2 block text-sm font-bold text-brand-navy">Admin access code</span>
              <input
                className="input-field"
                type="password"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                placeholder="Enter admin access code"
              />
            </label>
            <Button type="button" onClick={saveCode}>Unlock CRM</Button>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Use the private access code issued for Dr. McKnight&apos;s team.
          </p>
        </div>
      </section>

      <section className="container-custom grid gap-5 pb-8 md:grid-cols-3">
        <Metric icon={Users} label="CRM Leads" value={String(leads.length)} />
        <Metric icon={ShieldCheck} label="Average Readiness" value={`${metrics.averageScore}%`} />
        <Metric icon={AlertTriangle} label="Open Risk Flags" value={String(metrics.riskCount)} />
      </section>

      <section className="container-custom grid gap-8 pb-12 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-accent text-2xl font-bold text-brand-navy">Client Pipeline</h2>
              <p className="mt-1 text-sm text-gray-600">{metrics.activeCount} active client records</p>
            </div>
            <Button type="button" variant="ghost" onClick={() => loadLeads()}>
              {loadingLeads ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
              Refresh
            </Button>
          </div>

          {leadError && (
            <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-800">{leadError}</div>
          )}

          <div className="mt-6 space-y-4">
            {leads.map((lead) => (
              <article key={lead.id} className="rounded-lg border border-gray-200 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-accent text-lg font-bold text-brand-navy">{lead.company}</h3>
                      <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-bold uppercase text-brand-darkGold">
                        {lead.stage.replace(/-/g, ' ')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {lead.firstName} {lead.lastName} · {lead.email} · {lead.phone}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{lead.goals}</p>
                  </div>
                  <div className="shrink-0 text-left md:text-right">
                    <div className="text-3xl font-bold text-brand-gold">{lead.readinessScore}%</div>
                    <div className="text-xs font-bold uppercase text-gray-500">readiness</div>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <FlagList title="Strengths" items={lead.strengths} positive />
                  <FlagList title="Risks" items={lead.risks} />
                </div>
              </article>
            ))}
            {!leads.length && !loadingLeads && (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-600">
                No CRM leads loaded yet. Submit the intake form or unlock with the correct admin code.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-accent text-2xl font-bold text-brand-navy">Live Opportunity Search</h2>
            <div className="mt-5 grid gap-4">
              <label>
                <span className="mb-2 block text-sm font-bold text-brand-navy">Source</span>
                <select className="input-field" value={source} onChange={(event) => setSource(event.target.value)}>
                  <option value="all">Search all federal sources</option>
                  <option value="contracts">SAM.gov contracts</option>
                  <option value="grants">Grants.gov opportunities</option>
                  <option value="awards">USAspending awards</option>
                  <option value="sbir">SBIR/STTR</option>
                  <option value="nofo">Federal Register NOFOs</option>
                  <option value="open:opensanctions">OpenSanctions risk</option>
                  <option value="open:opencorporates">OpenCorporates entities</option>
                  <option value="open:microlink">Website evidence</option>
                  <option value="open:college-scorecard">College Scorecard</option>
                  <option value="open:universities">University partners</option>
                  <option value="open:wikidata">Wikidata context</option>
                  <option value="open:wikipedia">Wikipedia context</option>
                  <option value="open:archive">Archive.org evidence</option>
                  <option value="open:teleport">Location context</option>
                </select>
              </label>
              <label>
                <span className="mb-2 block text-sm font-bold text-brand-navy">Search</span>
                <input className="input-field" value={query} onChange={(event) => setQuery(event.target.value)} />
              </label>
              <Button type="button" onClick={searchFunding} loading={loadingFunding}>
                <Search className="mr-2 h-5 w-5" />
                Search Live Data
              </Button>
            </div>
            {funding && (
              <div className="mt-5 rounded-lg bg-brand-offWhite p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-accent font-bold text-brand-navy">{funding.source}</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${funding.live ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {funding.live ? 'live' : 'config needed'}
                  </span>
                </div>
                {funding.warning && <p className="mt-3 text-sm text-yellow-900">{funding.warning}</p>}
                {funding.warnings?.length ? (
                  <ul className="mt-3 space-y-1 text-sm text-yellow-900">
                    {funding.warnings.map((warning) => <li key={warning}>{warning}</li>)}
                  </ul>
                ) : null}
                {funding.sources?.length ? (
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {funding.sources.map((item) => (
                      <div key={item.source} className="rounded bg-white p-3 text-xs">
                        <div className="font-bold text-brand-navy">{item.source}</div>
                        <div className={item.live ? 'text-green-700' : 'text-yellow-800'}>
                          {item.live ? 'live' : 'config needed'} · {item.count} results
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                <pre className="mt-4 max-h-80 overflow-auto rounded bg-brand-navy p-4 text-xs text-white">
                  {JSON.stringify(funding.results || funding.raw || funding, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-accent text-2xl font-bold text-brand-navy">Pipeline Stages</h2>
            <div className="mt-5 space-y-3">
              {CRM_PIPELINE_STAGES.map((stage) => (
                <div key={stage.id} className="rounded-lg border border-gray-200 p-4">
                  <h3 className="font-accent font-bold text-brand-navy">{stage.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{stage.ownerAction}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-accent text-2xl font-bold text-brand-navy">Configured Sources</h2>
            <div className="mt-5 space-y-3">
              {FEDERAL_FUNDING_SOURCES.map((item) => (
                <div key={item.id} className="flex items-start gap-3 text-sm">
                  <Database className="mt-0.5 h-4 w-4 text-brand-gold" />
                  <div>
                    <div className="font-bold text-brand-navy">{item.name}</div>
                    <div className="text-gray-600">{item.auth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Metric({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5">
      <Icon className="h-7 w-7 text-brand-gold" />
      <div className="mt-4 text-3xl font-bold text-brand-navy">{value}</div>
      <div className="mt-1 text-sm font-bold uppercase text-gray-500">{label}</div>
    </article>
  )
}

function FlagList({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div>
      <h4 className="font-accent text-sm font-bold text-brand-navy">{title}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-gray-600">
            {positive ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
