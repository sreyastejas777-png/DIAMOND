export default {
  name: 'application',
  title: 'Application',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          'Fruits',
          'Spices and Herbs',
          'Plantations',
          'Grains and Pulses',
          'Nuts and Tubers',
          'Vegetables',
          'Specialty'
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'moistureBefore',
      title: 'Moisture Before (%)',
      type: 'number',
    },
    {
      name: 'moistureAfter',
      title: 'Moisture After (%)',
      type: 'number',
    },
    {
      name: 'shelfBefore',
      title: 'Shelf Life Before (e.g. 4 Days)',
      type: 'string',
    },
    {
      name: 'shelfAfter',
      title: 'Shelf Life After (e.g. 10+ Months)',
      type: 'string',
    },
    {
      name: 'products',
      title: 'Possible Products',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'benefits',
      title: 'Business Benefits',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'related',
      title: 'Related Application (Title)',
      type: 'string',
      description: 'Enter the exact title of a related application to link to it.'
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
}
