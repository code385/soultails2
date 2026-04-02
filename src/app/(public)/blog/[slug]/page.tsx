import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p: any) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post not found' }
  return { title: post.metaTitle ?? post.title, description: post.metaDescription ?? post.excerpt }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, allPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getAllPosts()
  ])

  if (!post) notFound()

  const related = allPosts.filter((p: any) => p.slug.current !== params.slug).slice(0, 2)

  return (
    <>
      <section className="pt-28 pb-12" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="container-site max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 font-body text-sm text-brand-muted hover:text-primary transition-colors mb-6">
            <ArrowLeft size={14} /> All articles
          </Link>
          <span className="font-body text-xs font-bold mb-3 block capitalize" style={{ color: 'var(--color-primary)' }}>
            {post.category?.replace(/-/g, ' ')}
          </span>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-brand-text mb-4">{post.title}</h1>
          <p className="font-body text-base text-brand-muted mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold text-white" style={{ background: 'var(--color-primary)' }}>CF</div>
            <div>
              <div className="font-body text-sm font-semibold text-brand-text">Dr. Claudia Fioravanti</div>
              <div className="font-body text-xs text-brand-subtle">
                {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2">
              {post.coverImage
                ? <img src={urlFor(post.coverImage).width(800).url()} alt={post.coverImage.alt ?? post.title} className="w-full h-64 object-cover rounded-2xl mb-8" />
                : <div className="h-64 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'linear-gradient(135deg,#FCEEF1,#F5EDF9)' }}><span className="text-6xl">🐾</span></div>
              }

              <div className="prose-content space-y-5">
                <PortableText value={post.body} />
              </div>

              <div className="mt-12 pt-8 border-t border-linen">
                <div className="card p-6" style={{ background: 'var(--color-primary-light)', borderColor: 'rgba(200,91,110,0.15)' }}>
                  <h3 className="font-heading text-lg font-semibold text-brand-text mb-2">Have a question about your pet?</h3>
                  <p className="font-body text-sm text-brand-muted mb-4">Dr. Claudia offers remote consultations and home visits across the UK.</p>
                  <Link href="/book" className="btn-primary text-sm px-5 py-2.5 inline-flex">Book a consultation</Link>
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="card p-5">
                <h3 className="font-heading text-base font-semibold text-brand-text mb-3">About the author</h3>
                <p className="font-body text-sm text-brand-muted leading-relaxed mb-3">Dr. Claudia Fioravanti DVM MRCVS CertAVP ISFMAdvCerFB — Expert in integrative veterinary care.</p>
                <Link href="/about" className="font-body text-sm font-bold hover:underline" style={{ color: 'var(--color-primary)' }}>Read more →</Link>
              </div>

              {related.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-heading text-base font-semibold text-brand-text mb-4">Related articles</h3>
                  <div className="space-y-4">
                    {related.map((r: any) => (
                      <Link key={r._id} href={`/blog/${r.slug.current}`} className="block group">
                        <div className="font-body text-sm font-semibold text-brand-text group-hover:text-primary transition-colors line-clamp-2">{r.title}</div>
                        <div className="font-body text-xs text-brand-subtle mt-1">
                          {new Date(r.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}