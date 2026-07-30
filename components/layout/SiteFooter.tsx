import Link from 'next/link'
import type { FooterData, NavLink } from '@/types'

interface SiteFooterProps {
  data: FooterData
  links: NavLink[]
}

export function SiteFooter({ data, links }: SiteFooterProps) {
  const footerLinks = links.filter((link) => link.showInFooter !== false)

  return (
    <footer className="border-t border-[#172234] bg-[#000206] px-5 py-8 text-white">
      <div className="mx-auto flex max-w-[1236px] flex-col items-center justify-between gap-6 text-[14px] md:flex-row">
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[#aeaeae]">
            {footerLinks.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p>{data.copyright}</p>
      </div>
    </footer>
  )
}
