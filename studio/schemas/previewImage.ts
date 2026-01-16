import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'previewImage',
  title: 'Preview Image',
  type: 'object',
  fields: [
    defineField({
      name: 'light',
      title: 'Light Mode',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'dark',
      title: 'Dark Mode',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
