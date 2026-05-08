import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)
export const urlFor = (src: SanityImageSource) => builder.image(src)

function dedupeServicesBySlug<T extends { slug?: { current?: string } | string; _id?: string }>(services: T[]) {
  const seen = new Set<string>()

  return services.filter((service) => {
    const slug = typeof service.slug === "string" ? service.slug : service.slug?.current
    const key = slug ?? service._id ?? ""
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export async function getAllPosts() {
  return sanityClient.fetch(`*[_type=="post"]|order(publishedAt desc){_id,title,slug,excerpt,category,coverImage,publishedAt,featured}`)
}
export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(`*[_type=="post"&&slug.current==$slug][0]{_id,title,slug,excerpt,category,coverImage,body,publishedAt,metaTitle,metaDescription}`, { slug })
}
export async function getFeaturedPosts() {
  return sanityClient.fetch(`*[_type=="post"&&featured==true]|order(publishedAt desc)[0...3]{_id,title,slug,excerpt,category,coverImage,publishedAt}`)
}
export async function getPostsByCategory(category: string) {
  return sanityClient.fetch(`*[_type=="post"&&category==$category]|order(publishedAt desc){_id,title,slug,excerpt,category,coverImage,publishedAt}`, { category })
}
export async function getAllServices() {
  const services = await sanityClient.fetch(`*[_type=="service"]|order(order asc, _createdAt asc){_id,name,"slug":slug.current,shortDescription,icon,image,serviceMode,priceDisplay,remotePrice,homeVisitPrice,duration,featured,bestFor,availability,pricingNote,ctaLabel,serviceAreaLabel,hidePublicPricing}`)
  return dedupeServicesBySlug(services)
}
export async function getServiceBySlug(slug: string) {
  return sanityClient.fetch(`*[_type=="service"&&slug.current==$slug][0]{_id,name,"slug":slug.current,shortDescription,fullDescription,icon,image,serviceMode,priceDisplay,remotePrice,homeVisitPrice,duration,whatToExpect,metaDescription,bestFor,availability,pricingNote,ctaLabel,serviceAreaLabel,hidePublicPricing}`, { slug })
}
export async function getFeaturedServices() {
  const services = await sanityClient.fetch(`*[_type=="service"&&featured==true]|order(order asc, _createdAt asc){_id,name,"slug":slug.current,shortDescription,icon,image,serviceMode,priceDisplay,remotePrice,homeVisitPrice,bestFor,availability,pricingNote,ctaLabel,serviceAreaLabel,hidePublicPricing}`)
  return dedupeServicesBySlug(services)
}
export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type=="siteSettings"][0]{doctorName,tagline,bio,profileImage,credentials,phone,email,serviceArea,instagram,linkedin,facebook,quote,aboutValues}`)
}
