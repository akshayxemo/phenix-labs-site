import { sanityClient } from '@/sanity/lib/client'

const aboutPageQuery = `*[
  _type == "aboutPage" &&
  _id == "aboutPage"
][0].markdown`

/** Returns singleton About Markdown, or an empty string when unpublished/unavailable. */
export async function getAboutMarkdown(): Promise<string> {
  try {
    const markdown = await sanityClient.fetch<string | null>(
      aboutPageQuery,
      {},
      { next: { revalidate: 60 } },
    )

    return typeof markdown === 'string' ? markdown.trim() : ''
  } catch (error) {
    console.warn('[Sanity] Could not load the About page.', error)
    return ''
  }
}
