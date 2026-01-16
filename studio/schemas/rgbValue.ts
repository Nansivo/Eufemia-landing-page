import {defineType} from 'sanity'

export default defineType({
  name: 'rgbValue',
  title: 'RGB Value',
  type: 'object',
  fields: [
    {name: 'r', type: 'number'},
    {name: 'g', type: 'number'},
    {name: 'b', type: 'number'},
    {name: 'a', type: 'number'},
  ],
})
