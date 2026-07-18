import type { ReactNode } from 'react'
import type { NavbarData, FooterData } from '@/types'
import { Navbar } from './Navbar'
import { SiteFooter } from './SiteFooter'

interface MainLayoutProps {
  children: ReactNode
  navbarData: NavbarData
  footerData: FooterData
  footerEmbedded?: boolean
}

export function MainLayout({
  children,
  navbarData,
  footerData,
  footerEmbedded = false,
}: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar data={navbarData} />
      <main className="flex-1 w-full">
        {children}
      </main>
      <SiteFooter data={footerData} embedded={footerEmbedded} />
    </div>
  )
}
