import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Globe, Shield, Building2 } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SectionHeading from '@/components/ui/SectionHeading'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = generateSEO({
  title: 'Federal Contracting Resources — Free Guides, Tools & Links',
  description:
    'Free federal contracting resources, guides, and helpful links curated by The Contracting Preacher. SAM.gov, SBA.gov, FPDS, GSA, and more. Everything you need to get started in government contracting.',
  canonical: '/resources',
})

const resources = [
  {
    category: 'Government Portals',
    icon: Globe,
    items: [
      {
        title: 'SAM.gov — System for Award Management',
        description: 'The official U.S. government system for entity registration, contract opportunities, and federal procurement data. Your federal contracting journey begins here.',
        url: 'https://sam.gov',
      },
      {
        title: 'SBA.gov — U.S. Small Business Administration',
        description: 'Resources on small business certifications (8(a), HUBZone, WOSB, SDVOSB), counseling, and federal contracting programs.',
        url: 'https://sba.gov/federal-contracting',
      },
      {
        title: 'USAspending.gov',
        description: 'Track how the federal government spends money. Research past contract awards, agency spending patterns, and contractor performance.',
        url: 'https://usaspending.gov',
      },
      {
        title: 'GSA.gov — General Services Administration',
        description: 'Learn about GSA Schedules (Multiple Award Schedules) which streamline selling goods and services to the government.',
        url: 'https://gsa.gov',
      },
    ],
  },
  {
    category: 'Certification Programs',
    icon: Shield,
    items: [
      {
        title: '8(a) Business Development Program',
        description: 'The SBA\'s 8(a) program for socially and economically disadvantaged small businesses. 9-year program with access to sole-source and set-aside contracts.',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/8a-business-development-program',
      },
      {
        title: 'HUBZone Program',
        description: 'The Historically Underutilized Business Zone program provides preferential access to federal contracts for businesses in qualifying areas.',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/hubzone-program',
      },
      {
        title: 'Women-Owned Small Business (WOSB) Program',
        description: 'Certification program for women-owned small businesses to compete for set-aside federal contracts.',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/women-owned-small-business-federal-contracting-program',
      },
      {
        title: 'Veteran Small Business Certification (VetCert)',
        description: 'SBA certification for veteran-owned and service-disabled veteran-owned small businesses (VOSB/SDVOSB).',
        url: 'https://www.sba.gov/federal-contracting/contracting-assistance-programs/veteran-contracting-assistance-programs',
      },
    ],
  },
  {
    category: 'South Carolina Resources',
    icon: Building2,
    items: [
      {
        title: 'SC Small Business Development Centers (SBDC)',
        description: 'Free consulting and government contracting assistance for South Carolina small businesses from the SC SBDC network.',
        url: 'https://scsbdc.com/government',
      },
      {
        title: 'SBA South Carolina District Office',
        description: 'Your local SBA office providing help with funding programs, counseling, certifications, and disaster recovery in South Carolina.',
        url: 'https://www.sba.gov/district/south-carolina',
      },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources' }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Free Resources"
            title="Federal Contracting Resources & Tools"
            description="Dr. McKnight has curated the most important government contracting resources to help you on your journey. Bookmark this page — you'll need it."
          />

          <div className="space-y-16">
            {resources.map((category) => (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-brand-navy">{category.category}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.items.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-elevated p-6 group hover:border-brand-gold/30 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-heading font-bold text-brand-navy group-hover:text-brand-gold transition-colors pr-4">
                          {item.title}
                        </h3>
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-brand-gold flex-shrink-0 transition-colors" />
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
