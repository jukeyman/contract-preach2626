import { json, options } from '../../_shared/http'

type Env = {
  PORTAL_ACCESS_CODE?: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await request.json().catch(() => ({} as Record<string, string>))
  const email = String(body.email || '').trim().toLowerCase()
  const accessCode = String(body.accessCode || '').trim()
  const expected = env.PORTAL_ACCESS_CODE || 'demo-portal'

  if (!email || !accessCode) {
    return json({ error: 'Email and access code are required.' }, { status: 400 })
  }

  if (accessCode !== expected) {
    return json({
      error: 'Invalid portal access code. Demo fallback uses demo-portal until PORTAL_ACCESS_CODE is configured.',
    }, { status: 401 })
  }

  return json({
    success: true,
    portal: {
      client: {
        name: email.split('@')[0].replace(/[._-]/g, ' '),
        company: 'Client Company',
        readinessScore: 72,
        stage: 'Readiness Review',
      },
      roadmap: [
        'Verify SAM.gov entity registration and UEI status against the official record.',
        'Finalize NAICS and PSC target list for the first capture lane.',
        'Package capability statement and past-performance proof.',
        'Select 3 target agencies and build a 90-day opportunity watchlist.',
      ],
      watchlist: [
        'SAM.gov contract search tied to client NAICS and keywords.',
        'USAspending competitor award history for top agency targets.',
        'Federal Register NOFO alerts for notices and funding announcements.',
        'SBIR/STTR opportunities if technology R&D funding is relevant.',
      ],
      documents: [
        'Articles of organization or incorporation',
        'EIN confirmation letter',
        'Capability statement',
        'Insurance, bonding, and licenses',
        'Certification ownership/control documents if applicable',
      ],
      deadlines: [
        'Initial readiness call: schedule after intake review',
        'SAM verification: before any proposal submission',
        'Certification document review: within 7 business days',
        'Weekly pipeline check: every Monday',
      ],
    },
  })
}

export const onRequestOptions: PagesFunction = async () => options()
