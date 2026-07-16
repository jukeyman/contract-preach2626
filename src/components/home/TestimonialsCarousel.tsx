'use client'

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { TESTIMONIALS } from '@/lib/constants'

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Client Success Stories"
          title="Real People. Real Contracts. Real Results."
          description="Don't just take our word for it. Hear from the businesses that trusted The Contracting Preacher and won."
        />

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="card-elevated p-8 h-full flex flex-col">
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
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 bg-brand-navy rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 bg-brand-navy rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
