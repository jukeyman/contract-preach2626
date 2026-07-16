import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { generateBreadcrumbSchema } from '@/lib/schema'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items]
  const schemaItems = allItems.map((item) => ({ name: item.label, url: item.href }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(schemaItems)) }}
      />
      <nav aria-label="Breadcrumb" className="container-custom py-4">
        <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          {allItems.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
              {index === allItems.length - 1 ? (
                <span className="font-semibold text-brand-navy" aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-brand-gold transition-colors flex items-center gap-1">
                  {index === 0 && <Home className="w-3.5 h-3.5" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
