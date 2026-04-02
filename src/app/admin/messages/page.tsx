'use client'
import { useEffect, useState } from 'react'
import { formatDate } from '@/lib/utils'
import { Mail, Check } from 'lucide-react'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    const res = await fetch('/api/admin/messages')
    const data = await res.json()
    setMessages(data.messages ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchMessages() }, [])

  const markRead = async (id: string) => {
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isRead: true }),
    })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m))
    setSelected((prev: any) => prev?.id === id ? { ...prev, isRead: true } : prev)
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-semibold text-brand-text mb-1">Messages</h1>
        <p className="font-body text-sm text-brand-muted">
          {unreadCount > 0 ? `${unreadCount} unread` : 'All read'} · {messages.length} total
        </p>
      </div>

      <div className="flex gap-5">
        {/* Message list */}
        <div className="flex-1 bg-white rounded-xl border border-linen overflow-hidden">
          {loading ? (
            <div className="p-8 text-center font-body text-sm text-brand-subtle">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="p-12 text-center font-body text-sm text-brand-subtle">No messages yet</div>
          ) : (
            <div className="divide-y divide-linen">
              {messages.map((m: any) => (
                <button key={m.id} onClick={() => { setSelected(m); if (!m.isRead) markRead(m.id) }}
                  className={`w-full text-left px-5 py-4 hover:bg-cream transition-colors ${selected?.id === m.id ? 'bg-primary-light' : ''} ${!m.isRead ? 'border-l-2 border-primary' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {!m.isRead && <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                        <span className="font-body text-sm font-semibold text-brand-text">{m.name}</span>
                        {m.petType && <span className="font-body text-xs text-brand-subtle">· {m.petType}</span>}
                      </div>
                      <p className="font-body text-xs text-brand-muted mt-0.5 line-clamp-2">{m.message}</p>
                      <p className="font-body text-xs text-brand-subtle mt-1">{formatDate(m.createdAt)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 flex-shrink-0 bg-white rounded-xl border border-linen p-5 h-fit sticky top-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center font-heading text-base font-semibold text-primary">
                {selected.name[0]}
              </div>
              <div>
                <div className="font-body text-sm font-semibold text-brand-text">{selected.name}</div>
                <div className="font-body text-xs text-brand-subtle">{formatDate(selected.createdAt)}</div>
              </div>
            </div>

            <div className="space-y-2 text-sm font-body mb-4">
              <div className="flex gap-2">
                <span className="text-brand-subtle w-16 flex-shrink-0">Email</span>
                <a href={`mailto:${selected.email}`} className="text-primary hover:underline break-all">{selected.email}</a>
              </div>
              {selected.phone && (
                <div className="flex gap-2">
                  <span className="text-brand-subtle w-16 flex-shrink-0">Phone</span>
                  <a href={`tel:${selected.phone}`} className="text-brand-text">{selected.phone}</a>
                </div>
              )}
              {selected.petType && (
                <div className="flex gap-2">
                  <span className="text-brand-subtle w-16 flex-shrink-0">Pet type</span>
                  <span className="text-brand-text">{selected.petType}</span>
                </div>
              )}
            </div>

            <div className="bg-cream rounded-lg p-3 mb-5">
              <p className="font-body text-sm text-brand-text leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>

            <div className="flex gap-2">
              <a href={`mailto:${selected.email}?subject=Re: Your message to Soultails`}
                className="flex-1 flex items-center justify-center gap-2 btn-primary text-sm py-2.5">
                <Mail size={14} /> Reply
              </a>
              {!selected.isRead && (
                <button onClick={() => markRead(selected.id)}
                  className="flex items-center justify-center gap-2 btn-outline text-sm py-2.5 px-4">
                  <Check size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
