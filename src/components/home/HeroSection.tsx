'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, Shield, Award, CheckCircle2, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-hero-pattern">
      {/* Background decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="max-w-2xl">
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 rounded-full px-5 py-2 mb-8"
            >
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                ))}
              </div>
              <span className="text-brand-gold font-accent font-semibold text-sm">
                Trusted by 500+ Businesses Nationwide
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-[1.1] text-balance"
            >
              Win Federal{' '}
              <span className="text-gradient-gold">Government</span>{' '}
              Contracts with{' '}
              <span className="text-gradient-gold">Faith & Expertise</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl text-pretty"
            >
              Dr. McKnight — The Contracting Preacher — helps small businesses nationwide
              navigate SAM.gov registration, government certifications, bid writing,
              and proposal preparation to win lucrative federal contracts.
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-x-6 gap-y-3 mb-10"
            >
              {['89% Proposal Win Rate', '$50M+ in Contracts Won', 'Free Consultation'].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <span className="font-accent font-semibold text-sm">{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Link href="/free-consultation">
                <Button variant="primary" size="lg" className="group">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href={`tel:${SITE_CONFIG.phone}`}>
                <Button variant="secondary" size="lg">
                  <Phone className="mr-2 w-5 h-5" />
                  Call Dr. McKnight
                </Button>
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-brand-blue/30"
            >
              {[
                { icon: Shield, text: 'SAM.gov Certified Expert' },
                { icon: Award, text: 'SBA Approved Consultant' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-gray-400">
                  <Icon className="w-5 h-5 text-brand-gold" />
                  <span className="text-sm font-accent">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            {/* Dr. McKnight portrait */}
            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-brand-gold/40 shadow-2xl shadow-brand-gold/20">
                <Image
                  src="/images/dr-mcknight.jpg"
                  alt="Dr. McKnight — The Contracting Preacher"
                  fill
                  className="object-cover object-top"
                  sizes="160px"
                />
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-6 right-6 opacity-10" aria-hidden="true">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect x="30" y="0" width="20" height="80" rx="4" fill="#C9A84C" />
                  <rect x="0" y="24" width="80" height="20" rx="4" fill="#C9A84C" />
                </svg>
              </div>

              <div className="relative z-10">
                <div className="text-brand-gold font-accent font-bold text-sm uppercase tracking-widest mb-4">
                  Your Path to Federal Contracts
                </div>

                {[
                  { num: '01', title: 'SAM.gov Registration', desc: 'Get registered to bid on contracts' },
                  { num: '02', title: 'Certifications', desc: '8(a), HUBZone, WOSB, SDVOSB' },
                  { num: '03', title: 'Proposal Writing', desc: 'Win with compelling bids' },
                  { num: '04', title: 'Contract Awards', desc: 'Secure & grow your revenue' },
                ].map((item, i) => (
                  <motion.div
                    key={item.num}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors mb-2 last:mb-0"
                  >
                    <div className="w-12 h-12 bg-brand-gold/10 border border-brand-gold/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-gold font-heading font-bold text-lg">{item.num}</span>
                    </div>
                    <div>
                      <h3 className="text-white font-heading font-bold">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-brand-gold rounded-2xl p-6 shadow-2xl shadow-brand-gold/20"
            >
              <div className="text-brand-navy font-heading font-bold text-3xl">$50M+</div>
              <div className="text-brand-navy/70 font-accent text-sm font-semibold">Contracts Won for Clients</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 60V20C240 0 480 40 720 30C960 20 1200 0 1440 20V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
