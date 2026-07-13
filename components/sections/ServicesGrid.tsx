import type { ServiceItem } from '@/types'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'

interface ServicesGridProps {
  services: ServiceItem[]
  title?: string
  columns?: 2 | 3 | 4
}

export function ServicesGrid({
  services,
  title,
  columns = 3,
}: ServicesGridProps) {
  return (
    <Section>
      <Container>
        {title && (
          <div className="mb-12 text-center">
            <h2 className="text-h2 mb-4">{title}</h2>
          </div>
        )}
        <Grid cols={columns}>
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-lg border border-border/40 hover:border-primary/20 transition-all hover:shadow-card bg-card group"
            >
              {service.icon && (
                <div className="mb-6 text-primary text-4xl group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
              )}
              <h3 className="text-h4 mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              {service.features && (
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-foreground/80 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
