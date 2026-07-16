'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'

type IntakeState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  industry: string
  website: string
  employees: string
  annualRevenue: string
  naics: string
  samStatus: string
  certifications: string
  services: string
  goals: string
}

const INITIAL_STATE: IntakeState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  industry: '',
  website: '',
  employees: '',
  annualRevenue: '',
  naics: '',
  samStatus: 'unknown',
  certifications: '',
  services: '',
  goals: '',
}

export default function IntakePage() {
  const [form, setForm] = useState<IntakeState>(INITIAL_STATE)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const completion = useMemo(() => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'company', 'industry', 'services', 'goals'] as const
    const filled = required.filter((key) => form[key].trim().length > 0).length
    return Math.round((filled / required.length) * 100)
  }, [form])

  const update = (key: keyof IntakeState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit intake right now.')
      }

      setStatus('success')
      setMessage(`Intake received. Readiness score: ${data.lead?.readinessScore ?? 'pending'}%.`)
      setForm(INITIAL_STATE)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to submit intake right now.')
    }
  }

  return (
    <div className="bg-brand-offWhite">
      <section className="bg-brand-navy py-14 text-white">
        <div className="container-custom">
          <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-lightGold">
            Client Intake
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold md:text-5xl">
            Give Dr. McKnight the facts before the strategy call.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-200">
            This form feeds the admin CRM, readiness score, certification fit review, and first
            12-month roadmap draft.
          </p>
        </div>
      </section>

      <section className="container-custom grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-accent text-2xl font-bold text-brand-navy">Business Profile</h2>
              <p className="mt-1 text-sm text-gray-600">Required fields are used for the first readiness score.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-gold">{completion}%</div>
              <div className="text-xs font-bold uppercase text-gray-500">complete</div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="First name" value={form.firstName} onChange={(value) => update('firstName', value)} required />
            <Field label="Last name" value={form.lastName} onChange={(value) => update('lastName', value)} required />
            <Field label="Email" type="email" value={form.email} onChange={(value) => update('email', value)} required />
            <Field label="Phone" value={form.phone} onChange={(value) => update('phone', value)} required />
            <Field label="Company" value={form.company} onChange={(value) => update('company', value)} required />
            <Field label="Industry" value={form.industry} onChange={(value) => update('industry', value)} required />
            <Field label="Website" value={form.website} onChange={(value) => update('website', value)} />
            <Field label="Employees" value={form.employees} onChange={(value) => update('employees', value)} />
            <Field label="Annual revenue" value={form.annualRevenue} onChange={(value) => update('annualRevenue', value)} />
            <Field label="Known NAICS codes" value={form.naics} onChange={(value) => update('naics', value)} />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-bold text-brand-navy">SAM.gov status</span>
              <select className="input-field" value={form.samStatus} onChange={(event) => update('samStatus', event.target.value)}>
                <option value="unknown">Not sure</option>
                <option value="not-started">Not started</option>
                <option value="in-progress">In progress</option>
                <option value="active">Active</option>
                <option value="expired">Expired or needs renewal</option>
              </select>
            </label>
            <Field label="Current certifications" value={form.certifications} onChange={(value) => update('certifications', value)} />
          </div>

          <div className="mt-5 grid gap-5">
            <TextArea label="Services needed" value={form.services} onChange={(value) => update('services', value)} required />
            <TextArea label="Goals, deadlines, and contract targets" value={form.goals} onChange={(value) => update('goals', value)} required />
          </div>

          {message && (
            <div className={`mt-6 flex gap-3 rounded-lg p-4 text-sm ${status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {status === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
              {message}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button type="submit" loading={status === 'loading'}>
              {status === 'loading' ? 'Submitting' : 'Submit Intake'}
            </Button>
            <Link href="/portal" className="btn-navy">
              Client Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </form>

        <aside className="space-y-5">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="font-accent text-xl font-bold text-brand-navy">What happens next</h2>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-gray-600">
              {[
                'ContractingPreacher AI scores readiness across six dimensions.',
                'Certification fit and risk flags are prepared for Dr. McKnight.',
                'SAM.gov, USAspending, grant, and SBIR matches can be pulled into the CRM.',
                'The client portal shows roadmap, documents, deadlines, and next steps.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-brand-navy p-6 text-white">
            <h2 className="font-accent text-xl font-bold">Accuracy rule</h2>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              The CRM can score and flag likely paths, but final SAM status, certification eligibility,
              legal requirements, and opportunity deadlines must be verified against official sources.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-brand-navy">
        {label}
        {required && <span className="text-brand-gold"> *</span>}
      </span>
      <input className="input-field" type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
    </label>
  )
}

function TextArea({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-brand-navy">
        {label}
        {required && <span className="text-brand-gold"> *</span>}
      </span>
      <textarea className="input-field min-h-32" value={value} onChange={(event) => onChange(event.target.value)} required={required} />
    </label>
  )
}
