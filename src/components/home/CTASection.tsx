'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export default function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-cta-gradient" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <rect x="150" y="0" width="100" height="400" rx="20" fill="#C9A84C" />
          <rect x="0" y="120" width="400" height="100" rx="20" fill="#C9A84C" />
        </svg>
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-brand-gold font-accent font-bold text-sm uppercase tracking-widest mb-6">
            Take the First Step
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight text-balance">
            Ready to Win Your First — or Next — Federal Contract?
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
            Schedule a free 30-minute consultation with Dr. McKnight. We&apos;ll assess your business,
            identify your opportunities, and create a clear roadmap to federal contracting success.
            No obligation, no pressure — just real guidance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/free-consultation">
              <Button variant="primary" size="xl" className="group">
                Schedule Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href={`tel:${SITE_CONFIG.phone}`}>
              <Button variant="secondary" size="xl">
                <Phone className="mr-2 w-5 h-5" />
                {SITE_CONFIG.phone}
              </Button>
            </a>
          </div>

          <p className="mt-8 text-gray-500 text-sm font-accent italic">
            &quot;Commit to the Lord whatever you do, and he will establish your plans.&quot; — Proverbs 16:3
          </p>
        </motion.div>
      </div>
    </section>
  )
}
