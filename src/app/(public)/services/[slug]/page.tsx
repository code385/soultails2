import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle, ArrowLeft, Clock, Video, Home, ShieldAlert } from 'lucide-react'
import { getAllServices, getServiceBySlug, urlFor } from '@/lib/sanity'
import { STATIC_SERVICES } from '@/lib/staticData'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/PortableTextRenderer'
import {
  EMERGENCY_DISCLAIMER,
  SHARED_PAYMENT_MESSAGE,
  getBookingHref,
  getResolvedServiceEnhancement,
} from '@/lib/serviceCatalog'

export const revalidate = 60

export async function generateStaticParams() {
  const sanityServices = await getAllServices().catch(() => [])
  const services = sanityServices.length > 0 ? sanityServices : STATIC_SERVICES
  return services.map((service: any) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const sanityService = await getServiceBySlug(params.slug).catch(() => null)
  const service = sanityService ?? STATIC_SERVICES.find((item) => item.slug === params.slug)
  if (!service) return { title: 'Service not found' }

  return {
    title: `${service.name} | Soultails`,
    description: service.metaDescription || service.shortDescription,
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const sanityService = await getServiceBySlug(params.slug).catch(() => null)
  const service = sanityService ?? STATIC_SERVICES.find((item) => item.slug === params.slug)
  if (!service) notFound()

  const enhancement = getResolvedServiceEnhancement(service)
  const allSanityServices = await getAllServices().catch(() => [])
  const allServices = allSanityServices.length > 0 ? allSanityServices : STATIC_SERVICES
  const related = allServices.filter((item: any) => item.slug !== service.slug).slice(0, 3)
  const bookingHref = getBookingHref(service.slug)

  return (
    <>
      <section className="pt-28 pb-16" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-body text-sm text-brand-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={14} /> All services
          </Link>
          <div className="max-w-3xl">
            <div className="section-tag mb-4">Service</div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-4">{service.name}</h1>
            <p className="font-body text-lg text-brand-muted leading-relaxed mb-6">{service.shortDescription}</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="font-body text-sm font-bold px-4 py-2 rounded-full" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                Enquiry-based booking
              </span>
              {service.duration ? (
                <span className="font-body text-sm text-brand-muted px-4 py-2 rounded-full border border-linen flex items-center gap-1.5">
                  <Clock size={13} /> {service.duration}
                </span>
              ) : null}
              <span className="font-body text-sm text-brand-muted px-4 py-2 rounded-full border border-linen flex items-center gap-1.5">
                {service.serviceMode === 'remote' ? <Video size={13} /> : <Home size={13} />}
                {enhancement?.serviceArea ??
                  (service.serviceMode === 'home_visit' ? 'Home visit' : service.serviceMode === 'both' ? 'Remote or home visit' : 'Remote')}
              </span>
            </div>

            {enhancement ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-linen bg-white p-5">
                  <div className="font-body text-xs font-semibold uppercase tracking-wide text-brand-subtle mb-2">Best for</div>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{enhancement.bestFor}</p>
                </div>
                <div className="rounded-2xl border border-linen bg-white p-5">
                  <div className="font-body text-xs font-semibold uppercase tracking-wide text-brand-subtle mb-2">Available in</div>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{enhancement.availability}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {service.image ? (
        <div className="w-full" style={{ background: 'var(--color-cream-dark)' }}>
          <div className="container-site pb-10">
            <div className="relative w-full max-w-3xl h-64 lg:h-80 rounded-2xl overflow-hidden">
              <Image
                src={urlFor(service.image).width(900).height(500).fit('crop').url()}
                alt={service.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
          </div>
        </div>
      ) : null}

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-semibold text-brand-text mb-6">About this service</h2>
              <div className="space-y-4">
                {Array.isArray(service.fullDescription) && service.fullDescription.length > 0 ? (
                  typeof service.fullDescription[0] === 'string' ? (
                    service.fullDescription.map((paragraph: string, index: number) => (
                      <p key={index} className="font-body text-brand-muted leading-relaxed">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <PortableText value={service.fullDescription} components={portableTextComponents} />
                  )
                ) : null}
              </div>

              {service.whatToExpect && service.whatToExpect.length > 0 ? (
                <div className="mt-10">
                  <h3 className="font-heading text-xl font-semibold text-brand-text mb-5">What to expect</h3>
                  <div className="space-y-3">
                    {typeof service.whatToExpect[0] === 'string' ? (
                      service.whatToExpect.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle size={17} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                          <span className="font-body text-sm text-brand-muted leading-relaxed">{item}</span>
                        </div>
                      ))
                    ) : (
                      <PortableText value={service.whatToExpect} components={portableTextComponents} />
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-5">
              <div className="card p-6">
                <h3 className="font-heading text-lg font-semibold text-brand-text mb-4">Book this service</h3>
                <div className="mb-4 pb-4 border-b border-linen space-y-3">
                  <div>
                    <div className="font-body text-xs text-brand-subtle mb-1">Booking</div>
                    <div className="font-body text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                      Enquiry-based booking
                    </div>
                  </div>
                  {enhancement ? (
                    <p className="font-body text-xs text-brand-muted leading-relaxed">{enhancement.pricingNote}</p>
                  ) : null}
                </div>
                <Link href={bookingHref} className="btn-primary w-full mb-3">
                  {enhancement?.ctaLabel ?? 'Book now'} <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-outline w-full text-sm">
                  Ask a question
                </Link>
                <p className="font-body text-xs text-brand-subtle text-center mt-4">{SHARED_PAYMENT_MESSAGE}</p>
              </div>

              <div className="card p-6" style={{ background: 'var(--color-primary-light)', borderColor: 'rgba(200,91,110,0.15)' }}>
                <h3 className="font-heading text-base font-semibold text-brand-text mb-2">About Dr. Claudia</h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed mb-3">
                  DVM · MRCVS · CertAVP · ISFMAdvCerFB - Expert integrative veterinary care with a focus on whole-animal wellbeing.
                </p>
                <Link href="/about" className="font-body text-sm font-bold hover:underline" style={{ color: 'var(--color-primary)' }}>
                  Learn more -&gt;
                </Link>
              </div>

              <div className="rounded-2xl border border-linen bg-cream p-5">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <ShieldAlert size={16} />
                  <h3 className="font-body text-sm font-semibold">Non-emergency care</h3>
                </div>
                <p className="font-body text-xs text-brand-muted leading-relaxed">{EMERGENCY_DISCLAIMER}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section-pad" style={{ background: 'var(--color-cream-dark)' }}>
          <div className="container-site">
            <h2 className="font-heading text-2xl font-semibold text-brand-text mb-8">Other services</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((item: any) => (
                <Link key={item.slug} href={`/services/${item.slug}`} className="card p-5 group block">
                  <h3 className="font-heading text-lg font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-body text-xs text-brand-muted mb-3 line-clamp-2">{item.shortDescription}</p>
                  <span className="font-body text-xs font-bold" style={{ color: 'var(--color-primary)' }}>View service details</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
