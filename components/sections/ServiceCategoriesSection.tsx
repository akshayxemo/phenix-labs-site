'use client'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

interface ServiceCategory {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  benefits: string[]
  tags: string[]
  icon: string
}

interface ServiceCategoriesSectionProps {
  categories: ServiceCategory[]
}

export function ServiceCategoriesSection({ categories }: ServiceCategoriesSectionProps) {
  return (
    <Section className="bg-slate-900 text-white py-20" aria-label="Service categories">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((category) => (
            <article
              key={category.id}
              className="border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition-colors"
              aria-labelledby={`category-${category.id}`}
            >
              {/* Number and Icon */}
              <div className="flex items-start justify-between mb-4">
                <h3 id={`category-${category.id}`} className="text-4xl font-bold text-blue-400">
                  {category.number}
                </h3>
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  {/* Icon placeholder - will use icon system */}
                  <span className="text-xl">{category.icon === 'beaker' ? '⚗️' : '⚙️'}</span>
                </div>
              </div>

              {/* Title and Subtitle */}
              <h2 className="text-2xl font-bold mb-1">{category.title}</h2>
              <p className="text-blue-400 text-sm mb-4">{category.subtitle}</p>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-6">{category.description}</p>

              {/* Why Phenix Labs section */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-white mb-3">Why Phenix Labs?</p>
                <ul className="space-y-2">
                  {category.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <span className="text-blue-400 mr-2 flex-shrink-0">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-700">
                {category.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded bg-slate-800 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
