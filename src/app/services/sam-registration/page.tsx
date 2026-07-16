import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { generateServiceSchema } from '@/lib/schema'
import { SERVICES } from '@/lib/constants'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ServiceDetail from '../ServiceDetail'
import CTASection from '@/components/home/CTASection'

const service = SERVICES.find((s) => s.slug === 'sam-registration')!

export const metadata: Metadata = generateSEO({
  title: 'SAM.gov Registration Help — Get Registered to Win Federal Contracts',
  description: 'Expert SAM.gov registration assistance from The Contracting Preacher. Complete System for Award Management registration including UEI, NAICS codes, entity validation, and annual renewals.',
  keywords: ['SAM.gov registration help', 'SAM registration consultant', 'UEI number help', 'SAM.gov renewal', 'federal contractor registration'],
  canonical: '/services/sam-registration',
})

export default function SAMRegistrationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }} />
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: 'SAM.gov Registration', href: '/services/sam-registration' }]} />
      <ServiceDetail service={service} />
      <CTASection />
    </>
  )
}
