import { createElement } from 'react'
import { defineField, defineType, type ValidationContext } from 'sanity'
import { ServiceIcon } from '@/components/sections/ServiceIcon'
import { LucideIconInput } from '@/sanity/components/LucideIconInput'
import { apiVersion } from '@/sanity/env'

const accentOptions = [
  { title: 'Cyan', value: '#45c9e8' },
  { title: 'Orange', value: '#ff9a43' },
  { title: 'Purple', value: '#a984ff' },
  { title: 'Sky blue', value: '#4fc6f2' },
  { title: 'Teal', value: '#52cbb5' },
  { title: 'Warm orange', value: '#f0a66b' },
  { title: 'Blue', value: '#67aaf9' },
] as const

async function validateUniqueOrder(
  value: number | undefined,
  context: ValidationContext,
  field: 'serviceOrder' | 'homeOrder',
) {
  if (typeof value !== 'number') return true

  const documentId = context.document?._id
  if (!documentId) return true

  const publishedId = documentId.replace(/^drafts\./, '')
  const draftId = `drafts.${publishedId}`
  const homeFilter = field === 'homeOrder'
    ? ' && coalesce(showOnHome, false) == true'
    : ''
  const query = `count(*[
    _type == "services" &&
    ${field} == $value${homeFilter} &&
    !(_id in [$publishedId, $draftId])
  ])`

  try {
    const duplicates = await context
      .getClient({ apiVersion })
      .withConfig({ perspective: 'raw' })
      .fetch<number>(query, { value, publishedId, draftId })

    if (duplicates === 0) return true

    return field === 'homeOrder'
      ? `Home position ${value} is already assigned to another featured service.`
      : `Services page position ${value} is already assigned to another service.`
  } catch {
    return 'Unable to verify whether this order is available. Please try again.'
  }
}

export const serviceType = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'display', title: 'Display settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Category Label',
      type: 'string',
      group: 'content',
      description: 'Short label used above featured service titles on the Home page.',
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required().min(20).max(240),
    }),
    defineField({
      name: 'tags',
      title: 'Capability Tags',
      type: 'array',
      group: 'content',
      description: 'Up to three concise tags shown on featured Home cards.',
      of: [{ type: 'string' }],
      validation: (rule) => rule.max(3).unique(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      group: 'display',
      components: { input: LucideIconInput },
      initialValue: 'boxes',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Accent Colour',
      type: 'string',
      group: 'display',
      options: { list: [...accentOptions], layout: 'dropdown' },
      initialValue: '#45c9e8',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceOrder',
      title: 'Services Page Order',
      type: 'number',
      group: 'display',
      description: 'Lower numbers appear first on the Services page.',
      initialValue: 1,
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(1)
          .custom((value, context) =>
            validateUniqueOrder(value, context, 'serviceOrder'),
          ),
    }),
    defineField({
      name: 'showOnHome',
      title: 'Feature on Home Page',
      type: 'boolean',
      group: 'display',
      description: 'Enable this for the important services that should also appear on the Home page. The Home page displays at most four.',
      initialValue: false,
    }),
    defineField({
      name: 'homeOrder',
      title: 'Home Page Order',
      type: 'number',
      group: 'display',
      description: 'Lower numbers appear first among Home page services.',
      initialValue: 1,
      hidden: ({ document }) => document?.showOnHome !== true,
      options: {
        list: [
          { title: '1 — First', value: 1 },
          { title: '2 — Second', value: 2 },
          { title: '3 — Third', value: 3 },
          { title: '4 — Fourth', value: 4 },
        ],
        layout: 'dropdown',
      },
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (context.document?.showOnHome !== true) return true
          if (typeof value !== 'number') {
            return 'Choose a Home page position from 1 to 4.'
          }
          if (!Number.isInteger(value) || value < 1 || value > 4) {
            return 'Home page position must be a whole number from 1 to 4.'
          }

          return validateUniqueOrder(value, context, 'homeOrder')
        }),
    }),
  ],
  orderings: [
    {
      title: 'Services page order',
      name: 'servicesPageOrder',
      by: [
        { field: 'serviceOrder', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
    {
      title: 'Home page order',
      name: 'homePageOrder',
      by: [
        { field: 'homeOrder', direction: 'asc' },
        { field: 'serviceOrder', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      showOnHome: 'showOnHome',
      serviceOrder: 'serviceOrder',
      homeOrder: 'homeOrder',
      icon: 'icon',
    },
    prepare({ title, eyebrow, showOnHome, serviceOrder, homeOrder, icon }) {
      const placement = showOnHome
        ? `Services #${serviceOrder ?? 0} · Home #${homeOrder ?? 0}`
        : `Services #${serviceOrder ?? 0}`
      const iconName = typeof icon === 'string' ? icon : 'boxes'

      return {
        title: title || 'Untitled service',
        subtitle: [eyebrow, placement].filter(Boolean).join(' · '),
        media: () => createElement(ServiceIcon, { name: iconName, size: 24 }),
      }
    },
  },
})
