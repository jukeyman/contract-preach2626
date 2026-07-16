'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  AlertCircle, 
  Bot, 
  CheckCircle2, 
  Loader2, 
  LogIn, 
  Briefcase, 
  Settings, 
  PhoneCall, 
  GraduationCap, 
  FileCode, 
  LineChart, 
  Download, 
  X, 
  Eye, 
  FileText,
  FileDown
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { PORTAL_MODULES } from '@/lib/fedfunding'
import { CORPORATE_DOCUMENTS, CorporateDoc } from '@/lib/corporateDocs'

type PortalData = {
  client: {
    name: string;
    company: string;
    readinessScore: number;
    stage: string;
  };
  roadmap: string[];
  watchlist: string[];
  documents: string[];
  deadlines: string[];
}

const iconMap: Record<string, any> = {
  Briefcase: Briefcase,
  Settings: Settings,
  PhoneCall: PhoneCall,
  GraduationCap: GraduationCap,
  FileCode: FileCode,
  LineChart: LineChart,
}

export default function PortalPage() {
  const [email, setEmail] = useState('')
  const [accessCode, setAccessCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [portal, setPortal] = useState<PortalData | null>(null)
  const [selectedDoc, setSelectedDoc] = useState<CorporateDoc | null>(null)

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

  const handleExportDocPDF = (doc: CorporateDoc) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocker is preventing document export. Please allow pop-ups for this site.');
      return;
    }

    // Convert markdown headings and lists to basic HTML
    let htmlContent = doc.content
      .replace(/^# (.*)$/gm, '<h1 class="pdf-h1">$1</h1>')
      .replace(/^## (.*)$/gm, '<h2 class="pdf-h2">$1</h2>')
      .replace(/^### (.*)$/gm, '<h3 class="pdf-h3">$1</h3>')
      .replace(/^\*\*([^*]+)\*\*/gm, '<strong>$1</strong>')
      .replace(/^\* (.*)$/gm, '<li>$1</li>')
      .replace(/\|/g, '') // strip pipe characters from tables
      .replace(/\n\n/g, '<br/>')
      .replace(/\n/g, '<br/>');

    printWindow.document.write(`
      <html>
        <head>
          <title>${doc.title}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            @page {
              size: letter;
              margin: 1.2in 1in 1.2in 1in;
            }
            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              color: #0F172A;
              line-height: 1.6;
              font-size: 11pt;
            }
            .header-container {
              border-bottom: 2px solid #856404;
              padding-bottom: 12px;
              margin-bottom: 24px;
            }
            .brand-pretitle {
              font-family: 'Outfit', sans-serif;
              font-size: 8pt;
              text-transform: uppercase;
              letter-spacing: 0.15em;
              color: #856404;
              font-weight: 700;
              margin: 0;
            }
            .brand-title {
              font-family: 'Outfit', sans-serif;
              font-size: 18pt;
              font-weight: 800;
              color: #0A1128;
              margin: 2px 0 0 0;
              letter-spacing: -0.02em;
            }
            .brand-slogan {
              font-size: 8.5pt;
              font-style: italic;
              color: #475569;
              margin: 2px 0 0 0;
            }
            .meta-line {
              display: flex;
              justify-content: space-between;
              font-size: 7.5pt;
              color: #64748B;
              font-family: 'Outfit', sans-serif;
              font-weight: 600;
              margin-top: 8px;
              text-transform: uppercase;
            }
            .doc-container {
              margin-top: 10px;
            }
            .pdf-h1 {
              font-family: 'Outfit', sans-serif;
              color: #0A1128;
              font-size: 16pt;
              font-weight: 800;
              margin-top: 0;
              margin-bottom: 16px;
              border-bottom: 1px solid #E2E8F0;
              padding-bottom: 6px;
            }
            .pdf-h2 {
              font-family: 'Outfit', sans-serif;
              color: #0A1128;
              font-size: 12pt;
              font-weight: 700;
              margin-top: 22px;
              margin-bottom: 10px;
              text-transform: uppercase;
              letter-spacing: 0.03em;
            }
            .pdf-h3 {
              font-family: 'Outfit', sans-serif;
              color: #856404;
              font-size: 10.5pt;
              font-weight: 700;
              margin-top: 16px;
              margin-bottom: 6px;
            }
            p {
              margin-top: 0;
              margin-bottom: 12px;
              text-align: justify;
            }
            li {
              margin-bottom: 6px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 16px 0;
              font-size: 9.5pt;
            }
            th, td {
              border: 1px solid #E2E8F0;
              padding: 8px 10px;
              text-align: left;
            }
            th {
              background-color: #FFF8E7;
              color: #0A1128;
              font-family: 'Outfit', sans-serif;
              font-weight: 700;
            }
            .footer-container {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              border-top: 1px solid #E2E8F0;
              padding-top: 10px;
              text-align: center;
              font-size: 7.5pt;
              color: #64748B;
              line-height: 1.4;
            }
          </style>
        </head>
        <body>
          <div class="header-container">
            <p class="brand-pretitle">RJ Business Solutions · Division Strategy</p>
            <h1 class="brand-title">THE CONTRACTING PREACHER</h1>
            <p class="brand-slogan">"Empowering Businesses, Restoring Futures. Integrity and Excellence in Action."</p>
            <div class="meta-line">
              <span>Security Classification: CONFIDENTIAL / INTERNAL USE ONLY</span>
              <span>Published: July 2026</span>
            </div>
          </div>
          
          <div class="doc-container">
            ${htmlContent}
          </div>

          <div class="footer-container">
            <strong>CONFIDENTIALITY NOTICE & DISCLAIMER:</strong> This strategic document is the sole intellectual property of RJ Business Solutions and is intended for internal operations of The Contracting Preacher division. Redistribution, reproduction, or unauthorized sharing without prior written consent from the executive office is strictly prohibited. Information contained herein represents strategic planning guidelines.
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.close();
              }, 400);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-brand-offWhite pb-16">
      <section className="bg-brand-navy py-14 text-white">
        <div className="container-custom">
          <p className="font-accent text-sm font-bold uppercase tracking-widest text-brand-lightGold">
            Client Portal
          </p>
          <h1 className="mt-3 max-w-4xl text-3xl font-bold md:text-5xl md:leading-tight">
            Your contracting roadmap, documents, deadlines, and opportunity watchlist.
          </h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-gray-200">
            Review your federal contracting plan, track required documents, watch matching
            opportunities, and see the next steps your business should complete.
          </p>
        </div>
      </section>

      <section className="container-custom grid gap-8 py-12 lg:grid-cols-[380px_1fr]">
        <div className="space-y-6">
          <form onSubmit={login} className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="font-accent text-2xl font-bold text-brand-navy">Portal Login</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
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

          {/* Local / Offline Access Alert */}
          <div className="rounded-xl border border-brand-gold/20 bg-[#FFF8E7]/40 p-5">
            <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider">📁 Local Document Access</h3>
            <p className="text-[11px] text-gray-600 mt-2 leading-relaxed">
              All 6 master federal business documents are fully exported inside your local directory at:
            </p>
            <code className="block p-2 bg-brand-navy text-[10px] text-brand-gold rounded-lg mt-2 font-mono whitespace-pre-wrap select-all break-all">
              /docs/
            </code>
            <p className="text-[10px] text-gray-400 mt-2">
              Including Business Plan, SOP Operations, Outreach Sales Scripts, Training Curriculum, Exit Strategy and Technical Blueprint.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {portal ? (
            <>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="font-accent text-xs font-bold uppercase tracking-widest text-brand-gold">
                      {portal.client.stage.replace(/-/g, ' ')}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-brand-navy">{portal.client.company}</h2>
                    <p className="mt-1 text-sm text-gray-600">{portal.client.name}</p>
                  </div>
                  <div className="rounded-xl bg-brand-navy p-4 px-6 text-center text-white border border-brand-gold/20">
                    <div className="text-3xl font-bold text-brand-gold">{portal.client.readinessScore}%</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">readiness</div>
                  </div>
                </div>
              </div>
              <PortalPanel title="12-Month Roadmap" items={portal.roadmap} />
              <PortalPanel title="Opportunity Watchlist" items={portal.watchlist} />
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <Bot className="h-8 w-8 text-brand-gold" />
                <h2 className="mt-4 font-accent text-2xl font-bold text-brand-navy">AI Contracting Assistant</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Ask the live agent to explain matches, prepare next steps, and search connected federal data tools.
                </p>
                <Link href="/agent" className="btn-navy mt-5 inline-flex items-center">
                  Open AI Agent Workspace
                </Link>
              </section>
              <PortalPanel title="Document Checklist" items={portal.documents} />
              <PortalPanel title="Deadline Alerts" items={portal.deadlines} />
            </>
          ) : (
            <>
              {/* Executive Strategy & Blueprint Library */}
              <div id="corporate-documents" className="rounded-xl border border-brand-gold/20 bg-white p-6 shadow-md border-t-4 border-t-brand-gold scroll-mt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-[#FFF8E7] border border-brand-gold/20 rounded-full px-2.5 py-0.5 text-[9px] font-bold text-brand-navy uppercase tracking-wider font-accent">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      RJ Business Solutions Confidential
                    </div>
                    <h2 className="text-xl font-bold text-brand-navy mt-2">Executive Strategy, Operations & SOP Library</h2>
                    <p className="text-xs text-gray-500 mt-1">Official operational roadmaps, high-ticket sales objection manuals, staff training matrices, and exit models.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {CORPORATE_DOCUMENTS.map((doc) => {
                    const IconComponent = iconMap[doc.icon] || FileText;
                    return (
                      <div 
                        key={doc.id}
                        className="p-5 rounded-lg border border-gray-100 bg-[#FFF8E7]/5 hover:border-brand-gold/30 hover:bg-[#FFF8E7]/20 transition-all cursor-pointer group flex flex-col justify-between"
                        onClick={() => setSelectedDoc(doc)}
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/5 px-2 py-0.5 rounded-full">{doc.category}</span>
                              <h3 className="text-sm font-bold text-brand-navy mt-1 group-hover:text-brand-gold transition-colors">{doc.title}</h3>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed mb-4">{doc.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100/50">
                          <span className="text-[10px] font-bold text-brand-gold flex items-center gap-1">
                            <Eye className="h-3 w-3" /> Read Document
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExportDocPDF(doc);
                            }}
                            className="text-[10px] font-bold bg-brand-navy text-white hover:bg-emerald-600 px-3 py-1 rounded transition-all flex items-center gap-1.5"
                          >
                            <Download className="h-3 w-3" /> Export PDF
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {PORTAL_MODULES.map((module) => {
                  const Icon = module.icon
                  return (
                    <article key={module.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <Icon className="h-8 w-8 text-brand-gold" />
                      <h2 className="mt-4 font-accent text-xl font-bold text-brand-navy">{module.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">{module.description}</p>
                    </article>
                  )
                })}
              </div>

              <div className="rounded-xl bg-brand-navy p-6 text-white border border-brand-gold/10 shadow-md">
                <h2 className="font-accent text-2xl font-bold">Your next step</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">
                  Complete the intake, gather your business documents, and use the assistant to
                  understand which opportunities are worth reviewing with The Contracting Preacher team.
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Corporate Document Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#FFF8E7] border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-navy text-brand-gold flex items-center justify-center">
                  {(() => {
                    const IconComponent = iconMap[selectedDoc.icon] || FileText;
                    return <IconComponent className="h-5 w-5" />;
                  })()}
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/15 px-2.5 py-0.5 rounded-full">{selectedDoc.category}</span>
                  <h2 className="text-base font-bold text-brand-navy mt-1">{selectedDoc.title}</h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportDocPDF(selectedDoc)}
                  className="rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <FileDown className="h-3.5 w-3.5" />
                  Export to Premium PDF
                </button>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 font-mono text-xs text-gray-700 leading-relaxed bg-[#F5F3EF]/10 whitespace-pre-wrap border-b border-gray-100">
              <div className="max-w-3xl mx-auto py-4 bg-white border border-gray-200/60 shadow-inner rounded-xl p-8 md:p-12 font-sans text-sm text-gray-800 leading-relaxed">
                {/* Visual Cover Sheet header inside the previewer */}
                <div className="border-b-2 border-brand-gold pb-6 mb-8 text-center md:text-left">
                  <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-accent">RJ Business Solutions · Internal Division Strategy</p>
                  <h1 className="text-2xl font-bold text-brand-navy mt-1">THE CONTRACTING PREACHER</h1>
                  <p className="text-xs italic text-gray-500 mt-1">"Empowering Businesses, Restoring Futures. Integrity and Excellence in Action."</p>
                </div>
                
                {/* Styled Markdown View */}
                <div className="prose max-w-none space-y-6">
                  {selectedDoc.content.split('\n\n').map((para, i) => {
                    if (para.startsWith('# ')) {
                      return <h1 key={i} className="text-xl font-bold text-brand-navy pb-2 border-b border-gray-100 font-heading mt-6 first:mt-0">{para.replace('# ', '')}</h1>;
                    }
                    if (para.startsWith('## ')) {
                      return <h2 key={i} className="text-base font-bold text-brand-navy uppercase tracking-wider font-accent mt-6">{para.replace('## ', '')}</h2>;
                    }
                    if (para.startsWith('### ')) {
                      return <h3 key={i} className="text-sm font-bold text-brand-gold font-accent mt-4">{para.replace('### ', '')}</h3>;
                    }
                    if (para.startsWith('* ') || para.startsWith('- ')) {
                      return (
                        <ul key={i} className="list-disc pl-5 space-y-2 mt-2">
                          {para.split('\n').map((li, liIdx) => (
                            <li key={liIdx} className="text-gray-600 leading-relaxed text-xs">
                              {li.replace(/^[\s*-]+/, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ')) {
                      return (
                        <ol key={i} className="list-decimal pl-5 space-y-2 mt-2">
                          {para.split('\n').map((li, liIdx) => (
                            <li key={liIdx} className="text-gray-600 leading-relaxed text-xs">
                              {li.replace(/^\d+\.\s+/, '')}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    if (para.includes('|')) {
                      // parse tables
                      const rows = para.split('\n').filter(r => r.trim() && !r.includes(':---'));
                      return (
                        <div key={i} className="overflow-x-auto my-4">
                          <table className="w-full border-collapse border border-gray-100 text-xs">
                            <thead>
                              <tr className="bg-[#FFF8E7] text-brand-navy">
                                {rows[0].split('|').map((col, cIdx) => col.trim() && <th key={cIdx} className="border border-gray-100 px-3 py-2 text-left font-bold">{col.trim()}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {rows.slice(1).map((row, rIdx) => (
                                <tr key={rIdx} className="odd:bg-gray-50/50">
                                  {row.split('|').map((col, cIdx) => col.trim() && <td key={cIdx} className="border border-gray-100 px-3 py-2 text-gray-600">{col.trim()}</td>)}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                    }
                    return <p key={i} className="text-gray-600 leading-relaxed text-xs text-justify whitespace-pre-wrap">{para}</p>;
                  })}
                </div>

                {/* Footer disclaimer inside the previewer */}
                <div className="border-t border-gray-200 pt-6 mt-12 text-[10px] text-gray-400 text-center leading-relaxed">
                  <strong>CONFIDENTIALITY NOTICE & DISCLAIMER:</strong> This strategic document is the sole intellectual property of RJ Business Solutions and is intended for internal operations of The Contracting Preacher division. Redistribution or reproduction without prior written consent from the executive office is strictly prohibited.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PortalPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="font-accent text-2xl font-bold text-brand-navy">{title}</h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-xl bg-brand-offWhite p-3 text-sm text-gray-700">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
