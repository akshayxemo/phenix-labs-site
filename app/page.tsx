import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection'
import { OurServicesSection } from '@/components/sections/OurServicesSection'
import { OurInventionsSection } from '@/components/sections/OurInventionsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ContactCtaSection } from '@/components/sections/ContactCtaSection'
import { Button } from '@/components/ui/button'
import { getNavbarData, getFooterData, getHomePage } from '@/lib/data/mock'

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
  const [navbar, footer, home] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getHomePage(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      {/* Hero Section with CTA Button */}
      <HeroSection
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        description={home.hero.description}
      >
        <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8">
          {home.hero.cta.text}
        </Button>
      </HeroSection>

      {/* Stats Section */}
      <StatsSection stats={home.stats} />

      {/* What We Do Section */}
      <WhatWeDoSection
        title={home.whatWeDo.title}
        description={home.whatWeDo.description}
        services={home.whatWeDo.services}
      />

      {/* Our Services Section */}
      <OurServicesSection
        title={home.ourServices.title}
        description={home.ourServices.description}
        services={home.ourServices.services}
      />

      {/* Our Inventions Section */}
      <OurInventionsSection
        title={home.ourInventions.title}
        description={home.ourInventions.description}
        inventions={home.ourInventions.inventions}
      />

      {/* Testimonials Section */}
      <TestimonialsSection
        title={home.testimonials.title}
        description={home.testimonials.description}
        testimonials={home.testimonials.testimonials}
      />

      {/* Contact CTA Section */}
      <ContactCtaSection
        title={home.cta.title}
        description={home.cta.description}
        buttonText={home.cta.buttonText}
        buttonLink={home.cta.buttonLink}
      />
    </MainLayout>
  )
}
