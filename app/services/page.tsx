import type { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { getNavbarData, getFooterData, getServicesPage } from '@/lib/data/mock'

export const metadata: Metadata = {
  title: 'Our Services - Phenix Labs',
  description: 'Comprehensive engineering and technology services',
  keywords: ['services', 'engineering', 'technology', 'development'],
}

export default async function Services() {
  const [navbar, footer, services] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getServicesPage(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <HeroSection
        title={services.hero.title}
        subtitle={services.hero.subtitle}
        description={services.hero.description}
        cta={services.hero.cta}
      />
      <ServicesGrid services={services.services} />

      {services.process && (
        <Section className="bg-surface">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-h2">{services.process.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {services.process.steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-h4 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </MainLayout>
  )
}
