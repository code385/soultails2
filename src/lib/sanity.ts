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
  return sanityClient.fetch(`*[_type=="service"]|order(order asc){_id,name,slug,shortDescription,icon,serviceMode,priceDisplay,duration,featured}`)
}
export async function getServiceBySlug(slug: string) {
  return sanityClient.fetch(`*[_type=="service"&&slug.current==$slug][0]{_id,name,slug,shortDescription,fullDescription,icon,serviceMode,priceDisplay,duration,whatToExpect,metaDescription}`, { slug })
}
export async function getFeaturedServices() {
  return sanityClient.fetch(`*[_type=="service"&&featured==true]|order(order asc){_id,name,slug,shortDescription,icon,serviceMode,priceDisplay}`)
}
export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type=="siteSettings"][0]{doctorName,tagline,bio,profileImage,credentials,phone,email,serviceArea,instagram,linkedin,facebook}`)
}
