import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Video, Home, Heart, Leaf, Activity, Star, ShieldCheck } from 'lucide-react'
import { getAllServices, urlFor } from '@/lib/sanity'
import { STATIC_SERVICES } from '@/lib/staticData'
import {
  EMERGENCY_DISCLAIMER,
  SERVICE_DECISION_GUIDE,
  SERVICES_PAGE_FAQS,
  SHARED_PAYMENT_MESSAGE,
  getBookingHref,
  getResolvedServiceEnhancement,
} from '@/lib/serviceCatalog'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Integrative Veterinary Services in London & UK Online | Soultails',
  description:
    'Home visits, remote vet consultations, feline behaviour, chronic pain, nutrition, senior pet care and pet transport by Dr. Claudia Fioravanti DVM MRCVS.',
}

const iconMap: Record<string, any> = { Video, Home, Heart, Leaf, Activity, Cat: Heart, Star }

export default async function ServicesPage() {
  const sanityServices = await getAllServices().catch(() => [])
  const services = sanityServices.length > 0 ? sanityServices : STATIC_SERVICES

  return (
    <>
      <section className="pt-28 pb-16" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">Integrative care</div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-6">
              Veterinary services tailored to your pet
            </h1>
            <p className="font-body text-lg text-brand-muted leading-relaxed mb-8">
              Home visits in South East London and parts of Kent, plus remote consultations across the UK for cats, dogs,
              senior pets and families looking for calm, compassionate veterinary support.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {SERVICE_DECISION_GUIDE.map((item) => (
                <div key={item.title} className="rounded-2xl border border-linen bg-white p-5">
                  <h2 className="font-heading text-lg font-semibold text-brand-text mb-2">{item.title}</h2>
                  <p className="font-body text-sm text-brand-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 border-y border-linen">
        <div className="container-site">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-body text-sm font-semibold text-brand-text">Led by Dr. Claudia Fioravanti</p>
              <p className="font-body text-sm text-brand-muted">
                DVM · MRCVS · CertAVP · ISFMAdvCerFB - Integrative veterinary care combining conventional medicine with complementary therapies.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-primary">
              <ShieldCheck size={16} />
              Non-emergency care only
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="mb-10 max-w-3xl">
            <h2 className="font-heading text-3xl font-semibold text-brand-text mb-4">Choose the right service</h2>
            <p className="font-body text-brand-muted leading-relaxed">
              Not sure what your pet needs? Choose a remote consultation for general advice, second opinions or follow-up
              support, a home visit for hands-on assessment, feline behaviour for cat-specific behaviour concerns, and
              chronic pain support for arthritis, mobility changes or senior pet comfort.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any) => {
              const Icon = iconMap[service.icon] ?? Heart
              const enhancement = getResolvedServiceEnhancement(service)
              const bookingHref = getBookingHref(service.slug)
              return (
                <article key={service.slug} className="card group flex flex-col overflow-hidden">
                  {service.image ? (
                    <div className="relative h-44 w-full overflow-hidden rounded-t-xl">
                      <Image
                        src={urlFor(service.image).width(600).height(352).fit('crop').url()}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : null}

                  <div className={`flex flex-1 flex-col p-6 lg:p-7 ${service.image ? '' : 'pt-6'}`}>
                    {!service.image ? (
                      <div
                        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110"
                        style={{ background: 'var(--color-primary-light)' }}
                      >
                        <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                      </div>
                    ) : null}

                    <h3 className="font-heading text-xl font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors">
                      <Link href={`/services/${service.slug}`}>{service.name}</Link>
                    </h3>
                    <p className="font-body text-sm text-brand-muted leading-relaxed mb-4">{service.shortDescription}</p>

                    {enhancement ? (
                      <div className="space-y-3 mb-5">
                        <div>
                          <div className="font-body text-xs font-semibold uppercase tracking-wide text-brand-subtle mb-1">Best for</div>
                          <p className="font-body text-sm text-brand-muted leading-relaxed">{enhancement.bestFor}</p>
                        </div>
                        <div>
                          <div className="font-body text-xs font-semibold uppercase tracking-wide text-brand-subtle mb-1">Available in</div>
                          <p className="font-body text-sm text-brand-muted leading-relaxed">{enhancement.availability}</p>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-auto space-y-4 border-t border-linen pt-4">
                      <div>
                        <div className="font-body text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                          Enquiry-based booking
                        </div>
                        <p className="font-body text-xs text-brand-subtle mt-1">
                          {enhancement?.pricingNote ?? 'Details are confirmed after enquiry based on your pet\'s needs.'}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-3 items-stretch">
                        <Link href={bookingHref} className="btn-primary w-full justify-center text-sm min-h-[52px] px-5 text-center">
                          {enhancement?.ctaLabel ?? 'Book now'} <ArrowRight size={14} />
                        </Link>
                        <Link href={`/services/${service.slug}`} className="btn-outline w-full sm:w-auto justify-center text-sm min-h-[52px] px-5 text-center">
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-cream-dark)' }} className="section-pad">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div className="card p-7">
            <h2 className="font-heading text-2xl font-semibold text-brand-text mb-4">Who this is for</h2>
            <p className="font-body text-brand-muted leading-relaxed">
              Soultails is ideal for pet owners looking for calm, compassionate, unhurried veterinary support -
              especially for senior pets, cats, anxious pets, chronic pain cases, behaviour concerns and families who
              prefer home-based or remote care.
            </p>
          </div>
          <div className="card p-7">
            <h2 className="font-heading text-2xl font-semibold text-brand-text mb-4">How booking works</h2>
            <p className="font-body text-brand-muted leading-relaxed">{SHARED_PAYMENT_MESSAGE}</p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold text-brand-text mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {SERVICES_PAGE_FAQS.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-linen p-5">
                <h3 className="font-heading text-lg font-semibold text-brand-text mb-2">{faq.question}</h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12" style={{ background: 'var(--color-primary-light)' }}>
        <div className="container-site max-w-4xl text-center">
          <p className="font-body text-sm font-semibold text-primary mb-2">Important</p>
          <p className="font-body text-brand-muted leading-relaxed">{EMERGENCY_DISCLAIMER}</p>
        </div>
      </section>

      <section className="cta-gradient py-16">
        <div className="container-site text-center">
          <h2 className="font-heading text-3xl font-semibold text-white mb-4">Need help choosing the right service?</h2>
          <p className="font-body mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Send an enquiry and Dr. Claudia will help you choose the best next step for your pet.
          </p>
          <Link
            href="/book?service=NOT_SURE_HELP_ME_CHOOSE&mode=REMOTE"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white font-body font-bold text-sm rounded-full hover:bg-cream transition-all"
            style={{ color: 'var(--color-primary)' }}
          >
            Ask for guidance <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
