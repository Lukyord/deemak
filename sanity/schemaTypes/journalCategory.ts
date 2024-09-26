import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'journalCategory',
  title: 'JournalCategory',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
