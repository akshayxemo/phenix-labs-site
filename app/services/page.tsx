import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { MainLayout } from '@/components/layout/MainLayout'
import { ServicesPageContent } from '@/components/sections/ServicesPageContent'
import { getNavbarData, getFooterData } from '@/lib/config/site'
import { getAllServices } from '@/lib/data/services'

export const metadata: Metadata = generateMetadata({
  title: 'Engineering Solutions',
  description: 'Phenix Labs partners with industries, research organizations, and academic institutions to transform ideas into reliable engineering solutions.',
  keywords: [
    'engineering solutions',
    'custom electronics',
    'embedded systems',
    'research partnerships',
    'industrial solutions',
  ],
  path: '/services',
})

export default async function Services() {
  const [navbar, footer, services] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getAllServices(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <ServicesPageContent services={services} />
    </MainLayout>
  )
}
