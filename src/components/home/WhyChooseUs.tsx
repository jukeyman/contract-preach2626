'use client'

import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Users, ShieldCheck, Award, HeartHandshake } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const reasons = [
  {
    icon: BookOpen,
    title: 'Faith-Driven Guidance',
    description: 'Dr. McKnight brings integrity, honesty, and faith-based values to every client relationship. Your success is our ministry.',
  },
  {
    icon: TrendingUp,
    title: '89% Win Rate',
    description: 'Our proposal win rate is more than double the industry average. We only bid when we know you can win.',
  },
  {
    icon: Users,
    title: '500+ Businesses Served',
    description: 'From solo entrepreneurs to established companies, we\'ve helped over 500 businesses across all industries break into federal contracting.',
  },
  {
    icon: ShieldCheck,
    title: 'Complete Compliance',
    description: 'Every registration, certification, and proposal we prepare meets 100% of government compliance requirements. No shortcuts.',
  },
  {
    icon: Award,
    title: '$50M+ in Contracts Won',
    description: 'Our clients have collectively won over $50 million in federal contracts. That\'s real revenue, real growth, real impact.',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Support',
    description: 'You\'re never just a number. Dr. McKnight personally guides each client through the process with hands-on, one-on-one attention.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-brand-offWhite">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Why The Contracting Preacher"
          title="Your Success Is Our Mission — And Our Ministry"
          description="Choosing the right federal contracting consultant can mean the difference between winning contracts and wasting time."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-brand-gold/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center mb-5">
                <reason.icon className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-lg font-heading font-bold text-brand-navy mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
