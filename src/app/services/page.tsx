import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ServicesOverview from '@/components/home/ServicesOverview'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = generateSEO({
  title: 'Federal Contracting Services — SAM Registration, Bid Writing, Certifications',
  description:
    'Complete federal contracting services from The Contracting Preacher: SAM.gov registration, 8(a) certification, HUBZone, WOSB, SDVOSB certifications, bid writing, and government proposal preparation. South Carolina & nationwide.',
  keywords: [
    'federal contracting services',
    'SAM.gov registration service',
    'government bid writing',
    '8a certification help',
    'HUBZone certification',
    'WOSB certification',
    'SDVOSB certification',
    'government proposal writing service',
  ],
  canonical: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }]} />
      <ServicesOverview />
      <CTASection />
    </>
  )
}
