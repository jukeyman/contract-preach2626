import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { generateWebPageSchema } from '@/lib/schema'
import HeroSection from '@/components/home/HeroSection'
import TrustBadges from '@/components/home/TrustBadges'
import StatsCounter from '@/components/home/StatsCounter'
import ServicesOverview from '@/components/home/ServicesOverview'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ProcessSteps from '@/components/home/ProcessSteps'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import FAQPreview from '@/components/home/FAQPreview'
import CTASection from '@/components/home/CTASection'
import NewsletterSection from '@/components/home/NewsletterSection'

export const metadata: Metadata = generateSEO({
  title: 'Federal Contracting Consultant — Win Government Contracts Nationwide',
  description:
    'Dr. McKnight — The Contracting Preacher — helps small businesses nationwide win federal government contracts. SAM.gov registration, 8(a) certification, bid writing, proposal preparation. Free consultation. 89% win rate.',
  keywords: [
    'federal contracting consultant',
    'win government contracts',
    'SAM.gov registration help',
    'government bid writing',
    '8a certification consultant',
    'the contracting preacher',
    'Dr. McKnight federal contracts',
    'small business government contracts',
    'federal proposal writing services',
    'government contracting help near me',
  ],
  canonical: '/',
})

export default function HomePage() {
  const pageSchema = generateWebPageSchema({
    title: 'The Contracting Preacher — Federal Contracting Consultant Nationwide',
    description: 'Dr. McKnight helps small businesses win federal government contracts.',
    url: '/',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <HeroSection />
      <TrustBadges />
      <StatsCounter />
      <ServicesOverview />
      <WhyChooseUs />
      <ProcessSteps />
      <TestimonialsCarousel />
      <NewsletterSection />
      <FAQPreview />
      <CTASection />
    </>
  )
}
