'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Send } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SERVICES } from '@/lib/constants'

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Please provide more details (at least 10 characters)'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to send message')

      toast.success('Message sent successfully! Dr. McKnight will be in touch shortly.')
      reset()
    } catch {
      toast.error('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            First Name *
          </label>
          <input id="firstName" type="text" className="input-field" placeholder="Your first name" {...register('firstName')} />
          {errors.firstName && <p className="mt-1 text-sm text-red-600" role="alert">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            Last Name *
          </label>
          <input id="lastName" type="text" className="input-field" placeholder="Your last name" {...register('lastName')} />
          {errors.lastName && <p className="mt-1 text-sm text-red-600" role="alert">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input id="email" type="email" className="input-field" placeholder="you@company.com" {...register('email')} />
          {errors.email && <p className="mt-1 text-sm text-red-600" role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-accent font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <input id="phone" type="tel" className="input-field" placeholder="(555) 123-4567" {...register('phone')} />
          {errors.phone && <p className="mt-1 text-sm text-red-600" role="alert">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-accent font-semibold text-gray-700 mb-2">
          Company Name *
        </label>
        <input id="company" type="text" className="input-field" placeholder="Your business name" {...register('company')} />
        {errors.company && <p className="mt-1 text-sm text-red-600" role="alert">{errors.company.message}</p>}
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-accent font-semibold text-gray-700 mb-2">
          Service Interested In *
        </label>
        <select id="service" className="input-field" {...register('service')}>
          <option value="">Select a service...</option>
          {SERVICES.map((service) => (
            <option key={service.id} value={service.id}>{service.title}</option>
          ))}
          <option value="other">Other / Not Sure</option>
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-600" role="alert">{errors.service.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-accent font-semibold text-gray-700 mb-2">
          Tell Us About Your Business & Goals *
        </label>
        <textarea
          id="message"
          rows={5}
          className="input-field resize-none"
          placeholder="Tell us about your business, what you're looking for, and any questions you have..."
          {...register('message')}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600" role="alert">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
        <Send className="mr-2 w-5 h-5" />
        Send Message
      </Button>

      <p className="text-sm text-gray-500 text-center">
        We typically respond within 24 hours. Your information is 100% confidential.
      </p>
    </form>
  )
}
