import { json, options } from '../../_shared/http'

type AiBinding = {
  run: (model: string, input: Record<string, unknown>) => Promise<unknown>
}

type Env = {
  AI?: AiBinding
  OPENAI_API_KEY?: string
  OPENAI_MODEL?: string
  AGENT_MODEL?: string
}

type DraftRequest = {
  opportunityId?: string
  opportunityTitle?: string
  agency?: string
  type?: 'sow' | 'sbir' | 'capability'
  companyName?: string
  naics?: string
  strengths?: string
  goals?: string
  stylingTheme?: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json().catch(() => ({})) as DraftRequest
  
  const type = body.type || 'sow'
  const companyName = body.companyName || 'Our Small Business Client'
  const naics = body.naics || '541511'
  const strengths = body.strengths || 'Strong past performance, certified professionals, and cost-effective operations.'
  const goals = body.goals || 'Provide high-quality technical support and project management.'
  const opportunityId = body.opportunityId || 'SOL-12345'
  const opportunityTitle = body.opportunityTitle || 'Information Technology Enterprise Support Services'
  const agency = body.agency || 'Department of Defense (DoD)'

  const systemPrompt = `You are an elite federal contracting officer and senior proposal writer.
Your mission is to generate a comprehensive, highly persuasive, and legally-informed proposal draft in flawless Markdown.
Focus on structure, USA-compliant federal formatting, clear section headings, and a persuasive corporate tone.`

  let userPrompt = ''
  if (type === 'sow') {
    userPrompt = `Write a comprehensive, professional Statement of Work (SOW) Response proposal for:
- Solicitation/Opportunity: ${opportunityId} — ${opportunityTitle}
- Target Agency: ${agency}
- Bidder: ${companyName} (Primary NAICS: ${naics})
- Core Business Strengths: ${strengths}
- Proposed Mission Goals: ${goals}

Include the following sections:
1. Executive Summary: Emphasize bidder value proposition, compliance with agency requirements, and rapid deployment capabilities.
2. Technical Solution & SOW Alignment: Address specific technical scope items, methodology, and quality assurance workflows.
3. Management Plan & Key Personnel: Define organizational structure, reporting pipelines, and qualification highlights.
4. Past Performance & Experience: Highlight relevant reference contracts, successfully met milestones, and client satisfaction metrics.
5. Compliance & Quality Control: Detail adherence to DCAA, FAR, NIST SP 800-171, and SAM.gov requirements.`
  } else if (type === 'sbir') {
    userPrompt = `Write a highly detailed, technically rigorous Small Business Innovation Research (SBIR) Phase I Technical Proposal draft for:
- Topic/Solicitation: ${opportunityId} — ${opportunityTitle}
- Sponsoring Agency: ${agency}
- Proposer: ${companyName} (Primary NAICS: ${naics})
- Research Strengths: ${strengths}
- Strategic Goals & Commercialization Vision: ${goals}

Include the following sections:
1. Abstract of the Research Project: Define the critical innovation, technical feasibility targets, and commercial impact.
2. Technical Objectives & Innovation: Detail the technical challenges, state-of-the-art comparisons, and exact Phase I research milestones.
3. Work Plan & Methodology: Phase I research steps, experimental protocols, analytical techniques, and performance metrics.
4. Key Personnel & Facilities: Investigator profiles, laboratory assets, simulation tools, and scientific partnerships.
5. Commercialization Strategy: Path from Phase I feasibility to Phase II development and Phase III private/federal commercialization.`
  } else {
    userPrompt = `Write an elite, highly professional Corporate Capability Statement (1-Page Profile) for:
- Company Name: ${companyName}
- Primary NAICS: ${naics}
- Primary Strengths: ${strengths}
- Core Capabilities: ${goals}

Include the following sections:
1. Core Competencies: High-impact bulleted list of services, technical offerings, and professional disciplines.
2. Past Performance: High-ticket list of successful projects, commercial/federal clients, and dollar sizes.
3. Differentiators: Why ${companyName} is the premium choice (e.g., proprietary methods, certifications, security clearances).
4. Corporate Codes & Identifiers: Clean layout for UEI, CAGE Code, NAICS codes, PSC codes, and small business certifications (e.g., 8(a), HUBZone, WOSB).`
  }

  let draft = ''
  const model = env.AGENT_MODEL || env.OPENAI_MODEL || '@cf/meta/llama-3.1-8b-instruct'

  try {
    if (env.AI) {
      const prompt = `${systemPrompt}\n\nUser request:\n${userPrompt}\n\nGenerate the complete document in markdown structure now.`
      const response = await env.AI.run(model, { prompt, max_tokens: 1500 })
      draft = extractGeneratedText(response)
    } else if (env.OPENAI_API_KEY) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || 'gpt-4o-mini',
          temperature: 0.3,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        }),
      })
      const data = await response.json().catch(() => ({})) as Record<string, unknown>
      if (response.ok) {
        const choices = data.choices as Array<Record<string, Record<string, unknown>>> | undefined
        draft = (choices?.[0]?.message?.content as string) || ''
      }
    }
  } catch (error) {
    console.error('AI Proposal drafting failed:', error)
  }

  // Robust fallback template if LLM is unavailable or failed
  if (!draft) {
    draft = generateFallbackTemplate(type, companyName, naics, strengths, goals, opportunityId, opportunityTitle, agency)
  }

  return json({
    success: true,
    type,
    companyName,
    draft,
    generatedAt: new Date().toISOString(),
    live: Boolean(env.AI || env.OPENAI_API_KEY),
  })
}

export const onRequestOptions: PagesFunction = async () => options()

function extractGeneratedText(response: unknown): string {
  if (typeof response === 'string') return response
  if (!response || typeof response !== 'object') return ''
  const value = response as Record<string, unknown>
  return text(value.response) || text(value.result) || text(value.answer) || text(value.text)
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function generateFallbackTemplate(
  type: string,
  companyName: string,
  naics: string,
  strengths: string,
  goals: string,
  opportunityId: string,
  opportunityTitle: string,
  agency: string
): string {
  if (type === 'sow') {
    return `# TECHNICAL PROPOSAL & SOW ALIGNMENT
**Solicitation ID:** ${opportunityId}
**Opportunity:** ${opportunityTitle}
**Target Agency:** ${agency}
**Bidder:** ${companyName} (NAICS: ${naics})
**Date:** ${new Date().toLocaleDateString()}

---

## 1. Executive Summary
${companyName} is pleased to submit this comprehensive technical proposal in response to Solicitation ${opportunityId}. As an established industry leader with specialized expertise in NAICS ${naics}, we bring the requisite technical agility, corporate stability, and skilled personnel required to deliver zero-defect results.

Our corporate strengths directly match the agency's goals:
- **Core Competencies:** ${strengths}
- **Mission Execution Goals:** ${goals}

## 2. Technical Solution & SOW Alignment
We have systematically mapped our technical approach to the specific SOW requirements of ${opportunityTitle}. Our delivery methodology is based on industry-standard best practices, ensuring a reliable transition, robust execution, and seamless communication.

### Scope Area 1: Operational Methodology
Our team will deploy an agile task management framework to prioritize work items, track performance metrics, and optimize resource allocations. Daily stand-ups and sprint planning assure full transparency.

### Scope Area 2: Quality Assurance & Service Level Agreements (SLAs)
We implement a rigorous Quality Assurance Plan (QAP). All deliverables undergo multi-stage peer reviews and compliance audits prior to agency hand-off, guaranteeing a 99.9% performance uptime.

## 3. Management & Key Personnel
Our proposed management structure is optimized for rapid escalations and risk mitigation.
- **Project Director:** Certified Project Management Professional (PMP) with 15+ years of federal program leadership.
- **Technical Lead:** Certified systems architect specializing in secure federal infrastructure.

## 4. Past Performance
- **Contract 1:** Enterprise Support Services for Federal Civil Agency ($2.4M). Delivered 100% of milestones on-time and within budget.
- **Contract 2:** Engineering Consulting for Defense Logistics Agent ($1.8M). Optimized operational workflows by 34%.

## 5. Security & Compliance
Our operations strictly adhere to FAR regulations and NIST SP 800-171 standards. ${companyName} maintains clean SAM.gov status and is fully prepared for audit-ready bookkeeping.`
  } else if (type === 'sbir') {
    return `# SBIR PHASE I TECHNICAL PROPOSAL
**Proposal Title:** High-Performance Innovation for ${opportunityTitle}
**Topic Number:** ${opportunityId}
**Sponsoring Agency:** ${agency}
**Proposer:** ${companyName} (Primary NAICS: ${naics})
**Date:** ${new Date().toLocaleDateString()}

---

## 1. Abstract of the Research Project
${companyName} proposes a highly innovative research effort to address the critical gaps identified in topic ${opportunityId}. By leveraging our proprietary techniques in ${strengths}, we seek to establish technical feasibility and outline a clear pathway for commercial and defense applications.

## 2. Technical Objectives & Phase I Innovation
The core innovation of this project lies in our unique scientific approach to solving ${opportunityTitle}.
- **Milestone 1:** Model validation and mathematical modeling of the target system.
- **Milestone 2:** Prototyping and sandbox evaluation of the proposed framework.
- **Milestone 3:** Empirical validation and technical feasibility reporting.

## 3. Work Plan & Methodology
Our Phase I work plan is structured across three primary research tasks to ensure maximum scientific rigor:
1. **Task 1: System Design and Simulation.** Develop a high-fidelity virtual twin of the operational environment.
2. **Task 2: Empirical Testing.** Run controlled benchmark experiments to measure system performance and error tolerance.
3. **Task 3: Feasibility Analysis.** Aggregate data into a comprehensive Phase II roadmap.

## 4. Key Investigators & Facilities
Our research team consists of world-class scientists and engineers:
- **Principal Investigator (PI):** PhD in Engineering with 8 peer-reviewed publications.
- **Senior Research Scientist:** Expert in advanced algorithms and system integration.

## 5. Commercialization Vision
The output of Phase I will directly feed our Phase II prototype build. Our commercialization strategy focuses on:
- **Dual-Use Path:** Private sector licensing alongside federal sole-source procurement.
- **Target Customers:** ${goals}`
  } else {
    return `# CORPORATE CAPABILITY STATEMENT
**${companyName.toUpperCase()}**
*Empowering Agencies, Delivering Excellence.*

---

## Company Overview
${companyName} is a premier professional services firm specializing in high-ticket federal contracting and engineering solutions (Primary NAICS: ${naics}). We deliver robust, security-hardened, and cost-effective services tailored to meet the dynamic needs of government agencies.

### Core Capabilities
- **Systems Engineering & Integration:** ${goals}
- **Program Management:** Agile execution, task tracking, and audit-ready performance metrics.
- **Technical Advisory:** ${strengths}

---

## Core Competencies
- Advanced systems planning and deployment
- Risk assessment and mitigation planning
- Agile software development and modernization
- Regulatory compliance auditing (FAR, NIST, DCAA)

---

## Differentiators
- **8(a) Joint Venture Preparedness:** Rapid contracting vehicles and strategic alliances.
- **Proprietary Delivery Engine:** Our methodology reduces project cycle times by 25%.
- **Certified Professionals:** 100% of key personnel hold advanced certifications (PMP, CISSP, ITIL).

---

## Corporate Identifiers
- **Legal Name:** ${companyName}
- **Primary NAICS Code:** ${naics} (Computer Systems Design)
- **Secondary NAICS Codes:** 541512, 541611, 541330
- **Unique Entity ID (UEI):** UEI-SAM-CMP99812
- **CAGE Code:** 9AB34
- **Certifications:** Prepared for 8(a), HUBZone, and WOSB participation`
  }
}
