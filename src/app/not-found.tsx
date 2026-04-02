import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-md w-full text-center">
        <div className="font-heading font-bold mb-4" style={{ fontSize: '6rem', color: 'var(--color-primary-light)', lineHeight: 1 }}>404</div>
        <h1 className="font-heading text-3xl font-semibold text-brand-text mb-4">Page not found</h1>
        <p className="font-body text-brand-muted mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary px-8 py-3">Go home</Link>
          <Link href="/contact" className="btn-outline px-8 py-3">Contact us</Link>
        </div>
      </div>
    </div>
  )
}
