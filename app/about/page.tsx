import type { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'
import { getNavbarData, getFooterData } from '@/lib/config/site'
import { getAboutPage } from '@/lib/data/mock'

export const metadata: Metadata = {
  title: 'About Phenix Labs',
  description: 'Learn about our company, mission, and values',
  keywords: ['about', 'company', 'team', 'mission'],
}

export default async function About() {
  const [navbar, footer, about] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getAboutPage(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <HeroSection
        title={about.hero.title}
        subtitle={about.hero.subtitle}
        description={about.hero.description}
      />

      {/* Mission Section */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 mb-6">{about.mission.title}</h2>
            <p className="text-body-large text-muted-foreground">{about.mission.description}</p>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section className="bg-surface">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-h2">{about.values.title}</h2>
          </div>
          <Grid cols={2}>
            {about.values.items.map((value, idx) => (
              <div key={idx} className="p-6">
                <h3 className="text-h4 mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </Grid>
        </Container>
      </Section>

      <StatsSection stats={about.stats} />
    </MainLayout>
  )
}
