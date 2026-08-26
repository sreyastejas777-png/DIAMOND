export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Release Status',
      type: 'string',
      options: {
        list: [
          { title: 'Current (Live)', value: 'current' },
          { title: 'Upcoming (Teaser)', value: 'upcoming' }
        ],
        layout: 'radio'
      },
      initialValue: 'current',
      description: 'Is this product currently available, or an upcoming release?'
    },
    {
      name: 'badge',
      title: 'Upcoming Badge (e.g. SOLAR TECH)',
      type: 'string',
      hidden: ({ document }) => document?.status !== 'upcoming',
      description: 'Small tag to display in the upcoming releases menu.'
    },
    {
      name: 'releaseDateText',
      title: 'Release Date Text (e.g. Coming Q4 2026)',
      type: 'string',
      hidden: ({ document }) => document?.status !== 'upcoming',
      description: 'Short description for upcoming products.'
    },
    {
      name: 'price',
      title: 'Price (e.g. $12,500)',
      type: 'string',
    },
    {
      name: 'img',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' }
    },
    {
      name: 'desc',
      title: 'Short Description',
      type: 'text',
      description: 'Used on the products catalog page.'
    },
    {
      name: 'overview',
      title: 'Detailed Overview',
      type: 'text',
      description: 'Used on the product details page.'
    },
    {
      name: 'capacity',
      title: 'Capacity',
      type: 'string',
    },
    {
      name: 'sizing',
      title: 'Ideal Room Sizing',
      type: 'string',
    },
    {
      name: 'energy',
      title: 'Energy Rating & Consumption',
      type: 'string',
    },
    {
      name: 'warranty',
      title: 'Warranty Details',
      type: 'string',
    },
    {
      name: 'specs',
      title: 'Key Hardware Specifications (Short List)',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'detailedSpecs',
      title: 'Physical Specs Sheet (Detailed Table)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label (e.g. Dimensions)', type: 'string' },
            { name: 'value', title: 'Value (e.g. 10x10x8 ft)', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'features',
      title: 'Key Design Advantages (Features)',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'useCases',
      title: 'Ideal Sizing & Use Cases',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'installation',
      title: 'Installation Procedures',
      type: 'text',
    },
    {
      name: 'maintenance',
      title: 'Maintenance Protocols',
      type: 'text',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'tagline',
      media: 'img',
    },
  },
}
