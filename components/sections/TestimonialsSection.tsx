import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    id: string
    quote: string
    author: string
    role: string
    rating: number
  }>
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <Section className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 text-lg">{description}</p>
        </div>

        <Grid cols={3}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-8 shadow-sm">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.floor(testimonial.rating) ? '⭐' : '☆'} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-6">{testimonial.quote}</p>

              {/* Author */}
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </Grid>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === 0 ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
