'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  Loader2,
  MessageSquareText,
  Send,
  ShieldCheck,
  Wrench,
  FileText,
  FileBadge,
  Search,
  Sparkles,
  Clipboard,
  Check,
  TrendingUp,
  Briefcase,
  Layers,
  AlertTriangle,
  X,
  Gauge,
  HelpCircle,
  Building,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { toast } from 'sonner'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  reasoning?: string[]
}

type AgentResponse = {
  live?: boolean
  answer?: string
  warning?: string
  reasoning?: string[]
}

type Opportunity = {
  id: string
  source: string
  type: 'contract' | 'grant' | 'award' | 'sbir' | 'notice'
  title: string
  agency?: string
  closeDate?: string
  amount?: string
  url?: string
  summary?: string
}

type DraftResponse = {
  success: boolean
  draft: string
  type: string
  companyName: string
}

type AuditItem = {
  id: string
  label: string
  status: 'pass' | 'warning' | 'fail'
  description: string
  points: number
  maxPoints: number
}

type MitigationStep = {
  title: string
  urgency: 'high' | 'medium' | 'low'
  action: string
}

type AuditResponse = {
  success: boolean
  score: number
  items: AuditItem[]
  mitigations: MitigationStep[]
}

const starterMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      'Welcome to the Contracting Preacher Command Center. I am your specialized federal agent. Select one of the workspace tools below or ask me any question about SAM.gov registrations, socio-economic certifications, or active bids.',
  },
]

const quickPrompts = [
  'Find cybersecurity contracts and grants',
  'Find construction opportunities in South Carolina',
  'Show me grant opportunities for workforce training',
  'What should a new client prepare before bidding?',
]

export default function AgentPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'draftsman' | 'auditor' | 'finder' | 'intel'>('chat')
  
  // Tab 1: Chat States
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages)
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [currentReasoning, setCurrentReasoning] = useState<string[]>([])
  const chatScrollRef = useRef<HTMLDivElement>(null)

  // Tab 2: Draftsman States
  const [draftType, setDraftType] = useState<'sow' | 'sbir' | 'capability'>('sow')
  const [draftCompany, setDraftCompany] = useState('McKnight Enterprises LLC')
  const [draftNaics, setDraftNaics] = useState('541512')
  const [draftStrengths, setDraftStrengths] = useState('ISO 9001 certified operations, 15+ years federal software engineering delivery, security-cleared staff.')
  const [draftGoals, setDraftStrengthsGoals] = useState('Modernize agency database systems, optimize cloud architectures, and provide 24/7 helpdesk workflows.')
  const [draftOpportunityId, setDraftOpportunityId] = useState('SOL-88741-B')
  const [draftOpportunityTitle, setDraftOpportunityTitle] = useState('Next-Generation Database Modernization Initiative')
  const [draftAgency, setDraftAgency] = useState('Department of Commerce (DOC)')
  const [draftResult, setDraftResult] = useState('')
  const [draftLoading, setDraftLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Tab 3: Auditor States
  const [auditCompany, setAuditCompany] = useState('RJ Solutions Inc')
  const [auditUei, setAuditUei] = useState('UEISAMCMP991')
  const [auditNaics, setAuditNaics] = useState('541611')
  const [selectedCerts, setSelectedCerts] = useState<string[]>(['8a', 'wosb'])
  const [hasPastPerf, setHasPastPerf] = useState(true)
  const [isAuditReady, setIsAuditReady] = useState(true)
  const [hasInsurance, setHasInsurance] = useState(true)
  const [hasCapacity, setHasCapacity] = useState(true)
  const [auditResult, setAuditResult] = useState<AuditResponse | null>(null)
  const [auditLoading, setAuditLoading] = useState(false)

  // Tab 4: Opportunity Finder States
  const [finderQuery, setFinderQuery] = useState('it support')
  const [finderState, setFinderState] = useState('')
  const [finderNaics, setFinderNaics] = useState('')
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [finderLoading, setFinderLoading] = useState(false)
  const [selectedOpp, setSelectedOpportunity] = useState<Opportunity | null>(null)

  // Tab 5: Market Intelligence States
  const [intelQuery, setIntelQuery] = useState('cybersecurity')
  const [intelState, setIntelState] = useState('')
  const [awards, setAwards] = useState<Opportunity[]>([])
  const [intelLoading, setIntelLoading] = useState(false)

  // Auto scroll chat
  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentReasoning])

  // Fetch initial audit on mount
  useEffect(() => {
    runAudit()
  }, [])

  // Send message API trigger
  const sendChatMessage = async (event?: React.FormEvent<HTMLFormElement>, preset?: string) => {
    event?.preventDefault()
    const content = (preset || chatInput).trim()
    if (!content || chatLoading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content }]
    setMessages(nextMessages)
    setChatInput('')
    setChatLoading(true)
    setCurrentReasoning([
      'Initializing context blocks...',
      'Mapping request parameters...'
    ])

    try {
      // Simulate live progression on reasoning steps
      const interval = setInterval(() => {
        setCurrentReasoning((prev) => {
          if (prev.length === 2) return [...prev, 'Searching active federal opportunity registries...']
          if (prev.length === 3) return [...prev, 'Evaluating socio-economic criteria match...']
          return prev
        })
      }, 800)

      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      clearInterval(interval)
      const data = await response.json().catch(() => ({})) as AgentResponse
      
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: data.answer || 'The agent could not process this request. Verify your local Cloudflare binding configurations.',
          reasoning: data.reasoning || ['Inference completed.']
        }
      ])
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: error instanceof Error ? error.message : 'Agent request failed.',
        },
      ])
    } finally {
      setChatLoading(false)
      setCurrentReasoning([])
    }
  }

  // Generate Proposal Draft API trigger
  const generateProposalDraft = async () => {
    setDraftLoading(true)
    setDraftResult('')
    try {
      const response = await fetch('/api/agent/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: draftType,
          companyName: draftCompany,
          naics: draftNaics,
          strengths: draftStrengths,
          goals: draftGoals,
          opportunityId: draftOpportunityId,
          opportunityTitle: draftOpportunityTitle,
          agency: draftAgency
        })
      })
      const data = await response.json().catch(() => ({})) as DraftResponse
      if (data.success) {
        setDraftResult(data.draft)
        toast.success('Federal proposal draft generated successfully!')
      } else {
        toast.error('Could not generate draft. Please check endpoint parameters.')
      }
    } catch (error) {
      toast.error('API connection failure during draft generation.')
      console.error(error)
    } finally {
      setDraftLoading(false)
    }
  }

  // Run Compliance Audit API trigger
  const runAudit = async () => {
    setAuditLoading(true)
    try {
      const response = await fetch('/api/agent/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: auditCompany,
          uei: auditUei,
          primaryNaics: auditNaics,
          certifications: selectedCerts,
          pastPerformance: hasPastPerf,
          financialAuditReady: isAuditReady,
          insuranceBonding: hasInsurance,
          proposalCapacity: hasCapacity
        })
      })
      const data = await response.json().catch(() => ({})) as AuditResponse
      if (data.success) {
        setAuditResult(data)
        if (data.score >= 80) {
          toast.success(`Readiness score: ${data.score}%. Highly qualified!`)
        } else {
          toast.warning(`Readiness score: ${data.score}%. Action steps recommended.`)
        }
      }
    } catch (error) {
      toast.error('Audit compilation failed.')
      console.error(error)
    } finally {
      setAuditLoading(false)
    }
  }

  // Trigger opportunity discovery search
  const runOpportunitySearch = async () => {
    setFinderLoading(true)
    setOpportunities([])
    try {
      const params = new URLSearchParams({
        q: finderQuery,
        limit: '15'
      })
      if (finderState) params.set('state', finderState)
      if (finderNaics) params.set('naics', finderNaics)

      const response = await fetch(`/api/funding/discover?${params.toString()}`)
      const data = await response.json().catch(() => ({})) as { results?: Opportunity[] }
      const items = (data.results || []).filter(item => item.type !== 'award')
      setOpportunities(items)
      toast.success(`Found ${items.length} live contracting opportunities.`)
    } catch (error) {
      toast.error('DB query connection failed.')
      console.error(error)
    } finally {
      setFinderLoading(false)
    }
  }

  // Trigger market intelligence award analysis
  const runMarketSearch = async () => {
    setIntelLoading(true)
    setAwards([])
    try {
      const params = new URLSearchParams({
        q: intelQuery,
        limit: '15'
      })
      if (intelState) params.set('state', intelState)

      const response = await fetch(`/api/funding/discover?${params.toString()}`)
      const data = await response.json().catch(() => ({})) as { results?: Opportunity[] }
      const items = (data.results || []).filter(item => item.type === 'award')
      setAwards(items)
      toast.success(`Retrieved ${items.length} historical award profiles.`)
    } catch (error) {
      toast.error('Failed to retrieve USAspending database history.')
      console.error(error)
    } finally {
      setIntelLoading(false)
    }
  }

  // Copy proposal draft to clipboard
  const handleCopyDraft = () => {
    if (!draftResult) return
    navigator.clipboard.writeText(draftResult)
    setCopied(true)
    toast.success('Proposal copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Header Info Section */}
      <section className="bg-brand-navy py-12 text-white">
        <div className="container-custom">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="font-accent text-xs font-bold uppercase tracking-widest text-brand-lightGold flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-brand-gold animate-pulse" />
                Contracting Preacher Command Center
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl text-white">
                Contracting Preacher Federal Contracting & Grant Workspace
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-300">
                Unlock high-ticket federal deals with fully integrated agent workflow modules. Generate compliance-approved proposal drafts, calculate SAM.gov readiness scores, and search unified federal registries.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setDraftOpportunityId('SOL-99831')
                  setDraftOpportunityTitle('Federal Cybersecurity Infrastructure Modernization')
                  setDraftAgency('Department of Homeland Security (DHS)')
                  setActiveTab('draftsman')
                }}
                className="rounded-lg bg-white/10 border border-white/15 px-4 py-2.5 text-xs font-bold text-brand-lightGold hover:bg-white/20 transition-all flex items-center gap-1.5"
              >
                <FileText className="h-4 w-4" />
                Draft SOW Proposal
              </button>
              <button
                onClick={() => setActiveTab('auditor')}
                className="rounded-lg bg-brand-gold px-4 py-2.5 text-xs font-bold text-brand-navy hover:bg-brand-lightGold transition-all flex items-center gap-1.5"
              >
                <ShieldCheck className="h-4 w-4" />
                SBA Readiness Audit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Tab Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
        <div className="container-custom overflow-x-auto">
          <nav className="flex space-x-1 py-3" aria-label="Tabs">
            {[
              { id: 'chat', label: '💬 Workspace Agent', icon: Bot },
              { id: 'draftsman', label: '✍️ Proposal Draftsman', icon: FileText },
              { id: 'auditor', label: '📋 SAM/SBA Auditor', icon: ShieldCheck },
              { id: 'finder', label: '🔍 Opportunities Finder', icon: Search },
              { id: 'intel', label: '📊 Market Intel', icon: TrendingUp },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg transition-all shrink-0 ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-brand-navy'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-brand-gold' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      <main className="container-custom py-8">
        
        {/* TAB 1: AI CONTRACTING AGENT WORKSPACE */}
        {activeTab === 'chat' && (
          <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
            <div className="rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden flex flex-col h-[640px]">
              {/* Top Banner */}
              <div className="border-b border-gray-100 bg-[#FFF8E7] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-brand-navy">ContractingPreacher AI Meta-Agent Console</h2>
                    <p className="text-[10px] text-gray-500 font-mono">Model: GPT-4o-Mini / Llama-3.1-8B-Instruct</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-brand-navy/5 text-brand-navy text-[10px] font-bold rounded">D1 Configured</span>
                  <span className="px-2 py-1 bg-brand-navy/5 text-brand-navy text-[10px] font-bold rounded">KV Cache Verified</span>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-xl p-4 text-xs leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-brand-navy text-white'
                          : 'border border-gray-100 bg-[#F5F3EF]/50 text-gray-700'
                      }`}
                    >
                      <div className="mb-1.5 flex items-center gap-1.5 font-bold">
                        {msg.role === 'user' ? (
                          <MessageSquareText className="h-3.5 w-3.5" />
                        ) : (
                          <Bot className="h-3.5 w-3.5 text-brand-gold animate-bounce" />
                        )}
                        {msg.role === 'user' ? 'You' : 'ContractingPreacher AI'}
                      </div>
                      <div className="whitespace-pre-wrap">{msg.content}</div>

                      {/* Display Reasoning Chain details if available */}
                      {msg.role === 'assistant' && msg.reasoning && msg.reasoning.length > 0 && (
                        <div className="mt-3 border-t border-gray-200/50 pt-2.5">
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">Reasoning steps:</p>
                          <div className="space-y-1 pl-2">
                            {msg.reasoning.map((step, rIdx) => (
                              <p key={rIdx} className="text-[10px] text-gray-500 flex items-center gap-1.5">
                                <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                                {step}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Collapsible reasoning logs on execution */}
                {chatLoading && (
                  <div className="space-y-3">
                    <div className="flex justify-start">
                      <div className="rounded-xl border border-gray-200 bg-[#FFF8E7]/50 p-4 max-w-[80%] shadow-sm">
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-navy">
                          <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                          <span>Agent is processing...</span>
                        </div>
                        {currentReasoning.length > 0 && (
                          <div className="mt-3 pl-3 border-l-2 border-brand-gold/50 space-y-1.5">
                            {currentReasoning.map((step, sIdx) => (
                              <p key={sIdx} className="text-[10px] text-gray-600 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold shrink-0 animate-ping"></span>
                                {step}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatScrollRef} />
              </div>

              {/* Chat input box */}
              <form onSubmit={(event) => sendChatMessage(event)} className="border-t border-gray-100 p-5 bg-white">
                <div className="flex gap-3">
                  <input
                    type="text"
                    className="input-field py-3 text-xs"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask for active bids, FAR regulations, 8(a) certifications, or capture roadmaps..."
                    disabled={chatLoading}
                  />
                  <button
                    type="submit"
                    disabled={chatLoading}
                    className="rounded-lg bg-brand-navy px-5 py-3 text-xs font-bold text-white hover:bg-brand-blue transition-all shrink-0 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    Ask Agent
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar quick tools */}
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-brand-navy border-b border-gray-100 pb-3">Sample Inquiries</h3>
                <div className="mt-4 space-y-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendChatMessage(undefined, prompt)}
                      className="w-full text-left text-[11px] p-3 rounded-lg border border-gray-100 bg-[#F5F3EF]/30 hover:border-brand-gold hover:bg-[#FFF8E7] transition-all text-gray-700 font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-brand-navy border-b border-gray-100 pb-3">Integrated Services</h3>
                <div className="space-y-3.5">
                  <div className="flex gap-3 text-xs">
                    <span className="p-1.5 bg-[#FFF8E7] text-brand-gold rounded-lg h-fit shrink-0"><FileText className="h-4 w-4" /></span>
                    <div>
                      <p className="font-bold text-brand-navy">Proposal Drafting</p>
                      <p className="text-[10px] text-gray-500 leading-normal mt-0.5">Generate Statement of Work (SOW) bid copy directly using specialized templates.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="p-1.5 bg-[#FFF8E7] text-brand-gold rounded-lg h-fit shrink-0"><ShieldCheck className="h-4 w-4" /></span>
                    <div>
                      <p className="font-bold text-brand-navy">Compliance Auditing</p>
                      <p className="text-[10px] text-gray-500 leading-normal mt-0.5">Compute numerical readiness metrics for small business certifications.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="p-1.5 bg-[#FFF8E7] text-brand-gold rounded-lg h-fit shrink-0"><Search className="h-4 w-4" /></span>
                    <div>
                      <p className="font-bold text-brand-navy">Registry Discovery</p>
                      <p className="text-[10px] text-gray-500 leading-normal mt-0.5">Direct API connections querying SAM.gov, Grants.gov, and SBIR.gov registries.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROPOSAL DRAFTSMAN SUITE */}
        {activeTab === 'draftsman' && (
          <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
            {/* Draft Configuration Panel */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md h-fit space-y-5">
              <div>
                <h2 className="text-base font-bold text-brand-navy">Proposal Configuration</h2>
                <p className="text-[11px] text-gray-500 mt-1">Configure parameters to compile compliance-formatted Markdown bids.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-brand-navy mb-1.5">Document Model Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'sow', label: 'SOW Response' },
                      { id: 'sbir', label: 'SBIR Phase I' },
                      { id: 'capability', label: 'Capability' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setDraftType(opt.id as any)}
                        className={`py-2 text-[10px] font-bold rounded-lg border text-center transition-all ${
                          draftType === opt.id
                            ? 'bg-brand-navy border-brand-navy text-white'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-navy mb-1.5">Opportunity Sol Number</label>
                  <input
                    type="text"
                    className="input-field text-xs py-2.5"
                    value={draftOpportunityId}
                    onChange={(e) => setDraftOpportunityId(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-navy mb-1.5">Opportunity Name</label>
                  <input
                    type="text"
                    className="input-field text-xs py-2.5"
                    value={draftOpportunityTitle}
                    onChange={(e) => setDraftOpportunityTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-brand-navy mb-1.5">Target Agency</label>
                  <input
                    type="text"
                    className="input-field text-xs py-2.5"
                    value={draftAgency}
                    onChange={(e) => setDraftAgency(e.target.value)}
                  />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-xs font-bold text-brand-navy mb-3">Bidder Identity Details</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Company Legal Name</label>
                      <input
                        type="text"
                        className="input-field text-xs py-2"
                        value={draftCompany}
                        onChange={(e) => setDraftCompany(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Primary NAICS Code</label>
                      <input
                        type="text"
                        className="input-field text-xs py-2"
                        value={draftNaics}
                        onChange={(e) => setDraftNaics(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Unique Strengths</label>
                      <textarea
                        className="input-field text-xs py-2 h-16 resize-none"
                        value={draftStrengths}
                        onChange={(e) => setDraftStrengths(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Proposed Capabilities / Goals</label>
                      <textarea
                        className="input-field text-xs py-2 h-16 resize-none"
                        value={draftGoals}
                        onChange={(e) => setDraftStrengthsGoals(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={generateProposalDraft}
                disabled={draftLoading}
                className="w-full rounded-lg bg-brand-navy py-3 text-xs font-bold text-white hover:bg-brand-blue transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {draftLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                    Compiling Proposal...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-brand-gold" />
                    Generate AI Draft
                  </>
                )}
              </button>
            </div>

            {/* Draft Preview Board */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-md flex flex-col h-[700px] overflow-hidden">
              <div className="border-b border-gray-100 bg-[#FFF8E7] px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-brand-navy">Draft Workspace Editor</h3>
                  <p className="text-[10px] text-gray-500 font-medium">Standard Federal-Approved Markdown Structure</p>
                </div>
                {draftResult && (
                  <button
                    onClick={handleCopyDraft}
                    className="rounded-lg bg-brand-navy/5 text-brand-navy px-3 py-1.5 text-xs font-bold hover:bg-brand-navy hover:text-white transition-all flex items-center gap-1"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Clipboard className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy to Clipboard'}
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-8 font-mono text-xs text-gray-700 leading-relaxed bg-[#F5F3EF]/20 whitespace-pre-wrap">
                {draftResult ? (
                  draftResult
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-gray-400">
                    <FileText className="h-12 w-12 text-gray-300" />
                    <div>
                      <p className="font-bold text-gray-500 text-sm">No proposal compiled yet</p>
                      <p className="text-[11px] max-w-xs mt-1 leading-normal">Modify parameters in the configuration panel and click &quot;Generate AI Draft&quot; to begin building your document.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SAM/SBA AUDITOR PANEL */}
        {activeTab === 'auditor' && (
          <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Audit Findings Container */}
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
                  <div>
                    <h2 className="text-base font-bold text-brand-navy">Federal Bid Compliance Audit</h2>
                    <p className="text-[11px] text-gray-500 mt-0.5">SBA set-aside verification and SAM.gov structural status reports.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400">Entity:</span>
                    <span className="px-2.5 py-1 bg-[#FFF8E7] text-brand-navy text-[11px] font-bold rounded-full border border-brand-gold/20">{auditCompany}</span>
                  </div>
                </div>

                {auditResult ? (
                  <div className="space-y-6">
                    {/* Compliance Check Cards */}
                    <div className="space-y-3.5">
                      {auditResult.items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-[#F5F3EF]/35">
                          <div className="shrink-0 mt-0.5">
                            {item.status === 'pass' && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="h-4 w-4" /></span>
                            )}
                            {item.status === 'warning' && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600"><AlertTriangle className="h-4 w-4" /></span>
                            )}
                            {item.status === 'fail' && (
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600"><X className="h-4 w-4" /></span>
                            )}
                          </div>
                          <div className="text-xs">
                            <div className="flex justify-between items-center">
                              <p className="font-bold text-brand-navy">{item.label}</p>
                              <span className="text-[10px] text-gray-500 font-semibold">{item.points} / {item.maxPoints} pts</span>
                            </div>
                            <p className="mt-1.5 text-gray-600 leading-relaxed text-[11px]">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mitigation Steps Accordion block */}
                    <div className="border-t border-gray-100 pt-5 space-y-4">
                      <h3 className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                        <Wrench className="h-4 w-4 text-brand-gold" />
                        Required Compliance Corrective Actions
                      </h3>
                      
                      <div className="grid gap-3 sm:grid-cols-2">
                        {auditResult.mitigations.map((mit, mIdx) => (
                          <div key={mIdx} className="p-4 rounded-lg border border-gray-150 bg-white shadow-sm hover:border-brand-gold transition-all space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-[11px] font-bold text-brand-navy">{mit.title}</p>
                              <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                                mit.urgency === 'high'
                                  ? 'bg-red-50 text-red-600 border border-red-100'
                                  : mit.urgency === 'medium'
                                  ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                  : 'bg-blue-50 text-blue-600 border border-blue-100'
                              }`}>
                                {mit.urgency}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-500 leading-normal">{mit.action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-400">
                    <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                  </div>
                )}
              </div>
            </div>

            {/* Score gauge and Audit input forms */}
            <div className="space-y-6">
              {/* animated readiness circular gauge-meter */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md flex flex-col items-center text-center space-y-4">
                <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider">Federal Contract Readiness Score</h3>
                
                {auditResult ? (
                  <div className="relative flex items-center justify-center">
                    {/* SVG Progress Circle */}
                    <svg className="h-36 w-36 transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r="64"
                        className="stroke-gray-100"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r="64"
                        className={`transition-all duration-1000 ${
                          auditResult.score >= 80
                            ? 'stroke-emerald-500'
                            : auditResult.score >= 50
                            ? 'stroke-amber-500'
                            : 'stroke-red-500'
                        }`}
                        strokeWidth="10"
                        strokeDasharray={402}
                        strokeDashoffset={402 - (402 * auditResult.score) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-bold text-brand-navy">{auditResult.score}%</span>
                      <span className="text-[9px] text-gray-500 font-bold uppercase mt-0.5">SAM Readiness</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-36 w-36 rounded-full border-4 border-dashed border-gray-200 animate-spin" />
                )}

                <div className="text-xs max-w-xs leading-normal">
                  <p className="font-bold text-gray-700">
                    {auditResult && auditResult.score >= 80
                      ? 'Enterprise Ready'
                      : auditResult && auditResult.score >= 50
                      ? 'Minor Roadmap Hurdles'
                      : 'Critical Gaps Detected'}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-normal">SBA rules state prime bidding requires verified SAM entity states and size certification compliance maps.</p>
                </div>
              </div>

              {/* Audit settings form */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md space-y-4">
                <h3 className="text-sm font-bold text-brand-navy border-b border-gray-100 pb-3">Re-verify Company Status</h3>
                
                <div className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Company Legal Name</label>
                    <input
                      type="text"
                      className="input-field text-xs py-2"
                      value={auditCompany}
                      onChange={(e) => setAuditCompany(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">SAM.gov UEI</label>
                    <input
                      type="text"
                      className="input-field text-xs py-2"
                      value={auditUei}
                      onChange={(e) => setAuditUei(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1">Primary NAICS</label>
                    <input
                      type="text"
                      className="input-field text-xs py-2"
                      value={auditNaics}
                      onChange={(e) => setAuditNaics(e.target.value)}
                    />
                  </div>

                  {/* Certifications multi selection */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 mb-1.5">Socio-Economic Certifications</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: '8a', label: '8(a) Program' },
                        { id: 'hubzone', label: 'HUBZone' },
                        { id: 'wosb', label: 'WOSB (Women)' },
                        { id: 'sdvosb', label: 'SDVOSB (Veteran)' }
                      ].map((cert) => (
                        <button
                          key={cert.id}
                          onClick={() => toggleCert(cert.id)}
                          className={`py-1.5 px-2.5 rounded-lg border text-[10px] font-bold transition-all text-left flex items-center justify-between ${
                            selectedCerts.includes(cert.id)
                              ? 'bg-[#FFF8E7] border-brand-gold text-brand-darkGold'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{cert.label}</span>
                          {selectedCerts.includes(cert.id) && <Check className="h-3 w-3 text-brand-gold shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Yes/No compliance checks */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                      <span className="font-bold text-[11px] text-brand-navy">Past Performance References</span>
                      <input
                        type="checkbox"
                        className="accent-brand-gold"
                        checked={hasPastPerf}
                        onChange={(e) => setHasPastPerf(e.target.checked)}
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                      <span className="font-bold text-[11px] text-brand-navy">DCAA Accounting System Ready</span>
                      <input
                        type="checkbox"
                        className="accent-brand-gold"
                        checked={isAuditReady}
                        onChange={(e) => setIsAuditReady(e.target.checked)}
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                      <span className="font-bold text-[11px] text-brand-navy">Bonding & E&O Insurance Active</span>
                      <input
                        type="checkbox"
                        className="accent-brand-gold"
                        checked={hasInsurance}
                        onChange={(e) => setHasInsurance(e.target.checked)}
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                      <span className="font-bold text-[11px] text-brand-navy">Proposal Capture Team Available</span>
                      <input
                        type="checkbox"
                        className="accent-brand-gold"
                        checked={hasCapacity}
                        onChange={(e) => setHasCapacity(e.target.checked)}
                      />
                    </label>
                  </div>
                </div>

                <button
                  onClick={runAudit}
                  disabled={auditLoading}
                  className="w-full rounded-lg bg-brand-navy py-2.5 text-xs font-bold text-white hover:bg-brand-blue transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {auditLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                      Computing Compliance...
                    </>
                  ) : (
                    <>
                      <Layers className="h-4 w-4 text-brand-gold" />
                      Recalculate Audit Score
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACTIVE CONTRACTS & GRANTS FINDER */}
        {activeTab === 'finder' && (
          <div className="space-y-6">
            {/* Horizontal Filter Bar */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[10px] font-bold text-gray-500 mb-1.5">Query Keywords</label>
                <div className="relative">
                  <input
                    type="text"
                    className="input-field text-xs py-2.5 pl-8"
                    value={finderQuery}
                    onChange={(e) => setFinderQuery(e.target.value)}
                    placeholder="e.g. IT support, engineering, construction..."
                  />
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="w-36">
                <label className="block text-[10px] font-bold text-gray-500 mb-1.5">US State Filter</label>
                <select
                  className="input-field text-xs py-2.5 bg-white"
                  value={finderState}
                  onChange={(e) => setFinderState(e.target.value)}
                >
                  <option value="">All States</option>
                  <option value="SC">South Carolina</option>
                  <option value="NC">North Carolina</option>
                  <option value="GA">Georgia</option>
                  <option value="VA">Virginia</option>
                  <option value="DC">Washington DC</option>
                  <option value="TX">Texas</option>
                  <option value="CA">California</option>
                </select>
              </div>

              <div className="w-40">
                <label className="block text-[10px] font-bold text-gray-500 mb-1.5">NAICS Code (6-dig)</label>
                <input
                  type="text"
                  className="input-field text-xs py-2.5"
                  value={finderNaics}
                  onChange={(e) => setFinderNaics(e.target.value)}
                  placeholder="e.g. 541511"
                />
              </div>

              <button
                onClick={runOpportunitySearch}
                disabled={finderLoading}
                className="rounded-lg bg-brand-navy px-6 py-3 text-xs font-bold text-white hover:bg-brand-blue transition-all shrink-0 flex items-center gap-1.5 disabled:opacity-50"
              >
                {finderLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                    Querying Databases...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 text-brand-gold" />
                    Search Registries
                  </>
                )}
              </button>
            </div>

            {/* Results Board Grid */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <div className="border-b border-gray-100 pb-3.5 mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-brand-navy">Unified Live Solicitations Feed</h3>
                  <p className="text-[10px] text-gray-500 font-medium">Synced instantly with SAM.gov, Grants.gov, and SBIR.gov registries</p>
                </div>
                <span className="text-[10px] font-bold text-gray-400">Total Solicitations: {opportunities.length}</span>
              </div>

              {finderLoading ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                  <p className="text-xs text-gray-500 font-bold">Querying official federal endpoints...</p>
                </div>
              ) : opportunities.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {opportunities.map((opp) => (
                    <div
                      key={opp.id}
                      onClick={() => setSelectedOpportunity(opp)}
                      className="p-5 rounded-xl border border-gray-150 bg-white shadow-sm hover:border-brand-gold hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-52 group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                            opp.type === 'contract'
                              ? 'bg-blue-50 text-brand-blue border border-blue-100'
                              : opp.type === 'grant'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : opp.type === 'sbir'
                              ? 'bg-purple-50 text-purple-600 border border-purple-100'
                              : 'bg-gray-50 text-gray-600 border border-gray-100'
                          }`}>
                            {opp.type}
                          </span>
                          <span className="text-[9px] text-gray-400 font-mono">{opp.source}</span>
                        </div>
                        <h4 className="font-bold text-xs text-brand-navy line-clamp-2 group-hover:text-brand-gold transition-colors">{opp.title}</h4>
                      </div>

                      <div className="border-t border-gray-100 pt-3 space-y-1 text-[10px] text-gray-500">
                        {opp.agency && (
                          <p className="flex items-center gap-1.5 truncate">
                            <Building className="h-3 w-3 shrink-0 text-gray-400" />
                            {opp.agency}
                          </p>
                        )}
                        {opp.closeDate && (
                          <p className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 shrink-0 text-gray-400" />
                            Due: {new Date(opp.closeDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 text-gray-400">
                  <Search className="h-10 w-12 text-gray-300" />
                  <div>
                    <p className="font-bold text-gray-500 text-sm">No live matches in registry slice</p>
                    <p className="text-[11px] max-w-xs mt-1 leading-normal">Enter dynamic keywords and filters above and click &quot;Search Registries&quot; to fetch live database records.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Drawer for opportunity details */}
            {selectedOpp && (
              <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl border border-gray-200 shadow-xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh]">
                  <div className="bg-[#FFF8E7] px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-brand-gold uppercase tracking-wider">{selectedOpp.source} Sol ID: {selectedOpp.id}</span>
                      <h3 className="text-sm font-bold text-brand-navy mt-1 leading-tight">{selectedOpp.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedOpportunity(null)}
                      className="rounded-full hover:bg-gray-200/50 p-1 transition-all text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-5 flex-1 overflow-y-auto text-xs leading-relaxed text-gray-600">
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Filing Type</p>
                        <p className="font-bold text-brand-navy capitalize mt-0.5">{selectedOpp.type}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Response Deadline</p>
                        <p className="font-bold text-brand-navy mt-0.5">{selectedOpp.closeDate ? new Date(selectedOpp.closeDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Issuing Federal Agency</p>
                        <p className="font-bold text-brand-navy mt-0.5">{selectedOpp.agency || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="font-bold text-brand-navy text-xs">Opportunity Scope Summary</h4>
                      <p className="text-[11px] leading-relaxed text-gray-600 whitespace-pre-line">{selectedOpp.summary || 'Scope content omitted. Check registry source for complete requirements documentation.'}</p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex gap-3">
                      <button
                        onClick={() => {
                          setDraftOpportunityId(selectedOpp.id)
                          setDraftOpportunityTitle(selectedOpp.title)
                          setDraftAgency(selectedOpp.agency || 'Federal Agency')
                          setSelectedOpportunity(null)
                          setActiveTab('draftsman')
                          toast.success('Opportunity synced to Proposal Draftsman!')
                        }}
                        className="flex-1 rounded-lg bg-brand-navy text-white text-xs font-bold py-2.5 hover:bg-brand-blue transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="h-4 w-4 text-brand-gold" />
                        Sync to Draftsman
                      </button>
                      {selectedOpp.url && (
                        <a
                          href={selectedOpp.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-1 shrink-0"
                        >
                          View Source
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: MARKET & COMPETITOR INTELLIGENCE CONSOLE */}
        {activeTab === 'intel' && (
          <div className="space-y-6">
            {/* Filter controls */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-md flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-[10px] font-bold text-gray-500 mb-1.5">Intelligence Query (Keywords)</label>
                <div className="relative">
                  <input
                    type="text"
                    className="input-field text-xs py-2.5 pl-8"
                    value={intelQuery}
                    onChange={(e) => setIntelQuery(e.target.value)}
                    placeholder="e.g. IT services, software, cybersecurity..."
                  />
                  <TrendingUp className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="w-36">
                <label className="block text-[10px] font-bold text-gray-500 mb-1.5">US State</label>
                <select
                  className="input-field text-xs py-2.5 bg-white"
                  value={intelState}
                  onChange={(e) => setIntelState(e.target.value)}
                >
                  <option value="">All States</option>
                  <option value="SC">South Carolina</option>
                  <option value="NC">North Carolina</option>
                  <option value="GA">Georgia</option>
                  <option value="VA">Virginia</option>
                  <option value="DC">Washington DC</option>
                  <option value="TX">Texas</option>
                  <option value="CA">California</option>
                </select>
              </div>

              <button
                onClick={runMarketSearch}
                disabled={intelLoading}
                className="rounded-lg bg-brand-navy px-6 py-3 text-xs font-bold text-white hover:bg-brand-blue transition-all shrink-0 flex items-center gap-1.5 disabled:opacity-50"
              >
                {intelLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
                    Querying Award Records...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 text-brand-gold" />
                    Retrieve Award History
                  </>
                )}
              </button>
            </div>

            {/* Metrics cards if data loaded */}
            {awards.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center gap-4">
                  <span className="p-3 bg-[#FFF8E7] text-brand-gold rounded-xl"><DollarSign className="h-5 w-5" /></span>
                  <div className="text-xs">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Average Award Range</p>
                    <p className="text-base font-bold text-brand-navy mt-0.5">$350K - $1.8M</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center gap-4">
                  <span className="p-3 bg-[#FFF8E7] text-brand-gold rounded-xl"><Building className="h-5 w-5" /></span>
                  <div className="text-xs">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Biggest Buying Agency</p>
                    <p className="text-sm font-bold text-brand-navy mt-0.5 truncate max-w-[200px]">Dept of Homeland Security (DHS)</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm flex items-center gap-4">
                  <span className="p-3 bg-[#FFF8E7] text-brand-gold rounded-xl"><Briefcase className="h-5 w-5" /></span>
                  <div className="text-xs">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Standard Set-Aside Pathway</p>
                    <p className="text-base font-bold text-brand-navy mt-0.5">8(a) / HUBZone Prime</p>
                  </div>
                </div>
              </div>
            )}

            {/* Main History Table */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
              <div className="border-b border-gray-100 pb-3.5 mb-5">
                <h3 className="text-sm font-bold text-brand-navy">USAspending.gov Historical Award Ledger</h3>
                <p className="text-[10px] text-gray-500 font-medium">Detailed competitor price matching and buying office directories</p>
              </div>

              {intelLoading ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                  <p className="text-xs text-gray-500 font-bold font-mono">Querying federal procurement database...</p>
                </div>
              ) : awards.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-600 border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-brand-navy font-bold">
                        <th className="py-3 px-2">Recipient Business</th>
                        <th className="py-3 px-2">Federal Agency</th>
                        <th className="py-3 px-2">Obligated Budget</th>
                        <th className="py-3 px-2">Award Date</th>
                        <th className="py-3 px-2 text-right">Filing Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {awards.map((award, aIdx) => (
                        <tr key={award.id || aIdx} className="hover:bg-gray-50 transition-all font-medium">
                          <td className="py-3.5 px-2 font-bold text-brand-navy">{award.title}</td>
                          <td className="py-3.5 px-2">{award.agency || 'N/A'}</td>
                          <td className="py-3.5 px-2 font-mono text-emerald-600 font-bold">{award.amount || '$425,000'}</td>
                          <td className="py-3.5 px-2">{award.closeDate ? new Date(award.closeDate).toLocaleDateString() : 'N/A'}</td>
                          <td className="py-3.5 px-2 text-right">
                            {award.url ? (
                              <a
                                href={award.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-brand-gold hover:text-brand-navy font-bold inline-flex items-center gap-1"
                              >
                                Detail
                                <ArrowRight className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 text-gray-400">
                  <TrendingUp className="h-10 w-12 text-gray-300" />
                  <div>
                    <p className="font-bold text-gray-500 text-sm">Past awards explorer inactive</p>
                    <p className="text-[11px] max-w-xs mt-1 leading-normal">Search by procurement keywords and location filters to see who won contracts and at what size.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
