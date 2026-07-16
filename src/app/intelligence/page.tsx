import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  DatabaseZap,
  ExternalLink,
  ServerCog,
  ShieldAlert,
} from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import {
  CRM_PIPELINE_STAGES,
  FEDERAL_FUNDING_SOURCES,
  FEDERAL_TOOLBOX,
  GITHUB_RESOURCES,
  OPEN_DATA_ENRICHMENT_SOURCES,
  PORTAL_MODULES,
  READINESS_DIMENSIONS,
  SYSTEM_PROMISES,
} from '@/lib/fedfunding'

export const metadata: Metadata = generateSEO({
  title: 'Federal Funding Intelligence CRM & Client Portal',
  description:
    'The Contracting Preacher federal funding intelligence system: live SAM.gov, Grants.gov, USAspending, SBIR, Federal Register, CRM, admin dashboard, and client portal.',
  canonical: '/intelligence',
})

export default function IntelligencePage() {
  return (
    <div className="bg-white">
      <section className="bg-brand-navy text-white">
        <div className="container-custom grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 px-4 py-2 text-sm font-bold text-brand-lightGold">
              <DatabaseZap className="h-4 w-4" />
              FedFunding Intel Engine
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              Contracting intelligence, CRM, and client portal in one operating system.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-200">
              Dr. McKnight gets a live command center for federal contracts, grants, SBIR/STTR
              opportunities, award history, readiness scoring, client roadmaps, and deadline alerts.
              Clients get a portal that shows exactly where they stand and what happens next.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/intake" className="btn-primary">
                Start Client Intake
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/admin" className="btn-secondary">
                Open Admin CRM
              </Link>
              <Link href="/agent" className="btn-secondary">
                Live AI Agent
              </Link>
              <Link href="/portal" className="btn-secondary">
                Client Portal
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-brand-gold" />
              <div>
                <h2 className="font-accent text-lg font-bold">Truth-first operating rules</h2>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Live federal data can change without warning. The system surfaces source,
                  timestamp, and confidence state. SAM.gov status, certifications, legal
                  eligibility, and NSF/SBIR solicitation numbers must be verified against the
                  official current source before a final client recommendation.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {['No fabricated SAM status', 'No guaranteed win rates', 'All risks flagged', 'NSF/SBIR kept separate from contracting advice'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/8 p-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-lightGold" />
                  <span className="text-sm font-semibold text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-gold">
              What got added
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-5xl">
              A product layer, not just another landing page.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SYSTEM_PROMISES.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <Icon className="h-8 w-8 text-brand-gold" />
                  <h3 className="mt-5 font-accent text-lg font-bold text-brand-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{item.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-offWhite py-16">
        <div className="container-custom">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-gold">
                Live data routes
              </p>
              <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
                Federal API arsenal wired behind Cloudflare Pages Functions.
              </h2>
            </div>
            <Link href="/api/funding/status" className="btn-navy">
              Check API Status
              <ServerCog className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {FEDERAL_FUNDING_SOURCES.map((source) => (
              <article key={source.id} className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-accent text-lg font-bold text-brand-navy">{source.name}</h3>
                  <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-bold uppercase text-brand-darkGold">
                    {source.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">{source.useCase}</p>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-bold text-brand-navy">Auth</dt>
                    <dd className="mt-1 text-gray-600">{source.auth}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-brand-navy">Cache</dt>
                    <dd className="mt-1 text-gray-600">{source.cacheTtl}</dd>
                  </div>
                </dl>
                <a
                  href={source.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-gold"
                >
                  Official source
                  <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-gold">
              Admin workflow
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
              CRM stages for Dr. McKnight and the team.
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              The admin CRM starts with intake scoring and grows into weekly pipeline health,
              deadline monitoring, certification packaging, proposal tracking, and client win/loss
              reporting.
            </p>
          </div>
          <div className="grid gap-4">
            {CRM_PIPELINE_STAGES.map((stage, index) => (
              <article key={stage.id} className="rounded-lg border border-gray-200 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy font-accent font-bold text-brand-gold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-accent font-bold text-brand-navy">{stage.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{stage.description}</p>
                    <p className="mt-3 text-sm font-semibold text-brand-blue">{stage.ownerAction}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-offWhite py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-gold">
              Open data enrichment
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
              The APIs from your list that actually help the mission.
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              These sources enrich the CRM beyond opportunity search: entity due diligence,
              sanctions/risk screening, university teaming, website evidence, location context,
              and market research. Sources outside the contracting mission were intentionally left
              out of the operating layer.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {OPEN_DATA_ENRICHMENT_SOURCES.map((source) => (
              <article key={source.id} className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-accent text-lg font-bold text-brand-navy">{source.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-gold">
                      {source.category.replace(/-/g, ' ')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-brand-cream px-3 py-1 text-xs font-bold uppercase text-brand-darkGold">
                      {source.missionFit}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-700">
                      {source.status}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{source.useCase}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span className="rounded bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                    Auth: {source.auth}
                  </span>
                  {source.route && (
                    <Link href={source.route} className="font-bold text-brand-blue hover:text-brand-gold">
                      Test route
                    </Link>
                  )}
                  <a
                    href={source.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-brand-blue hover:text-brand-gold"
                  >
                    Docs
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-white">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-lightGold">
              Readiness engine
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Six score dimensions before every strategy call.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {READINESS_DIMENSIONS.map((dimension) => (
              <article key={dimension.label} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-accent text-lg font-bold">{dimension.label}</h3>
                  <span className="text-2xl font-bold text-brand-lightGold">{dimension.weight}%</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {dimension.checks.map((check) => (
                    <li key={check} className="flex gap-2 text-sm leading-6 text-gray-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-lightGold" />
                      {check}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-gold">
                Client portal
              </p>
              <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
                What users see after login.
              </h2>
            </div>
            <Link href="/portal" className="btn-primary">
              View Portal
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PORTAL_MODULES.map((module) => {
              const Icon = module.icon
              return (
                <article key={module.title} className="rounded-lg border border-gray-200 p-6">
                  <Icon className="h-8 w-8 text-brand-gold" />
                  <h3 className="mt-4 font-accent text-lg font-bold text-brand-navy">{module.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{module.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-offWhite py-16">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-gold">
                Tool links
              </p>
              <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
                Test the live endpoints.
              </h2>
              <p className="mt-5 leading-7 text-gray-600">
                These links hit the Cloudflare Functions directly. If a required key is missing, the
                function returns a clear configuration warning instead of pretending live data exists.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {FEDERAL_TOOLBOX.map((tool) => {
                const Icon = tool.icon
                return (
                  <Link
                    key={tool.label}
                    href={tool.href}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 font-accent font-bold text-brand-navy transition-colors hover:border-brand-gold hover:text-brand-gold"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {tool.label}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-gold">
              Upstream GitHub map
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
              Reference repos to study, not blindly install.
            </h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-lg border border-gray-200">
            <div className="grid grid-cols-[1fr_0.8fr_1.6fr] bg-brand-navy px-4 py-3 text-sm font-bold text-white">
              <div>Repository</div>
              <div>Tier</div>
              <div>Use</div>
            </div>
            {GITHUB_RESOURCES.map((repo) => (
              <a
                key={repo.repo}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-[1fr_0.8fr_1.6fr] gap-3 border-t border-gray-200 px-4 py-4 text-sm transition-colors hover:bg-brand-offWhite"
              >
                <span className="font-bold text-brand-blue">{repo.repo}</span>
                <span className="capitalize text-gray-600">{repo.tier}</span>
                <span className="text-gray-600">{repo.use}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
