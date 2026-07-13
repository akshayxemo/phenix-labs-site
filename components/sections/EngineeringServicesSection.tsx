'use client'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'

interface EngineeringService {
  id: string
  title: string
  description: string
  icon: string
}

interface EngineeringServicesSectionProps {
  title: string
  services: EngineeringService[]
}

export function EngineeringServicesSection({ title, services }: EngineeringServicesSectionProps) {
  return (
    <Section className="py-20" aria-label="Engineering services">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
        </div>

        {/* Services Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <article
              key={service.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-500 transition-all bg-white"
              aria-labelledby={`service-${service.id}`}
            >
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-500 mb-4 text-lg">
                {getIconEmoji(service.icon)}
              </div>

              {/* Title */}
              <h3 id={`service-${service.id}`} className="text-lg font-semibold text-slate-900 mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function getIconEmoji(icon: string): string {
  const iconMap: Record<string, string> = {
    grid: '📱',
    code: '💻',
    cpu: '⚡',
    activity: '📊',
    box: '📦',
    target: '🎯',
    link: '🔗',
    sliders: '🎚️',
  }
  return iconMap[icon] || '🔧'
}
