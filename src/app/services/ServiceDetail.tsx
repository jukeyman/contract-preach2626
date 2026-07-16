'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'
import type { Service } from '@/types'

interface ServiceDetailProps {
  service: Service
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {service.popular && (
                <span className="inline-flex items-center bg-brand-gold/10 text-brand-gold font-accent font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  Most Popular Service
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-6 leading-tight">
                {service.title}
              </h1>

              <div className="gold-divider mb-8" />

              <p className="text-lg text-gray-600 leading-relaxed mb-10">
                {service.longDescription}
              </p>

              <h2 className="text-2xl font-heading font-bold text-brand-navy mb-6">
                What&apos;s Included
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 bg-brand-offWhite rounded-xl px-5 py-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-body">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-28"
            >
              <div className="card-dark p-8 mb-8">
                <h3 className="text-xl font-heading font-bold text-white mb-2">Get Started Today</h3>
                {service.price && (
                  <p className="text-brand-gold font-accent font-bold text-2xl mb-4">{service.price}</p>
                )}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Includes a free initial consultation. No obligation.
                </p>

                <div className="space-y-3">
                  <Link href="/free-consultation" className="block">
                    <Button variant="primary" fullWidth className="group">
                      Free Consultation
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="block">
                    <Button variant="secondary" fullWidth>
                      <Phone className="mr-2 w-4 h-4" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>

              <div className="bg-brand-offWhite rounded-2xl p-6 border border-gray-200">
                <h4 className="font-heading font-bold text-brand-navy mb-4">Why Choose Us</h4>
                <ul className="space-y-3">
                  {[
                    '89% Proposal Win Rate',
                    '500+ Businesses Served',
                    '$50M+ Contracts Won',
                    'Free Initial Consultation',
                    '100% Compliance Guaranteed',
                    'Nationwide Service',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
