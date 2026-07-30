import type { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'
import { getNavbarData, getFooterData } from '@/lib/config/site'
import { getCasesPage } from '@/lib/data/mock'

export const metadata: Metadata = {
  title: 'Case Studies - Phenix Labs',
  description: 'Success stories from our client projects',
  keywords: ['cases', 'portfolio', 'projects', 'success'],
}

export default async function Cases() {
  const [navbar, footer, cases] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getCasesPage(),
  ])

  const featuredCases = cases.cases.filter((c) => c.featured)
  const otherCases = cases.cases.filter((c) => !c.featured)

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <HeroSection
        title={cases.hero.title}
        subtitle={cases.hero.subtitle}
        description={cases.hero.description}
        cta={cases.hero.cta}
      />

      {/* Featured Cases */}
      {featuredCases.length > 0 && (
        <Section>
          <Container>
            <div className="mb-12">
              <h2 className="text-h2 mb-8">Featured Projects</h2>
              <Grid cols={2}>
                {featuredCases.map((caseItem) => (
                  <a
                    key={caseItem.id}
                    href={caseItem.link || '#'}
                    className="group relative overflow-hidden rounded-[20px] border border-border/40 hover:border-primary/20 transition-all block"
                  >
                    <div className="aspect-video bg-surface overflow-hidden">
                      {caseItem.image && (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-muted-foreground">
                          {caseItem.image}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-2 py-1 mb-3 text-xs font-medium rounded bg-primary/10 text-primary">
                        {caseItem.category}
                      </span>
                      <h3 className="text-h4 mb-2 group-hover:text-primary transition-colors">
                        {caseItem.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                    </div>
                  </a>
                ))}
              </Grid>
            </div>
          </Container>
        </Section>
      )}

      {/* Other Cases */}
      {otherCases.length > 0 && (
        <Section className="bg-surface">
          <Container>
            <div className="mb-12">
              <h2 className="text-h2 mb-8">Other Projects</h2>
              <Grid cols={2}>
                {otherCases.map((caseItem) => (
                  <a
                    key={caseItem.id}
                    href={caseItem.link || '#'}
                    className="group p-6 rounded-[20px] border border-border/40 hover:border-primary/20 transition-all bg-card hover:shadow-card block"
                  >
                    <span className="inline-block px-2 py-1 mb-3 text-xs font-medium rounded bg-primary/10 text-primary">
                      {caseItem.category}
                    </span>
                    <h3 className="text-h4 mb-2 group-hover:text-primary transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                  </a>
                ))}
              </Grid>
            </div>
          </Container>
        </Section>
      )}
    </MainLayout>
  )
}
