export type LeadInput = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  company?: string
  industry?: string
  website?: string
  employees?: string
  annualRevenue?: string
  naics?: string
  samStatus?: string
  certifications?: string
  services?: string
  goals?: string
}

export type LeadRecord = Required<Pick<LeadInput, 'firstName' | 'lastName' | 'email' | 'phone' | 'company' | 'industry' | 'services' | 'goals'>> & {
  id: string
  website: string
  employees: string
  annualRevenue: string
  naics: string
  samStatus: string
  certifications: string
  readinessScore: number
  stage: string
  strengths: string[]
  risks: string[]
  createdAt: string
}

export function validateLead(input: LeadInput) {
  const required: Array<keyof LeadInput> = ['firstName', 'lastName', 'email', 'phone', 'company', 'industry', 'services', 'goals']
  const missing = required.filter((key) => !String(input[key] || '').trim())
  if (missing.length) {
    return `Missing required fields: ${missing.join(', ')}`
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(input.email))) {
    return 'Invalid email address'
  }
  return ''
}

export function scoreLead(input: LeadInput): Pick<LeadRecord, 'readinessScore' | 'strengths' | 'risks' | 'stage'> {
  let score = 25
  const strengths: string[] = []
  const risks: string[] = []

  if (input.samStatus === 'active') {
    score += 20
    strengths.push('SAM.gov appears active according to client self-report.')
  } else if (input.samStatus === 'in-progress') {
    score += 10
    risks.push('SAM.gov registration still needs completion and official verification.')
  } else {
    risks.push('SAM.gov status is unknown, missing, expired, or not started.')
  }

  if (input.naics?.trim()) {
    score += 12
    strengths.push('Client provided NAICS information for initial opportunity matching.')
  } else {
    risks.push('NAICS codes need selection before serious opportunity matching.')
  }

  if (input.certifications?.trim()) {
    score += 12
    strengths.push('Existing certification or certification interest can support set-aside strategy.')
  } else {
    risks.push('Certification fit still needs review for 8(a), HUBZone, WOSB/EDWOSB, and SDVOSB/VOSB paths.')
  }

  if (input.website?.trim()) {
    score += 6
    strengths.push('Business has a web presence that can support credibility review.')
  }

  if (input.goals && input.goals.length > 120) {
    score += 10
    strengths.push('Client gave enough detail to begin a capture roadmap.')
  } else {
    risks.push('Goals need more detail before proposal or capture planning.')
  }

  if (input.services?.toLowerCase().includes('proposal') || input.services?.toLowerCase().includes('bid')) {
    score += 8
    strengths.push('Client is already oriented toward proposal/capture support.')
  }

  if (!input.annualRevenue?.trim()) {
    risks.push('Revenue and financial readiness need confirmation before contract-sizing advice.')
  }

  return {
    readinessScore: Math.min(score, 96),
    strengths,
    risks,
    stage: 'new-intake',
  }
}

export function makeLead(input: LeadInput): LeadRecord {
  const score = scoreLead(input)
  return {
    id: crypto.randomUUID(),
    firstName: String(input.firstName || '').trim(),
    lastName: String(input.lastName || '').trim(),
    email: String(input.email || '').trim().toLowerCase(),
    phone: String(input.phone || '').trim(),
    company: String(input.company || '').trim(),
    industry: String(input.industry || '').trim(),
    website: String(input.website || '').trim(),
    employees: String(input.employees || '').trim(),
    annualRevenue: String(input.annualRevenue || '').trim(),
    naics: String(input.naics || '').trim(),
    samStatus: String(input.samStatus || 'unknown').trim(),
    certifications: String(input.certifications || '').trim(),
    services: String(input.services || '').trim(),
    goals: String(input.goals || '').trim(),
    createdAt: new Date().toISOString(),
    ...score,
  }
}

export const seededLeads: LeadRecord[] = [
  {
    id: 'demo-1',
    firstName: 'Angela',
    lastName: 'Reed',
    email: 'angela@example.com',
    phone: '(555) 010-1240',
    company: 'Reed Facilities Group',
    industry: 'Facilities maintenance',
    website: 'https://example.com',
    employees: '18',
    annualRevenue: '$1.4M',
    naics: '561210, 561720',
    samStatus: 'active',
    certifications: 'WOSB interest',
    services: 'Proposal writing and WOSB certification',
    goals: 'Win a facilities maintenance contract with a military installation in the next 12 months.',
    readinessScore: 83,
    stage: 'readiness-review',
    strengths: ['Active SAM self-report', 'Relevant NAICS codes supplied', 'Clear agency target'],
    risks: ['WOSB control documentation still needs review', 'Past performance proof needs packaging'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    firstName: 'Marcus',
    lastName: 'Hill',
    email: 'marcus@example.com',
    phone: '(555) 010-8821',
    company: 'Hill Cyber Defense LLC',
    industry: 'Cybersecurity',
    website: '',
    employees: '5',
    annualRevenue: '',
    naics: '541519, 541512',
    samStatus: 'in-progress',
    certifications: 'SDVOSB interest',
    services: 'SAM registration, SDVOSB, contract watchlist',
    goals: 'Build first federal pipeline for cybersecurity compliance support.',
    readinessScore: 68,
    stage: 'new-intake',
    strengths: ['Technical service maps to federal demand', 'NAICS codes supplied'],
    risks: ['SAM.gov not complete', 'Revenue and past performance need verification', 'Veteran ownership/control documents required'],
    createdAt: new Date().toISOString(),
  },
]
