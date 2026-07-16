import type { Metadata } from 'next'
import { SITE_CONFIG } from './constants'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noIndex?: boolean
}

export function generateSEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/images/og-image.png',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const siteTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — Federal Contracting Consultant`

  const siteDescription = description || SITE_CONFIG.description

  const siteCanonical = canonical
    ? `${SITE_CONFIG.url}${canonical}`
    : SITE_CONFIG.url

  const defaultKeywords = [
    'federal contracting consultant',
    'government contracts',
    'SAM registration help',
    'win government contracts',
    'the contracting preacher',
    'Dr. McKnight',
    'federal bid writing',
    '8a certification',
    'small business government contracts',
    'government contracting expert',
  ]

  return {
    title: siteTitle,
    description: siteDescription,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: author || SITE_CONFIG.founder }],
    creator: SITE_CONFIG.founder,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: siteCanonical },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: siteCanonical,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} — Federal Contracting Consultant`,
        },
      ],
      locale: 'en_US',
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [ogImage],
      creator: '@contractpreacher',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'Business Consulting',
  }
}
