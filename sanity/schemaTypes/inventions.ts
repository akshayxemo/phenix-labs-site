import { defineField, defineType, type ValidationContext } from 'sanity'
import { apiVersion } from '@/sanity/env'

async function validateFeaturedLimit(
  value: boolean | undefined,
  context: ValidationContext,
) {
  // Draft and published ids represent one logical invention and must count once.
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

/** Invention document with primary image, gallery, project dates, and Home feature flag. */
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
      title: 'Primary Product Image',
      type: 'image',
      options: { hotspot: true },
      description:
        'The main image shown first on product cards, the Home page, and the product detail gallery.',
    }),
    defineField({
      name: 'images',
      title: 'Additional Product Images',
      type: 'array',
      description:
        'Optional gallery images visitors can browse after the primary product image.',
      of: [
        {
          type: 'object',
          name: 'inventionImage',
          title: 'Additional Product Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'altText',
              title: 'Alternative Text',
              type: 'string',
              description:
                'Briefly describe what is visible for screen readers. If empty, the invention title is used.',
              validation: (rule) => rule.max(160),
            }),
          ],
          preview: {
            select: {
              media: 'image',
              altText: 'altText',
            },
            prepare({ media, altText }) {
              return {
                title: 'Additional image',
                subtitle: altText || 'No alternative text',
                media,
              }
            },
          },
        },
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'startDate',
      title: 'Invention Start Date',
      type: 'date',
      description:
        'Optional. When the invention or development work began. Newest/oldest sorting uses this date, then the completion date, then the document creation date when unavailable.',
    }),
    defineField({
      name: 'endDate',
      title: 'Invention End Date',
      type: 'date',
      description:
        'Optional. When the invention was completed. Leave empty for ongoing work or when the completion date is unknown.',
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = context.document?.startDate
          if (
            !endDate ||
            typeof startDate !== 'string' ||
            endDate >= startDate
          ) {
            return true
          }

          return 'End date cannot be earlier than the start date.'
        }),
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
      title: 'Newest invention date first',
      name: 'startDateDesc',
      by: [
        { field: 'startDate', direction: 'desc' },
        { field: 'endDate', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
    {
      title: 'Oldest invention date first',
      name: 'startDateAsc',
      by: [
        { field: 'startDate', direction: 'asc' },
        { field: 'endDate', direction: 'asc' },
        { field: '_createdAt', direction: 'asc' },
      ],
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
      additionalMedia: 'images.0.image',
      featureOnHome: 'featureOnHome',
      startDate: 'startDate',
    },
    prepare({ title, description, media, additionalMedia, featureOnHome, startDate }) {
      return {
        title: title || 'Untitled invention',
        subtitle: `${featureOnHome ? 'Featured on Home · ' : ''}${startDate ? `${startDate} · ` : ''}${description || 'No description'}`,
        media: media || additionalMedia,
      }
    },
  },
})
