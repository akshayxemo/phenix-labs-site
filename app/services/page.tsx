import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { ServiceCategoriesSection } from '@/components/sections/ServiceCategoriesSection'
import { DevelopmentProcessSection } from '@/components/sections/DevelopmentProcessSection'
import { EngineeringServicesSection } from '@/components/sections/EngineeringServicesSection'
import { ServicesCTASection } from '@/components/sections/ServicesCTASection'
import { ContactCtaSection } from '@/components/sections/ContactCtaSection'
import { Button } from '@/components/ui/button'
import { getNavbarData, getFooterData, getServicesPage } from '@/lib/data/mock'

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
    getServicesPage(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      {/* Hero Section */}
      <HeroSection
        title={services.hero.title}
        subtitle={services.hero.subtitle}
        description={services.hero.description}
      >
        <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8">
          {services.hero.cta.text}
        </Button>
      </HeroSection>

      {/* Service Categories Section */}
      <ServiceCategoriesSection categories={services.serviceCategories} />

      {/* Development Process Section */}
      <DevelopmentProcessSection
        title={services.developmentProcess.title}
        description={services.developmentProcess.description}
        steps={services.developmentProcess.steps}
      />

      {/* Engineering Services Section */}
      <EngineeringServicesSection
        title="Engineering Services"
        services={services.engineeringServices}
      />

      {/* Services CTA Section */}
      <ServicesCTASection
        title={services.cta.title}
        description={services.cta.description}
        primaryButton={services.cta.primaryButton}
        secondaryButton={services.cta.secondaryButton}
      />

      {/* Contact CTA Section (reuse from home) */}
      <ContactCtaSection
        title="Get In Touch"
        description="Thank you for your interest in Phenix Labs. Reach out to us and we would be happy to connect."
        buttonText="Send Message"
        buttonLink="/contact"
      />
    </MainLayout>
  )
}
