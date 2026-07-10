import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import PlatformOverview, { OverviewComponent } from "../../components/PlatformOverview";

interface CmsComponent {
  id: string;
  name: string;
  shortDescription: string | null;
  slug: { current: string } | null;
}

const IOSPage: React.FC = () => {
  const data = useStaticQuery(graphql`
    query IOSComponentsQuery {
      allSanityComponent(filter: { platform: { eq: "ios" } }, sort: { name: ASC }) {
        nodes {
          id
          name
          shortDescription
          slug {
            current
          }
        }
      }
    }
  `);

  const components: OverviewComponent[] = (data?.allSanityComponent?.nodes || []).map((c: CmsComponent) => ({
    id: c.id,
    name: c.name,
    description: c.shortDescription,
    slug: c.slug?.current ?? null,
  }));

  return (
    <PlatformOverview
      platform="ios"
      title="iOS Components"
      intro={[
        "Components are the core of any design system, crafted to tackle specific UI challenges. Eufemia Native iOS is a tailored set of components that blends with Apple's native elements, allowing you to create one-of-a-kind DNB experiences that feel right at home on the platform.",
        "Just getting started? Take a look at the start designing and start developing guides.",
      ]}
      figmaUrl="https://www.figma.com/@dnb"
      githubUrl="https://github.com/dnbexperience/eufemia-native"
      components={components}
    />
  );
};

export default IOSPage;

export const Head = () => <title>iOS Components | Eufemia Design System</title>;
