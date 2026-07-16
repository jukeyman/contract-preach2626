import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import CTASection from '@/components/home/CTASection'
import AboutContent from './AboutContent'

export const metadata: Metadata = generateSEO({
  title: 'About Dr. McKnight — The Contracting Preacher',
  description:
    'Meet Dr. McKnight, the federal contracting expert helping small businesses win government contracts nationwide. 15+ years experience, 89% win rate, $50M+ in contracts won.',
  keywords: [
    'Dr. McKnight',
    'the contracting preacher about',
    'federal contracting consultant South Carolina',
    'government contracting expert',
  ],
  canonical: '/about',
})

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />
      <AboutContent />
      <CTASection />
    </>
  )
}
