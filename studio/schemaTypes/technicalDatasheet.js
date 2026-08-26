export default {
  name: 'technicalDatasheet',
  title: 'Technical Datasheet',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of this datasheet (e.g. "CALOR MEGA Batch System Parameters")',
    },
    {
      name: 'specs',
      title: 'Specifications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Specification Category',
              type: 'string',
              description: 'e.g., Construction, Capacity, etc.',
            },
            {
              name: 'details',
              title: 'Engineering Details',
              type: 'text',
              description: 'The detailed description for this category.',
            },
          ],
          preview: {
            select: {
              title: 'category',
              subtitle: 'details',
            },
          },
        },
      ],
    },
  ],
}
