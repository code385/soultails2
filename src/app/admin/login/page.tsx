'use client'
import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (status === 'authenticated') router.replace('/admin/dashboard')
  }, [status, router])

  useEffect(() => {
    if (searchParams.get('error') === 'CredentialsSignin') {
      setError('Invalid email or password.')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await signIn('credentials', {
      email: email.toLowerCase().trim(),
      password,
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError(res.error === 'Too many login attempts. Please wait 15 minutes.'
        ? res.error
        : 'Invalid email or password.')
    } else {
      router.replace('/admin/dashboard')
    }
  }

  if (status === 'loading') return null

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-2">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <circle cx="16" cy="20" r="8" fill="#B5527A" opacity="0.15"/>
              <circle cx="16" cy="20" r="5" fill="#B5527A"/>
              <circle cx="9" cy="13" r="2.5" fill="#B5527A"/>
              <circle cx="23" cy="13" r="2.5" fill="#B5527A"/>
              <circle cx="12" cy="10" r="2" fill="#8B6BB5"/>
              <circle cx="20" cy="10" r="2" fill="#8B6BB5"/>
            </svg>
            <span className="font-heading text-2xl font-semibold text-brand-text">Soultails</span>
          </div>
          <p className="font-body text-sm text-brand-muted">Admin panel</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-linen p-8">
          <h1 className="font-heading text-xl font-semibold text-brand-text mb-1">Welcome back</h1>
          <p className="font-body text-sm text-brand-muted mb-6">Sign in to manage Soultails</p>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-5 text-sm text-red-700">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-field" htmlFor="email">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-subtle" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@soultails.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="label-field" htmlFor="password">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-subtle" />
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-subtle hover:text-brand-text transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-brand-subtle mt-6">
          Protected admin area · Soultails Veterinary Care
        </p>
      </div>
    </div>
  )
}
