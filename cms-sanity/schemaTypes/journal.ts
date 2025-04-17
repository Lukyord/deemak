import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'journal',
  title: 'Journal',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description or summary of the journal article',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Optional SEO settings for this journal article',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description:
            'Override the default meta title (if left empty, will use the article title)',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description:
            'Override the default meta description (if left empty, will use the article description)',
        },
        {
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Optional canonical URL if this content exists elsewhere',
        },
        {
          name: 'schemaMarkup',
          title: 'Schema Markup',
          type: 'text',
          description: 'Optional custom schema.org JSON-LD markup (must be valid JSON)',
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'journalAuthor'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
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
        accept: 'image/*',
        hotspot: true,
        storeOriginalFilename: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'journalCategory'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedJournals',
      title: 'Related Journals',
      type: 'array',
      description: 'Select other journal articles that are related to this one',
      of: [
        {
          type: 'reference',
          to: [{type: 'journal'}],
          options: {
            // Prevent self-referencing
            filter: ({document}) => ({
              filter: '_id != $id',
              params: {id: document._id},
            }),
          },
        },
      ],
      validation: (rule) => rule.unique(), // Prevent duplicate selections
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
