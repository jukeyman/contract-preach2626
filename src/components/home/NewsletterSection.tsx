'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import Button from '@/components/ui/Button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email address.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      })

      if (!response.ok) throw new Error('Failed to subscribe')

      setIsSubscribed(true)
      setEmail('')
      setFirstName('')
      toast.success('Welcome aboard! Check your inbox for a confirmation email.')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-brand-navy relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-brand-gold" />
          </div>

          <span className="text-brand-gold font-accent font-bold text-sm uppercase tracking-widest mb-4 block">
            Free Newsletter
          </span>

          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight text-balance">
            Get Federal Contracting Tips Straight from the Pulpit
          </h2>

          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Join 2,000+ small business owners getting weekly insights on SAM registration, SBA certifications, proposal writing, and winning government contracts — all from Dr. McKnight.
          </p>

          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-brand-gold" />
              </div>
              <div>
                <p className="text-white font-heading font-bold text-xl mb-1">You&apos;re In! 🙏</p>
                <p className="text-gray-400">Check your inbox for a welcome message from Dr. McKnight.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="flex-1 px-4 py-3.5 bg-brand-blue/30 border border-brand-blue/60 rounded-lg text-white placeholder:text-gray-500 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all"
                />
                <input
                  type="email"
                  placeholder="Your email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3.5 bg-brand-blue/30 border border-brand-blue/60 rounded-lg text-white placeholder:text-gray-500 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:outline-none transition-all"
                />
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  className="whitespace-nowrap group"
                >
                  Subscribe
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <p className="text-gray-600 text-xs font-accent">
                No spam — ever. Unsubscribe anytime. 100% free.
              </p>
            </form>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
            {['SAM.gov Tips', 'Certification Guides', 'Proposal Writing', 'Contract Opportunities'].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
