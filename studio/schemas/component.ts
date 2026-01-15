import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'component',
  title: 'Component',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g., "Avatar", "Button"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly name (e.g., "avatar", "avatar-group")',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'iOS', value: 'ios'},
          {title: 'Android', value: 'android'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description shown on component cards',
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description: 'Main visual preview of the component',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'guidelines',
      title: 'Guidelines',
      type: 'text',
      rows: 4,
      description: 'When and why to use this component',
    }),
    defineField({
      name: 'usage',
      title: 'Usage',
      type: 'text',
      rows: 4,
      description: 'How to use this component (step-by-step)',
    }),
    defineField({
      name: 'dosAndDonts',
      title: 'Do\'s and Don\'ts',
      type: 'text',
      rows: 4,
      description: 'Best practices and anti-patterns',
    }),
    defineField({
      name: 'accessibilityInfo',
      title: 'Accessibility',
      type: 'text',
      rows: 4,
      description: 'Accessibility considerations (WCAG compliance, screen reader support, etc)',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Stable', value: 'Stable'},
          {title: 'Beta', value: 'Beta'},
          {title: 'Deprecated', value: 'Deprecated'},
        ],
        layout: 'dropdown',
      },
      description: 'Component status',
    }),
    defineField({
      name: 'documentation',
      title: 'Documentation',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'figmaLink',
      title: 'Figma Link',
      type: 'url',
      description: 'Link to Figma design file',
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
      description: 'Link to source code',
    }),
  ],
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      name: 'name',
      platform: 'platform',
    },
    prepare({name, platform}) {
      return {
        title: name,
        subtitle: platform?.toUpperCase(),
      }
    },
  },
})
