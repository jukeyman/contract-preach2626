import type { Metadata } from 'next'
import { Star, Quote } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { TESTIMONIALS } from '@/lib/constants'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SectionHeading from '@/components/ui/SectionHeading'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = generateSEO({
  title: 'Client Testimonials — Federal Contracting Success Stories',
  description:
    'Read real success stories from businesses that won federal government contracts with help from The Contracting Preacher. Over $50M in contracts won. 89% proposal win rate.',
  canonical: '/testimonials',
})

export default function TestimonialsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Testimonials', href: '/testimonials' }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Success Stories"
            title="Our Clients Win — And Their Stories Prove It"
            description="Every testimonial represents a real business owner who trusted The Contracting Preacher and achieved real results in federal contracting."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="card-elevated p-8 flex flex-col">
                <Quote className="w-10 h-10 text-brand-gold/30 mb-4" />

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 flex-1 italic">
                  &quot;{testimonial.quote}&quot;
                </p>

                {testimonial.contractValue && (
                  <div className="bg-brand-gold/10 rounded-lg px-4 py-2 mb-4 inline-flex self-start">
                    <span className="text-brand-gold font-accent font-bold text-sm">
                      Contract Value: {testimonial.contractValue}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-4">
                  <div className="font-heading font-bold text-brand-navy">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
