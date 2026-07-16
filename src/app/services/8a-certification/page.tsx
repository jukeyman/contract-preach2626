import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { generateServiceSchema } from '@/lib/schema'
import { SERVICES } from '@/lib/constants'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ServiceDetail from '../ServiceDetail'
import CTASection from '@/components/home/CTASection'

const service = SERVICES.find((s) => s.slug === '8a-certification')!

export const metadata: Metadata = generateSEO({
  title: 'SBA 8(a) Certification Help — Unlock Sole-Source Federal Contracts',
  description: 'Expert SBA 8(a) Business Development Program certification assistance. Application preparation, document review, and SBA liaison support.',
  canonical: '/services/8a-certification',
})

export default function ServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }} />
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: '8(a) Certification', href: '/services/8a-certification' }]} />
      <ServiceDetail service={service} />
      <CTASection />
    </>
  )
}
