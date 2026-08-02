import type { Metadata } from 'next'
import { MarkdownContent } from '@/components/content/MarkdownContent'
import { MainLayout } from '@/components/layout/MainLayout'
import { getNavbarData, getFooterData } from '@/lib/config/site'
import { getAboutMarkdown } from '@/lib/data/about'

/** Public About route. The page intentionally stays empty when no CMS Markdown is published. */
export const metadata: Metadata = {
  title: 'About Phenix Labs',
  description:
    'Learn about Phenix Labs, our mission, capabilities, and approach to innovation.',
  keywords: ['about', 'company', 'team', 'mission'],
}

export default async function About() {
  // Load shared chrome and page content concurrently to avoid serial CMS requests.
  const [navbar, footer, markdown] = await Promise.all([
    getNavbarData(),
    getFooterData(),
    getAboutMarkdown(),
  ])

  return (
    <MainLayout navbarData={navbar} footerData={footer}>
      {markdown ? (
        <section className="bg-[#ecf1f5] px-5 py-16 md:px-8 md:py-24">
          <MarkdownContent content={markdown} />
        </section>
      ) : null}
    </MainLayout>
  )
}
