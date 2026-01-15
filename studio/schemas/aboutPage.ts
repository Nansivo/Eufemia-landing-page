import {defineType, defineField} from 'sanity'

// Define the principle type separately
const principleType = defineType({
  name: 'principle',
  title: 'Principle',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
  ],
})

const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'principles',
      title: 'Principles',
      type: 'array',
      of: [{type: 'principle'}],
    }),
    defineField({
      name: 'teamSectionTitle',
      title: 'Team Section Title',
      type: 'string',
    }),
    defineField({
      name: 'teamDescription',
      title: 'Team Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page',
      }
    },
  },
})

export default aboutPage
export {principleType}
