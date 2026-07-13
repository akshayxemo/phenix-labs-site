import type { Stat } from '@/types'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

interface StatsSectionProps {
  stats: Stat[]
  title?: string
}

export function StatsSection({ stats, title }: StatsSectionProps) {
  return (
    <Section
      className="bg-slate-900 text-white py-16"
      aria-label={title || 'Statistics section'}
      role="region"
    >
      <Container>
        {title && (
          <div className="mb-12 text-center">
            <h2 className="text-h2">{title}</h2>
          </div>
        )}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          role="group"
          aria-label="Company statistics"
        >
          {stats.map((stat, idx) => (
            <article
              key={idx}
              className="text-center py-6 border-l border-slate-700 pl-4 first:border-l-0"
              aria-labelledby={`stat-label-${idx}`}
            >
              <div
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                aria-hidden="false"
              >
                <span className="sr-only">{stat.label}: </span>
                {stat.value}
                {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
              </div>
              <p className="text-gray-400 text-sm" id={`stat-label-${idx}`}>
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
