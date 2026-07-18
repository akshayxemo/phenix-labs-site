'use client'

import Link from 'next/link'
import type { FooterData } from '@/types'

interface SiteFooterProps {
  data: FooterData
  embedded?: boolean
}

export function SiteFooter({ data, embedded = false }: SiteFooterProps) {
  if (embedded) return null

  return (
    <footer className="border-t border-border/40 bg-footer text-white">
      {/* Newsletter Section */}
      {data.newsletter && (
        <div className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-2">{data.newsletter.title}</h3>
              <p className="text-white/80 text-sm mb-4">{data.newsletter.description}</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={data.newsletter.placeholder}
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {data.columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/60 text-sm">{data.copyright}</p>

            {/* Social Links */}
            <div className="flex gap-4">
              {data.social.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social.label}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
