'use client'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

interface ProcessStep {
  id: string
  title: string
  description: string
}

interface DevelopmentProcessSectionProps {
  title: string
  description: string
  steps: ProcessStep[]
}

export function DevelopmentProcessSection({
  title,
  description,
  steps,
}: DevelopmentProcessSectionProps) {
  return (
    <Section className="bg-gray-100 py-20" aria-label="Development process">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          {description && <p className="text-gray-600">{description}</p>}
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative"
              role="group"
              aria-labelledby={`step-${step.id}`}
            >
              {/* Step Card */}
              <div className="border-2 border-blue-500 rounded-lg p-6 bg-white hover:shadow-lg transition-shadow h-full">
                {/* Step Number */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-bold text-blue-500">{step.id}</span>
                  <span className="text-sm text-gray-500 font-medium">/ {step.title}</span>
                </div>

                {/* Step Title */}
                <h3 id={`step-${step.id}`} className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line to next step */}
              {index < steps.length - 1 && index % 3 !== 2 && (
                <div
                  className="hidden md:block absolute -right-4 top-12 w-8 h-1 bg-blue-500"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        {/* Bottom connectors for second row */}
        {steps.length > 3 && (
          <div className="hidden md:grid grid-cols-3 gap-8 mt-8 relative h-16">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="relative">
                {idx < 2 && (
                  <div
                    className="absolute -right-4 top-0 w-8 h-1 bg-blue-500"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
