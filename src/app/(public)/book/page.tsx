'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle, AlertCircle, Video, Home } from 'lucide-react'

const schema = z.object({
  clientName: z.string().min(2, 'Please enter your full name'),
  clientEmail: z.string().email('Please enter a valid email'),
  clientPhone: z.string().min(7, 'Please enter your phone number'),
  petName: z.string().min(1, 'Please enter your pet\'s name'),
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

const remoteServices = [
  { value: 'REMOTE_CONSULTATION', label: 'Remote Consultation' },
  { value: 'FELINE_BEHAVIOUR', label: 'Feline Behaviour Consultation' },
  { value: 'NUTRITION_INTEGRATIVE', label: 'Nutrition & Integrative Care' },
  { value: 'CHRONIC_PAIN', label: 'Chronic Pain Management' },
]
const homeServices = [
  { value: 'HOME_VISIT_GENERAL', label: 'Home Visit — General' },
  { value: 'CHRONIC_PAIN', label: 'Home Visit — Pain Management' },
  { value: 'PALLIATIVE_CARE', label: 'Home Visit — Palliative Care' },
  { value: 'SENIOR_PET_CARE', label: 'Home Visit — Senior Pet Care' },
]

export default function BookPage() {
  const [mode, setMode] = useState<'REMOTE' | 'HOME_VISIT'>('REMOTE')
  const [submitting, setSubmitting] = useState(false)
  const [successHomeVisit, setSuccessHomeVisit] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { serviceMode: 'REMOTE' },
  })

  const handleModeChange = (m: 'REMOTE' | 'HOME_VISIT') => {
    setMode(m)
    setValue('serviceMode', m)
    setValue('serviceType', '')
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
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl
      } else {
        setSuccessHomeVisit(true)
      }
    } catch (e: any) {
      setError(e.message)
      setSubmitting(false)
    }
  }

  if (successHomeVisit) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-semibold text-brand-text mb-4">Booking received!</h1>
          <p className="font-body text-brand-muted leading-relaxed mb-8">
            Dr. Claudia will review your request and confirm your home visit by email within 24 hours. Payment will be arranged after the visit.
          </p>
          <a href="/" className="btn-primary">Back to home</a>
        </div>
      </div>
    )
  }

  const Field = ({ id, label, error, children }: any) => (
    <div>
      <label htmlFor={id} className="label-field">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500 font-body">{error}</p>}
    </div>
  )

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="section-tag mb-4 justify-center">Consultations</div>
          <h1 className="font-heading text-4xl font-semibold text-brand-text mb-3">Book a consultation</h1>
          <p className="font-body text-brand-muted">Choose how you'd like to connect with Dr. Claudia</p>
        </div>

        {/* Mode selector */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {([['REMOTE', 'Remote / Online', Video, 'Connect via Zoom from home. Payment taken at booking.'],
             ['HOME_VISIT', 'Home visit', Home, 'Dr. Claudia visits your home. Payment after visit.']] as const).map(
            ([val, label, Icon, desc]) => (
              <button key={val} type="button" onClick={() => handleModeChange(val)}
                className={`p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                  mode === val ? 'border-primary bg-primary-light' : 'border-linen bg-white hover:border-sage'
                }`}>
                <Icon size={20} className={`mb-2 ${mode === val ? 'text-primary' : 'text-brand-muted'}`} />
                <div className={`font-body text-sm font-semibold mb-1 ${mode === val ? 'text-primary' : 'text-brand-text'}`}>{label}</div>
                <div className="font-body text-xs text-brand-muted">{desc}</div>
              </button>
            )
          )}
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
                {['Cat','Dog','Rabbit','Bird','Other'].map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
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
              {(mode === 'REMOTE' ? remoteServices : homeServices).map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field id="preferredDate" label="Preferred date *" error={errors.preferredDate?.message}>
              <input id="preferredDate" type="date" className="input-field"
                min={new Date().toISOString().split('T')[0]}
                {...register('preferredDate')} />
            </Field>
            <Field id="preferredTime" label="Preferred time *" error={errors.preferredTime?.message}>
              <select id="preferredTime" className="input-field" {...register('preferredTime')}>
                <option value="">Select...</option>
                {['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="concern" label="Describe your concern *" error={errors.concern?.message}>
            <textarea id="concern" rows={4} className="input-field resize-none"
              placeholder="Please describe what you'd like help with — symptoms, concerns, or questions..."
              {...register('concern')} />
          </Field>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <button type="submit" disabled={submitting}
            className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed">
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                {mode === 'REMOTE' ? 'Proceeding to payment...' : 'Submitting...'}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {mode === 'REMOTE' ? 'Continue to payment' : 'Request home visit'}
                <ArrowRight size={16} />
              </span>
            )}
          </button>

          <p className="font-body text-xs text-brand-subtle text-center">
            {mode === 'REMOTE'
              ? 'You will be redirected to our secure Stripe payment page.'
              : 'No payment now. Dr. Claudia will confirm your visit by email.'}
          </p>
        </form>
      </div>
    </div>
  )
}
