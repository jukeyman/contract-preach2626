import Link from 'next/link'
import { Phone, Mail, MapPin, BookOpen, Facebook, Linkedin, Youtube, Instagram, ArrowRight } from 'lucide-react'
import { SITE_CONFIG, SERVICES } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-darkNavy text-white" role="contentinfo">
      <div className="container-custom section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <div className="text-lg font-heading font-bold text-white leading-tight">The Contracting</div>
                <div className="text-xs font-accent font-bold text-brand-gold uppercase tracking-wider">Preacher</div>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Dr. McKnight helps small businesses navigate the federal contracting landscape with faith, expertise, and a commitment to your success. 15 offices nationwide.
            </p>
            <p className="text-sm font-accent font-semibold italic text-brand-gold/80 mb-4">
              &quot;For I know the plans I have for you...&quot; — Jeremiah 29:11
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: SITE_CONFIG.social.facebook, label: 'Facebook' },
                { icon: Linkedin, href: SITE_CONFIG.social.linkedin, label: 'LinkedIn' },
                { icon: Youtube, href: SITE_CONFIG.social.youtube, label: 'YouTube' },
                { icon: Instagram, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 bg-brand-blue/50 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-6 text-brand-gold">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-2 group text-sm">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-6 text-brand-gold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Dr. McKnight', href: '/about' },
                { label: 'Client Testimonials', href: '/testimonials' },
                { label: 'Blog & Resources', href: '/blog' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Free Consultation', href: '/free-consultation' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms-of-service' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-2 group text-sm">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-6 text-brand-gold">Get In Touch</h3>
            <div className="space-y-4 mb-8">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-start gap-3 text-gray-400 hover:text-brand-gold transition-colors text-sm">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-start gap-3 text-gray-400 hover:text-brand-gold transition-colors text-sm">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>Columbia, SC (HQ) — 15 Offices Nationwide</span>
              </div>
            </div>

            <div className="bg-brand-blue/30 rounded-xl p-5 border border-brand-blue/50">
              <p className="text-sm text-brand-gold font-accent font-bold mb-2">Ready to Win Contracts?</p>
              <p className="text-sm text-gray-400 mb-4">Schedule your free 30-minute consultation today.</p>
              <Link href="/free-consultation" className="btn-primary text-sm w-full text-center block py-3">
                Book Free Call
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-blue/30">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved. | Dr. McKnight, Federal Contracting Consultant</p>
          <p className="flex items-center gap-1">Built with faith &amp; excellence</p>
        </div>
      </div>
    </footer>
  )
}
