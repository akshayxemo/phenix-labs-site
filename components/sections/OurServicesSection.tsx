import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'
import { Button } from '@/components/ui/button'

interface OurServicesSectionProps {
  title: string
  description: string
  services: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
}

/** Legacy compact service-list presentation retained for alternate page compositions. */
export function OurServicesSection({ title, description, services }: OurServicesSectionProps) {
  const getIcon = (icon: string) => {
    const icons: Record<string, string> = {
      palette: '🎨',
      code: '💻',
      cpu: '🧠',
      activity: '⚙️',
    }
    return icons[icon] || '✨'
  }

  return (
    <Section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 text-lg">{description}</p>
        </div>

        <Grid cols={4} className="mb-12">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-center text-center">
              <div className="text-5xl mb-4">{getIcon(service.icon)}</div>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </Grid>

        <div className="flex justify-center">
          <Button variant="outline" className="rounded-full">
            View More
          </Button>
        </div>
      </Container>
    </Section>
  )
}
