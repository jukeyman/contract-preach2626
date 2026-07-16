import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/constants'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = generateSEO({
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE_CONFIG.name}. Learn how we collect, use, and protect your personal information.`,
  canonical: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy-policy' }]} />
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-brand-navy mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-10">Last updated: February 26, 2026</p>

          {[
            {
              title: '1. Information We Collect',
              content: 'When you use our website or contact us through our forms, we may collect personal information including your name, email address, phone number, company name, and any information you provide in your message. We also collect standard web analytics data through cookies and similar technologies.',
            },
            {
              title: '2. How We Use Your Information',
              content: 'We use your information to respond to your inquiries, provide federal contracting consulting services, send relevant updates (with your consent), improve our website and services, and comply with legal obligations. We never sell, rent, or share your personal information with third parties for marketing purposes.',
            },
            {
              title: '3. Data Protection',
              content: 'We implement industry-standard security measures to protect your personal information, including SSL encryption, secure data storage, and access controls. We treat all client information as confidential, particularly any business or financial information shared during our consulting relationship.',
            },
            {
              title: '4. Cookies',
              content: 'Our website uses cookies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookie settings through your browser preferences. Essential cookies required for website functionality cannot be disabled.',
            },
            {
              title: '5. Your Rights',
              content: `You have the right to access, correct, or delete your personal information at any time. You may also opt out of marketing communications. To exercise any of these rights, contact us at ${SITE_CONFIG.email} or call ${SITE_CONFIG.phone}.`,
            },
            {
              title: '6. Contact Us',
              content: `If you have questions about this Privacy Policy, contact us: ${SITE_CONFIG.name} | Email: ${SITE_CONFIG.email} | Phone: ${SITE_CONFIG.phone} | Columbia, SC 29201`,
            },
          ].map((section) => (
            <div key={section.title} className="mb-8">
              <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
