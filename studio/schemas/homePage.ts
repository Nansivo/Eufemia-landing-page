import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Small text above the headline (e.g., "DNB Design System")',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline on the homepage',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the headline',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Primary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Primary Button Link',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Secondary Button Text',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Secondary Button Link',
      type: 'string',
    }),
    defineField({
      name: 'designCardTitle',
      title: 'Design Card Title',
      type: 'string',
    }),
    defineField({
      name: 'designCardDescription',
      title: 'Design Card Description',
      type: 'string',
    }),
    defineField({
      name: 'developCardTitle',
      title: 'Develop Card Title',
      type: 'string',
    }),
    defineField({
      name: 'developCardDescription',
      title: 'Develop Card Description',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
