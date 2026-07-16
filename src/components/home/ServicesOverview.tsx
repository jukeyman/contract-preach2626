'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ClipboardCheck, FileText, Award, MapPin, Heart, Shield, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { SERVICES } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  ClipboardCheck,
  FileText,
  Award,
  MapPin,
  Heart,
  Shield,
}

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white" id="services">
      <div className="container-custom">
        <SectionHeading
          eyebrow="What We Do"
          title="Federal Contracting Services That Win"
          description="From SAM.gov registration to winning proposals, Dr. McKnight provides end-to-end federal contracting support tailored to your business."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || ClipboardCheck

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/services/${service.slug}`} className="block group">
                  <div className="card-elevated p-8 h-full flex flex-col group-hover:border-brand-gold/30 group-hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                      <Icon className="w-7 h-7 text-brand-gold" />
                    </div>

                    {service.popular && (
                      <span className="inline-flex items-center self-start bg-brand-gold/10 text-brand-gold font-accent font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                        Most Popular
                      </span>
                    )}

                    <h3 className="text-xl font-heading font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                      {service.shortDescription}
                    </p>

                    {service.price && (
                      <p className="text-brand-gold font-accent font-bold mb-4">{service.price}</p>
                    )}

                    <div className="flex items-center gap-2 text-brand-gold font-accent font-bold text-sm">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
