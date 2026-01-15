const path = require("path");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type SanityComponent implements Node {
      name: String
      platform: String
      shortDescription: String
      figmaLink: String
      githubLink: String
      slug: SanitySlug
    }

    type SanitySlug {
      current: String
    }
  `;

  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allSanityComponent {
        nodes {
          id
          name
          platform
          slug {
            current
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading components", result.errors);
    return;
  }

  const componentTemplate = path.resolve("./src/templates/component.tsx");
  const components = result.data.allSanityComponent.nodes;

  components.forEach((component) => {
    if (!component.slug?.current) {
      reporter.warn(`Component "${component.name}" has no slug - skipping`);
      return;
    }

    const pagePath = `/docs/${component.platform}/components/${component.slug.current}`;

    createPage({
      path: pagePath,
      component: componentTemplate,
      context: {
        id: component.id,
      },
    });

    reporter.info(`Created component page: ${pagePath}`);
  });
};
