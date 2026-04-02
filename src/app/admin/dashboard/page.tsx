'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, MessageSquare, CheckCircle, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])
  const [unread, setUnread] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/bookings?page=1').then(r => r.json()),
      fetch('/api/admin/messages').then(r => r.json()),
    ]).then(([bRes, mRes]) => {
      setBookings(bRes.bookings ?? [])
      setMessages(mRes.messages ?? [])
      setUnread(mRes.unread ?? 0)
      setLoading(false)
    })
  }, [])

  const pending = bookings.filter(b => b.status === 'PENDING').length
  const confirmed = bookings.filter(b => b.status === 'CONFIRMED').length
  const paid = bookings.filter(b => b.paymentStatus === 'PAID').length
  const revenue = bookings.filter(b => b.paymentStatus === 'PAID').reduce((s: number, b: any) => s + (b.amount ?? 0), 0)

  const stats = [
    { label: 'Pending bookings', value: pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', href: '/admin/bookings?status=PENDING' },
    { label: 'Confirmed', value: confirmed, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', href: '/admin/bookings?status=CONFIRMED' },
    { label: 'Unread messages', value: unread, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50', href: '/admin/messages' },
    { label: 'Revenue received', value: formatCurrency(revenue), icon: TrendingUp, color: 'text-primary', bg: 'bg-primary-light', href: '/admin/bookings' },
  ]

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold text-brand-text mb-1">Dashboard</h1>
        <p className="font-body text-sm text-brand-muted">Overview of Soultails activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href}
            className="bg-white rounded-xl border border-linen p-5 hover:shadow-card transition-all duration-200 group">
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <div className="font-heading text-2xl font-semibold text-brand-text mb-0.5">{loading ? '—' : value}</div>
            <div className="font-body text-xs text-brand-muted">{label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent bookings */}
        <div className="bg-white rounded-xl border border-linen overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-linen">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <h2 className="font-body text-sm font-semibold text-brand-text">Recent bookings</h2>
            </div>
            <Link href="/admin/bookings" className="font-body text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-linen">
            {loading ? (
              [...Array(4)].map((_,i) => (
                <div key={i} className="px-5 py-3.5 animate-pulse">
                  <div className="h-3.5 bg-cream-dark rounded w-3/4 mb-2" />
                  <div className="h-3 bg-cream-dark rounded w-1/2" />
                </div>
              ))
            ) : bookings.slice(0,5).length ? bookings.slice(0,5).map((b: any) => (
              <div key={b.id} className="px-5 py-3.5 hover:bg-cream transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-body text-sm font-medium text-brand-text">{b.clientName}</div>
                    <div className="font-body text-xs text-brand-muted">{b.petName} · {b.serviceType.replace(/_/g,' ')}</div>
                    <div className="font-body text-xs text-brand-subtle mt-0.5">{b.preferredDate}</div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full font-body flex-shrink-0 ${
                    b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                    b.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                    b.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>{b.status}</span>
                </div>
              </div>
            )) : (
              <div className="px-5 py-8 text-center font-body text-sm text-brand-subtle">No bookings yet</div>
            )}
          </div>
        </div>

        {/* Recent messages */}
        <div className="bg-white rounded-xl border border-linen overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-linen">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-primary" />
              <h2 className="font-body text-sm font-semibold text-brand-text">Recent messages</h2>
              {unread > 0 && <span className="text-xs font-body font-semibold bg-primary text-white rounded-full px-2 py-0.5">{unread}</span>}
            </div>
            <Link href="/admin/messages" className="font-body text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-linen">
            {loading ? (
              [...Array(4)].map((_,i) => (
                <div key={i} className="px-5 py-3.5 animate-pulse">
                  <div className="h-3.5 bg-cream-dark rounded w-3/4 mb-2" />
                  <div className="h-3 bg-cream-dark rounded w-1/2" />
                </div>
              ))
            ) : messages.slice(0,5).length ? messages.slice(0,5).map((m: any) => (
              <div key={m.id} className={`px-5 py-3.5 hover:bg-cream transition-colors ${!m.isRead ? 'border-l-2 border-primary' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      {!m.isRead && <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                      <div className="font-body text-sm font-medium text-brand-text">{m.name}</div>
                    </div>
                    <div className="font-body text-xs text-brand-muted line-clamp-1">{m.message}</div>
                    <div className="font-body text-xs text-brand-subtle mt-0.5">{formatDate(m.createdAt)}</div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="px-5 py-8 text-center font-body text-sm text-brand-subtle">No messages yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Quick link to Sanity */}
      <div className="mt-6 bg-primary-light border border-primary/20 rounded-xl p-5 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-body text-sm font-semibold text-primary mb-0.5">Add a blog post</h3>
          <p className="font-body text-xs text-brand-muted">Open Sanity Studio to write and publish blog posts</p>
        </div>
        <a href="https://www.sanity.io/@oVp0t3aVR/studio/xlgw8cy8lka4jbeqt4ebdcm6/soultails/structure" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-5 py-2.5 flex-shrink-0">
          Open CMS
        </a>
      </div>
    </div>
  )
}
