'use client'

import { motion } from 'framer-motion'
import { Shield, BadgeCheck, Award, Lock } from 'lucide-react'

const badges = [
  { icon: Shield, label: 'SAM.gov Certified' },
  { icon: BadgeCheck, label: 'SBA Approved' },
  { icon: Award, label: 'Licensed & Insured' },
  { icon: Lock, label: 'OWASP Compliant' },
]

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-gray-500"
            >
              <badge.icon className="w-8 h-8 text-brand-gold" />
              <span className="font-accent font-bold text-sm uppercase tracking-wider">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
