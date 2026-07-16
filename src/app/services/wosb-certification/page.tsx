import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { generateServiceSchema } from '@/lib/schema'
import { SERVICES } from '@/lib/constants'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ServiceDetail from '../ServiceDetail'
import CTASection from '@/components/home/CTASection'

const service = SERVICES.find((s) => s.slug === 'wosb-certification')!

export const metadata: Metadata = generateSEO({
  title: 'WOSB & EDWOSB Certification — Women-Owned Business Federal Contracts',
  description: 'Women-Owned Small Business certification help. WOSB and EDWOSB certification for exclusive set-aside contracts.',
  canonical: '/services/wosb-certification',
})

export default function ServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema(service)) }} />
      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: 'WOSB Certification', href: '/services/wosb-certification' }]} />
      <ServiceDetail service={service} />
      <CTASection />
    </>
  )
}
