import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="container-custom text-center py-20">
        <h1 className="text-8xl md:text-9xl font-heading font-bold text-brand-gold/20 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-navy mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary">
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="secondary">
              <Search className="mr-2 w-5 h-5" />
              View Services
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="navy">Contact Us</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
