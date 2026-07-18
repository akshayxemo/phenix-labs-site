'use client'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
          <p className="text-sm font-semibold text-blue-500 mb-3">Let&apos;s build it together</p>

          {/* Main Title */}
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>

          {/* Description */}
          <p className="text-gray-600 mb-8">{description}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={primaryButton.href}
              className={cn(
                buttonVariants(),
                'bg-blue-600 px-8 py-3 text-white hover:bg-blue-700'
              )}
            >
              {primaryButton.text}
            </a>
            <a
              href={secondaryButton.href}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'border-blue-500 px-8 py-3 text-blue-500 hover:bg-blue-50'
              )}
            >
              {secondaryButton.text}
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}
