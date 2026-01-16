// This will be populated at build time by Gatsby from the GraphQL layer
let cachedComponents: any[] = [];

export interface SearchableComponent {
  title: string;
  description: string;
  path: string;
  category: string;
  external?: boolean;
  id?: string; // Unique Sanity ID for deduplication
}

/**
 * Fetch components from Gatsby's GraphQL cache
 * This data is sourced from Sanity at build time and available client-side
 */
export async function fetchComponentsForSearch(): Promise<SearchableComponent[]> {
  try {
    // Query Gatsby's GraphQL API for components
    const response = await fetch(`/___graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
            allSanityComponent(sort: {name: ASC}) {
              edges {
                node {
                  id
                  name
                  slug {
                    current
                  }
                  shortDescription
                  platform
                }
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL query failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      console.log("GraphQL response:", data);
      return [];
    }

    const components = data.data?.allSanityComponent?.edges || [];
    console.log("Fetched components from GraphQL:", components);

    return components.map((edge: any) => {
      const component = edge.node;
      const slugValue = component.slug?.current || "";

      return {
        id: component.id,
        title: component.name,
        description: component.shortDescription || "Design system component",
        path: `/docs/${component.platform}/components/${slugValue}`,
        category: `${component.platform === "ios" ? "iOS" : "Android"} Components`,
        external: false,
      };
    });
  } catch (error) {
    console.error("Error fetching components from Gatsby GraphQL:", error);
    return [];
  }
}

/**
 * Fetch design tokens for search
 * Tokens are available at /docs/{platform}/design-tokens
 */
export async function fetchTokensForSearch(): Promise<SearchableComponent[]> {
  try {
    // Design tokens pages are always available
    // Return both iOS and Android design token page links
    const results: SearchableComponent[] = [
      {
        id: `design-tokens-ios`,
        title: "Design Tokens (iOS)",
        description: "Browse and copy design tokens for iOS designs",
        path: `/docs/ios/design-tokens`,
        category: "Design System",
        external: false,
      },
      {
        id: `design-tokens-android`,
        title: "Design Tokens (Android)",
        description: "Browse and copy design tokens for Android designs",
        path: `/docs/android/design-tokens`,
        category: "Design System",
        external: false,
      },
    ];

    return results;
  } catch (error) {
    console.error("Error fetching tokens for search:", error);
    return [];
  }
}
