'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, Bot, CheckCircle2, Loader2, LogIn } from 'lucide-react'
import Button from '@/components/ui/Button'
import { PORTAL_MODULES } from '@/lib/fedfunding'

type PortalData = {
  client: {
    name: string
    company: string
    readinessScore: number
    stage: string
  }
  roadmap: string[]
  watchlist: string[]
  documents: string[]
  deadlines: string[]
}

export default function PortalPage() {
  const [email, setEmail] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [portal, setPortal] = useState<PortalData | null>(null)

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, accessCode }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Unable to open portal.')
      setPortal(data.portal)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unable to open portal.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-offWhite">
      <section className="bg-brand-navy py-14 text-white">
        <div className="container-custom">
          <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-lightGold">
            Client Portal
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold md:text-5xl">
            Your contracting roadmap, documents, deadlines, and opportunity watchlist.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-200">
            Review your federal contracting plan, track required documents, watch matching
            opportunities, and see the next steps your business should complete.
          </p>
        </div>
      </section>

      <section className="container-custom grid gap-8 py-12 lg:grid-cols-[380px_1fr]">
        <form onSubmit={login} className="h-fit rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-accent text-2xl font-bold text-brand-navy">Portal Login</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Enter the client email and access code issued by The Contracting Preacher team.
          </p>
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-brand-navy">Email</span>
            <input className="input-field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-brand-navy">Access code</span>
            <input className="input-field" type="password" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} required />
          </label>
          {error && (
            <div className="mt-5 flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
              <AlertCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}
          <Button type="submit" className="mt-6" fullWidth loading={loading}>
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
            Open Portal
          </Button>
          <Link href="/intake" className="mt-4 block text-center text-sm font-bold text-brand-blue hover:text-brand-gold">
            Need a portal? Start intake
          </Link>
        </form>

        <div className="space-y-6">
          {portal ? (
            <>
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-gold">
                      {portal.client.stage.replace(/-/g, ' ')}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-brand-navy">{portal.client.company}</h2>
                    <p className="mt-1 text-gray-600">{portal.client.name}</p>
                  </div>
                  <div className="rounded-lg bg-brand-navy p-5 text-center text-white">
                    <div className="text-4xl font-bold text-brand-gold">{portal.client.readinessScore}%</div>
                    <div className="text-xs font-bold uppercase text-gray-300">readiness</div>
                  </div>
                </div>
              </div>
              <PortalPanel title="12-Month Roadmap" items={portal.roadmap} />
              <PortalPanel title="Opportunity Watchlist" items={portal.watchlist} />
              <section className="rounded-lg border border-gray-200 bg-white p-6">
                <Bot className="h-8 w-8 text-brand-gold" />
                <h2 className="mt-4 font-accent text-2xl font-bold text-brand-navy">AI Contracting Assistant</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Ask the live agent to explain matches, prepare next steps, and search connected federal data tools.
                </p>
                <Link href="/agent" className="btn-navy mt-5">
                  Open AI Agent
                </Link>
              </section>
              <PortalPanel title="Document Checklist" items={portal.documents} />
              <PortalPanel title="Deadline Alerts" items={portal.deadlines} />
            </>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                {PORTAL_MODULES.map((module) => {
                  const Icon = module.icon
                  return (
                    <article key={module.title} className="rounded-lg border border-gray-200 bg-white p-6">
                      <Icon className="h-8 w-8 text-brand-gold" />
                      <h2 className="mt-4 font-accent text-xl font-bold text-brand-navy">{module.title}</h2>
                      <p className="mt-3 text-sm leading-6 text-gray-600">{module.description}</p>
                    </article>
                  )
                })}
              </div>
              <div className="rounded-lg bg-brand-navy p-6 text-white">
                <h2 className="font-accent text-2xl font-bold">Your next step</h2>
                <p className="mt-3 text-sm leading-6 text-gray-300">
                  Complete the intake, gather your business documents, and use the assistant to
                  understand which opportunities are worth reviewing with The Contracting Preacher team.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

function PortalPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="font-accent text-2xl font-bold text-brand-navy">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-lg bg-brand-offWhite p-3 text-sm text-gray-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
