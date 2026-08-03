import { defineField, defineType } from 'sanity'

/** Client-logo document rendered by the Home marquee. */
export const clientType = defineType({
  name: 'clients',
  title: 'Clients',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
