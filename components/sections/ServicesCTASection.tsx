'use client'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/button'

interface ServicesCTASectionProps {
  title: string
  description: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton: {
    text: string
    href: string
  }
}

export function ServicesCTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
}: ServicesCTASectionProps) {
  return (
    <Section className="py-20 bg-gray-50" aria-label="Call to action">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Subtitle */}
          <p className="text-sm font-semibold text-blue-500 mb-3">Let's build it together</p>

          {/* Main Title */}
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>

          {/* Description */}
          <p className="text-gray-600 mb-8">{description}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              <a href={primaryButton.href}>{primaryButton.text}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-3"
            >
              <a href={secondaryButton.href}>{secondaryButton.text}</a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
