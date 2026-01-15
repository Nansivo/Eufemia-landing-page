import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../../components/Layout";
import ComparisonView from "../../components/ComparisonView";

interface ComponentData {
  id: string;
  name: string;
  platform: string;
  shortDescription: string | null;
  _rawDocumentation: any[] | null;
  previewImage?: {
    asset?: {
      url?: string;
    };
  };
  guidelines?: string;
  usage?: string;
  dosAndDonts?: string;
  accessibilityInfo?: string;
  figmaLink: string | null;
  githubLink: string | null;
  status?: string;
  slug: {
    current: string;
  };
}

// Note: Static components removed - only CMS components are compared now
// The static iOS/Android components in SearchModal are just for search/navigation,
// not for comparison which requires real documentation

const ComparisonPage: React.FC = () => {
  const [first, setFirst] = useState<ComponentData | null>(null);
  const [second, setSecond] = useState<ComponentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
        const firstParam = params.get("first");
        const secondParam = params.get("second");

        if (!firstParam || !secondParam) {
          setError("Please provide both components using: ?first=platform/slug&second=platform/slug");
          setLoading(false);
          return;
        }

        // Parse the params (format: platform/slug)
        const [firstPlatform, firstSlug] = firstParam.split("/");
        const [secondPlatform, secondSlug] = secondParam.split("/");

        if (!firstPlatform || !firstSlug || !secondPlatform || !secondSlug) {
          setError("Invalid URL format. Use: ?first=platform/slug&second=platform/slug");
          setLoading(false);
          return;
        }

        // Query Gatsby's GraphQL API for all components
        const response = await fetch(`/___graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              {
                allSanityComponent {
                  nodes {
                    id
                    name
                    platform
                    shortDescription
                    _rawDocumentation
                    figmaLink
                    githubLink
                    slug {
                      current
                    }
                  }
                }
              }
            `,
          }),
        });

        const data = await response.json();

        if (data.errors) {
          console.error("GraphQL errors:", data.errors);
          setError(`Failed to fetch components: ${data.errors[0]?.message || "Unknown error"}`);
          setLoading(false);
          return;
        }

        // Filter components client-side (CMS only)
        const allComponents = data.data?.allSanityComponent?.nodes || [];
        console.log("All components:", allComponents);
        console.log("Looking for:", { firstPlatform, firstSlug, secondPlatform, secondSlug });

        const firstComponent = allComponents.find(
          (c: any) => c.platform === firstPlatform && c.slug.current === firstSlug
        );
        const secondComponent = allComponents.find(
          (c: any) => c.platform === secondPlatform && c.slug.current === secondSlug
        );

        console.log("Found components:", { firstComponent, secondComponent });

        if (!firstComponent || !secondComponent) {
          setError(`One or both components not found. Looking for: ${firstPlatform}/${firstSlug} and ${secondPlatform}/${secondSlug}. Only CMS components can be compared.`);
          setLoading(false);
          return;
        }

        setFirst(firstComponent);
        setSecond(secondComponent);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching comparison data:", err);
        setError("Failed to load comparison");
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: "48px 40px", maxWidth: "800px", textAlign: "center" }}>
          <p>Loading comparison...</p>
        </div>
      </Layout>
    );
  }

  if (error || !first || !second) {
    return (
      <Layout>
        <div style={{ padding: "48px 40px", maxWidth: "800px", textAlign: "center" }}>
          <h2>Comparison not available</h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>{error || "Components not found"}</p>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "8px 14px",
              background: "#007272",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: "32px 40px" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: "#1a1a1a" }}>
              {first.name} vs {second.name}
            </h1>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "8px 14px",
                background: "#f5f5f5",
                border: "1px solid #e0e0e0",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#333",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#eee")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            >
              Back
            </button>
          </div>
          <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
            {first.platform === second.platform
              ? `${first.platform.charAt(0).toUpperCase() + first.platform.slice(1)} Components`
              : `${first.platform.charAt(0).toUpperCase() + first.platform.slice(1)} vs ${second.platform.charAt(0).toUpperCase() + second.platform.slice(1)}`}
          </p>
        </div>

        {/* Comparison View */}
        <ComparisonView first={first} second={second} />
      </div>
    </Layout>
  );
};

export default ComparisonPage;
