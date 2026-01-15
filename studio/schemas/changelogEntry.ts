import {defineType, defineField} from 'sanity'

// Define the change type separately
const changeType = defineType({
  name: 'change',
  title: 'Change',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'New Feature', value: 'feature'},
          {title: 'Improvement', value: 'improvement'},
          {title: 'Bug Fix', value: 'fix'},
          {title: 'Breaking Change', value: 'breaking'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      type: 'type',
      description: 'description',
    },
    prepare({type, description}) {
      const typeLabels: Record<string, string> = {
        feature: 'Feature',
        improvement: 'Improvement',
        fix: 'Fix',
        breaking: 'Breaking',
      }
      return {
        title: typeLabels[type] || type,
        subtitle: description,
      }
    },
  },
})

const changelogEntry = defineType({
  name: 'changelogEntry',
  title: 'Changelog Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'e.g., "10.15.0"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Release Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'changes',
      title: 'Changes',
      type: 'array',
      of: [{type: 'change'}],
    }),
  ],
  orderings: [
    {
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      version: 'version',
      date: 'date',
    },
    prepare({version, date}) {
      return {
        title: `v${version}`,
        subtitle: date,
      }
    },
  },
})

export default changelogEntry
export {changeType}
