import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { generateServiceSchema } from '@/lib/schema'
import { SERVICES } from '@/lib/constants'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ServiceDetail from '../ServiceDetail'
import CTASection from '@/components/home/CTASection'

const service = SERVICES.find((s) => s.slug === 'hubzone-certification')!

export const metadata: Metadata = generateSEO({
  title: 'HUBZone Certification Help — Federal Set-Aside Contracts',
  description: 'HUBZone certification assistance from The Contracting Preacher. Determine eligibility, prepare your application, and access set-aside federal contracts.',
  canonical: '/services/hubzone-certification',
})

export default function ServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }} />
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: 'HUBZone Certification', href: '/services/hubzone-certification' }]} />
      <ServiceDetail service={service} />
      <CTASection />
    </>
  )
}
