import { defineArrayMember, defineField, defineType } from 'sanity'
import { LucideIconInput } from '@/sanity/components/LucideIconInput'

const socialPlatforms = [
  { title: 'Instagram', value: 'instagram' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'Facebook', value: 'facebook' },
  { title: 'X / Twitter', value: 'x' },
  { title: 'GitHub', value: 'github' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'WhatsApp', value: 'whatsapp' },
  { title: 'Discord', value: 'discord' },
  { title: 'Custom platform', value: 'custom' },
] as const

export const contactSettingsType = defineType({
  name: 'contactSettings',
  title: 'Contact & Social Settings',
  type: 'document',
  initialValue: {
    phone: '+91 89615 48205',
    email: 'gyankrishna@phenixlabs.in',
    hours: 'Monday–Friday · 08:00–17:00',
    responseTime: 'Usually within one business day',
    address: 'TC 6/215/NLRA 135, Neerazhi Line, Ulloor, Thiruvananthapuram 695011',
    socialLinks: [
      { _type: 'socialLink', _key: 'instagram', platform: 'instagram', url: 'https://www.instagram.com/phenixlabs', isVisible: true },
      { _type: 'socialLink', _key: 'linkedin', platform: 'linkedin', url: 'https://www.linkedin.com/company/phenixlabs', isVisible: true },
      { _type: 'socialLink', _key: 'facebook', platform: 'facebook', url: 'https://www.facebook.com/phenixlabs', isVisible: true },
      { _type: 'socialLink', _key: 'x', platform: 'x', url: 'https://twitter.com/phenixlabs', isVisible: true },
    ],
  },
  groups: [
    { name: 'contact', title: 'Contact details', default: true },
    { name: 'social', title: 'Social links' },
  ],
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'contact',
      description: 'Include the country code. The clickable phone link is generated automatically.',
      validation: (rule) => rule.required().min(7).max(30),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      group: 'contact',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'hours',
      title: 'Working Hours',
      type: 'string',
      group: 'contact',
      description:
        'The days and times when your team is normally available. This appears beside the contact details. Example: Monday–Friday · 08:00–17:00 IST.',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'responseTime',
      title: 'Expected Response Time',
      type: 'string',
      group: 'contact',
      description:
        'A short promise describing how soon someone can normally expect a reply after contacting you. Example: Usually within one business day.',
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contact',
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      description: 'Drag items to control their display order. Hidden items stay saved but are not shown on the website.',
      of: [
        defineArrayMember({
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: { list: [...socialPlatforms], layout: 'dropdown' },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'customLabel',
              title: 'Platform Name',
              type: 'string',
              description: 'Used as the accessible label for a custom platform.',
              hidden: ({ parent }) => parent?.platform !== 'custom',
              validation: (rule) =>
                rule.custom((value, context) =>
                  context.parent &&
                  typeof context.parent === 'object' &&
                  'platform' in context.parent &&
                  context.parent.platform === 'custom' &&
                  !value
                    ? 'Add a name for the custom platform.'
                    : true,
                ),
            }),
            defineField({
              name: 'customIcon',
              title: 'Icon',
              type: 'string',
              description: 'Choose any Lucide icon for this custom platform.',
              hidden: ({ parent }) => parent?.platform !== 'custom',
              components: { input: LucideIconInput },
              initialValue: 'link',
            }),
            defineField({
              name: 'url',
              title: 'Profile URL',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({ scheme: ['http', 'https'] }),
            }),
            defineField({
              name: 'isVisible',
              title: 'Show on Website',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              platform: 'platform',
              customLabel: 'customLabel',
              url: 'url',
              isVisible: 'isVisible',
            },
            prepare({ platform, customLabel, url, isVisible }) {
              const knownTitle = socialPlatforms.find(
                (option) => option.value === platform,
              )?.title
              return {
                title: platform === 'custom' ? customLabel || 'Custom platform' : knownTitle || 'Social link',
                subtitle: `${isVisible === false ? 'Hidden · ' : ''}${url || 'No URL'}`,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.max(20),
    }),
  ],
  preview: {
    select: { email: 'email', socialLinks: 'socialLinks' },
    prepare({ email, socialLinks }) {
      const count = Array.isArray(socialLinks) ? socialLinks.length : 0
      return {
        title: 'Contact & Social Settings',
        subtitle: `${email || 'No email'} · ${count} social link${count === 1 ? '' : 's'}`,
      }
    },
  },
})
