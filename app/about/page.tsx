import type { Metadata } from 'next'
import { JsonLd } from '@/components/common/JsonLd'
import { MarkdownContent } from '@/components/content/MarkdownContent'
import { MainLayout } from '@/components/layout/MainLayout'
import { getNavbarData, getFooterData } from '@/lib/config/site'
import { getAboutMarkdown } from '@/lib/data/about'
import {
  generateMetadata,
  getBreadcrumbSchema,
  getWebPageSchema,
} from '@/lib/seo'

/** Public About route. The page intentionally stays empty when no CMS Markdown is published. */
export const metadata: Metadata = generateMetadata({
  title: 'About Our Engineering Lab',
  description:
    'Learn about Phenix Labs, our engineering mission, research-led approach, capabilities, and commitment to turning technical ideas into working solutions.',
  keywords: ['about Phenix Labs', 'engineering lab India', 'engineering research and development'],
  path: '/about',
})

export default async function About() {
  // Load shared chrome and page content concurrently to avoid serial CMS requests.
  const [navbar, footer, markdown] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getAboutMarkdown(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      <JsonLd
        data={[
          getWebPageSchema({
            title: 'About Phenix Labs',
            description:
              'Our engineering mission, capabilities, and research-led approach to innovation.',
            path: '/about',
            type: 'AboutPage',
          }),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      {markdown ? (
        <section className="bg-[#ecf1f5] px-5 py-16 md:px-8 md:py-24">
          <MarkdownContent content={markdown} />
        </section>
      ) : null}
    </MainLayout>
  )
}
