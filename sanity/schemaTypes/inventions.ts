import { defineField, defineType, type ValidationContext } from 'sanity'
import { apiVersion } from '@/sanity/env'

async function validateFeaturedLimit(
  value: boolean | undefined,
  context: ValidationContext,
) {
  if (value !== true) return true

  const documentId = context.document?._id
  if (!documentId) return true

  const publishedId = documentId.replace(/^drafts\./, '')
  const draftId = `drafts.${publishedId}`

  try {
    const featuredIds = await context
      .getClient({ apiVersion })
      .withConfig({ perspective: 'raw' })
      .fetch<string[]>(
        `*[
          _type == "inventions" &&
          coalesce(featureOnHome, false) == true &&
          !(_id in [$publishedId, $draftId])
        ]._id`,
        { publishedId, draftId },
      )
    const uniqueFeaturedDocuments = new Set(
      featuredIds.map((id) => id.replace(/^drafts\./, '')),
    )

    return uniqueFeaturedDocuments.size < 5
      ? true
      : 'Five inventions are already featured. Uncheck one before featuring another.'
  } catch {
    return 'Unable to verify the featured invention limit. Please try again.'
  }
}

export const inventionType = defineType({
  name: 'inventions',
  title: 'Inventions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(600),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main catalogue image. Use a clear, high-resolution landscape or portrait image.',
    }),
    defineField({
      name: 'featureOnHome',
      title: 'Feature on Home Page',
      type: 'boolean',
      description:
        'Check this to include the invention in the Home page showcase. A maximum of five published inventions can be featured.',
      initialValue: false,
      validation: (rule) =>
        rule.custom((value, context) =>
          validateFeaturedLimit(value, context),
        ),
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Oldest first',
      name: 'createdAtAsc',
      by: [{ field: '_createdAt', direction: 'asc' }],
    },
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'image',
      featureOnHome: 'featureOnHome',
    },
    prepare({ title, description, media, featureOnHome }) {
      return {
        title: title || 'Untitled invention',
        subtitle: `${featureOnHome ? 'Featured on Home · ' : ''}${description || 'No description'}`,
        media,
      }
    },
  },
})
