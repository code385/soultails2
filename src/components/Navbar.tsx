'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false)
    }
    if (isOpen) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [isOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cream/96 backdrop-blur-md shadow-nav' : 'bg-transparent'
    }`}>
      <div className="container-site">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Animated Logo */}
          <Link href="/"
            className="flex items-center gap-2.5 group logo-wrapper"
            aria-label="Soultails home"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <motion.div
              className="relative w-12 h-12 flex-shrink-0 logo-cat"
              animate={logoHovered ? {
                y: [0, -5, 0, -3, 0],
                rotate: [0, -3, 3, -2, 0],
              } : { y: 0, rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Image src="/logo.png" alt="Soultails logo" fill className="object-contain" priority />
            </motion.div>

            <div className="hidden sm:block overflow-hidden">
              <motion.div
                className="font-heading text-xl font-semibold tracking-tight leading-tight"
                style={{ color: '#B784C4' }}
                animate={logoHovered ? { x: [0, 2, -1, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
              >
                Soultails
                {/* Tiny animated cat that runs across on hover */}
                <AnimatePresence>
                  {logoHovered && (
                    <motion.span
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 60, opacity: [0, 1, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute text-xs ml-1 inline-block"
                      style={{ color: '#C85B6E' }}
                    >
                      🐱
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
              <div className="text-xs font-body text-brand-subtle tracking-wide">
                Veterinary Services
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`nav-link ${pathname === href || (href !== '/' && pathname.startsWith(href)) ? 'active' : ''}`}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/book" className="btn-primary text-sm px-5 py-2.5">
              Book a consultation
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-brand-text hover:bg-cream-dark transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={isOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}>
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div ref={menuRef}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-linen bg-cream/98 backdrop-blur-md overflow-hidden">
            <nav className="container-site py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label }, i) => (
                <motion.div key={href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link href={href}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold font-body transition-all duration-200 ${
                      pathname === href || (href !== '/' && pathname.startsWith(href))
                        ? 'text-primary' : 'text-brand-text hover:bg-cream-dark'
                    }`}
                    style={pathname === href || (href !== '/' && pathname.startsWith(href)) ? { background: 'var(--color-primary-light)' } : {}}>
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.06 }} className="pt-2 px-2">
                <Link href="/book" className="btn-primary w-full text-sm py-3">Book a consultation</Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
