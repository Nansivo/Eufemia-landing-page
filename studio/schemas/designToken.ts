import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'designToken',
  title: 'Design Token',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'string',
    }),
    defineField({
      name: 'colorValues',
      title: 'Color Values',
      type: 'array',
      of: [
        {type: 'colorValue'},
      ],
    }),
  ],
})
