import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'designTokens',
  title: 'Design Tokens',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Identifier for this token set',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tokens',
      title: 'Tokens',
      type: 'array',
      of: [
        {type: 'designToken'},
      ],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    }),
    defineField({
      name: 'sourceFile',
      title: 'Source File',
      type: 'string',
    }),
  ],
})


