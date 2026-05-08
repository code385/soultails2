export type BookingMode = 'REMOTE' | 'HOME_VISIT'

type BookingService = {
  value: string
  label: string
  modes: BookingMode[]
  slug?: string
}

type ServiceEnhancement = {
  bestFor: string
  availability: string
  serviceArea: string
  pricingNote: string
  ctaLabel: string
  bookingMode: BookingMode
  bookingValue?: string
}

export const SHARED_PAYMENT_MESSAGE =
  "Submit your enquiry request. Dr. Claudia will review your pet's needs and confirm availability within 24 hours. Once confirmed, you'll receive a secure PayPal payment link."

export const EMERGENCY_DISCLAIMER =
  'Soultails is not an emergency veterinary service. If your pet needs urgent or emergency care, please contact your nearest emergency veterinary clinic immediately.'

export const SERVICES_PAGE_FAQS = [
  {
    question: 'Do you provide emergency veterinary care?',
    answer: EMERGENCY_DISCLAIMER,
  },
  {
    question: 'Which areas do you cover for home visits?',
    answer: 'Home visits are available across South East London and parts of Kent, subject to availability and your pet\'s needs.',
  },
  {
    question: 'Can I book a remote consultation from anywhere in the UK?',
    answer: 'Yes. Remote consultations are available across the UK for non-emergency advice, follow-ups, behaviour support, nutrition and integrative guidance.',
  },
  {
    question: 'How does payment work?',
    answer: SHARED_PAYMENT_MESSAGE,
  },
]

export const SERVICE_DECISION_GUIDE = [
  {
    title: 'Remote Consultation',
    description: 'Best for general advice, second opinions, behaviour support, nutrition guidance and non-emergency follow-ups across the UK.',
  },
  {
    title: 'Home Visit',
    description: 'Best for hands-on assessment, mobility issues, senior pets, anxious pets or families who prefer care at home.',
  },
  {
    title: 'Feline Behaviour',
    description: 'Best for cat behaviour concerns such as house soiling, anxiety, aggression, over-grooming or environmental stress.',
  },
  {
    title: 'Chronic Pain Support',
    description: 'Best for arthritis, mobility changes, long-term pain, comfort care and senior pet support.',
  },
]

export const BOOKING_SERVICES: BookingService[] = [
  {
    value: 'REMOTE_CONSULTATION',
    label: 'Remote Consultation',
    modes: ['REMOTE'],
    slug: 'remote-consultation',
  },
  {
    value: 'REMOTE_FOLLOWUP',
    label: 'Remote Follow-up',
    modes: ['REMOTE'],
    slug: 'remote-consultation',
  },
  {
    value: 'HOME_VISIT_CONSULTATION',
    label: 'Home Visit Consultation',
    modes: ['HOME_VISIT'],
    slug: 'home-visit',
  },
  {
    value: 'FELINE_BEHAVIOUR_CONSULTATION',
    label: 'Feline Behaviour Consultation',
    modes: ['REMOTE', 'HOME_VISIT'],
    slug: 'feline-behaviour',
  },
  {
    value: 'CHRONIC_PAIN_MANAGEMENT',
    label: 'Chronic Pain Management',
    modes: ['REMOTE', 'HOME_VISIT'],
    slug: 'chronic-pain-management',
  },
  {
    value: 'PUPPY_KITTEN_CONSULTATION',
    label: 'Puppy & Kitten Consultation',
    modes: ['REMOTE', 'HOME_VISIT'],
    slug: 'puppy-kitten-consultations',
  },
  {
    value: 'ACUPUNCTURE_OSTEOPATHY',
    label: 'Acupuncture & Osteopathy',
    modes: ['HOME_VISIT'],
    slug: 'acupuncture-osteopathy',
  },
  {
    value: 'NUTRITION_HERBAL_MEDICINE',
    label: 'Nutrition & Herbal Medicine',
    modes: ['REMOTE', 'HOME_VISIT'],
    slug: 'nutrition-integrative',
  },
  {
    value: 'PALLIATIVE_SENIOR_PET_CARE',
    label: 'Palliative & Senior Pet Care',
    modes: ['REMOTE', 'HOME_VISIT'],
    slug: 'palliative-care',
  },
  {
    value: 'PET_TRANSPORT',
    label: 'Pet Transport',
    modes: ['HOME_VISIT'],
    slug: 'pet-transport',
  },
  {
    value: 'NOT_SURE_HELP_ME_CHOOSE',
    label: 'Not sure / Help me choose',
    modes: ['REMOTE', 'HOME_VISIT'],
  },
]

export const SERVICE_ENHANCEMENTS: Record<string, ServiceEnhancement> = {
  'home-visit': {
    bestFor: 'Best for pets who feel stressed at clinics, need a hands-on assessment, have mobility issues, or benefit from calm home-based care.',
    availability: 'South East London and parts of Kent',
    serviceArea: 'Home visit',
    pricingNote: 'Pricing depends on your pet\'s needs and location. Send an enquiry and Dr. Claudia will confirm the best option within 24 hours.',
    ctaLabel: 'Request home visit',
    bookingMode: 'HOME_VISIT',
    bookingValue: 'HOME_VISIT_CONSULTATION',
  },
  'remote-consultation': {
    bestFor: 'Best for general advice, second opinions, follow-ups, nutrition support, behaviour concerns and non-emergency guidance.',
    availability: 'Across the UK via Zoom',
    serviceArea: 'Remote consultation',
    pricingNote: 'Remote consultation pricing is confirmed after enquiry and based on the support your pet needs.',
    ctaLabel: 'Book remote consultation',
    bookingMode: 'REMOTE',
    bookingValue: 'REMOTE_CONSULTATION',
  },
  'feline-behaviour': {
    bestFor: 'Best for house soiling, anxiety, aggression, over-grooming, conflict between cats and other behaviour concerns.',
    availability: 'Remote across the UK or home visits in South East London and parts of Kent',
    serviceArea: 'Remote or home visit',
    pricingNote: 'Behaviour cases vary in complexity. A questionnaire is reviewed before the appointment and final pricing is confirmed after enquiry.',
    ctaLabel: 'Book feline behaviour consultation',
    bookingMode: 'REMOTE',
    bookingValue: 'FELINE_BEHAVIOUR_CONSULTATION',
  },
  'chronic-pain-management': {
    bestFor: 'Best for arthritis, mobility changes, long-term pain, comfort care, recovery support and senior pets needing ongoing management.',
    availability: 'Remote across the UK or home visits in South East London and parts of Kent',
    serviceArea: 'Remote or home visit',
    pricingNote: 'Pricing depends on whether your pet needs remote guidance or hands-on support. Final cost is confirmed after enquiry.',
    ctaLabel: 'Get chronic pain support',
    bookingMode: 'REMOTE',
    bookingValue: 'CHRONIC_PAIN_MANAGEMENT',
  },
  'puppy-kitten-consultations': {
    bestFor: 'Best for new puppies and kittens who need preventative care, feeding guidance, behaviour foundations and a healthy start.',
    availability: 'Remote across the UK or home visits in South East London and parts of Kent',
    serviceArea: 'Remote or home visit',
    pricingNote: 'Pricing is confirmed after enquiry based on whether you need remote guidance or a home visit.',
    ctaLabel: 'Book puppy or kitten consultation',
    bookingMode: 'REMOTE',
    bookingValue: 'PUPPY_KITTEN_CONSULTATION',
  },
  'acupuncture-osteopathy': {
    bestFor: 'Best for pain management, mobility support, musculoskeletal issues, recovery care and pets who may benefit from integrative physical therapies.',
    availability: 'South East London and parts of Kent',
    serviceArea: 'Home visit',
    pricingNote: 'Treatment plans are tailored to your pet. Final pricing is confirmed after enquiry.',
    ctaLabel: 'Request acupuncture or osteopathy',
    bookingMode: 'HOME_VISIT',
    bookingValue: 'ACUPUNCTURE_OSTEOPATHY',
  },
  'nutrition-integrative': {
    bestFor: 'Best for diet reviews, chronic conditions, gut and skin issues, herbal support, supplements and integrative health planning.',
    availability: 'Remote across the UK or home visits in South East London and parts of Kent',
    serviceArea: 'Remote or home visit',
    pricingNote: 'Pricing depends on the depth of review your pet needs and is confirmed after enquiry.',
    ctaLabel: 'Book nutrition support',
    bookingMode: 'REMOTE',
    bookingValue: 'NUTRITION_HERBAL_MEDICINE',
  },
  'palliative-care': {
    bestFor: 'Best for senior pets, end-of-life planning, comfort care, quality-of-life reviews and ongoing family support.',
    availability: 'Remote across the UK or home visits in South East London and parts of Kent',
    serviceArea: 'Remote or home visit',
    pricingNote: 'Pricing depends on the support required and whether a home visit is needed. Final cost is confirmed after enquiry.',
    ctaLabel: 'Request senior pet support',
    bookingMode: 'HOME_VISIT',
    bookingValue: 'PALLIATIVE_SENIOR_PET_CARE',
  },
  'pet-transport': {
    bestFor: 'Best for vet visits, relocation support, senior pets or pets who need calm, assisted door-to-door travel.',
    availability: 'Available on request for small to medium pets in London and Kent',
    serviceArea: 'Door-to-door transport',
    pricingNote: 'Pricing is based on distance, timing and your pet\'s needs. Final cost is confirmed after enquiry.',
    ctaLabel: 'Ask about pet transport',
    bookingMode: 'HOME_VISIT',
    bookingValue: 'PET_TRANSPORT',
  },
}

export function getBookingServicesForMode(mode: BookingMode) {
  return BOOKING_SERVICES.filter((service) => service.modes.includes(mode))
}

export function formatServiceTypeLabel(value: string) {
  const exactMatch = BOOKING_SERVICES.find((service) => service.value === value)
  if (exactMatch) return exactMatch.label

  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function getServiceEnhancement(slug: string) {
  return SERVICE_ENHANCEMENTS[slug]
}

export function getResolvedServiceEnhancement(service: {
  slug: string
  bestFor?: string
  availability?: string
  pricingNote?: string
  ctaLabel?: string
  serviceAreaLabel?: string
}) {
  const fallback = getServiceEnhancement(service.slug)
  if (!fallback) return undefined

  return {
    ...fallback,
    bestFor: service.bestFor ?? fallback.bestFor,
    availability: service.availability ?? fallback.availability,
    pricingNote: service.pricingNote ?? fallback.pricingNote,
    ctaLabel: service.ctaLabel ?? fallback.ctaLabel,
    serviceArea: service.serviceAreaLabel ?? fallback.serviceArea,
  }
}

export function getBookingHref(slug: string) {
  const enhancement = getServiceEnhancement(slug)
  if (!enhancement) return '/book'

  const params = new URLSearchParams({
    mode: enhancement.bookingMode,
  })

  if (enhancement.bookingValue) {
    params.set('service', enhancement.bookingValue)
  }

  return `/book?${params.toString()}`
}

export function getPriceSummary(service: {
  priceDisplay?: string
  remotePrice?: string
  homeVisitPrice?: string
  serviceMode?: string
}) {
  if (service.remotePrice && service.homeVisitPrice) {
    return `Remote from ${service.remotePrice} | Home visit from ${service.homeVisitPrice}`
  }

  if (service.remotePrice) {
    return `From ${service.remotePrice}`
  }

  if (service.homeVisitPrice) {
    return `From ${service.homeVisitPrice}`
  }

  if (service.priceDisplay) {
    return service.priceDisplay
  }

  return 'Pricing confirmed after enquiry'
}
