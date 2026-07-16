'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { SERVICES, SITE_CONFIG } from '@/lib/constants'

/* ─── schema ─── */
const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().min(2, 'Company name is required'),
  service: z.string().min(1, 'Please select a service'),
  notes: z.string().optional(),
})
type BookingFormData = z.infer<typeof bookingSchema>

/* ─── constants ─── */
const TIME_SLOTS = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

/* ─── helpers ─── */
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isWeekend(d: Date) {
  return d.getDay() === 0 || d.getDay() === 6
}

function isPast(d: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

/* ─── component ─── */
export default function BookingCalendar() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({ resolver: zodResolver(bookingSchema) })

  /* calendar grid */
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: (Date | null)[] = Array.from({ length: firstDay }, () => null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
    return cells
  }, [currentMonth])

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  const canGoPrev = (() => {
    const now = new Date()
    return currentMonth.getFullYear() > now.getFullYear() || currentMonth.getMonth() > now.getMonth()
  })()

  /* submit */
  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedTime) return
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
        }),
      })
      if (!res.ok) throw new Error('Booking failed')
      setBookingConfirmed(true)
      toast.success('Consultation booked! Check your email for confirmation.')
    } catch {
      toast.error('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  /* ─── confirmation ─── */
  if (bookingConfirmed) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-20 h-20 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-heading font-bold text-brand-navy mb-3">Consultation Booked!</h3>
        <p className="text-gray-600 mb-2">
          Your free 30-minute consultation is scheduled for:
        </p>
        <p className="text-lg font-bold text-brand-navy mb-1">
          {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        <p className="text-lg font-bold text-brand-gold mb-6">{selectedTime} EST</p>
        <p className="text-gray-500 text-sm">
          Dr. McKnight will reach out to confirm. Check your email for details.
        </p>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="mt-6"
          onClick={() => {
            setBookingConfirmed(false)
            setStep(1)
            setSelectedDate(null)
            setSelectedTime(null)
          }}
        >
          Book Another Consultation
        </Button>
      </div>
    )
  }

  /* ─── step indicator ─── */
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[
        { n: 1, label: 'Date & Time' },
        { n: 2, label: 'Your Info' },
        { n: 3, label: 'Confirm' },
      ].map(({ n, label }, i) => (
        <div key={n} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { if (n === 1 || (n === 2 && selectedDate && selectedTime)) setStep(n as 1 | 2) }}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              step >= n ? 'bg-brand-navy text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step > n ? <CheckCircle2 className="w-4 h-4" /> : n}
          </button>
          <span className={`text-xs font-accent font-semibold hidden sm:inline ${step >= n ? 'text-brand-navy' : 'text-gray-400'}`}>
            {label}
          </span>
          {i < 2 && <div className={`w-8 h-0.5 ${step > n ? 'bg-brand-navy' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <StepIndicator />

      {/* ═══ STEP 1 — DATE & TIME ═══ */}
      {step === 1 && (
        <div className="space-y-8">
          {/* calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={prevMonth}
                disabled={!canGoPrev}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-heading font-bold text-brand-navy">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button type="button" onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Next month">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-accent font-semibold text-gray-400 py-2">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />
                const disabled = isPast(day) || isWeekend(day)
                const selected = selectedDate && isSameDay(day, selectedDate)
                const isToday = isSameDay(day, new Date())
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    disabled={disabled}
                    onClick={() => setSelectedDate(day)}
                    className={`
                      relative p-2 rounded-lg text-sm font-medium transition-all
                      ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-brand-navy/10 cursor-pointer'}
                      ${selected ? 'bg-brand-navy text-white hover:bg-brand-navy' : ''}
                      ${isToday && !selected ? 'ring-2 ring-brand-gold ring-inset' : ''}
                    `}
                  >
                    {day.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          {/* time slots */}
          {selectedDate && (
            <div>
              <h3 className="text-lg font-heading font-bold text-brand-navy mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-gold" />
                Available Times —{' '}
                {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`
                      px-4 py-3 rounded-lg text-sm font-accent font-semibold border transition-all
                      ${selectedTime === slot
                        ? 'bg-brand-navy text-white border-brand-navy'
                        : 'border-gray-200 hover:border-brand-navy hover:text-brand-navy'
                      }
                    `}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedDate && selectedTime && (
            <Button type="button" variant="primary" size="lg" fullWidth onClick={() => setStep(2)}>
              Continue — Enter Your Info
            </Button>
          )}
        </div>
      )}

      {/* ═══ STEP 2 — YOUR INFO ═══ */}
      {step === 2 && (
        <form id="booking-form" onSubmit={handleSubmit(() => setStep(3))} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="b-firstName" className="block text-sm font-accent font-semibold text-gray-700 mb-1.5">
                <User className="inline w-4 h-4 mr-1 text-gray-400" /> First Name *
              </label>
              <input id="b-firstName" type="text" className="input-field" placeholder="Your first name" {...register('firstName')} />
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor="b-lastName" className="block text-sm font-accent font-semibold text-gray-700 mb-1.5">
                <User className="inline w-4 h-4 mr-1 text-gray-400" /> Last Name *
              </label>
              <input id="b-lastName" type="text" className="input-field" placeholder="Your last name" {...register('lastName')} />
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="b-email" className="block text-sm font-accent font-semibold text-gray-700 mb-1.5">
                <Mail className="inline w-4 h-4 mr-1 text-gray-400" /> Email *
              </label>
              <input id="b-email" type="email" className="input-field" placeholder="you@company.com" {...register('email')} />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="b-phone" className="block text-sm font-accent font-semibold text-gray-700 mb-1.5">
                <Phone className="inline w-4 h-4 mr-1 text-gray-400" /> Phone *
              </label>
              <input id="b-phone" type="tel" className="input-field" placeholder="(555) 123-4567" {...register('phone')} />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="b-company" className="block text-sm font-accent font-semibold text-gray-700 mb-1.5">
              <Building2 className="inline w-4 h-4 mr-1 text-gray-400" /> Company Name *
            </label>
            <input id="b-company" type="text" className="input-field" placeholder="Your business name" {...register('company')} />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
          </div>

          <div>
            <label htmlFor="b-service" className="block text-sm font-accent font-semibold text-gray-700 mb-1.5">
              <FileText className="inline w-4 h-4 mr-1 text-gray-400" /> Service Interested In *
            </label>
            <select id="b-service" className="input-field" {...register('service')}>
              <option value="">Select a service...</option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
              <option value="general">General Consultation / Not Sure</option>
            </select>
            {errors.service && <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>}
          </div>

          <div>
            <label htmlFor="b-notes" className="block text-sm font-accent font-semibold text-gray-700 mb-1.5">
              Additional Notes (optional)
            </label>
            <textarea
              id="b-notes"
              rows={3}
              className="input-field resize-none"
              placeholder="Anything you'd like Dr. McKnight to know before the call..."
              {...register('notes')}
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="secondary" size="lg" onClick={() => setStep(1)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button type="submit" variant="primary" size="lg" fullWidth>
              Review Booking
            </Button>
          </div>
        </form>
      )}

      {/* ═══ STEP 3 — CONFIRM ═══ */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-heading font-bold text-brand-navy flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-gold" /> Booking Summary
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Date</span>
                <p className="font-bold text-brand-navy">
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Time</span>
                <p className="font-bold text-brand-navy">{selectedTime} EST</p>
              </div>
              <div>
                <span className="text-gray-500">Duration</span>
                <p className="font-bold text-brand-navy">30 minutes</p>
              </div>
              <div>
                <span className="text-gray-500">Cost</span>
                <p className="font-bold text-green-600">FREE</p>
              </div>
            </div>
            <div className="border-t pt-4 text-sm text-gray-500">
              <p>A confirmation email will be sent to the address you provided.</p>
              <p>Dr. McKnight will call you at the scheduled time.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="secondary" size="lg" onClick={() => setStep(2)}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Edit Info
            </Button>
            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Confirming...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Confirm Booking
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-400 text-center">
            By booking, you agree to our terms. Your information is 100% confidential and never shared.
          </p>
        </div>
      )}
    </div>
  )
}
