import type { Stat } from '@/types'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

interface StatsSectionProps {
  stats: Stat[]
  title?: string
}

export function StatsSection({ stats, title }: StatsSectionProps) {
  return (
    <Section className="bg-surface">
      <Container>
        {title && (
          <div className="mb-12 text-center">
            <h2 className="text-h2">{title}</h2>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
                {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
