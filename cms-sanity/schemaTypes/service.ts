import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Optional SEO settings for this service',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description:
            'Override the default meta title (if left empty, will use the service title)',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description:
            'Override the default meta description (if left empty, will use the service description)',
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
      name: 'mainImage',
      title: 'Main Image',
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
      name: 'description1',
      title: 'Description 1',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description2',
      title: 'Description 2',
      type: 'text',
    }),
    defineField({
      name: 'highlight',
      title: 'highlight',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pricingOptions',
      title: 'Pricing Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Time',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).error('Time must be at least 1'),
            },
            {
              name: 'timeUnit',
              title: 'Time Unit',
              type: 'string',
              options: {
                list: [
                  {title: 'Minutes', value: 'minutes'},
                  {title: 'Hours', value: 'hours'},
                ],
              },
              validation: (Rule) => Rule.required().error('Time unit is required'),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              description: 'Price in GBP',
              validation: (Rule) => Rule.required().min(1).error('Price must be at least 1'),
            },
          ],
          preview: {
            select: {
              time: 'time',
              timeUnit: 'timeUnit',
              price: 'price',
            },
            prepare({time, timeUnit, price}) {
              return {
                title: `${time} ${timeUnit.charAt(0).toUpperCase() + timeUnit.slice(1)}`,
                subtitle: `£${price}`,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'expectationImage',
      title: 'Expectation Image',
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
      name: 'expectation',
      title: 'Expectation',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).error('At least one benefit is required'),
    }),
  ],
})
