import { SITE_CONFIG, SERVICES, FAQS } from './constants'
import type { Service, FAQ } from '@/types'

export function generateOrganizationSchema() {
  const mainOrg = {
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: 'The Contracting Preacher',
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_CONFIG.url}/#logo`,
      url: `${SITE_CONFIG.url}/images/og-image.png`,
      caption: SITE_CONFIG.name,
    },
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.founder,
      jobTitle: 'Federal Contracting Consultant',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1225 Laurel Street, Ste 415',
      addressLocality: 'Columbia',
      addressRegion: 'SC',
      postalCode: '29201',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'State', name: 'South Carolina' },
      { '@type': 'State', name: 'North Carolina' },
      { '@type': 'State', name: 'Florida' },
      { '@type': 'State', name: 'Georgia' },
      { '@type': 'State', name: 'Virginia' },
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'Nevada' },
      { '@type': 'State', name: 'Illinois' },
      { '@type': 'State', name: 'District of Columbia' },
      { '@type': 'State', name: 'Puerto Rico' },
    ],
    serviceType: [
      'Federal Contracting Consulting',
      'SAM.gov Registration',
      'Government Bid Writing',
      'SBA 8(a) Certification',
      'HUBZone Certification',
      'WOSB Certification',
      'SDVOSB Certification',
    ],
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.instagram,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const subLocations = SITE_CONFIG.offices.map((office, idx) => ({
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/#office-${idx}`,
    parentOrganization: { '@id': `${SITE_CONFIG.url}/#organization` },
    name: `${SITE_CONFIG.name} — ${office.city} Office`,
    description: `Official regional office of Dr. McKnight — The Contracting Preacher — in ${office.city}, ${office.state} serving small businesses and federal contractors.`,
    url: `${SITE_CONFIG.url}/contact`,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.address,
      addressLocality: office.city,
      addressRegion: office.state,
      postalCode: office.zip,
      addressCountry: 'US',
    },
    areaServed: { '@type': 'State', name: office.state },
    priceRange: '$$',
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [mainOrg, ...subLocations],
  }
}


export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.longDescription,
    provider: {
      '@type': 'ProfessionalService',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    serviceType: service.title,
    url: `${SITE_CONFIG.url}/services/${service.slug}`,
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        description: service.price,
        priceCurrency: 'USD',
      },
    }),
  }
}

export function generateFAQSchema(faqs?: FAQ[]) {
  const faqList = faqs || FAQS
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  }
}

export function generateArticleSchema(post: {
  title: string
  description: string
  slug: string
  date: string
  author: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  }
}

export function generateWebPageSchema(page: {
  title: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `${SITE_CONFIG.url}${page.url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    provider: {
      '@type': 'ProfessionalService',
      name: SITE_CONFIG.name,
    },
  }
}
