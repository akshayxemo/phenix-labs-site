'use client'

import Link from 'next/link'
import type { NavbarData } from '@/types'
import { cn } from '@/lib/utils'

interface NavbarProps {
  data: NavbarData
}

export function Navbar({ data }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={data.logo.href}
            className="flex-shrink-0 font-semibold text-lg text-foreground hover:text-primary transition-colors"
          >
            {data.logo.text}
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {data.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  link.isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          {data.cta && (
            <Link
              href={data.cta.href}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              {data.cta.text}
            </Link>
          )}

          {/* Mobile Menu Button Placeholder */}
          <button className="md:hidden p-2 text-foreground hover:text-primary transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
