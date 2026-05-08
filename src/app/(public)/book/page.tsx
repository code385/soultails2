'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle, AlertCircle, Video, Home, ShieldAlert } from 'lucide-react'
import {
  EMERGENCY_DISCLAIMER,
  SHARED_PAYMENT_MESSAGE,
  type BookingMode,
  BOOKING_SERVICES,
  formatServiceTypeLabel,
  getBookingServicesForMode,
} from '@/lib/serviceCatalog'

const schema = z.object({
  clientName: z.string().min(2, 'Please enter your full name'),
  clientEmail: z.string().email('Please enter a valid email'),
  clientPhone: z.string().min(7, 'Please enter your phone number'),
  petName: z.string().min(1, "Please enter your pet's name"),
  petType: z.string().min(1, 'Please select pet type'),
  petAge: z.string().optional(),
  petBreed: z.string().optional(),
  serviceType: z.string().min(1, 'Please select a service'),
  serviceMode: z.enum(['REMOTE', 'HOME_VISIT']),
  concern: z.string().min(10, 'Please describe your concern in at least 10 characters'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
})

type FormData = z.infer<typeof schema>

function BookPageContent() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<BookingMode>('REMOTE')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { serviceMode: 'REMOTE', serviceType: '' },
  })

  const selectedServiceType = watch('serviceType')
  const serviceOptions = getBookingServicesForMode(mode)

  useEffect(() => {
    const requestedMode = searchParams.get('mode')
    const requestedService = searchParams.get('service')

    const nextMode: BookingMode = requestedMode === 'HOME_VISIT' ? 'HOME_VISIT' : 'REMOTE'
    setMode(nextMode)
    setValue('serviceMode', nextMode)

    if (requestedService && BOOKING_SERVICES.some((service) => service.value === requestedService && service.modes.includes(nextMode))) {
      setValue('serviceType', requestedService)
      return
    }

    setValue('serviceType', '')
  }, [searchParams, setValue])

  useEffect(() => {
    if (!selectedServiceType) return
    const isValidForMode = serviceOptions.some((service) => service.value === selectedServiceType)
    if (!isValidForMode) {
      setValue('serviceType', '')
    }
  }, [mode, selectedServiceType, serviceOptions, setValue])

  const handleModeChange = (nextMode: BookingMode) => {
    setMode(nextMode)
    setValue('serviceMode', nextMode)
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error ?? 'Something went wrong')
      setSubmitted(true)
    } catch (submissionError: any) {
      setError(submissionError.message)
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-semibold text-brand-text mb-4">Enquiry received</h1>
          <p className="font-body text-brand-muted leading-relaxed mb-8">{SHARED_PAYMENT_MESSAGE}</p>
          <a href="/" className="btn-primary">
            Back to home
          </a>
        </div>
      </div>
    )
  }

  const Field = ({ id, label, error, children }: any) => (
    <div>
      <label htmlFor={id} className="label-field">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-500 font-body">{error}</p> : null}
    </div>
  )

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="section-tag mb-4 justify-center">Consultations</div>
          <h1 className="font-heading text-4xl font-semibold text-brand-text mb-3">Book a consultation</h1>
          <p className="font-body text-brand-muted max-w-xl mx-auto">
            Choose how you would like to connect with Dr. Claudia, select the service that best fits your pet, or choose
            &quot;Not sure / Help me choose&quot; if you would like guidance.
          </p>
        </div>

        <div className="rounded-2xl border border-linen bg-primary-light p-4 mb-8">
          <div className="flex items-center gap-2 mb-2 text-primary">
            <ShieldAlert size={16} />
            <p className="font-body text-sm font-semibold">Non-emergency service</p>
          </div>
          <p className="font-body text-sm text-brand-muted leading-relaxed">{EMERGENCY_DISCLAIMER}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {([
            ['REMOTE', 'Remote / Online', Video, 'Available across the UK for non-emergency advice, follow-ups, behaviour support and nutrition guidance.'],
            ['HOME_VISIT', 'Home visit', Home, 'Available in South East London and parts of Kent for hands-on assessment and home-based support.'],
          ] as const).map(([value, label, Icon, description]) => (
            <button
              key={value}
              type="button"
              onClick={() => handleModeChange(value)}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                mode === value ? 'border-primary bg-primary-light' : 'border-linen bg-white hover:border-sage'
              }`}
            >
              <Icon size={20} className={`mb-2 ${mode === value ? 'text-primary' : 'text-brand-muted'}`} />
              <div className={`font-body text-sm font-semibold mb-1 ${mode === value ? 'text-primary' : 'text-brand-text'}`}>{label}</div>
              <div className="font-body text-xs text-brand-muted">{description}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-card border border-linen p-6 lg:p-8 space-y-5">
          <input type="hidden" {...register('serviceMode')} />

          <h2 className="font-heading text-lg font-semibold text-brand-text pb-2 border-b border-linen">Your details</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="clientName" label="Your full name *" error={errors.clientName?.message}>
              <input id="clientName" className="input-field" placeholder="Jane Smith" {...register('clientName')} />
            </Field>
            <Field id="clientEmail" label="Email address *" error={errors.clientEmail?.message}>
              <input id="clientEmail" type="email" className="input-field" placeholder="jane@example.com" {...register('clientEmail')} />
            </Field>
          </div>

          <Field id="clientPhone" label="Phone number *" error={errors.clientPhone?.message}>
            <input id="clientPhone" type="tel" className="input-field" placeholder="+44 7700 900000" {...register('clientPhone')} />
          </Field>

          <h2 className="font-heading text-lg font-semibold text-brand-text pb-2 border-b border-linen pt-2">Your pet</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="petName" label="Pet's name *" error={errors.petName?.message}>
              <input id="petName" className="input-field" placeholder="Luna" {...register('petName')} />
            </Field>
            <Field id="petType" label="Type of pet *" error={errors.petType?.message}>
              <select id="petType" className="input-field" {...register('petType')}>
                <option value="">Select...</option>
                {['Cat', 'Dog', 'Rabbit', 'Bird', 'Other'].map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="petAge" label="Pet's age (optional)" error={undefined}>
              <input id="petAge" className="input-field" placeholder="e.g. 5 years" {...register('petAge')} />
            </Field>
            <Field id="petBreed" label="Breed (optional)" error={undefined}>
              <input id="petBreed" className="input-field" placeholder="e.g. British Shorthair" {...register('petBreed')} />
            </Field>
          </div>

          <h2 className="font-heading text-lg font-semibold text-brand-text pb-2 border-b border-linen pt-2">Service & timing</h2>

          <Field id="serviceType" label="Service *" error={errors.serviceType?.message}>
            <select id="serviceType" className="input-field" {...register('serviceType')}>
              <option value="">Select a service...</option>
              {serviceOptions.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </Field>

          {selectedServiceType ? (
            <div className="rounded-xl border border-linen bg-cream p-4">
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-brand-subtle mb-1">Selected service</p>
              <p className="font-body text-sm text-brand-text">{formatServiceTypeLabel(selectedServiceType)}</p>
            </div>
          ) : null}

          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="preferredDate" label="Preferred date *" error={errors.preferredDate?.message}>
              <input id="preferredDate" type="date" className="input-field" min={new Date().toISOString().split('T')[0]} {...register('preferredDate')} />
            </Field>
            <Field id="preferredTime" label="Preferred time *" error={errors.preferredTime?.message}>
              <select id="preferredTime" className="input-field" {...register('preferredTime')}>
                <option value="">Select...</option>
                {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="concern" label="Describe your concern *" error={errors.concern?.message}>
            <textarea
              id="concern"
              rows={4}
              className="input-field resize-none"
              placeholder="Please describe what you would like help with - symptoms, behaviour concerns, practical needs or questions."
              {...register('concern')}
            />
          </Field>

          {error ? (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertCircle size={15} />
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Sending enquiry...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send enquiry request
                <ArrowRight size={16} />
              </span>
            )}
          </button>

          <p className="font-body text-xs text-brand-subtle text-center">{SHARED_PAYMENT_MESSAGE}</p>
        </form>
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="pt-24 pb-20 px-4"><div className="max-w-4xl mx-auto rounded-2xl border border-linen bg-white p-8 text-center font-body text-brand-muted">Loading booking form...</div></div>}>
      <BookPageContent />
    </Suspense>
  )
}
