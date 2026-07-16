'use client'

import { motion } from 'framer-motion'
import { Phone, Search, FileCheck, Target, PenTool, Trophy } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { PROCESS_STEPS } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  Phone,
  Search,
  FileCheck,
  Target,
  PenTool,
  Trophy,
}

export default function ProcessSteps() {
  return (
    <section className="section-padding bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Our Process"
          title="From First Call to First Contract"
          description="Dr. McKnight's proven 6-step process takes you from where you are to where you want to be — winning federal contracts."
          light
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon] || Phone

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="card-dark p-8 h-full hover:border-brand-gold/30 transition-colors">
                  <div className="absolute -top-4 -left-2 w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shadow-lg shadow-brand-gold/30">
                    <span className="text-brand-navy font-heading font-bold text-sm">{step.step}</span>
                  </div>

                  <div className="pt-4">
                    <Icon className="w-8 h-8 text-brand-gold mb-4" />
                    <h3 className="text-xl font-heading font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
