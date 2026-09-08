export default {
  name: 'gallery',
  title: 'Gallery Images',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used for internal reference in Sanity Studio (e.g. "Main Gallery")'
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Enables UI for cropping/focal point
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
      options: {
        layout: 'grid', // Makes the Sanity studio display them in a nice grid
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Gallery Collection',
      }
    }
  }
}
