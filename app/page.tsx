import type { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'
import { StatsSection } from '@/components/sections/StatsSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { getNavbarData, getFooterData, getHomePage } from '@/lib/data/mock'

export const metadata: Metadata = {
  title: 'Phenix Labs - Premium Engineering Solutions',
  description: 'Premium engineering company delivering innovative technology solutions',
  keywords: ['engineering', 'technology', 'innovation', 'solutions'],
  openGraph: {
    title: 'Phenix Labs',
    description: 'Premium engineering company delivering innovative technology solutions',
    type: 'website',
  },
}

export default async function Home() {
  const [navbar, footer, home] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getHomePage(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <HeroSection
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        description={home.hero.description}
        cta={home.hero.cta}
      />
      <FeaturesGrid features={home.features} />
      <StatsSection stats={home.stats} />
      <ServicesGrid services={home.services} title="Services" />
      
      {home.cta && (
        <Section className="bg-primary text-primary-foreground">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-h2 mb-4 text-white">{home.cta.title}</h2>
              <p className="text-lg mb-8 text-white/90">{home.cta.description}</p>
              <a
                href={home.cta.buttonLink}
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium bg-white text-primary rounded-lg hover:bg-white/90 transition-colors"
              >
                {home.cta.buttonText}
              </a>
            </div>
          </Container>
        </Section>
      )}
    </MainLayout>
  )
}
