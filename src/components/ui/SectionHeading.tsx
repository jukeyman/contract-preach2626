'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={cn('max-w-3xl mb-12 md:mb-16', centered && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-block font-accent font-bold text-sm uppercase tracking-[0.2em] mb-4',
            light ? 'text-brand-lightGold' : 'text-brand-gold'
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-balance leading-tight',
          light ? 'text-white' : 'text-brand-navy'
        )}
      >
        {title}
      </h2>
      <div className={cn('gold-divider mb-6', centered ? 'mx-auto' : 'mx-0')} />
      {description && (
        <p
          className={cn(
            'text-lg md:text-xl leading-relaxed text-pretty',
            light ? 'text-gray-300' : 'text-gray-600'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
