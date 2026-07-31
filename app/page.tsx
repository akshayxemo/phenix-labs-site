import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePageContent } from '@/components/sections/HomePageContent'
import { getNavbarData, getFooterData } from '@/lib/config/site'
import { getHomeTestimonials } from '@/lib/data/testimonials'
import { getClients } from '@/lib/data/clients'

export const metadata: Metadata = generateMetadata({
  title: 'Premium Engineering Solutions',
  description: 'Join Phenix Labs, a cutting-edge creative company transforming dreams into reality. Experience technology-led innovation with 150+ designs, 50+ happy clients, and 12 years of excellence.',
  keywords: [
    'engineering',
    'technology',
    'innovation',
    'web development',
    'UI design',
    'AI development',
    'creative solutions',
  ],
  path: '/',
})

export default async function Home() {
  const [navbar, footer, testimonials, clients] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getHomeTestimonials(),
    getClients(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <HomePageContent testimonials={testimonials} clients={clients} />
    </MainLayout>
  )
}
