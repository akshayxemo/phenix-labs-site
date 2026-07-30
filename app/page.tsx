import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePageContent } from '@/components/sections/HomePageContent'
import { getNavbarData, getFooterData } from '@/lib/config/site'

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
  const [navbar, footer] = await Promise.all([
    getNavbarData(),
    getFooterData(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <HomePageContent />
    </MainLayout>
  )
}
