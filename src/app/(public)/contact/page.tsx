'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  petType: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, 'Please write at least 10 characters'),
})
type FormData = z.infer<typeof schema>

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setError('')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      setSubmitted(true)
    } else {
      const d = await res.json()
      setError(d.error ?? 'Something went wrong. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-tag mb-4 justify-center">Get in touch</div>
          <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-brand-text mb-4">Contact us</h1>
          <p className="font-body text-lg text-brand-muted max-w-xl mx-auto">
            Have a question? We&apos;d love to hear from you. Dr. Claudia responds within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-1 space-y-5">
            {[
              { icon: Mail, title: 'Email', value: 'hello@soultails.com', href: 'mailto:hello@soultails.com' },
              { icon: MapPin, title: 'Service area', value: 'London & surrounding areas (home visits)', href: null },
              { icon: Clock, title: 'Response time', value: 'Within 24 hours on working days', href: null },
            ].map(({ icon: Icon, title, value, href }) => (
              <div key={title} className="bg-white rounded-xl border border-linen p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-primary" />
                </div>
                <div>
                  <div className="font-body text-xs font-semibold text-brand-subtle uppercase tracking-wide mb-0.5">{title}</div>
                  {href ? (
                    <a href={href} className="font-body text-sm text-brand-text hover:text-primary transition-colors">{value}</a>
                  ) : (
                    <div className="font-body text-sm text-brand-text">{value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-primary-light rounded-xl border border-primary/20 p-5">
              <h3 className="font-body text-sm font-semibold text-primary mb-2">Ready to book?</h3>
              <p className="font-body text-xs text-brand-muted mb-3">Skip the wait and book a consultation directly.</p>
              <Link href="/book" className="btn-primary text-sm px-5 py-2.5 inline-flex w-full justify-center">
                Book now <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-linen p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={28} className="text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-semibold text-brand-text mb-3">Message sent!</h2>
                <p className="font-body text-brand-muted">Dr. Claudia will get back to you within 24 hours. Check your email for a confirmation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl border border-linen p-6 lg:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-field" htmlFor="name">Your name *</label>
                    <input id="name" className="input-field" placeholder="Jane Smith" {...register('name')} />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="label-field" htmlFor="email">Email address *</label>
                    <input id="email" type="email" className="input-field" placeholder="jane@example.com" {...register('email')} />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="label-field" htmlFor="phone">Phone (optional)</label>
                    <input id="phone" type="tel" className="input-field" placeholder="+44 7700 900000" {...register('phone')} />
                  </div>
                  <div>
                    <label className="label-field" htmlFor="petType">Type of pet (optional)</label>
                    <select id="petType" className="input-field" {...register('petType')}>
                      <option value="">Select...</option>
                      {['Cat','Dog','Rabbit','Bird','Other'].map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label-field" htmlFor="subject">Subject (optional)</label>
                  <input id="subject" className="input-field" placeholder="e.g. Question about feline behaviour" {...register('subject')} />
                </div>
                <div>
                  <label className="label-field" htmlFor="message">Your message *</label>
                  <textarea id="message" rows={5} className="input-field resize-none"
                    placeholder="Tell us how we can help..." {...register('message')} />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>
                {error && <p className="text-sm text-red-600 font-body">{error}</p>}
                <button type="submit" disabled={submitting}
                  className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
