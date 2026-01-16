import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'colorValue',
  title: 'Color Value',
  type: 'object',
  fields: [
    defineField({
      name: 'modeName',
      title: 'Mode Name',
      type: 'string',
    }),
    defineField({
      name: 'hex',
      title: 'Hex Value',
      type: 'string',
    }),
    defineField({
      name: 'rgb',
      title: 'RGB Value',
      type: 'rgbValue',
    }),
  ],
})
