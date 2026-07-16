import type { LucideIcon } from 'lucide-react'
import {
  Award,
  Bell,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Database,
  FileCheck2,
  FileSearch,
  Gavel,
  Globe2,
  Landmark,
  LineChart,
  LockKeyhole,
  MailCheck,
  MapPinned,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'

export type FundingSource = {
  id: string
  name: string
  category: 'contracts' | 'grants' | 'spending' | 'sbir' | 'regulatory' | 'reference'
  baseUrl: string
  auth: string
  useCase: string
  cacheTtl: string
  sourceUrl: string
  status: 'wired' | 'ready' | 'reference'
}

export type CrmPipelineStage = {
  id: string
  label: string
  description: string
  ownerAction: string
}

export type ReadinessDimension = {
  label: string
  weight: number
  checks: string[]
}

export type GithubResource = {
  repo: string
  tier: 'official' | 'client' | 'ai-native' | 'curator' | 'research'
  use: string
  url: string
}

export type PortalModule = {
  title: string
  description: string
  icon: LucideIcon
}

export type OpenDataSource = {
  id: string
  name: string
  missionFit: 'core' | 'useful' | 'reference'
  auth: 'none' | 'apiKey' | 'OAuth'
  category: 'entity-risk' | 'location' | 'market' | 'research' | 'website-evidence' | 'reference'
  useCase: string
  sourceUrl: string
  route?: string
  status: 'wired' | 'ready' | 'reference'
}

export const FEDERAL_FUNDING_SOURCES: FundingSource[] = [
  {
    id: 'sam-opportunities',
    name: 'SAM.gov Contract Opportunities',
    category: 'contracts',
    baseUrl: 'https://api.sam.gov/opportunities/v2/search',
    auth: 'SAM_API_KEY or SAMS_API_KEY server secret',
    useCase: 'RFPs, RFQs, sources sought notices, awards, agency opportunity tracking, and capture pipeline alerts.',
    cacheTtl: '24 hours',
    sourceUrl: 'https://open.gsa.gov/api/get-opportunities-public-api/',
    status: 'wired',
  },
  {
    id: 'usaspending',
    name: 'USAspending.gov API v2',
    category: 'spending',
    baseUrl: 'https://api.usaspending.gov/api/v2/',
    auth: 'No API key required',
    useCase: 'Award history, competitor intelligence, agency buying patterns, recipient lookup, and market sizing.',
    cacheTtl: '7 days for historical queries',
    sourceUrl: 'https://api.usaspending.gov/docs/endpoints',
    status: 'wired',
  },
  {
    id: 'simpler-grants',
    name: 'Simpler.Grants.gov',
    category: 'grants',
    baseUrl: 'https://api.simpler.grants.gov/v1/opportunities/search',
    auth: 'SIMPLER_GRANTS_API_KEY server secret',
    useCase: 'Modern federal grant opportunity search with structured opportunity details and future grants.gov alignment.',
    cacheTtl: '6 hours',
    sourceUrl: 'https://wiki.simpler.grants.gov/product/api',
    status: 'wired',
  },
  {
    id: 'legacy-grants',
    name: 'Legacy Grants.gov Search2',
    category: 'grants',
    baseUrl: 'https://api.grants.gov/v1/api/search2',
    auth: 'Open search endpoint',
    useCase: 'Fallback grants opportunity search when the Simpler Grants key is not configured.',
    cacheTtl: '6 hours',
    sourceUrl: 'https://www.grants.gov/api/common/search2',
    status: 'wired',
  },
  {
    id: 'sbir',
    name: 'SBIR.gov Public API',
    category: 'sbir',
    baseUrl: 'https://api.www.sbir.gov/public/api/solicitations',
    auth: 'No API key required',
    useCase: 'SBIR/STTR solicitations, award history, agency topics, competitor award analysis, and NSF seed-funding discovery.',
    cacheTtl: '24 hours',
    sourceUrl: 'https://www.sbir.gov/api',
    status: 'wired',
  },
  {
    id: 'federal-register',
    name: 'Federal Register API',
    category: 'regulatory',
    baseUrl: 'https://www.federalregister.gov/api/v1/',
    auth: 'No API key required',
    useCase: 'NOFO monitoring, public notices, agency rulemaking changes, and opportunity-related publication alerts.',
    cacheTtl: '1 hour',
    sourceUrl: 'https://www.federalregister.gov/developers/documentation/api/v1',
    status: 'wired',
  },
  {
    id: 'data-gov',
    name: 'api.data.gov Gateway',
    category: 'reference',
    baseUrl: 'https://api.data.gov/',
    auth: 'DATA_GOV_API_KEY server secret for participating agency APIs',
    useCase: 'Unified key strategy for agency APIs, enrichment feeds, and later agency-specific data products.',
    cacheTtl: 'Depends on downstream agency',
    sourceUrl: 'https://api.data.gov/docs/developer-manual/',
    status: 'ready',
  },
]

export const CRM_PIPELINE_STAGES: CrmPipelineStage[] = [
  {
    id: 'new-intake',
    label: 'New Intake',
    description: 'Business owner submitted the readiness intake or booked a consultation.',
    ownerAction: 'Review score, flags, industry, NAICS, and missing documents before first call.',
  },
  {
    id: 'readiness-review',
    label: 'Readiness Review',
    description: 'ContractingPreacher AI scores certification fit, SAM status, risk, and revenue potential.',
    ownerAction: 'Confirm entity facts, validate SAM/UEI status manually, and assign the first 30-day action plan.',
  },
  {
    id: 'capture-plan',
    label: 'Capture Plan',
    description: 'Client is matched to agencies, NAICS/PSC codes, grants, contract opportunities, and award history.',
    ownerAction: 'Select target agencies, build watchlists, and set proposal or registration deadlines.',
  },
  {
    id: 'active-service',
    label: 'Active Service',
    description: 'SAM registration, certification package, proposal writing, or grant support is in progress.',
    ownerAction: 'Track documents, deadlines, next call, payment status, and blocker flags.',
  },
  {
    id: 'win-retention',
    label: 'Win & Retention',
    description: 'Client has submitted, won, renewed, or needs ongoing pipeline management.',
    ownerAction: 'Record outcomes, set renewal alerts, and produce weekly pipeline health reporting.',
  },
]

export const READINESS_DIMENSIONS: ReadinessDimension[] = [
  {
    label: 'Entity Foundation',
    weight: 20,
    checks: ['Legal business formed', 'UEI/SAM status known', 'NAICS selected', 'business bank/payment path ready'],
  },
  {
    label: 'Certification Fit',
    weight: 20,
    checks: ['8(a), HUBZone, WOSB/EDWOSB, SDVOSB/VOSB, MBE/DBE flags reviewed', 'ownership/control risks identified'],
  },
  {
    label: 'Past Performance',
    weight: 15,
    checks: ['Relevant commercial or government work', 'references available', 'case studies or capability proof'],
  },
  {
    label: 'Financial & Compliance',
    weight: 15,
    checks: ['Tax status, insurance, bonding, accounting readiness, and representations/certifications reviewed'],
  },
  {
    label: 'Market Alignment',
    weight: 15,
    checks: ['Agencies buy the service', 'award history exists', 'competitor map and set-aside paths identified'],
  },
  {
    label: 'Proposal Capacity',
    weight: 15,
    checks: ['Owner availability', 'document discipline', 'pricing inputs', 'deadline discipline'],
  },
]

export const PORTAL_MODULES: PortalModule[] = [
  {
    title: 'Readiness Report',
    description: 'Client score, certification fit, strengths, risk flags, and 12-month federal contracting roadmap.',
    icon: ShieldCheck,
  },
  {
    title: 'Opportunity Watchlist',
    description: 'SAM.gov, Grants.gov, SBIR, and USAspending matches tied to the client profile and NAICS codes.',
    icon: Radar,
  },
  {
    title: 'Document Vault',
    description: 'Checklist state for SAM registration, certifications, proposals, and grant application documents.',
    icon: LockKeyhole,
  },
  {
    title: 'Deadline Alerts',
    description: 'Proposal due dates, certification renewals, follow-ups, and consultation tasks.',
    icon: CalendarClock,
  },
  {
    title: 'Messages',
    description: 'Client-facing notes, next steps, and call summaries from Dr. McKnight and the admin team.',
    icon: MailCheck,
  },
  {
    title: 'Win Tracker',
    description: 'Submitted proposals, pending decisions, wins, losses, lessons learned, and contract values.',
    icon: LineChart,
  },
]

export const GITHUB_RESOURCES: GithubResource[] = [
  {
    repo: 'fedspendingtransparency/usaspending-api',
    tier: 'official',
    use: 'Reference endpoint contracts and USAspending request/response semantics.',
    url: 'https://github.com/fedspendingtransparency/usaspending-api',
  },
  {
    repo: 'HHS/simpler-grants-gov',
    tier: 'official',
    use: 'Study modern Grants.gov API behavior, schema direction, and developer tutorial patterns.',
    url: 'https://github.com/HHS/simpler-grants-gov',
  },
  {
    repo: 'HHS/simpler-grants-protocol',
    tier: 'official',
    use: 'Track the emerging common data standard for grants ecosystem interoperability.',
    url: 'https://github.com/HHS/simpler-grants-protocol',
  },
  {
    repo: 'GSA/srt-api',
    tier: 'official',
    use: 'Reference architecture for SAM.gov solicitation review pipelines.',
    url: 'https://github.com/GSA/srt-api',
  },
  {
    repo: 'GSA/srt-fbo-scraper',
    tier: 'official',
    use: 'Study solicitation classification and capture-screening workflow patterns.',
    url: 'https://github.com/GSA/srt-fbo-scraper',
  },
  {
    repo: 'GSA/federal-apis',
    tier: 'official',
    use: 'Discover additional official federal APIs for future enrichment.',
    url: 'https://github.com/GSA/federal-apis',
  },
  {
    repo: 'usnationalarchives/federalregister-api-core',
    tier: 'official',
    use: 'Reference Federal Register API implementation and document metadata behavior.',
    url: 'https://github.com/usnationalarchives/federalregister-api-core',
  },
  {
    repo: 'MindPetal/sam-search',
    tier: 'client',
    use: 'Reference SAM.gov opportunity search automation patterns.',
    url: 'https://github.com/MindPetal/sam-search',
  },
  {
    repo: 'dherincx92/fpds',
    tier: 'client',
    use: 'Potential historical FPDS ATOM feed parser after supply-chain review.',
    url: 'https://github.com/dherincx92/fpds',
  },
  {
    repo: 'akshayakula/OpenSAM',
    tier: 'ai-native',
    use: 'Competitive reference for semantic SAM.gov search UX and AI chat workflows.',
    url: 'https://github.com/akshayakula/OpenSAM',
  },
  {
    repo: 'makegov/awesome-procurement-data',
    tier: 'curator',
    use: 'Ongoing source discovery for procurement datasets and tooling.',
    url: 'https://github.com/makegov/awesome-procurement-data',
  },
  {
    repo: 'trustdan/awesome-sbir-sttr',
    tier: 'curator',
    use: 'SBIR/STTR resource discovery for the NSFGrantCraft module.',
    url: 'https://github.com/trustdan/awesome-sbir-sttr',
  },
]

export const OPEN_DATA_ENRICHMENT_SOURCES: OpenDataSource[] = [
  {
    id: 'opencorporates',
    name: 'OpenCorporates',
    missionFit: 'core',
    auth: 'apiKey',
    category: 'entity-risk',
    useCase: 'Business/entity cross-checks, directors/officers, company status clues, and due-diligence notes before onboarding or proposal support.',
    sourceUrl: 'https://api.opencorporates.com/documentation/API-Reference',
    route: '/api/open-data/search?source=opencorporates&q=acme',
    status: 'ready',
  },
  {
    id: 'opensanctions',
    name: 'OpenSanctions',
    missionFit: 'core',
    auth: 'apiKey',
    category: 'entity-risk',
    useCase: 'Sanctions, PEP, crime, and watchlist risk screening for clients, owners, vendors, partners, and competitors.',
    sourceUrl: 'https://www.opensanctions.org/docs/api/',
    route: '/api/open-data/search?source=opensanctions&q=company',
    status: 'ready',
  },
  {
    id: 'microlink',
    name: 'Microlink.io',
    missionFit: 'core',
    auth: 'none',
    category: 'website-evidence',
    useCase: 'Pull page title, description, screenshot metadata, and technical facts from a client website or competitor website.',
    sourceUrl: 'https://microlink.io',
    route: '/api/open-data/search?source=microlink&q=https%3A%2F%2Fexample.com',
    status: 'wired',
  },
  {
    id: 'college-scorecard',
    name: 'College Scorecard',
    missionFit: 'useful',
    auth: 'none',
    category: 'research',
    useCase: 'Find colleges, workforce programs, and training institutions for teaming, workforce evidence, education contracts, and grant narratives.',
    sourceUrl: 'https://collegescorecard.ed.gov/data/',
    route: '/api/open-data/search?source=college-scorecard&q=cybersecurity',
    status: 'wired',
  },
  {
    id: 'universities',
    name: 'Universities List',
    missionFit: 'useful',
    auth: 'none',
    category: 'research',
    useCase: 'Find university domains for STTR partners, research collaborators, internship pipelines, and academic teaming targets.',
    sourceUrl: 'https://github.com/Hipo/university-domains-list',
    route: '/api/open-data/search?source=universities&q=south%20carolina',
    status: 'wired',
  },
  {
    id: 'wikidata',
    name: 'Wikidata',
    missionFit: 'useful',
    auth: 'OAuth',
    category: 'reference',
    useCase: 'Entity context, agency/company identifiers, public facts, and linked open-data enrichment for due diligence.',
    sourceUrl: 'https://www.wikidata.org/w/api.php?action=help',
    route: '/api/open-data/search?source=wikidata&q=Department%20of%20Energy',
    status: 'wired',
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    missionFit: 'useful',
    auth: 'none',
    category: 'reference',
    useCase: 'Quick public-context summaries for agencies, technologies, programs, geographies, and competitor background research.',
    sourceUrl: 'https://www.mediawiki.org/wiki/API:Main_page',
    route: '/api/open-data/search?source=wikipedia&q=Small%20Business%20Innovation%20Research',
    status: 'wired',
  },
  {
    id: 'archive',
    name: 'Archive.org',
    missionFit: 'useful',
    auth: 'none',
    category: 'website-evidence',
    useCase: 'Historical website evidence, older capability claims, prior solicitation pages, and audit trail context.',
    sourceUrl: 'https://archive.readme.io/docs',
    route: '/api/open-data/search?source=archive&q=thecontractingpreacher.com',
    status: 'wired',
  },
  {
    id: 'socrata',
    name: 'Socrata',
    missionFit: 'useful',
    auth: 'OAuth',
    category: 'market',
    useCase: 'State/local open data portals for procurement, business licenses, permits, spending, and place-based market research.',
    sourceUrl: 'https://dev.socrata.com/',
    status: 'reference',
  },
  {
    id: 'recreation',
    name: 'Recreation Information Database',
    missionFit: 'useful',
    auth: 'apiKey',
    category: 'location',
    useCase: 'Federal lands, facilities, parks, museums, and recreation-site context for maintenance, construction, tourism, and concession opportunities.',
    sourceUrl: 'https://ridb.recreation.gov/',
    status: 'ready',
  },
  {
    id: 'acrelens',
    name: 'AcreLens',
    missionFit: 'useful',
    auth: 'apiKey',
    category: 'location',
    useCase: 'Property suitability and rural/off-grid scoring that can support HUBZone, site selection, facilities, land, and construction clients.',
    sourceUrl: 'https://www.acrelens.com',
    status: 'ready',
  },
  {
    id: 'teleport',
    name: 'Teleport',
    missionFit: 'reference',
    auth: 'none',
    category: 'location',
    useCase: 'Quality-of-life and location context for expansion planning, relocation narratives, and regional opportunity research.',
    sourceUrl: 'https://developers.teleport.org/',
    route: '/api/open-data/search?source=teleport&q=Columbia',
    status: 'wired',
  },
  {
    id: 'kaggle',
    name: 'Kaggle',
    missionFit: 'reference',
    auth: 'apiKey',
    category: 'research',
    useCase: 'Dataset discovery for NSFGrantCraft AI validation plans and technical grant evidence, not core federal contracting operations.',
    sourceUrl: 'https://www.kaggle.com/docs/api',
    status: 'reference',
  },
  {
    id: 'linkpreview',
    name: 'LinkPreview',
    missionFit: 'reference',
    auth: 'apiKey',
    category: 'website-evidence',
    useCase: 'Fallback URL preview extraction if Microlink becomes rate-limited or unavailable.',
    sourceUrl: 'https://www.linkpreview.net',
    status: 'ready',
  },
]

export const SYSTEM_PROMISES = [
  {
    title: 'Federal Contracting CRM',
    body: 'Admin intake queue, readiness scoring, certification fit, client notes, next actions, and pipeline stage tracking.',
    icon: Users,
  },
  {
    title: 'Live Funding Intelligence',
    body: 'Contract, grant, SBIR/STTR, Federal Register, and award-history search through server-side API routes.',
    icon: Database,
  },
  {
    title: 'Client Portal',
    body: 'Login-ready portal shell with roadmap, watchlist, documents, deadlines, messages, and win tracking.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'ContractingPreacher AI',
    body: 'Faith-driven readiness analysis built around accuracy, dignity, flags, strengths, and proactive next steps.',
    icon: Sparkles,
  },
  {
    title: 'NSFGrantCraft AI',
    body: 'A separate SBIR/STTR grant strategy module with live-verification warnings for solicitation-sensitive details.',
    icon: BookOpenCheck,
  },
  {
    title: 'Opportunity Capture Engine',
    body: 'Agency targeting, NAICS/PSC matching, competitor award history, deadline alerts, and win/loss reporting.',
    icon: Target,
  },
]

export const FEDERAL_TOOLBOX = [
  { label: 'Contract Search', href: '/api/funding/search?source=contracts&q=cybersecurity', icon: Gavel },
  { label: 'Grant Search', href: '/api/funding/search?source=grants&q=small%20business', icon: Landmark },
  { label: 'Award History', href: '/api/funding/search?source=awards&q=construction', icon: Award },
  { label: 'SBIR Topics', href: '/api/funding/search?source=sbir&q=artificial%20intelligence', icon: FileSearch },
  { label: 'NOFO Feed', href: '/api/funding/search?source=nofo&q=notice%20of%20funding%20opportunity', icon: Bell },
  { label: 'Agency APIs', href: '/api/funding/status', icon: Building2 },
  { label: 'Entity Risk', href: '/api/open-data/search?source=opensanctions&q=company', icon: ShieldCheck },
  { label: 'Website Evidence', href: '/api/open-data/search?source=microlink&q=https%3A%2F%2Fexample.com', icon: Globe2 },
  { label: 'University Partners', href: '/api/open-data/search?source=universities&q=south%20carolina', icon: FileCheck2 },
  { label: 'Location Context', href: '/api/open-data/search?source=teleport&q=Columbia', icon: MapPinned },
]
