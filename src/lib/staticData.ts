// ============================================
// SOULTAILS - STATIC FALLBACK DATA
// Used when Sanity CMS is not configured yet
// ============================================

export const STATIC_SERVICES = [
  {
    slug: 'home-visit',
    name: 'Home Visit Consultation',
    shortDescription:
      "Dr. Claudia comes to you - expert integrative veterinary care in the comfort of your home. Available 10am to 4pm in South East London and parts of Kent.",
    fullDescription: [
      "Soultails brings high-quality veterinary care into your home, shaped around your pet's individual needs, pace and personality.",
      'This allows veterinary care to happen in a more familiar setting, where many pets feel calmer and can be assessed more accurately.',
      "Most visits last 30 to 40 minutes, though it is best to allow up to an hour so your pet can be seen without rushing.",
      'Appointments are confirmed after Dr. Claudia reviews your enquiry, confirms availability and sends a secure PayPal payment link.',
    ],
    icon: 'Home',
    serviceMode: 'home_visit',
    priceDisplay: '\u00a3130',
    duration: '30-60 minutes',
    whatToExpect: [
      'A half-hour arrival window before the visit',
      "A full clinical assessment in your pet's familiar environment",
      'Physical examination and treatment where appropriate',
      'Integrative and conventional treatment recommendations',
      'Secure payment link sent after booking confirmation',
    ],
    metaDescription:
      'Home visit vet in South East London and Kent by Dr. Claudia Fioravanti DVM MRCVS. Integrative veterinary care for pets in the comfort of home.',
  },
  {
    slug: 'remote-consultation',
    name: 'Remote Consultation',
    shortDescription:
      'Expert veterinary advice by secure Zoom call - ideal for second opinions, follow-ups, behaviour support, nutrition guidance and non-emergency concerns across the UK.',
    fullDescription: [
      "Depending on your pet's condition, remote consultations may be the best way to get timely guidance without the stress of travel.",
      "Before your appointment, you'll receive a secure Zoom link. Dr. Claudia will take time to listen, observe your pet where possible and provide a considered assessment.",
      'Remote follow-up appointments are also available when ongoing support is needed.',
    ],
    icon: 'Video',
    serviceMode: 'remote',
    priceDisplay: 'From \u00a390',
    remotePrice: '\u00a390',
    duration: 'Up to 30 minutes',
    whatToExpect: [
      'Secure Zoom link sent by email after confirmation',
      'Thorough history-taking and visual assessment',
      'Recommendations that combine conventional and integrative approaches',
      'Follow-up appointments available when needed',
      'Prescription referrals coordinated with your local vet if appropriate',
    ],
    metaDescription:
      'Remote vet consultation across the UK with Dr. Claudia Fioravanti DVM MRCVS. Integrative veterinary advice by Zoom.',
  },
  {
    slug: 'feline-behaviour',
    name: 'Feline Behaviour Consultation',
    shortDescription:
      'Specialist cat behaviour support for anxiety, conflict, house soiling, over-grooming and environmental stress. Available remotely across the UK or as a home visit in South East London and parts of Kent.',
    remotePrice: '\u00a390',
    homeVisitPrice: '\u00a3130',
    fullDescription: [
      'Dr. Claudia Fioravanti holds the ISFM Advanced Certificate in Feline Behaviour, a specialist qualification in this field.',
      'Before the consultation, you will complete a behaviour questionnaire so the background and context can be reviewed in detail.',
      "Behaviour concerns can involve the home environment, medical factors, routine, social tension and unmet behavioural needs. Each case is approached holistically.",
      "Home visits can be especially valuable for behaviour cases because they allow the cat's environment to be considered directly.",
    ],
    icon: 'Heart',
    serviceMode: 'both',
    priceDisplay: 'From \u00a390',
    duration: '60-90 minutes',
    whatToExpect: [
      'Detailed behaviour questionnaire before the appointment',
      'Full environmental and lifestyle assessment',
      'Clear review of triggers and possible underlying causes',
      'Personalised behaviour support plan',
      'Follow-up support where needed',
    ],
    metaDescription:
      'Feline behaviour consultation UK with Dr. Claudia Fioravanti ISFMAdvCerFB. Remote and home visit support for cat behaviour concerns.',
  },
  {
    slug: 'chronic-pain-management',
    name: 'Chronic Pain Management',
    shortDescription:
      'Integrative support for arthritis, mobility issues and long-term pain - combining conventional veterinary medicine with therapies such as acupuncture, osteopathy and rehabilitation guidance.',
    fullDescription: [
      'Chronic pain is often under-recognised in pets, especially when symptoms build gradually over time.',
      'Dr. Claudia uses a multimodal approach that may include pain scoring, medication review, lifestyle advice, acupuncture, osteopathy, massage, herbal support and nutrition guidance.',
      "Ongoing reviews are often useful so the plan can evolve with your pet's comfort, mobility and quality of life.",
    ],
    icon: 'Activity',
    serviceMode: 'both',
    priceDisplay: 'From \u00a390',
    remotePrice: '\u00a390',
    homeVisitPrice: '\u00a3130',
    duration: '45-60 minutes',
    whatToExpect: [
      'Comprehensive pain and mobility assessment',
      'Tailored multimodal pain management plan',
      'Integration of conventional and complementary approaches',
      'Hands-on therapies where appropriate for home visits',
      'Ongoing monitoring and reassessment',
    ],
    metaDescription:
      'Chronic pain management for dogs and cats by Dr. Claudia Fioravanti DVM MRCVS. Integrative support for mobility and comfort.',
  },
  {
    slug: 'puppy-kitten-consultations',
    name: 'Puppy & Kitten Consultations',
    shortDescription:
      'Preventative care, nutrition guidance and early-life support to help puppies and kittens get the healthiest possible start.',
    fullDescription: [
      "The first months of a puppy or kitten's life shape their long-term health and wellbeing.",
      'These consultations go beyond a basic health check and cover feeding, parasite prevention, vaccination discussions, socialisation and early behaviour foundations.',
      'Recommendations are tailored to your pet, their breed, their home environment and your goals as a family.',
    ],
    icon: 'Star',
    serviceMode: 'both',
    priceDisplay: 'From \u00a390',
    remotePrice: '\u00a390',
    homeVisitPrice: '\u00a3130',
    duration: '45-60 minutes',
    whatToExpect: [
      'Age-appropriate health assessment',
      'Nutrition and feeding guidance',
      'Vaccination and parasite prevention discussion',
      'Socialisation and behaviour foundations',
      'Preventative care plan for the months ahead',
    ],
    metaDescription:
      'Puppy and kitten consultations with Dr. Claudia Fioravanti DVM MRCVS. Integrative preventative care in London and online.',
  },
  {
    slug: 'acupuncture-osteopathy',
    name: 'Acupuncture & Osteopathy',
    shortDescription:
      'Evidence-based complementary therapies that support pain relief, mobility and recovery, used alongside conventional veterinary treatment.',
    fullDescription: [
      'Acupuncture, osteopathy and massage can play a valuable role in integrative care when chosen for the right patient and condition.',
      'These therapies are used to support comfort, mobility, healing and quality of life as part of a wider treatment plan.',
      'They are always integrated with conventional veterinary medicine rather than used as a substitute for it.',
    ],
    icon: 'Leaf',
    serviceMode: 'home_visit',
    priceDisplay: '\u00a3130',
    duration: '30-60 minutes',
    whatToExpect: [
      'Assessment to decide whether treatment is appropriate',
      'Acupuncture using sterile single-use needles where suitable',
      'Osteopathy and massage when appropriate',
      "Integration with your pet's wider treatment plan",
      'Regular sessions recommended where ongoing support is beneficial',
    ],
    metaDescription:
      'Veterinary acupuncture and osteopathy for pets in South East London and Kent by Dr. Claudia Fioravanti DVM MRCVS.',
  },
  {
    slug: 'nutrition-integrative',
    name: 'Nutrition & Herbal Medicine',
    shortDescription:
      'Personalised nutrition plans, supplement support and herbal medicine recommendations as part of evidence-based integrative care.',
    fullDescription: [
      'Nutrition is a core part of whole-animal health and can influence energy, digestion, skin, weight, recovery and long-term wellbeing.',
      'Dr. Claudia reviews diet, routine, medical history and current concerns to build a practical plan for your pet.',
      'Where appropriate, herbal medicine, nutraceuticals and other integrative options may be included alongside conventional care.',
    ],
    icon: 'Leaf',
    serviceMode: 'both',
    priceDisplay: 'From \u00a390',
    remotePrice: '\u00a390',
    homeVisitPrice: '\u00a3130',
    duration: '45-60 minutes',
    whatToExpect: [
      'Detailed dietary history and nutritional assessment',
      'Personalised recommendations tailored to your pet',
      'Supplement and herbal medicine guidance where appropriate',
      'Practical steps you can follow at home',
      'Review appointments for ongoing conditions if needed',
    ],
    metaDescription:
      'Pet nutrition and herbal medicine support by Dr. Claudia Fioravanti DVM MRCVS. Integrative guidance for cats and dogs in London and across the UK online.',
  },
  {
    slug: 'palliative-care',
    name: 'Palliative & Senior Pet Care',
    shortDescription:
      'Compassionate, unhurried support for senior pets and end-of-life care, focused on comfort, dignity and quality of life.',
    fullDescription: [
      'As pets age or enter advanced illness, care often needs to become more tailored, gentle and practical.',
      'Dr. Claudia supports families with comfort-focused care, symptom management, quality-of-life discussions and planning for the next steps.',
      'Senior pet consultations also help review mobility, cognition, behaviour, environment and routine so life can remain as comfortable and meaningful as possible.',
    ],
    icon: 'Heart',
    serviceMode: 'both',
    priceDisplay: 'Pricing confirmed after enquiry',
    remotePrice: '\u00a390',
    homeVisitPrice: '\u00a3130',
    duration: 'As needed',
    whatToExpect: [
      'Compassionate assessment without rushing',
      'Personalised comfort and senior care planning',
      'Pain and symptom management guidance',
      'Support with quality-of-life decisions',
      'Sensitive family guidance and follow-up where needed',
    ],
    metaDescription:
      'Palliative and senior pet care with Dr. Claudia Fioravanti DVM MRCVS. Compassionate integrative support in London and online across the UK.',
  },
  {
    slug: 'pet-transport',
    name: 'Pet Transport',
    shortDescription:
      'Calm, assisted door-to-door transport for small to medium pets who need support getting to appointments or travelling safely.',
    fullDescription: [
      'Some pets and families need practical help with transport, especially for vet appointments, mobility limitations, relocation or senior care.',
      'Soultails offers pet transport support designed to reduce stress and keep the journey as calm and safe as possible.',
      'Availability depends on distance, the type of journey and your pet\'s needs.',
    ],
    icon: 'Home',
    serviceMode: 'home_visit',
    priceDisplay: 'Pricing confirmed after enquiry',
    duration: 'Varies by journey',
    whatToExpect: [
      'Door-to-door transport arranged around your pet\'s needs',
      'Suitable for small to medium pets on request',
      'Travel planning based on distance, timing and support required',
      'Clear confirmation of cost before the journey is booked',
    ],
    metaDescription:
      'Pet transport in London and Kent for small to medium pets. Calm, assisted door-to-door support from Soultails.',
  },
]

export const STATIC_POSTS = [
  {
    slug: 'signs-your-cat-is-in-pain',
    title: '5 Signs Your Cat May Be in Chronic Pain',
    excerpt:
      'Cats are masters at hiding discomfort. Learn the subtle behavioural and physical signs that may indicate your cat is experiencing chronic pain and what to do next.',
    category: 'pain-management',
    publishedAt: '2024-03-15',
    body: [],
    featured: true,
  },
  {
    slug: 'integrative-vs-conventional-vet',
    title: 'What Is Integrative Veterinary Medicine?',
    excerpt:
      'Integrative veterinary medicine combines the best of conventional evidence-based medicine with carefully selected complementary therapies. Here is what that means in practice.',
    category: 'general',
    publishedAt: '2024-02-28',
    body: [],
    featured: true,
  },
  {
    slug: 'cat-behaviour-home-environment',
    title: 'How Your Home Environment Affects Your Cat\'s Behaviour',
    excerpt:
      'Indoor cats rely entirely on us to meet their behavioural needs. Small changes to the home environment can have a powerful impact on wellbeing and behaviour.',
    category: 'feline-behaviour',
    publishedAt: '2024-01-20',
    body: [],
    featured: false,
  },
]

export const SITE_SETTINGS = {
  doctorName: 'Dr. Claudia Fioravanti',
  tagline: 'Bringing high quality veterinary care to the comfort of your home',
  credentials: ['DVM', 'MRCVS', 'CertAVP', 'ISFMAdvCerFB'],
  email: 'soultailsinfo@gmail.com',
  serviceArea: 'South East London & parts of Kent',
}
