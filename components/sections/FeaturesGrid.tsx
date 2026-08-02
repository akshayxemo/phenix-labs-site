import type { Feature } from '@/types'
import { Grid } from '@/components/layout/Grid'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

interface FeaturesGridProps {
  features: Feature[]
  title?: string
  columns?: 2 | 3 | 4
}

/** Generic feature-card grid retained for reusable informational sections. */
export function FeaturesGrid({
  features,
  title,
  columns = 3,
}: FeaturesGridProps) {
  return (
    <Section>
      <Container>
        {title && (
          <div className="mb-12 text-center">
            <h2 className="text-h2 mb-4">{title}</h2>
          </div>
        )}
        <Grid cols={columns}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 rounded-[20px] border border-border/40 hover:border-primary/20 transition-colors bg-card"
            >
              {feature.icon && (
                <div className="mb-4 text-primary text-3xl">{feature.icon}</div>
              )}
              <h3 className="text-h4 mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
