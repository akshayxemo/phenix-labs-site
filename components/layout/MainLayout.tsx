import type { ReactNode } from 'react'
import type { NavbarData, FooterData } from '@/types'
import { Navbar } from './Navbar'
import { SiteFooter } from './SiteFooter'

interface MainLayoutProps {
  children: ReactNode
  navbarData: NavbarData
  footerData: FooterData
}

/** Shared public-page shell that guarantees one navbar and one modular footer. */
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
      <SiteFooter
        data={footerData}
        links={navbarData.links}
        logo={navbarData.logo}
      />
    </div>
  )
}
