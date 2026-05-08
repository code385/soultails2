export function LocalBusinessSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['VeterinaryOrganization', 'LocalBusiness'],
    name: 'Soultails Veterinary Care',
    description:
      'Expert integrative veterinary care for cats, dogs and senior pets. Home visits in South East London and parts of Kent, plus remote consultations across the UK.',
    url: 'https://soultails.com',
    image: 'https://soultails.com/logo.png',
    logo: {
      '@type': 'ImageObject',
      url: 'https://soultails.com/logo.png',
    },
    email: 'soultailsinfo@gmail.com',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'soultailsinfo@gmail.com',
      availableLanguage: ['English'],
    },
    areaServed: {
      '@type': 'Place',
      name: 'United Kingdom',
    },
    serviceArea: [
      { '@type': 'Place', name: 'South East London' },
      { '@type': 'Place', name: 'Kent' },
      { '@type': 'Place', name: 'United Kingdom' },
    ],
    founder: {
      '@type': 'Person',
      name: 'Dr. Claudia Fioravanti',
      jobTitle: 'Integrative Veterinary Expert',
      description: 'DVM MRCVS CertAVP ISFMAdvCerFB - Expert integrative veterinary care',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Veterinary Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Remote Veterinary Consultation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Home Visit Veterinary Care' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Feline Behaviour Consultation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chronic Pain Management' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Palliative & End-of-Life Care' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Senior Pet Care' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nutrition & Integrative Care' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pet Transport' } },
      ],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Soultails Veterinary Care',
    url: 'https://soultails.com',
    description:
      'Integrative veterinary care in London and online across the UK, with support for feline behaviour, chronic pain, senior pets and home visits.',
    publisher: {
      '@type': 'Organization',
      name: 'Soultails Veterinary Care',
      logo: {
        '@type': 'ImageObject',
        url: 'https://soultails.com/logo.png',
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  )
}

export function BlogPostSchema({ title, excerpt, publishedAt, slug }: {
  title: string
  excerpt: string
  publishedAt: string
  slug: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    datePublished: publishedAt,
    url: `https://soultails.com/blog/${slug}`,
    author: {
      '@type': 'Person',
      name: 'Dr. Claudia Fioravanti',
      url: 'https://soultails.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Soultails Veterinary Care',
      url: 'https://soultails.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://soultails.com/logo.png',
      },
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
