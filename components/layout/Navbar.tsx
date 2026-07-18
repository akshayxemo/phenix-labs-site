'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { NavbarData } from '@/types'
import { cn } from '@/lib/utils'

interface NavbarProps {
  data: NavbarData
}

export function Navbar({ data }: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#baccdb]/40 bg-[#ecf1f5]/95 backdrop-blur-md">
      <div className="mx-auto max-w-[1195px] px-4 sm:px-6">
        <div className="flex h-[82px] items-center justify-between">
          {/* Logo */}
          <Link
            href={data.logo.href}
            className="flex-shrink-0 font-semibold text-lg text-foreground hover:text-primary transition-colors"
          >
            {data.logo.imageSrc && !logoError ? (
              <Image
                src={data.logo.imageSrc}
                alt={data.logo.text}
                width={90}
                height={82}
                className="h-[68px] w-[74px] object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-lg font-semibold text-[#040404]">
                {data.logo.text}
              </span>
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:gap-7">
            {data.links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-[14px] font-normal transition-colors hover:text-[#0064d7]',
                    isActive
                      ? 'text-[#0064d7]'
                      : 'text-[#4e4e4e]'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* CTA Button */}
          {data.cta && (
            <Link
              href={data.cta.href}
              className="hidden h-[45px] min-w-[150px] items-center justify-center rounded-full border-2 border-[#0064d7] px-6 text-[16px] font-medium text-[#0064d7] transition-colors hover:bg-[#0064d7] hover:text-white lg:inline-flex"
            >
              {data.cta.text}
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            className="p-2 text-[#162236] transition-colors hover:text-[#0064d7] lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[#baccdb] bg-[#ecf1f5] lg:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {data.links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[#0064d7]/10 text-[#0064d7]'
                        : 'text-[#4e4e4e] hover:bg-white hover:text-[#0064d7]'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              {data.cta && (
                <Link
                  href={data.cta.href}
                  onClick={closeMenu}
                  className="mt-3 inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  {data.cta.text}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
