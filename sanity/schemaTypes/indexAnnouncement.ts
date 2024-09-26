import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'indexAnnouncement',
  title: 'Homepage Announcement',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Announcement Text',
      type: 'string',
      description: 'The text of the announcement to be displayed on the index page.',
      validation: (rule) =>
        rule
          .required()
          .max(200)
          .error('An announcement is required and should be less than 200 characters.'),
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Optional link for more details (if needed).',
      validation: (rule) =>
        rule
          .uri({
            scheme: ['http', 'https'],
          })
          .optional(),
    },
    {
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      description: 'Date and time the announcement will be published.',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'isActive',
      title: 'Active Announcement',
      type: 'boolean',
      description: 'Check this if the announcement should be displayed on the index page.',
      initialValue: true,
    },
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
  //   validation: (Rule) =>
  //     Rule.custom((fields, context) => {
  //       const { isActive } = context.document;

  //       if (isActive) {
  //         return "Make sure there's only one active announcement at a time.";
  //       }

  //       return true;
  //     }),
})
