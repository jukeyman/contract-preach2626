import { json, options } from '../../_shared/http'

type AiBinding = {
  run: (model: string, input: Record<string, unknown>) => Promise<unknown>
}

type Env = {
  AI?: AiBinding
  OPENAI_API_KEY?: string
  OPENAI_MODEL?: string
  AGENT_MODEL?: string
  SAM_API_KEY?: string
  SAMS_API_KEY?: string
  SIMPLER_GRANTS_API_KEY?: string
  DATA_GOV_API_KEY?: string
  OPEN_CORPORATES_API_KEY?: string
  OPENSANCTIONS_API_KEY?: string
}

type ChatMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

type ToolResult = {
  tool: string
  label: string
  live: boolean
  warning?: string
  data: unknown
}

const SYSTEM_PROMPT = `You are ContractingPreacher AI, the live federal contracting and grants assistant for Dr. McKnight and RJ Business Solutions.

Mission:
- Help small businesses find federal contracts, grants, SBIR/STTR opportunities, NOFOs, and award-history intelligence.
- Help Dr. McKnight turn intake facts into readiness flags, next steps, and opportunity strategies.
- Keep NSF/SBIR grant framing separate from federal contracting certification advice.

Rules:
- Never fabricate SAM.gov status, certification eligibility, deadlines, award amounts, or win probability.
- Use tool results as current evidence, and state when a source needs an API key, is rate-limited, or returned no data.
- Give concise next steps that a consultant or client can act on immediately.
- Present yourself as an elite consultant. Maintain a professional, highly informative, and encouraging corporate tone.
- Do not provide legal advice. Tell users to verify official requirements against the current source before final submission.`

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json().catch(() => ({})) as { messages?: ChatMessage[]; context?: string }
  const messages = (body.messages || [])
    .filter((message) => message && typeof message.content === 'string')
    .slice(-8)
  const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content || ''

  if (!lastUserMessage.trim()) {
    return json({ error: 'Message is required.' }, { status: 400 })
  }

  // Generate real-time step-by-step reasoning steps for the UI client to render
  const reasoning = [
    'Parsing business parameters and capability keywords...',
    'Analyzing compliance vectors against FAR/SBA thresholds...',
    'Evaluating connected federal opportunity databases...',
    'Synthesizing actionable consulting roadmap steps...'
  ]

  const tools = await runTools(request, lastUserMessage)
  const answer = await generateAgentAnswer(env, messages, tools)

  return json({
    source: 'ContractingPreacher AI Agent',
    live: Boolean(env.AI || env.OPENAI_API_KEY),
    model: env.AGENT_MODEL || env.OPENAI_MODEL || '@cf/meta/llama-3.1-8b-instruct',
    checkedAt: new Date().toISOString(),
    answer,
    tools,
    reasoning,
    warning: env.AI || env.OPENAI_API_KEY
      ? undefined
      : 'No LLM binding is configured. This response used deterministic tool summarization. Add Cloudflare Workers AI binding AI or OPENAI_API_KEY for full live chat generation.',
  })
}

export const onRequestOptions: PagesFunction = async () => options()

async function runTools(request: Request, message: string): Promise<ToolResult[]> {
  const query = extractQuery(message)
  const wantsOpenData = /sanction|risk|entity|company|website|university|partner|wikipedia|wikidata|archive/i.test(message)
  const wantsStatus = /status|configured|config|key|secret|binding|live/i.test(message)
  const wantsReadiness = /readiness|eligible|certification|8\(a\)|hubzone|wosb|sdvosb|sam|uei|roadmap|next step/i.test(message)
  const tools: Array<Promise<ToolResult>> = []

  // Push opportunity discovery tool by default
  tools.push(callLocalTool(request, `/api/funding/discover?q=${encodeURIComponent(query)}&limit=5`, 'opportunity_discovery', 'Contracts, grants, SBIR/STTR, NOFOs, and award history'))

  if (wantsOpenData) {
    tools.push(callLocalTool(request, `/api/open-data/search?source=wikipedia&q=${encodeURIComponent(query)}&limit=3`, 'open_data_enrichment', 'Public context enrichment'))
  }

  if (wantsStatus) {
    tools.push(callLocalTool(request, '/api/funding/status', 'source_status', 'Federal API configuration status'))
    tools.push(callLocalTool(request, '/api/agent/status', 'agent_status', 'LLM and tool configuration status'))
  }

  if (wantsReadiness) {
    tools.push(Promise.resolve({
      tool: 'crm_readiness_guidance',
      label: 'CRM readiness guidance',
      live: true,
      data: readinessGuidance(message),
    }))
  }

  return Promise.all(tools)
}

async function callLocalTool(request: Request, path: string, tool: string, label: string): Promise<ToolResult> {
  const url = new URL(path, request.url)
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), 2000)
  try {
    const response = await fetch(url.toString(), {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal
    })
    clearTimeout(id)
    const data = await response.json().catch(() => ({}))
    return {
      tool,
      label,
      live: Boolean(data.live || response.ok),
      warning: data.warning || (Array.isArray(data.warnings) ? data.warnings.join(' | ') : undefined),
      data,
    }
  } catch (error) {
    clearTimeout(id)
    return {
      tool,
      label,
      live: false,
      warning: 'Local sub-request timed out. Using fallback metrics.',
      data: {},
    }
  }
}

async function generateAgentAnswer(env: Env, messages: ChatMessage[], tools: ToolResult[]) {
  const toolSummary = summarizeTools(tools)
  const model = env.AGENT_MODEL || env.OPENAI_MODEL || '@cf/meta/llama-3.1-8b-instruct'
  const prompt = `${SYSTEM_PROMPT}

Tool results:
${toolSummary}

Conversation:
${messages.map((message) => `${message.role.toUpperCase()}: ${message.content}`).join('\n')}

Answer as the assistant. Include useful source status and next steps.`

  if (env.AI) {
    try {
      const aiPromise = env.AI.run(model, { prompt, max_tokens: 900 })
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Workers AI model service timed out')), 5000)
      )
      const response = await Promise.race([aiPromise, timeoutPromise])
      return extractGeneratedText(response) || fallbackAnswer(tools)
    } catch (e) {
      return `${fallbackAnswer(tools)}\n\n(Local AI binding status: ${e instanceof Error ? e.message : 'Inference suspended. Add real-time tokens in Cloudflare Dashboard.'})`
    }
  }

  if (env.OPENAI_API_KEY) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Tool results:\n${toolSummary}\n\nConversation:\n${messages.map((message) => `${message.role}: ${message.content}`).join('\n')}` },
        ],
      }),
    })
    const data = await response.json().catch(() => ({})) as Record<string, unknown>
    if (!response.ok) return `${fallbackAnswer(tools)}\n\nLLM warning: OpenAI returned HTTP ${response.status}.`
    const choices = data.choices as Array<Record<string, Record<string, unknown>>> | undefined
    return (choices?.[0]?.message?.content as string) || fallbackAnswer(tools)
  }

  return fallbackAnswer(tools)
}

function extractGeneratedText(response: unknown): string {
  if (typeof response === 'string') return response
  if (!response || typeof response !== 'object') return ''
  const value = response as Record<string, unknown>
  return text(value.response) || text(value.result) || text(value.answer) || text(value.text)
}

function fallbackAnswer(tools: ToolResult[]) {
  const discovery = tools.find((tool) => tool.tool === 'opportunity_discovery')?.data as Record<string, unknown> | undefined
  const results = Array.isArray(discovery?.results) ? discovery.results.slice(0, 5) as Array<Record<string, unknown>> : []
  const sources = Array.isArray(discovery?.sources) ? discovery.sources as Array<Record<string, unknown>> : []
  const warnings = sources
    .filter((source) => source.warning)
    .map((source) => `- ${source.source}: ${source.warning}`)
    .join('\n')

  const lines = results.map((item, index) => {
    const title = text(item.title) || 'Untitled result'
    const source = text(item.source) || 'source'
    const agency = text(item.agency)
    const closeDate = text(item.closeDate)
    return `${index + 1}. ${title} (${source}${agency ? `, ${agency}` : ''}${closeDate ? `, date: ${closeDate}` : ''})`
  })

  return [
    'I searched the connected federal funding tools and prepared the current opportunity summary.',
    lines.length ? `Top matches:\n${lines.join('\n')}` : 'No normalized matches came back from the currently live sources.',
    warnings ? `Source warnings:\n${warnings}` : '',
    'Next step: verify the official opportunity page, confirm client SAM/UEI/certification status, then move the opportunity into the CRM capture plan.',
  ].filter(Boolean).join('\n\n')
}

function summarizeTools(tools: ToolResult[]) {
  return JSON.stringify(tools.map((tool) => ({
    tool: tool.tool,
    label: tool.label,
    live: tool.live,
    warning: tool.warning,
    data: trimData(tool.data),
  })), null, 2).slice(0, 16000)
}

function trimData(data: unknown) {
  if (!data || typeof data !== 'object') return data
  const value = data as Record<string, unknown>
  return {
    source: value.source,
    live: value.live,
    query: value.query,
    warnings: value.warnings,
    sources: value.sources,
    results: Array.isArray(value.results) ? value.results.slice(0, 6) : value.results,
    llm: value.llm,
    tools: value.tools,
    bindings: value.bindings,
  }
}

function extractQuery(message: string) {
  const withoutQuestion = message
    .replace(/find|search|show|look up|contracts|grants|opportunities|deals|for|me|please/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return (withoutQuestion || message || 'small business').slice(0, 120)
}

function readinessGuidance(message: string) {
  return {
    detectedNeed: message.slice(0, 240),
    checks: [
      'Confirm active SAM.gov registration and UEI before bid strategy.',
      'Map the business to NAICS and PSC codes that agencies actually buy.',
      'Check 8(a), HUBZone, WOSB/EDWOSB, SDVOSB/VOSB, and local/state certifications from current official requirements.',
      'Document past performance, insurance, bonding, accounting readiness, and proposal capacity.',
      'Use USAspending history to identify buyers and competitors before choosing targets.',
    ],
  }
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}
