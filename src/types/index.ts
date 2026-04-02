export interface Post {
  _id: string; title: string; slug: { current: string }
  excerpt: string; category: string; coverImage: any
  publishedAt: string; featured?: boolean; body?: any[]
  metaTitle?: string; metaDescription?: string
}
export interface Service {
  _id: string; name: string; slug: { current: string }
  shortDescription: string; fullDescription?: any[]
  icon?: string; serviceMode: "remote" | "home_visit" | "both"
  priceDisplay?: string; duration?: string
  whatToExpect?: string[]; featured?: boolean; metaDescription?: string
}
export interface SiteSettings {
  doctorName: string; tagline?: string; bio?: any[]
  profileImage?: any; credentials?: string[]
  phone?: string; email?: string; serviceArea?: string
  instagram?: string; linkedin?: string; facebook?: string
}
export interface BookingFormData {
  clientName: string; clientEmail: string; clientPhone: string
  petName: string; petType: string; petAge?: string; petBreed?: string
  serviceSlug: string; serviceName: string; serviceMode: "REMOTE" | "HOME_VISIT"
  concern: string; preferredDate: string; preferredTime: string
}
