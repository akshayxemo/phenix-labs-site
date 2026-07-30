import type { ReactNode } from 'react'
import type { NavbarData, FooterData } from '@/types'
import { Navbar } from './Navbar'
import { ContactFooterSection } from './ContactFooterSection'
import { SiteFooter } from './SiteFooter'

interface MainLayoutProps {
  children: ReactNode
  navbarData: NavbarData
  footerData: FooterData
}

export function MainLayout({
  children,
  navbarData,
  footerData,
}: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar data={navbarData} />
      <main className="flex-1 w-full">
        {children}
      </main>
      <ContactFooterSection />
      <SiteFooter data={footerData} links={navbarData.links} />
    </div>
  )
}
