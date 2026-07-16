export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export interface Service {
  id: string
  title: string
  slug: string
  shortDescription: string
  longDescription: string
  icon: string
  features: string[]
  price?: string
  popular?: boolean
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  quote: string
  rating: number
  image?: string
  contractValue?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image?: string
  readTime: string
  tags: string[]
}

export interface FAQ {
  question: string
  answer: string
  category?: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}

export interface Stat {
  value: string
  label: string
  prefix?: string
  suffix?: string
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}
