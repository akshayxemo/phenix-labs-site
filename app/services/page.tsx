import type { Metadata } from 'next'
import { JsonLd } from '@/components/common/JsonLd'
import {
  generateMetadata,
  getBreadcrumbSchema,
  getServiceSchema,
  getWebPageSchema,
} from '@/lib/seo'
import { MainLayout } from '@/components/layout/MainLayout'
import { ServicesPageContent } from '@/components/sections/ServicesPageContent'
import { getNavbarData, getFooterData } from '@/lib/config/site'
import { getAllServices } from '@/lib/data/services'

/** Services route populated from the shared Sanity service collection. */
export const metadata: Metadata = generateMetadata({
  title: 'PCB, Firmware, Edge AI & Prototyping Services',
  description:
    'Explore Phenix Labs engineering services for PCB design, firmware, embedded systems, Edge AI, prototyping, testing, CAD, and product development.',
  keywords: [
    'engineering solutions',
    'custom electronics',
    'embedded systems',
    'research partnerships',
    'industrial solutions',
  ],
  path: '/services',
})

export default async function Services() {
  // Shared layout content and page services are safe to fetch concurrently.
  const [navbar, footer, services] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getAllServices(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <JsonLd
        data={[
          getWebPageSchema({
            title: 'Engineering Services',
            description:
              'PCB, firmware, embedded systems, Edge AI, prototyping, testing, and product development services.',
            path: '/services',
            type: 'CollectionPage',
          }),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          ...services.map((service) =>
            getServiceSchema({
              name: service.title,
              description: service.description,
            }),
          ),
        ]}
      />
      <ServicesPageContent services={services} />
    </MainLayout>
  )
}
