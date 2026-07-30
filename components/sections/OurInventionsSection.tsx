import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'

interface OurInventionsSectionProps {
  title: string
  description: string
  inventions: Array<{
    id: string
    title: string
    description: string
    image: string
    bgColor: string
  }>
}

export function OurInventionsSection({
  title,
  description,
  inventions,
}: OurInventionsSectionProps) {
  return (
    <Section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 text-lg">{description}</p>
        </div>

        <div className="space-y-12">
          {inventions.map((invention, idx) => (
            <div
              key={invention.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                idx % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`${invention.bgColor} rounded-[20px] aspect-video flex items-center justify-center text-gray-300 font-semibold ${
                  idx % 2 === 1 ? 'md:order-2' : ''
                }`}
              >
                {/* TODO: Replace with actual image: {invention.image} */}
                <div className="text-center">
                  <p className="text-xl">Image Placeholder</p>
                  <p className="text-sm opacity-75">{invention.image}</p>
                </div>
              </div>

              {/* Content */}
              <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                <h3 className="text-2xl font-bold mb-4">{invention.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{invention.description}</p>
                <Button variant="outline" className="rounded-full">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
