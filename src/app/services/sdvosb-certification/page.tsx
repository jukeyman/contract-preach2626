import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { generateServiceSchema } from '@/lib/schema'
import { SERVICES } from '@/lib/constants'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ServiceDetail from '../ServiceDetail'
import CTASection from '@/components/home/CTASection'

const service = SERVICES.find((s) => s.slug === 'sdvosb-certification')!

export const metadata: Metadata = generateSEO({
  title: 'SDVOSB & VOSB Certification — Veteran-Owned Business Contracts',
  description: 'Service-Disabled Veteran-Owned Small Business certification through SBA VetCert. Honor your service while winning federal contracts.',
  canonical: '/services/sdvosb-certification',
})

export default function ServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }} />
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: 'SDVOSB Certification', href: '/services/sdvosb-certification' }]} />
      <ServiceDetail service={service} />
      <CTASection />
    </>
  )
}
