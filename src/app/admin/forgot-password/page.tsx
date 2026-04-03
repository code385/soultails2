'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/admin/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setLoading(false)
    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? 'Something went wrong')
      return
    }
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
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
          <h1 className="font-heading text-xl font-semibold text-brand-text mb-1">Forgot password?</h1>
          <p className="font-body text-sm text-brand-muted mb-6">
            Enter your admin email and we&apos;ll send you a reset link.
          </p>

          {sent ? (
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              <CheckCircle size={15} className="flex-shrink-0 mt-0.5" />
              <span>If that email exists, a reset link has been sent. Check your inbox.</span>
            </div>
          ) : (
            <>
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
                      placeholder="soultailsinfo@gmail.com"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="text-center mt-5">
          <Link href="/admin/login" className="inline-flex items-center gap-1.5 text-sm text-brand-muted hover:text-brand-text transition-colors">
            <ArrowLeft size={14} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}