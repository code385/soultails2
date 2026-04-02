'use client'
import { useState } from 'react'
import { Lock, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'

export default function AdminSettingsPage() {
  const [current, setCurrent] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (newPw !== confirm) { setError('New passwords do not match'); return }
    if (newPw.length < 8) { setError('New password must be at least 8 characters'); return }

    setLoading(true)
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: current, newPassword: newPw }),
    })
    const data = await res.json()
    setLoading(false)

    if (!res.ok) { setError(data.error ?? 'Something went wrong'); return }

    setSuccess(true)
    setCurrent(''); setNewPw(''); setConfirm('')
  }

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-brand-text mb-1">Settings</h1>
        <p className="font-body text-sm text-brand-muted">Manage your admin account</p>
      </div>

      <div className="bg-white rounded-xl border border-linen p-6">
        <div className="flex items-center gap-2 mb-6">
          <Lock size={16} className="text-primary" />
          <h2 className="font-body text-sm font-semibold text-brand-text">Change Password</h2>
        </div>

        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-5 text-sm text-green-700 font-body">
            <CheckCircle size={15} className="flex-shrink-0" />
            Password updated successfully.
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-5 text-sm text-red-700 font-body">
            <AlertCircle size={15} className="flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Current password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={current}
                onChange={e => setCurrent(e.target.value)}
                required
                className="input-field pr-10"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-subtle hover:text-brand-text">
                {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div>
            <label className="label-field">New password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPw}
                onChange={e => setNewPw(e.target.value)}
                required
                minLength={8}
                className="input-field pr-10"
                placeholder="Minimum 8 characters"
              />
              <button type="button" onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-subtle hover:text-brand-text">
                {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div>
            <label className="label-field">Confirm new password</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading}
            className="btn-primary w-full justify-center py-2.5 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  )
}
