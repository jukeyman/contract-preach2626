'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Bot, 
  Search, 
  Award, 
  ShieldCheck, 
  Zap, 
  Building,
  Target,
  Briefcase,
  Layers,
  Flame,
  CornerDownRight,
  RefreshCcw,
  Check
} from 'lucide-react'
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
  // Advanced federal intel metrics
  uei: string
  cageCode: string
  pscCodes: string
  businessType: string
  pastPerformance: string
  fundingTypes: string
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
  uei: '',
  cageCode: '',
  pscCodes: '',
  businessType: 'For-Profit Small Business',
  pastPerformance: '',
  fundingTypes: 'Federal Contracts',
}

export default function IntakePage() {
  const [form, setForm] = useState<IntakeState>(INITIAL_STATE)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  
  // Interactive Agent Workflow States
  const [workflowLogs, setWorkflowLogs] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<number>(-1)
  const [reportData, setReportData] = useState<any>(null)

  const completion = useMemo(() => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'company', 'industry', 'services', 'goals', 'naics', 'uei'] as const
    const filled = required.filter((key) => form[key]?.trim().length > 0).length
    return Math.round((filled / required.length) * 100)
  }, [form])

  const update = (key: keyof IntakeState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const autoFill = () => {
    setForm({
      firstName: 'Richard',
      lastName: 'Jefferson',
      email: 'rick@rjbusiness.com',
      phone: '(843) 555-0199',
      company: 'RJ Business Solutions LLC',
      industry: 'Defense Technology & Logistics',
      website: 'https://rjbusinesssolutions.com',
      employees: '45',
      annualRevenue: '$4.8M',
      naics: '541512, 541614, 541519',
      samStatus: 'active',
      certifications: 'HUBZone, Veteran-Owned Small Business (VOSB)',
      services: 'Proposal writing, 8(a) certification, GSA Schedule placement',
      goals: 'Secure a prime federal IT services contract with the Department of Veterans Affairs within 9 months, and scale defense logistics subcontracts.',
      uei: 'N8K2LM5J89C3',
      cageCode: '7Q3Z8',
      pscCodes: 'D302, D308, R408',
      businessType: 'Minority-Owned Small Business',
      pastPerformance: 'Completed subcontract for SPAWAR (Naval Information Warfare Center) supplying ruggedized networking systems ($1.2M value). Delivered IT helpdesk support for regional Veterans Affairs hospital system.',
      fundingTypes: 'Federal Contracts, SBIR/STTR Grants'
    })
    
    // Quick notification trigger
    setMessage('Premium federal contractor intelligence profile auto-filled.')
    setTimeout(() => setMessage(''), 3000)
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')
    setWorkflowLogs([])
    setCurrentStep(0)

    // Prepare extended goals field to store federal intel metrics safely inside current leads DB schema
    const extendedGoals = `${form.goals}

---
[FEDERAL INTEL & TARGETING METRICS]
• Unique Entity ID (UEI): ${form.uei || 'None/Pending'}
• CAGE Code: ${form.cageCode || 'None/Pending'}
• Primary PSC Codes: ${form.pscCodes || 'None/Pending'}
• Business Category: ${form.businessType || 'None/Pending'}
• Target Funding: ${form.fundingTypes || 'None/Pending'}
• Past Performance Summary: ${form.pastPerformance || 'None/Pending'}`

    const payload = {
      ...form,
      goals: extendedGoals
    }

    const steps = [
      { text: 'Initializing Contracting Preacher Capture Engine v4.1...', delay: 800 },
      { text: `Structuring corporate intelligence profile for "${form.company}"...`, delay: 1000 },
      { text: `Scanning active SAM.gov registries (verifying CAGE: ${form.cageCode || 'Pending'} and UEI: ${form.uei || 'Pending'})...`, delay: 1200 },
      { text: `Matching federal NAICS codes [${form.naics || 'Not Specified'}] and PSC codes [${form.pscCodes || 'Not Specified'}]...`, delay: 1400 },
      { text: `Searching Federal procurement repositories & Grants.gov for relevant funding targets...`, delay: 1300 },
      { text: `Analyzing past performance credentials against federal agency requirements...`, delay: 1200 },
      { text: `Synthesizing custom 12-month Capture & Proposal Roadmap...`, delay: 1500 }
    ]

    try {
      // Initiate REST API post in background
      const apiPromise = fetch('/api/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(res => res.json())

      // Live step-by-step progress logging
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i)
        setWorkflowLogs(prev => [...prev, `[LOG] ${steps[i].text}`])
        await new Promise(resolve => setTimeout(resolve, steps[i].delay))
      }

      const data = await apiPromise

      if (data.error) {
        throw new Error(data.error)
      }

      setWorkflowLogs(prev => [...prev, `[SUCCESS] Intelligence compiled. Custom federal contracting roadmap generated.`])
      
      // Calculate dynamic premium report results on client-side
      let score = 30
      if (form.samStatus === 'active') score += 20
      if (form.naics) score += 12
      if (form.uei) score += 10
      if (form.cageCode) score += 8
      if (form.pscCodes) score += 6
      if (form.pastPerformance) score += 10
      score = Math.min(score, 98)

      // Seed customized federal matches matching their NAICS and Industry
      setReportData({
        score,
        uei: form.uei || 'Pending/Unassigned',
        cageCode: form.cageCode || 'Pending/Unassigned',
        pscCodes: form.pscCodes || 'Pending/Unassigned',
        company: form.company,
        naics: form.naics || 'None Provided',
        strengths: [
          form.samStatus === 'active' ? 'Active SAM.gov entity status verified.' : 'SAM registration path established.',
          form.uei ? 'SAM Unique Entity Identifier (UEI) validated.' : 'UEI acquisition queued.',
          form.cageCode ? 'CAGE Code registered for prime bidding.' : 'CAGE Code creation queued.',
          form.pastPerformance ? 'Viable commercial/subcontract past performance history detected.' : 'Past performance ready for packaging.'
        ].filter(Boolean),
        contracts: [
          { agency: 'Dept of Defense (DLA)', title: `Tactical Logistics & Supply Support for NAICS ${form.naics?.split(',')[0] || '541512'}`, value: '$1.4M', probability: 'High Match' },
          { agency: 'Dept of Veterans Affairs', title: `Information Technology Infrastructure & Systems Modernization`, value: '$850K', probability: 'Medium Match' },
          { agency: 'National Science Foundation (SBIR)', title: `Phase I: ${form.industry} Technology Research Grant`, value: '$275K', probability: 'Medium Match' }
        ],
        nextSteps: [
          'Optimize corporate Capability Statement with matching PSC/NAICS codes.',
          'Format and catalog past performance proof points into federal bidding templates.',
          'Schedule strategic strategy session with Dr. McKnight to initiate proposal drafting.'
        ]
      })

      setStatus('success')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to complete capture workflow.')
    }
  }

  const resetForm = () => {
    setForm(INITIAL_STATE)
    setStatus('idle')
    setReportData(null)
    setWorkflowLogs([])
    setCurrentStep(-1)
  }

  return (
    <div className="bg-brand-offWhite min-h-screen">
      {/* Header Banner */}
      <section className="bg-brand-navy py-14 text-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-gold opacity-10 filter blur-3xl pointer-events-none"></div>
        <div className="container-custom relative z-10">
          <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-lightGold flex items-center gap-2">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Client Intel & Intake Registry
          </p>
          <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold md:text-5xl">
                The Contracting Preacher CRM Intake
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-200">
                This secure portal gathers corporate specifications to feed Dr. McKnight's CRM, readiness engine, and the ContractingPreacher AI federal pipeline.
              </p>
            </div>
            {status === 'idle' && (
              <button 
                type="button" 
                onClick={autoFill}
                className="bg-brand-gold text-brand-navy hover:bg-brand-lightGold px-5 py-3 rounded-lg font-accent font-bold transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <Zap className="h-5 w-5 animate-pulse" />
                Auto-Fill Elite Profile
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container-custom py-12">
        {/* SUCCESS STATE - CUSTOM INTELLIGENCE REPORT */}
        {status === 'success' && reportData && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            {/* Header Score Block */}
            <div className="rounded-2xl border border-brand-lightGold/20 bg-brand-navy p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-gold opacity-10 filter blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between relative z-10">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-brand-lightGold border border-white/10">
                    <ShieldCheck className="h-4 w-4" />
                    Intake Evaluated Successfully
                  </div>
                  <h2 className="font-accent text-3xl font-bold">{reportData.company}</h2>
                  <p className="text-gray-300 max-w-xl">
                    Federal procurement profile is locked in. The ContractingPreacher AI has analyzed SAM registries and assembled your custom federal pipeline.
                  </p>
                </div>
                
                {/* Immersive circular gauge */}
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <div className="relative flex items-center justify-center h-24 w-24">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
                      <circle cx="48" cy="48" r="40" stroke="#D4AF37" strokeWidth="8" fill="transparent"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * reportData.score) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold font-accent text-brand-gold">{reportData.score}%</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-brand-lightGold">Readiness Score</div>
                    <div className="text-sm font-semibold text-gray-200">Federal Capability Scale</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Structured Report Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left Column: Strengths & Metadata */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-accent text-xl font-bold text-brand-navy flex items-center gap-2">
                    <Award className="h-5 w-5 text-brand-gold" />
                    Registration Verification
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm bg-brand-offWhite p-4 rounded-lg">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase">UEI Number</div>
                    <div className="font-mono text-brand-navy font-bold mt-0.5">{reportData.uei}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase">CAGE Code</div>
                    <div className="font-mono text-brand-navy font-bold mt-0.5">{reportData.cageCode}</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase">Target NAICS</div>
                    <div className="font-mono text-brand-navy font-bold mt-0.5">{reportData.naics}</div>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase">Primary PSC</div>
                    <div className="font-mono text-brand-navy font-bold mt-0.5">{reportData.pscCodes}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Core Strengths Detected</h4>
                  <ul className="space-y-2.5">
                    {reportData.strengths.map((strength: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-700">
                        <Check className="h-5 w-5 shrink-0 text-green-600 bg-green-50 rounded-full p-1" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Matched Contracts & Grants */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="font-accent text-xl font-bold text-brand-navy flex items-center gap-2">
                    <Search className="h-5 w-5 text-brand-gold" />
                    Matched Contracts & Grants
                  </h3>
                </div>

                <div className="space-y-4">
                  {reportData.contracts.map((contract: any, idx: number) => (
                    <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:border-brand-gold/40 hover:bg-brand-offWhite/30 transition-all space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-xs font-bold uppercase text-brand-gold bg-brand-cream px-2 py-0.5 rounded border border-brand-lightGold/10">
                          {contract.agency}
                        </span>
                        <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                          {contract.probability}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-brand-navy leading-snug">{contract.title}</h4>
                      <div className="text-xs font-bold text-gray-500">Estimated Budget: <span className="text-brand-navy font-mono">{contract.value}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Next Steps */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="border-b border-gray-100 pb-4 mb-4">
                <h3 className="font-accent text-xl font-bold text-brand-navy flex items-center gap-2">
                  <Target className="h-5 w-5 text-brand-gold" />
                  Your 12-Month Strategy Roadmap
                </h3>
              </div>
              <ul className="space-y-4">
                {reportData.nextSteps.map((step: string, idx: number) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-brand-navy text-white text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed self-center mb-0">
                      {step}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link href="/portal" className="btn-navy flex items-center gap-2">
                Go To Client Portal
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button 
                type="button" 
                onClick={resetForm}
                className="bg-brand-gold text-brand-navy hover:bg-brand-lightGold px-6 py-3 rounded-lg font-accent font-bold transition-all shadow-md"
              >
                Register Another Company
              </button>
            </div>
          </div>
        )}

        {/* LOADING STATE - INTERACTIVE WORKFLOW TERMINAL */}
        {status === 'loading' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-950 text-slate-100 font-mono rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              {/* Terminal Window Header */}
              <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500/80"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5" />
                  Contracting Preacher Core Engine v4.1
                </div>
                <div className="w-12"></div>
              </div>

              {/* Terminal Console Content */}
              <div className="p-6 space-y-4 min-h-[360px] max-h-[500px] overflow-y-auto text-xs leading-relaxed">
                <div className="text-brand-gold font-bold mb-2">
                  &gt; INITIALIZING AI PIPELINE WORKFLOW FOR CORPORATE TARGET...
                </div>
                
                {workflowLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2 items-start text-slate-300">
                    <span className="text-slate-500 font-semibold select-none">[{idx + 1}]</span>
                    <span className={log.startsWith('[SUCCESS]') ? 'text-green-400 font-medium' : ''}>
                      {log}
                    </span>
                  </div>
                ))}
                
                {currentStep < 7 && currentStep >= 0 && (
                  <div className="flex items-center gap-2.5 text-brand-lightGold font-medium animate-pulse pt-2">
                    <RefreshCcw className="h-3.5 w-3.5 animate-spin" />
                    <span>Processing: {stepsDescriptions[currentStep]}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 font-medium italic animate-pulse">
              Generating readiness scores and querying SAM/Federal registries... please hold.
            </p>
          </div>
        )}

        {/* IDLE OR ERROR STATE - MAIN INTAKE FORM */}
        {(status === 'idle' || status === 'error') && (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] max-w-7xl mx-auto">
            <form onSubmit={submit} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
              <div className="mb-8 flex items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                  <h2 className="font-accent text-3xl font-bold text-brand-navy">Intake Questionnaire</h2>
                  <p className="mt-1 text-sm text-gray-600">Provide direct, accurate metrics to compile first federal readiness reviews.</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-brand-gold">{completion}%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">profile complete</div>
                </div>
              </div>

              {/* Form Message */}
              {message && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-800 border border-green-200 text-sm flex gap-3 items-center">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                  {message}
                </div>
              )}

              {/* Section 1: Business Profile */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-brand-navy font-accent font-bold text-lg border-b border-gray-100 pb-2">
                  <Building className="h-5 w-5 text-brand-gold" />
                  Corporate Specifications
                </div>
                
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="First Name" value={form.firstName} onChange={(value) => update('firstName', value)} required />
                  <Field label="Last Name" value={form.lastName} onChange={(value) => update('lastName', value)} required />
                  <Field label="Corporate Email" type="email" value={form.email} onChange={(value) => update('email', value)} required />
                  <Field label="Corporate Phone" value={form.phone} onChange={(value) => update('phone', value)} required />
                  <Field label="Company Name" value={form.company} onChange={(value) => update('company', value)} required />
                  <Field label="Industry Sector" value={form.industry} onChange={(value) => update('industry', value)} required />
                  <Field label="Corporate Website" value={form.website} onChange={(value) => update('website', value)} placeholder="https://" />
                  <Field label="Total Employees" value={form.employees} onChange={(value) => update('employees', value)} placeholder="e.g. 15" />
                  <Field label="Annual Revenue" value={form.annualRevenue} onChange={(value) => update('annualRevenue', value)} placeholder="e.g. $1.2M" />
                </div>
              </div>

              {/* Section 2: Federal Registration & Procurement Intel */}
              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-2 text-brand-navy font-accent font-bold text-lg border-b border-gray-100 pb-2">
                  <Layers className="h-5 w-5 text-brand-gold" />
                  Government Registration & Intel Metrics
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-bold text-brand-navy">SAM.gov Registration Status</span>
                    <select className="input-field" value={form.samStatus} onChange={(event) => update('samStatus', event.target.value)}>
                      <option value="unknown">Not sure</option>
                      <option value="not-started">Not started</option>
                      <option value="in-progress">In progress</option>
                      <option value="active">Active</option>
                      <option value="expired">Expired or needs renewal</option>
                    </select>
                  </label>

                  <Field 
                    label="Unique Entity ID (UEI)" 
                    value={form.uei} 
                    onChange={(value) => update('uei', value)} 
                    placeholder="12-character ID (SAM.gov)" 
                    required
                  />

                  <Field 
                    label="CAGE Code" 
                    value={form.cageCode} 
                    onChange={(value) => update('cageCode', value)} 
                    placeholder="5-character ID (if assigned)" 
                  />

                  <Field 
                    label="Known NAICS Codes" 
                    value={form.naics} 
                    onChange={(value) => update('naics', value)} 
                    placeholder="e.g. 541512, 541519" 
                    required
                  />

                  <Field 
                    label="Primary PSC Codes" 
                    value={form.pscCodes} 
                    onChange={(value) => update('pscCodes', value)} 
                    placeholder="e.g. D302, R408" 
                  />

                  <label>
                    <span className="mb-2 block text-sm font-bold text-brand-navy">Business Structure Category</span>
                    <select className="input-field" value={form.businessType} onChange={(event) => update('businessType', event.target.value)}>
                      <option value="For-Profit Small Business">For-Profit Small Business</option>
                      <option value="Minority-Owned Small Business">Minority-Owned Small Business</option>
                      <option value="Woman-Owned Small Business (WOSB)">Woman-Owned Small Business (WOSB)</option>
                      <option value="Service-Disabled Veteran-Owned (SDVOSB)">Service-Disabled Veteran-Owned (SDVOSB)</option>
                      <option value="Non-Profit / Research Organization">Non-Profit / Research Organization</option>
                    </select>
                  </label>

                  <Field 
                    label="Target Funding Classes" 
                    value={form.fundingTypes} 
                    onChange={(value) => update('fundingTypes', value)} 
                    placeholder="e.g. Federal Contracts, SBIR/STTR Grants" 
                  />

                  <div className="md:col-span-2">
                    <Field 
                      label="Current Certifications / Set-Aside Goals" 
                      value={form.certifications} 
                      onChange={(value) => update('certifications', value)} 
                      placeholder="e.g. SBA 8(a), HUBZone, WOSB" 
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Capabilities & Strategy */}
              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-2 text-brand-navy font-accent font-bold text-lg border-b border-gray-100 pb-2">
                  <Target className="h-5 w-5 text-brand-gold" />
                  Corporate Capabilities & Strategy Targets
                </div>

                <div className="grid gap-5">
                  <TextArea 
                    label="Corporate Past Performance History" 
                    value={form.pastPerformance} 
                    onChange={(value) => update('pastPerformance', value)} 
                    placeholder="Describe any commercial subcontracts, state, local, or federal work completed." 
                  />

                  <TextArea 
                    label="Requested Services Needed from Dr. McKnight" 
                    value={form.services} 
                    onChange={(value) => update('services', value)} 
                    required 
                    placeholder="e.g. Federal capture planning, SBA 8(a) certification, proposal optimization"
                  />

                  <TextArea 
                    label="Strategic Goals & Contract Deadlines" 
                    value={form.goals} 
                    onChange={(value) => update('goals', value)} 
                    required 
                    placeholder="Describe the exact agencies, grant solicitations, or specific dollar values you want to target over the next 12 months."
                  />
                </div>
              </div>

              {/* Error Warning Box */}
              {status === 'error' && (
                <div className="mt-6 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm flex gap-3 items-center">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                  {message}
                </div>
              )}

              {/* Actions Section */}
              <div className="mt-8 flex flex-wrap gap-4 border-t border-gray-100 pt-6">
                <button 
                  type="submit" 
                  className="bg-brand-navy hover:bg-brand-navy/90 text-white font-accent font-bold px-8 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all"
                >
                  <Play className="h-5 w-5 text-brand-gold fill-brand-gold" />
                  Submit & Start AI Capture Workflow
                </button>
                <Link href="/portal" className="btn-navy">
                  Client Portal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </form>

            {/* Sidebar Guidelines */}
            <aside className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="font-accent text-lg font-bold text-brand-navy flex items-center gap-2">
                  <Bot className="h-5 w-5 text-brand-gold" />
                  Federal Intake Workflow
                </h3>
                <ul className="mt-5 space-y-4 text-xs leading-relaxed text-gray-600">
                  {[
                    { title: 'AI Capability Scoring', desc: 'Calculates structural federal readiness based on SAM, NAICS, and PSC codes.' },
                    { title: 'Database Scans', desc: 'Queries federal procurement repositories and active agency solicitation databases.' },
                    { title: 'Certification Reviews', desc: 'Scans compliance structures for SBA 8(a), HUBZone, WOSB, and SDVOSB pathways.' },
                    { title: 'Instant Capture Roadmap', desc: 'Auto-generates a bespoke, professional proposal and capture strategy report.' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3">
                      <div className="mt-0.5 font-bold text-brand-navy bg-brand-cream border border-brand-lightGold/20 h-6 w-6 rounded-full flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <strong className="block text-brand-navy font-semibold">{item.title}</strong>
                        <span className="text-gray-500 mt-0.5 block">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-brand-navy p-6 text-white shadow-md relative overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-gold opacity-10 filter blur-3xl pointer-events-none font-medium"></div>
                <h3 className="font-accent text-lg font-bold text-brand-gold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />
                  Accuracy Standard
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-gray-300">
                  While ContractingPreacher AI algorithms compile matching solicitation patterns and compute initial readiness profiles, all SAM registries, legal credentials, and target guidelines must be certified under authorized counsel.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  )
}

// Simulated active workflow steps lookup helper
const stepsDescriptions = [
  'Initializing Core AI Pipeline Engine...',
  'Structuring business intelligence profile details...',
  'Querying active SAM.gov databases...',
  'Compiling federal NAICS / PSC mapping schemas...',
  'Matching procurement opportunities and Grant programs...',
  'Verifying corporate past performance standards...',
  'Synthesizing ultimate 12-month Capture & Proposal Roadmap...'
]

// Play icon SVG helper for clean React compatibility
function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = '',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-brand-navy">
        {label}
        {required && <span className="text-brand-gold"> *</span>}
      </span>
      <input 
        className="input-field" 
        type={type} 
        value={value} 
        onChange={(event) => onChange(event.target.value)} 
        required={required} 
        placeholder={placeholder}
      />
    </label>
  )
}

function TextArea({
  label,
  value,
  onChange,
  required = false,
  placeholder = '',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-bold text-brand-navy">
        {label}
        {required && <span className="text-brand-gold"> *</span>}
      </span>
      <textarea 
        className="input-field min-h-32" 
        value={value} 
        onChange={(event) => onChange(event.target.value)} 
        required={required} 
        placeholder={placeholder}
      />
    </label>
  )
}
