import { defineField, defineType } from 'sanity'

/** Testimonial document; `isActive` controls Home only, never the archive. */
export const testimonialType = defineType({
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'clientCompany',
      title: 'Client Company',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: 'stars',
      title: 'Stars',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first on the Home page.',
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Home Page',
      type: 'boolean',
      description:
        'Enabled: also show in the Home carousel. Every published testimonial appears on the Testimonials page.',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Home page order',
      name: 'homePageOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      position: 'position',
      company: 'clientCompany',
      active: 'isActive',
    },
    prepare({ title, position, company, active }) {
      const details = [position, company].filter(Boolean).join(' · ')

      return {
        title: `${active === false ? 'Hidden · ' : ''}${title || 'Untitled testimonial'}`,
        subtitle: details || 'Client testimonial',
      }
    },
  },
})
