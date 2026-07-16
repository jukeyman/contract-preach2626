'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import Accordion from '@/components/ui/Accordion'
import Button from '@/components/ui/Button'
import { FAQS } from '@/lib/constants'
import { generateFAQSchema } from '@/lib/schema'

export default function FAQPreview() {
  const previewFAQs = FAQS.slice(0, 5)

  return (
    <section className="section-padding bg-brand-offWhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(previewFAQs)) }}
      />
      <div className="container-custom">
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Got Questions? Dr. McKnight Has Answers."
          description="Here are the most common questions we hear from businesses exploring federal contracting opportunities."
        />

        <div className="max-w-3xl mx-auto">
          <Accordion
            items={previewFAQs.map((faq) => ({
              question: faq.question,
              answer: faq.answer,
            }))}
          />

          <div className="text-center mt-10">
            <Link href="/faq">
              <Button variant="navy" className="group">
                View All FAQs
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
