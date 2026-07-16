'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, ChevronDown, BookOpen } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeNavigation = () => {
    setIsMobileOpen(false)
    setActiveDropdown(null)
  }

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-brand-navy text-white hidden md:block">
        <div className="container-custom flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="font-accent italic text-brand-gold/80">Faith-Driven Federal Contracting Success</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      )}>
        <nav className="container-custom" aria-label="Main navigation">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="The Contracting Preacher - Home">
              <div className="w-12 h-12 bg-brand-navy rounded-xl flex items-center justify-center group-hover:bg-brand-blue transition-colors duration-300">
                <BookOpen className="w-6 h-6 text-brand-gold" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-heading font-bold text-brand-navy leading-tight">The Contracting</div>
                <div className="text-xs font-accent font-bold text-brand-gold uppercase tracking-wider">Preacher</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    onClick={closeNavigation}
                    className={cn(
                      'nav-link px-4 py-2 rounded-lg flex items-center gap-1',
                      pathname === link.href && 'text-brand-gold'
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                  </Link>

                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeNavigation}
                            className={cn(
                              'block px-5 py-3 text-sm font-accent font-semibold text-gray-700 hover:bg-brand-offWhite hover:text-brand-navy transition-colors',
                              pathname === child.href && 'text-brand-gold bg-brand-offWhite/50'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link href="/free-consultation" className="hidden md:block">
                <Button variant="primary" size="sm">Free Consultation</Button>
              </Link>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X className="w-6 h-6 text-brand-navy" /> : <Menu className="w-6 h-6 text-brand-navy" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="container-custom py-6 space-y-2">
                {NAV_LINKS.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeNavigation}
                      className={cn(
                        'block px-4 py-3 rounded-lg font-accent font-semibold text-gray-700 hover:bg-brand-offWhite hover:text-brand-navy transition-colors',
                        pathname === link.href && 'text-brand-gold bg-brand-offWhite/50'
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeNavigation}
                            className="block px-4 py-2 text-sm text-gray-500 hover:text-brand-gold transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Link href="/free-consultation">
                    <Button variant="primary" fullWidth>Free Consultation</Button>
                  </Link>
                </div>
                <div className="pt-2 flex items-center gap-4 text-sm text-gray-500">
                  <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-brand-gold">
                    <Phone className="w-4 h-4" />
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
