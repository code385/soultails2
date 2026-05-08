import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, urlFor } from '@/lib/sanity'
import { STATIC_POSTS } from '@/lib/staticData'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog & Resources',
  description: 'Expert veterinary advice, feline behaviour tips, and integrative care resources from Dr. Claudia Fioravanti DVM MRCVS.',
}

export default async function BlogPage() {
  const sanityPosts = await getAllPosts().catch(() => [])
  const posts = sanityPosts.length > 0 ? sanityPosts : STATIC_POSTS

  return (
    <>
      <section className="pt-28 pb-16" style={{ background: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <div className="max-w-2xl">
            <div className="section-tag mb-4">Resources</div>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-brand-text mb-4">Blog & resources</h1>
            <p className="font-body text-lg text-brand-muted">
              Expert advice on integrative veterinary care, feline behaviour and animal wellbeing from Dr. Claudia Fioravanti.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-site">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link key={post._id ?? post.slug} href={`/blog/${post.slug.current ?? post.slug}`} className="card overflow-hidden group block">
                <div className="h-48 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg,#FCEEF1,#F5EDF9)' }}>
                  {post.coverImage ? (
                    <img src={urlFor(post.coverImage).width(600).height(192).url()} alt={post.coverImage.alt ?? post.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-body text-brand-muted">Soultails article</span>
                  )}
                </div>
                <div className="p-5">
                  <span className="font-body text-xs font-bold mb-2 block capitalize" style={{ color: 'var(--color-primary)' }}>
                    {post.category?.replace(/-/g, ' ')}
                  </span>
                  <h2 className="font-heading text-lg font-semibold text-brand-text mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                  <p className="font-body text-sm text-brand-muted line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-brand-subtle">
                      {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="font-body text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--color-primary)' }}>
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="font-heading text-2xl font-semibold text-brand-text mb-2">Coming soon</div>
              <p className="font-body text-brand-muted">Blog posts will appear here once published.</p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
