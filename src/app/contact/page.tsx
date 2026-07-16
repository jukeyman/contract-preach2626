import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import ContactForm from '@/components/forms/ContactForm'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = generateSEO({
  title: 'Contact The Contracting Preacher — Get Federal Contracting Help',
  description:
    'Contact Dr. McKnight for federal contracting consulting. SAM.gov registration, bid writing, certifications. 15 offices nationwide. Free consultation available.',
  canonical: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Info */}
            <div className="lg:col-span-2">
              <span className="text-brand-gold font-accent font-bold text-sm uppercase tracking-widest mb-4 block">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-6 leading-tight">
                Let&apos;s Talk About Your{' '}
                <span className="text-gradient-gold">Federal Contracting</span> Goals
              </h1>
              <div className="gold-divider mb-8" />
              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                Ready to explore federal contracting opportunities? Have questions about SAM registration
                or certifications? Reach out — Dr. McKnight is here to help. Your first consultation
                is always free.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Phone, label: 'Phone', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                  { icon: Mail, label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                  { icon: MapPin, label: 'Main Office', value: '1225 Laurel Street, Ste 415, Columbia, SC 29201', href: null },
                  { icon: Clock, label: 'Office Hours', value: 'Monday – Friday, 8:00 AM – 6:00 PM EST', href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <p className="font-accent font-bold text-sm text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-brand-navy font-semibold hover:text-brand-gold transition-colors">{value}</a>
                      ) : (
                        <p className="text-brand-navy font-semibold">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card-elevated p-8 md:p-10">
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-2">Send Us a Message</h2>
                <p className="text-gray-500 mb-8">Fill out the form and we&apos;ll get back to you within 24 hours.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
