'use client'
import { useEffect, useState, useCallback } from 'react'
import { Check, X, Mail, Phone, Send, Copy, CheckCheck } from 'lucide-react'

const STATUS_COLORS: Record<string,string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  CONFIRMED: 'bg-green-100 text-green-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
  NO_SHOW: 'bg-gray-100 text-gray-600',
}

const PAYPAL_EMAIL = 'soultailsinfo@gmail.com'

function generatePayPalLink(amount: number, description: string) {
  const params = new URLSearchParams({
    cmd: '_xclick',
    business: PAYPAL_EMAIL,
    amount: amount.toFixed(2),
    currency_code: 'GBP',
    item_name: description,
    no_shipping: '1',
  })
  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [modeFilter, setModeFilter] = useState('')
  const [selected, setSelected] = useState<any>(null)
  const [payAmount, setPayAmount] = useState('')
  const [paypalLink, setPaypalLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [markingPayPal, setMarkingPayPal] = useState(false)
  const [updating, setUpdating] = useState(false)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    if (modeFilter) params.set('mode', modeFilter)
    const res = await fetch(`/api/admin/bookings?${params}`)
    const data = await res.json()
    setBookings(data.bookings ?? [])
    setTotal(data.total ?? 0)
    setLoading(false)
  }, [statusFilter, modeFilter])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  const updateStatus = async (id: string, status: string) => {
    setUpdating(true)
    await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    await fetchBookings()
    if (selected?.id === id) setSelected((prev: any) => ({ ...prev, status }))
    setUpdating(false)
  }

  const handleGenerateLink = () => {
    if (!selected || !payAmount) return
    const amount = parseFloat(payAmount)
    if (isNaN(amount) || amount <= 0) return
    const desc = `Soultails - ${selected.serviceType.replace(/_/g, ' ')} for ${selected.petName}`
    const link = generatePayPalLink(amount, desc)
    setPaypalLink(link)
    setCopied(false)
  }

  const handleCopy = async () => {
    if (!paypalLink) return
    await navigator.clipboard.writeText(paypalLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const markPayPalSent = async () => {
    if (!selected) return
    setMarkingPayPal(true)
    const res = await fetch('/api/admin/send-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId: selected.id }),
    })
    if (res.ok) {
      setSelected((prev: any) => ({ ...prev, paymentStatus: 'PAYMENT_LINK_SENT' }))
      fetchBookings()
    }
    setMarkingPayPal(false)
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-semibold text-brand-text mb-1">Bookings</h1>
        <p className="font-body text-sm text-brand-muted">{total} total bookings</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="input-field w-auto text-sm pr-8">
          <option value="">All statuses</option>
          {['PENDING','CONFIRMED','COMPLETED','CANCELLED'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={modeFilter} onChange={e => setModeFilter(e.target.value)}
          className="input-field w-auto text-sm pr-8">
          <option value="">All modes</option>
          <option value="REMOTE">Remote</option>
          <option value="HOME_VISIT">Home visit</option>
        </select>
      </div>

      <div className="flex gap-5">
        {/* Bookings list */}
        <div className="flex-1 bg-white rounded-xl border border-linen overflow-hidden">
          {loading ? (
            <div className="p-8 text-center font-body text-sm text-brand-subtle">Loading...</div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center font-body text-sm text-brand-subtle">No bookings found</div>
          ) : (
            <div className="divide-y divide-linen">
              {bookings.map((b: any) => (
                <button key={b.id} onClick={() => { setSelected(b); setPayAmount(''); setPaypalLink('') }}
                  className={`w-full text-left px-5 py-4 hover:bg-cream transition-colors ${selected?.id === b.id ? 'bg-primary-light' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-body text-sm font-semibold text-brand-text">{b.clientName}</span>
                        <span className="font-body text-xs text-brand-subtle">· {b.petName} ({b.petType})</span>
                      </div>
                      <div className="font-body text-xs text-brand-muted mt-0.5">{b.serviceType.replace(/_/g,' ')} · {b.serviceMode === 'HOME_VISIT' ? 'Home visit' : 'Remote'}</div>
                      <div className="font-body text-xs text-brand-subtle mt-0.5">{b.preferredDate} at {b.preferredTime}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className={`font-body text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[b.status] ?? 'bg-gray-100 text-gray-600'}`}>{b.status}</span>
                      {b.paymentStatus === 'PAYMENT_LINK_SENT' && <span className="font-body text-xs text-blue-600 font-medium">PayPal sent</span>}
                      {b.paymentStatus === 'PAID' && <span className="font-body text-xs text-green-600 font-medium">Paid</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 flex-shrink-0 bg-white rounded-xl border border-linen p-5 h-fit sticky top-0 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-body text-sm font-semibold text-brand-text">Booking details</h2>
              <button onClick={() => setSelected(null)} className="text-brand-subtle hover:text-brand-text"><X size={16} /></button>
            </div>

            <div className="space-y-2 text-sm font-body">
              {[
                ['Client', selected.clientName],
                ['Email', selected.clientEmail],
                ['Phone', selected.clientPhone],
                ['Pet', `${selected.petName} (${selected.petType}${selected.petAge ? ', '+selected.petAge : ''})`],
                ['Service', selected.serviceType.replace(/_/g,' ')],
                ['Mode', selected.serviceMode === 'HOME_VISIT' ? 'Home visit' : 'Remote'],
                ['Date', `${selected.preferredDate} ${selected.preferredTime}`],
                ['Status', selected.status],
                ['Payment', selected.paymentStatus],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-brand-subtle w-20 flex-shrink-0">{k}</span>
                  <span className="text-brand-text font-medium break-all">{v}</span>
                </div>
              ))}
            </div>

            {selected.concern && (
              <div className="bg-cream rounded-lg p-3">
                <p className="font-body text-xs text-brand-muted font-semibold mb-1">Concern</p>
                <p className="font-body text-xs text-brand-text leading-relaxed">{selected.concern}</p>
              </div>
            )}

            {/* Status actions */}
            <div className="space-y-2">
              {selected.status === 'PENDING' && (
                <button onClick={() => updateStatus(selected.id, 'CONFIRMED')} disabled={updating}
                  className="btn-primary w-full justify-center text-sm py-2.5 disabled:opacity-60">
                  <Check size={14} /> Confirm booking
                </button>
              )}
              {['PENDING','CONFIRMED'].includes(selected.status) && (
                <button onClick={() => updateStatus(selected.id, 'CANCELLED')} disabled={updating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-full text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-60">
                  <X size={14} /> Cancel
                </button>
              )}
              {selected.status === 'CONFIRMED' && (
                <button onClick={() => updateStatus(selected.id, 'COMPLETED')} disabled={updating}
                  className="btn-outline w-full justify-center text-sm py-2.5 disabled:opacity-60">
                  Mark completed
                </button>
              )}
            </div>

            {/* PayPal link generator */}
            {selected.paymentStatus !== 'PAID' && (
              <div className="border-t border-linen pt-4 space-y-3">
                <p className="font-body text-xs font-semibold text-brand-text">Generate PayPal payment link</p>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-subtle font-body text-sm">£</span>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={payAmount}
                      onChange={e => { setPayAmount(e.target.value); setPaypalLink('') }}
                      className="input-field text-sm pl-7"
                      min="1"
                      step="0.01"
                    />
                  </div>
                  <button onClick={handleGenerateLink} disabled={!payAmount}
                    className="btn-primary text-sm px-3 py-2 disabled:opacity-60">
                    <Send size={14} />
                  </button>
                </div>

                {paypalLink && (
                  <div className="space-y-2">
                    <div className="bg-cream rounded-lg p-2.5 break-all">
                      <p className="font-body text-xs text-brand-muted line-clamp-2">{paypalLink}</p>
                    </div>
                    <button onClick={handleCopy}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium font-body transition-colors ${
                        copied ? 'bg-green-100 text-green-700' : 'bg-primary-light text-primary hover:bg-primary hover:text-white'
                      }`}>
                      {copied ? <><CheckCheck size={14} /> Copied!</> : <><Copy size={14} /> Copy link</>}
                    </button>
                    <p className="font-body text-xs text-brand-subtle text-center">
                      Copy this link and send it to <strong>{selected.clientEmail}</strong>
                    </p>
                    {selected.paymentStatus !== 'PAYMENT_LINK_SENT' && (
                      <button onClick={markPayPalSent} disabled={markingPayPal}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-linen rounded-full text-xs font-body text-brand-muted hover:text-primary transition-colors disabled:opacity-60">
                        {markingPayPal ? 'Marking...' : '✓ Mark as sent'}
                      </button>
                    )}
                  </div>
                )}

                {selected.paymentStatus === 'PAYMENT_LINK_SENT' && !paypalLink && (
                  <p className="font-body text-xs text-blue-600 font-semibold">PayPal link already sent</p>
                )}
              </div>
            )}

            {/* Contact buttons */}
            <div className="border-t border-linen pt-4 flex gap-2">
              <a href={`mailto:${selected.clientEmail}`}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-cream rounded-lg text-xs font-body text-brand-muted hover:text-primary transition-colors">
                <Mail size={13} /> Email
              </a>
              <a href={`tel:${selected.clientPhone}`}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-cream rounded-lg text-xs font-body text-brand-muted hover:text-primary transition-colors">
                <Phone size={13} /> Call
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
