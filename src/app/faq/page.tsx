import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { generateFAQSchema } from '@/lib/schema'
import { FAQS } from '@/lib/constants'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SectionHeading from '@/components/ui/SectionHeading'
import Accordion from '@/components/ui/Accordion'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = generateSEO({
  title: 'Frequently Asked Questions — Federal Contracting Help',
  description:
    'Get answers to common questions about federal contracting, SAM.gov registration, 8(a) certification, HUBZone, WOSB, government bid writing, and more from The Contracting Preacher.',
  keywords: ['federal contracting FAQ', 'SAM.gov registration questions', 'how to get government contracts', '8a certification FAQ'],
  canonical: '/faq',
})

export default function FAQPage() {
  const faqSchema = generateFAQSchema()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ label: 'FAQ', href: '/faq' }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Everything You Need to Know About Federal Contracting"
            description="Dr. McKnight answers the most common questions from businesses exploring government contracting opportunities."
          />

          <div className="max-w-3xl mx-auto">
            <Accordion
              items={FAQS.map((faq) => ({ question: faq.question, answer: faq.answer }))}
            />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
