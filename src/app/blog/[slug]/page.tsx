import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User, ArrowLeft, Tag, ChevronRight } from 'lucide-react'
import { generateSEO } from '@/lib/seo'
import { generateArticleSchema } from '@/lib/schema'
import { BLOG_POSTS } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import CTASection from '@/components/home/CTASection'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) return generateSEO({ title: 'Post Not Found', noIndex: true })

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    canonical: `/blog/${post.slug}`,
    ogType: 'article',
    publishedTime: post.date,
    author: post.author,
  })
}

/** Convert markdown-ish content (bold, bullets, paragraphs) to HTML */
function renderContent(content: string) {
  const paragraphs = content.split(/\n\n+/)

  return paragraphs.map((para, i) => {
    const trimmed = para.trim()
    if (!trimmed) return null

    // Heading: **Heading**\n or line that starts with ** and ends with **
    if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
      const heading = trimmed.replace(/\*\*/g, '')
      return (
        <h2 key={i} className="text-2xl md:text-3xl font-heading font-bold text-brand-navy mt-10 mb-4">
          {heading}
        </h2>
      )
    }

    // Bullet list block
    if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
      const lines = trimmed.split('\n').filter(l => l.trim())
      return (
        <ul key={i} className="list-none space-y-3 my-6 pl-0">
          {lines.map((line, j) => {
            const lineText = line.replace(/^- /, '').trim()
            const rendered = renderInline(lineText)
            return (
              <li key={j} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-lg leading-relaxed">{rendered}</span>
              </li>
            )
          })}
        </ul>
      )
    }

    // Regular paragraph
    return (
      <p key={i} className="text-gray-700 text-lg leading-relaxed mb-6">
        {renderInline(trimmed)}
      </p>
    )
  })
}

/** Handle inline **bold** formatting */
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-brand-navy">{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    date: post.date,
    author: post.author,
  })

  // Related posts (same category, excluding current)
  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))
  ).slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title, href: `/blog/${post.slug}` }]} />

      <article className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Back */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand-gold font-accent font-semibold text-sm mb-8 hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>

            {/* Category badge */}
            <span className="inline-flex items-center bg-brand-gold/10 text-brand-gold font-accent font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-navy mb-6 leading-tight text-balance">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8 pb-8 border-b border-gray-200">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-brand-gold" />
                <span className="font-semibold text-brand-navy">{post.author}</span>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-gold" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                {post.readTime}
              </span>
            </div>

            {/* Excerpt / lead */}
            <p className="text-xl text-gray-600 leading-relaxed mb-10 font-medium border-l-4 border-brand-gold pl-6 py-2 bg-brand-offWhite/50 rounded-r-xl">
              {post.excerpt}
            </p>

            {/* Full article content */}
            <div className="mb-10">
              {renderContent(post.content)}
            </div>

            {/* CTA box mid-article */}
            <div className="bg-brand-navy rounded-2xl p-8 my-12 text-center">
              <p className="text-brand-gold font-accent font-bold text-sm uppercase tracking-widest mb-3">Ready to Win Contracts?</p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Get Personalized Guidance from Dr. McKnight
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Every business situation is unique. Schedule a free 30-minute consultation and get a custom roadmap for winning federal contracts.
              </p>
              <Link
                href="/free-consultation"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-accent font-bold px-8 py-4 rounded-xl hover:bg-brand-lightGold transition-colors"
              >
                Schedule Free Consultation
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10 pb-10 border-b border-gray-200">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-xs font-accent font-semibold text-gray-500 bg-gray-100 rounded-full px-3 py-1.5 hover:bg-brand-gold/10 hover:text-brand-gold transition-colors">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Author box */}
            <div className="bg-brand-navy rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-brand-gold relative">
                <img src="/images/dr-mcknight.jpg" alt="Dr. McKnight" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-1">{post.author}</h3>
                <p className="text-brand-gold font-accent font-semibold text-sm mb-3">
                  The Contracting Preacher | Federal Contracting Consultant
                </p>
                <p className="text-gray-400 leading-relaxed text-sm">
                  Dr. McKnight is a federal contracting expert with 15+ years of experience and
                  offices across the country. He has helped over 500 businesses win more than
                  $50M in federal contracts through SAM registration, SBA certifications, and expert proposal writing.
                </p>
              </div>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="max-w-5xl mx-auto pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-heading font-bold text-brand-navy mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-brand-gold hover:shadow-lg transition-all duration-300"
                  >
                    <span className="inline-flex bg-brand-gold/10 text-brand-gold font-accent font-bold text-xs uppercase tracking-wider px-2 py-0.5 rounded-full mb-3">
                      {related.category}
                    </span>
                    <h3 className="font-heading font-bold text-brand-navy group-hover:text-brand-gold transition-colors text-base leading-snug mb-2">
                      {related.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{related.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-brand-gold text-sm font-semibold mt-4 group-hover:gap-2 transition-all">
                      Read more <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTASection />
    </>
  )
}
