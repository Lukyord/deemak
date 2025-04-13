import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'highlightedService',
      title: 'Highlighted Service',
      type: 'reference',
      to: [{type: 'service'}],
      description:
        'Select a service to highlight on the website. Only one service can be highlighted at a time.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Site Settings',
      }
    },
  },
})
