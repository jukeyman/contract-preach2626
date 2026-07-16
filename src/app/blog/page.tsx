import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { BLOG_POSTS } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SectionHeading from '@/components/ui/SectionHeading'
import CTASection from '@/components/home/CTASection'

export const metadata: Metadata = generateSEO({
  title: 'Federal Contracting Blog — Tips, Guides & Resources',
  description:
    'Expert federal contracting tips, guides, and resources from The Contracting Preacher. SAM.gov registration, government certifications, proposal writing, NAICS codes, and how to win government contracts.',
  keywords: ['federal contracting blog', 'government contracting tips', 'SAM.gov guide', 'how to win government contracts'],
  canonical: '/blog',
})

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Blog & Resources"
            title="Federal Contracting Insights from the Pulpit"
            description="Dr. McKnight shares expert guidance, industry updates, and practical tips to help your business succeed in government contracting."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="card-elevated group flex flex-col">
                {/* Image */}
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/80 to-brand-blue/80 flex items-center justify-center">
                    <span className="text-brand-gold font-accent font-bold text-xs uppercase tracking-widest px-3 py-1 border border-brand-gold/40 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-heading font-bold text-brand-navy mb-3 group-hover:text-brand-gold transition-colors leading-tight">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-6 flex-1">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 text-xs font-accent font-semibold text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-brand-gold font-accent font-bold text-sm group-hover:gap-3 transition-all">
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
