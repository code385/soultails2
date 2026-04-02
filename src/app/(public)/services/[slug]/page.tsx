import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle, ArrowLeft, Clock, Video, Home } from 'lucide-react'
import { STATIC_SERVICES } from '@/lib/staticData'

export async function generateStaticParams() {
  return STATIC_SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = STATIC_SERVICES.find(s => s.slug === params.slug)
  if (!service) return { title: 'Service not found' }
  return {
    title: service.name,
    description: service.metaDescription || service.shortDescription,
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = STATIC_SERVICES.find(s => s.slug === params.slug)
  if (!service) notFound()

  const related = STATIC_SERVICES.filter(s => s.slug !== service.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <Link href="/services" className="inline-flex items-center gap-2 font-body text-sm text-brand-muted hover:text-primary transition-colors mb-6">
            <ArrowLeft size={14} /> All services
          </Link>
          <div className="max-w-2xl">
            <div className="section-tag mb-4">Service</div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-4">{service.name}</h1>
            <p className="font-body text-lg text-brand-muted leading-relaxed mb-6">{service.shortDescription}</p>
            <div className="flex flex-wrap gap-3">
              {service.priceDisplay && (
                <span className="font-body text-sm font-bold px-4 py-2 rounded-full" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                  {service.priceDisplay}
                </span>
              )}
              {service.duration && (
                <span className="font-body text-sm text-brand-muted px-4 py-2 rounded-full border border-linen flex items-center gap-1.5">
                  <Clock size={13} /> {service.duration}
                </span>
              )}
              <span className="font-body text-sm text-brand-muted px-4 py-2 rounded-full border border-linen flex items-center gap-1.5">
                {service.serviceMode === 'remote' ? <Video size={13} /> : <Home size={13} />}
                {service.serviceMode === 'home_visit' ? 'Home visit' : service.serviceMode === 'both' ? 'Remote & home visit' : 'Remote'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-semibold text-brand-text mb-6">About this service</h2>
              <div className="space-y-4">
                {service.fullDescription.map((para, i) => (
                  <p key={i} className="font-body text-brand-muted leading-relaxed">{para}</p>
                ))}
              </div>

              {service.whatToExpect && (
                <div className="mt-10">
                  <h3 className="font-heading text-xl font-semibold text-brand-text mb-5">What to expect</h3>
                  <div className="space-y-3">
                    {service.whatToExpect.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle size={17} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                        <span className="font-body text-sm text-brand-muted leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="card p-6">
                <h3 className="font-heading text-lg font-semibold text-brand-text mb-4">Book this service</h3>
                {service.priceDisplay && (
                  <div className="mb-4 pb-4 border-b border-linen">
                    <div className="font-body text-xs text-brand-subtle mb-1">Starting from</div>
                    <div className="font-heading text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{service.priceDisplay}</div>
                  </div>
                )}
                <Link href="/book" className="btn-primary w-full mb-3">
                  Book now <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-outline w-full text-sm">
                  Ask a question
                </Link>
                <p className="font-body text-xs text-brand-subtle text-center mt-4">
                  {service.serviceMode === 'remote'
                    ? 'Payment taken at booking. Zoom link sent by email.'
                    : 'No payment required upfront. Dr. Claudia will confirm your booking.'}
                </p>
              </div>

              <div className="card p-6" style={{ background: 'var(--color-primary-light)', borderColor: 'rgba(200,91,110,0.15)' }}>
                <h3 className="font-heading text-base font-semibold text-brand-text mb-2">About Dr. Claudia</h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed mb-3">
                  DVM MRCVS CertAVP ISFMAdvCerFB — Expert integrative veterinary care with a focus on whole-animal wellbeing.
                </p>
                <Link href="/about" className="font-body text-sm font-bold hover:underline" style={{ color: 'var(--color-primary)' }}>
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--color-cream-dark)' }}>
          <div className="container-site">
            <h2 className="font-heading text-2xl font-semibold text-brand-text mb-8">Other services</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map(s => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="card p-5 group block">
                  <h3 className="font-heading text-lg font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="font-body text-xs text-brand-muted mb-3 line-clamp-2">{s.shortDescription}</p>
                  <span className="font-body text-xs font-bold" style={{ color: 'var(--color-primary)' }}>{s.priceDisplay}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
