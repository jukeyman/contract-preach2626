import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { generateServiceSchema } from '@/lib/schema'
import { SERVICES } from '@/lib/constants'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ServiceDetail from '../ServiceDetail'
import CTASection from '@/components/home/CTASection'

const service = SERVICES.find((s) => s.slug === 'bid-proposal-writing')!

export const metadata: Metadata = generateSEO({
  title: 'Government Bid & Proposal Writing — Win Federal Contracts',
  description: 'Expert government bid writing and federal proposal preparation from The Contracting Preacher. RFP responses, technical proposals, cost volumes, and compliance reviews. 89% win rate.',
  canonical: '/services/bid-proposal-writing',
})

export default function ServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }} />
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: 'Bid & Proposal Writing', href: '/services/bid-proposal-writing' }]} />
      <ServiceDetail service={service} />
      <CTASection />
    </>
  )
}
