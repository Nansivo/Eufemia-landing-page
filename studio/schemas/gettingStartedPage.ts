import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'gettingStartedPage',
  title: 'Getting Started Page',
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
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'designerCardTitle',
      title: 'Designer Card Title',
      type: 'string',
    }),
    defineField({
      name: 'designerCardDescription',
      title: 'Designer Card Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'designerCardLink',
      title: 'Designer Card Link',
      type: 'string',
    }),
    defineField({
      name: 'developerCardTitle',
      title: 'Developer Card Title',
      type: 'string',
    }),
    defineField({
      name: 'developerCardDescription',
      title: 'Developer Card Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'developerCardLink',
      title: 'Developer Card Link',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Getting Started Page',
      }
    },
  },
})
