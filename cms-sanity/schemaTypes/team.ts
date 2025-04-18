import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'fristName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'array',
      of: [{type: 'reference', to: {type: 'teamRole'}}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          title: 'Image Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      options: {
        hotspot: true,
      },
    }),
  ],
})
