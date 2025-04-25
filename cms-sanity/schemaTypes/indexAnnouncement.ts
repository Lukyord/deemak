import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'indexAnnouncement',
  title: 'Homepage Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Announcement Text',
      type: 'string',
      description: 'The text of the announcement to be displayed on the index page.',
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .error('An announcement is required and should be less than 200 characters.'),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Optional link for more details (if needed).',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'publishDate',
      media: 'icon',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: subtitle
          ? `Published on: ${new Date(subtitle).toLocaleDateString()}`
          : 'No publish date set',
      }
    },
  },
})
