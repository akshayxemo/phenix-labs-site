import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'

interface WhatWeDoSectionProps {
  title: string
  description: string
  services: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
}

/** Alternate What We Do presentation retained for modular landing-page composition. */
export function WhatWeDoSection({ title, description, services }: WhatWeDoSectionProps) {
  const getIcon = (icon: string) => {
    const icons: Record<string, string> = {
      target: '🎯',
      zap: '⚡',
      users: '👥',
      palette: '🎨',
      code: '💻',
      cpu: '🧠',
      activity: '⚙️',
    }
    return icons[icon] || '✨'
  }

  return (
    <Section className="bg-slate-900 text-white py-16 md:py-24">
      <Container>
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-blue-400 text-sm font-semibold mb-2">WHAT WE DO</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
        </div>

        <Grid cols={3}>
          {services.map((service) => (
            <div key={service.id} className="flex flex-col">
              <div className="text-5xl mb-4">{getIcon(service.icon)}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
