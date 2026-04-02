'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard, Calendar, MessageSquare, FileText,
  LogOut, Menu, X, ExternalLink, Settings
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/blog', label: 'Blog (CMS)', icon: FileText, external: true, externalHref: '/studio' },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (pathname !== '/admin/login' && status === 'unauthenticated') router.replace('/admin/login')
  }, [status, router, pathname])

  // Login page ko sidebar/auth wrapper ki zaroorat nahi
  if (pathname === '/admin/login') return <>{children}</>

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <p className="font-body text-sm text-brand-muted">Loading...</p>
        </div>
      </div>
    )
  }

  const Sidebar = () => (
    <aside className="w-64 bg-dark flex flex-col h-full">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7 flex-shrink-0">
            <circle cx="16" cy="20" r="8" fill="#B5527A" opacity="0.3"/>
            <circle cx="16" cy="20" r="5" fill="#B8CFC0"/>
            <circle cx="9" cy="13" r="2.5" fill="#B8CFC0"/>
            <circle cx="23" cy="13" r="2.5" fill="#B8CFC0"/>
            <circle cx="12" cy="10" r="2" fill="#8B6BB5"/>
            <circle cx="20" cy="10" r="2" fill="#8B6BB5"/>
          </svg>
          <div>
            <div className="font-heading text-base font-semibold text-cream">Soultails</div>
            <div className="font-body text-xs text-cream/50">Admin Panel</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, external, externalHref }) => {
          const isActive = pathname === href
          if (external) {
            return (
              <a key={href} href={externalHref ?? href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium text-cream/60 hover:text-cream hover:bg-white/10 transition-all duration-200">
                <Icon size={17} />
                {label}
                <ExternalLink size={12} className="ml-auto opacity-50" />
              </a>
            )
          }
          return (
            <Link key={href} href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                isActive ? 'bg-primary text-white' : 'text-cream/60 hover:text-cream hover:bg-white/10'
              }`}>
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2.5 px-3 mb-3">
          <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center font-body text-xs font-semibold text-cream">
            {session.user?.name?.[0] ?? session.user?.email?.[0] ?? 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-body text-xs font-medium text-cream truncate">{session.user?.name ?? 'Admin'}</div>
            <div className="font-body text-xs text-cream/50 truncate">{session.user?.email}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/" target="_blank"
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body text-cream/60 hover:text-cream hover:bg-white/10 transition-colors">
            <ExternalLink size={12} /> View site
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body text-cream/60 hover:text-red-400 hover:bg-white/10 transition-colors">
            <LogOut size={12} /> Sign out
          </button>
        </div>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen bg-cream-dark overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col"><Sidebar /></div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col w-64 z-10"><Sidebar /></div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b border-linen h-14 flex items-center px-4 gap-3 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-brand-muted hover:bg-cream-dark transition-colors">
            <Menu size={20} />
          </button>
          <div className="font-body text-sm font-medium text-brand-text capitalize">
            {navItems.find(n => pathname.startsWith(n.href))?.label ?? 'Admin'}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
