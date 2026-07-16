'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Gavel, Users, Award, Heart, Quote } from 'lucide-react'

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden relative">
                <Image
                  src="/images/dr-mcknight.jpg"
                  alt="Dr. McKnight — The Contracting Preacher — Federal Contracting Consultant"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/0 via-brand-navy/0 to-brand-navy/70" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h2 className="text-3xl font-heading font-bold text-white">Dr. McKnight</h2>
                  <p className="text-brand-gold font-accent font-semibold">The Contracting Preacher</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-brand-gold rounded-2xl p-6 shadow-2xl shadow-brand-gold/20 hidden md:block"
              >
                <div className="text-brand-navy font-heading font-bold text-2xl">15+ Years</div>
                <div className="text-brand-navy/70 font-accent text-sm font-semibold">Helping Businesses Win</div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-brand-gold font-accent font-bold text-sm uppercase tracking-widest mb-4">Meet Your Guide</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-6 leading-tight">
                A Preacher Who Helps You <span className="text-gradient-gold">Win Contracts</span>
              </h1>
              <div className="gold-divider mb-8" />

              <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
                <p>
                  Dr. McKnight is not your typical government contracting consultant. He&apos;s a licensed
                  pastor who discovered his calling at the intersection of faith and federal procurement —
                  and he&apos;s been helping small businesses win government contracts ever since.
                </p>
                <p>
                  With offices across the Southeast, Mid-Atlantic, and nationwide, Dr. McKnight brings over
                  15 years of experience in federal contracting, including SAM.gov registration, SBA
                  certification programs, bid and proposal writing, and contract compliance. He&apos;s helped
                  over 500 businesses collectively win more than $50 million in federal contracts.
                </p>
                <p>
                  His approach is unique: combining hard-earned expertise with faith-driven values of
                  integrity, service, and genuine care for every client. Whether you&apos;re a veteran, a
                  woman entrepreneur, or a first-time contractor — Dr. McKnight meets you where you
                  are and takes you where you need to go.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">
                {[
                  { icon: Gavel, label: 'Federal Expert' },
                  { icon: Award, label: 'Certified Consultant' },
                  { icon: Users, label: '500+ Clients Served' },
                  { icon: Heart, label: 'Faith-Based Values' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-brand-offWhite rounded-xl px-4 py-3">
                    <Icon className="w-5 h-5 text-brand-gold flex-shrink-0" />
                    <span className="font-accent font-semibold text-sm text-brand-navy">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">
                The Story Behind The Contracting Preacher
              </h2>

              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The name &quot;The Contracting Preacher&quot; wasn&apos;t a marketing idea — it was born from lived
                  experience. Dr. McKnight spent years serving his community from the pulpit while
                  simultaneously building expertise in federal procurement. He saw too many talented,
                  hardworking business owners missing out on government contracting opportunities simply
                  because they didn&apos;t know the process.
                </p>
                <p>
                  So he made it his mission to bridge that gap. To take the complexity of SAM
                  registrations, SBA certifications, and government proposals and make them accessible.
                  To walk alongside small business owners with the same care and commitment he brings
                  to his pastoral work.
                </p>
                <p>
                  Today, The Contracting Preacher serves clients from 15 offices across the country and all 50 states.
                  Every engagement starts with a conversation — not a sales pitch. Because Dr. McKnight
                  believes that when you lead with service, success follows.
                </p>
              </div>

              <div className="mt-12 bg-brand-blue/30 rounded-2xl p-8 border border-brand-blue/50">
                <Quote className="w-10 h-10 text-brand-gold/40 mx-auto mb-4" />
                <blockquote className="text-xl md:text-2xl font-heading italic text-brand-gold mb-4">
                  &quot;For I know the plans I have for you,&quot; declares the Lord,
                  &quot;plans to prosper you and not to harm you, plans to give you hope and a future.&quot;
                </blockquote>
                <cite className="text-gray-400 font-accent not-italic">— Jeremiah 29:11 (NIV)</cite>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
