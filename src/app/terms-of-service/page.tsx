import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = generateSEO({
  title: 'Terms of Service — The Contracting Preacher',
  description:
    'Terms of Service for The Contracting Preacher. Read our terms and conditions governing the use of our federal contracting consulting services.',
  canonical: '/terms-of-service',
  noIndex: false,
})

export default function TermsOfServicePage() {
  const lastUpdated = 'February 26, 2026'

  return (
    <>
      <Breadcrumbs items={[{ label: 'Terms of Service', href: '/terms-of-service' }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p className="text-brand-gold font-accent font-bold text-sm uppercase tracking-widest mb-4">
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-6 leading-tight">
              Terms of Service
            </h1>
            <div className="gold-divider mb-8" />
            <p className="text-gray-500 text-sm mb-10">Last Updated: {lastUpdated}</p>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using the website and services of {SITE_CONFIG.name} (&quot;The Contracting Preacher,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.
                </p>
                <p className="leading-relaxed mt-4">
                  These Terms of Service apply to all visitors, users, and clients of {SITE_CONFIG.url} and any related consulting services provided by Dr. McKnight.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">2. Services Description</h2>
                <p className="leading-relaxed">
                  The Contracting Preacher provides federal contracting consulting services including, but not limited to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>SAM.gov registration and renewal assistance</li>
                  <li>Government bid and proposal writing services</li>
                  <li>SBA 8(a) Business Development Program application assistance</li>
                  <li>HUBZone Certification application assistance</li>
                  <li>WOSB/EDWOSB Certification application assistance</li>
                  <li>SDVOSB/VOSB Certification application assistance</li>
                  <li>Federal contracting consulting and strategy</li>
                  <li>Opportunity identification and market research</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  We provide consulting, guidance, and preparation services. We do not guarantee contract awards, certification approvals, or specific outcomes, as final decisions rest with the appropriate federal agencies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">3. Client Responsibilities</h2>
                <p className="leading-relaxed">As a client, you agree to:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Provide accurate, complete, and truthful information for all applications and submissions</li>
                  <li>Cooperate fully and respond to requests for documentation or information in a timely manner</li>
                  <li>Notify us promptly of any changes to your business information</li>
                  <li>Review and verify all submissions before they are made on your behalf</li>
                  <li>Comply with all applicable federal laws and regulations</li>
                  <li>Pay all agreed fees in accordance with your service agreement</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">4. Payment Terms</h2>
                <p className="leading-relaxed">
                  Service fees are established at the time of engagement and outlined in your individual service agreement. By retaining our services, you agree to the payment terms specified. Fees are non-refundable once work has commenced unless otherwise specified in writing.
                </p>
                <p className="leading-relaxed mt-4">
                  For multi-stage engagements, payment schedules will be detailed in your service agreement. Late payments may result in suspension of services. We reserve the right to decline or discontinue services for non-payment.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">5. No Guarantee of Results</h2>
                <p className="leading-relaxed">
                  While The Contracting Preacher maintains an 89% proposal win rate and has a proven track record, we cannot and do not guarantee specific outcomes including but not limited to:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>SAM.gov registration approval or timelines</li>
                  <li>SBA certification approvals (8(a), HUBZone, WOSB, SDVOSB)</li>
                  <li>Federal contract awards</li>
                  <li>Specific proposal scores or rankings</li>
                  <li>Revenue targets or business growth projections</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  All final decisions regarding contracts, certifications, and registrations are made by the relevant federal agencies, and outcomes are outside of our control.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">6. Confidentiality</h2>
                <p className="leading-relaxed">
                  We understand that your business information is sensitive and confidential. We will not share your business information, financials, strategies, or proprietary data with any third party without your explicit written consent, except as required by law.
                </p>
                <p className="leading-relaxed mt-4">
                  By engaging our services, you also agree to maintain the confidentiality of our proprietary methodologies, strategies, templates, and materials.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">7. Intellectual Property</h2>
                <p className="leading-relaxed">
                  All content on this website — including text, graphics, logos, images, and software — is the property of The Contracting Preacher and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                </p>
                <p className="leading-relaxed mt-4">
                  Proposals and documents we create on your behalf are prepared for your exclusive use in pursuit of specific government contracts. They may not be resold, redistributed, or used as templates for other purposes without written consent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">8. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  To the fullest extent permitted by law, The Contracting Preacher, Dr. McKnight, and associated staff shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
                </p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Your use of or inability to use our services</li>
                  <li>Government agency decisions on contracts or certifications</li>
                  <li>Errors or delays in government processing systems (SAM.gov, SBA portals, etc.)</li>
                  <li>Changes in federal contracting regulations or policies</li>
                  <li>Loss of business opportunities or revenue</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Our total liability for any claims related to our services shall not exceed the fees paid to us for the specific service in question.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">9. Independent Consultant Status</h2>
                <p className="leading-relaxed">
                  The Contracting Preacher operates as an independent consulting firm. We are not affiliated with, endorsed by, or acting as an agent of the U.S. federal government, the Small Business Administration, the General Services Administration, or any other government agency. We are private consultants who help businesses navigate the government contracting process.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">10. Website Use</h2>
                <p className="leading-relaxed">You agree not to:</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>Use our website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Scrape, harvest, or collect data from our website without permission</li>
                  <li>Transmit viruses or malicious code</li>
                  <li>Interfere with the operation of our website or services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">11. Termination</h2>
                <p className="leading-relaxed">
                  Either party may terminate a service engagement with written notice. Upon termination, fees for work completed to date are due and payable. We reserve the right to terminate services immediately for breach of these terms, non-payment, or provision of fraudulent information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">12. Governing Law & Dispute Resolution</h2>
                <p className="leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the laws of the State of South Carolina, without regard to conflict of law provisions. Any disputes arising from these terms or our services shall first be attempted to be resolved through good-faith mediation. If mediation is unsuccessful, disputes shall be resolved through binding arbitration in South Carolina.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">13. Changes to These Terms</h2>
                <p className="leading-relaxed">
                  We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of our services after changes are posted constitutes acceptance of the revised terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-4">14. Contact Information</h2>
                <p className="leading-relaxed">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 bg-brand-offWhite rounded-xl p-6 space-y-2">
                  <p className="font-heading font-bold text-brand-navy">{SITE_CONFIG.name}</p>
                  <p className="text-gray-700">Attn: Dr. McKnight</p>
                  <p className="text-gray-700">Columbia, SC 29201</p>
                  <p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-gold hover:underline font-semibold">
                      {SITE_CONFIG.email}
                    </a>
                  </p>
                  <p>
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-brand-gold hover:underline font-semibold">
                      {SITE_CONFIG.phone}
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
