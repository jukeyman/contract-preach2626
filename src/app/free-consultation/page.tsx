import type { Metadata } from 'next'
import { CheckCircle2, Phone, Clock, Shield, Star } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import BookingCalendar from '@/components/forms/BookingCalendar'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = generateSEO({
  title: 'Book Your Free Federal Contracting Consultation — Schedule Now',
  description:
    'Schedule a free 30-minute consultation with Dr. McKnight. Get personalized guidance on SAM.gov registration, government certifications, bid writing, and your path to winning federal contracts. No obligation.',
  keywords: [
    'free federal contracting consultation',
    'government contracting consultation',
    'free government contract help',
    'schedule consultation',
    'book free consultation',
  ],
  canonical: '/free-consultation',
})

export default function FreeConsultationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Free Consultation', href: '/free-consultation' }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 xl:gap-16">
            {/* Left sidebar */}
            <div className="lg:col-span-2">
              <p className="text-brand-gold font-accent font-bold text-sm uppercase tracking-widest mb-4">
                Free Consultation
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-6 leading-tight">
                Your Federal Contracting Journey{' '}
                <span className="text-gradient-gold">Starts Here</span>
              </h1>
              <div className="gold-divider mb-8" />
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Pick a date and time that works for you. Dr. McKnight will personally
                call you for a free 30-minute strategy session — no sales pitch, no
                pressure, just real guidance.
              </p>

              <h2 className="text-xl font-heading font-bold text-brand-navy mb-4">
                In Your Free Call, You&apos;ll Get:
              </h2>
              <div className="space-y-3 mb-10">
                {[
                  'A personalized assessment of your federal contracting readiness',
                  'Identification of NAICS codes and contract opportunities for your industry',
                  'Guidance on certifications (8(a), HUBZone, WOSB, SDVOSB) you may qualify for',
                  'A clear roadmap with actionable next steps',
                  'Honest answers — no obligation whatsoever',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* social proof */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic mb-2">
                  &ldquo;Dr. McKnight&apos;s consultation alone was worth thousands. He laid out a
                  clear path and within 6 months we had our first federal contract.&rdquo;
                </p>
                <p className="text-xs font-accent font-bold text-brand-navy">
                  — D. Williams, Small Business Owner, SC
                </p>
              </div>

              {/* prefer to call */}
              <div className="bg-brand-navy rounded-2xl p-6 space-y-4">
                <h3 className="text-white font-heading font-bold">Prefer to Call?</h3>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 text-brand-gold hover:text-brand-lightGold transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-accent font-bold text-lg">{SITE_CONFIG.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">Mon–Fri, 9:00 AM – 5:00 PM EST</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">100% confidential. Your information is never shared.</span>
                </div>
              </div>
            </div>

            {/* Booking calendar */}
            <div className="lg:col-span-3">
              <div className="card-elevated p-6 md:p-8">
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-2">
                  Schedule Your Free Consultation
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                  Choose a date, pick a time, and fill out a quick form. Takes under 2 minutes.
                </p>
                <BookingCalendar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
