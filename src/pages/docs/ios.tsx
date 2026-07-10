import React, { useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Layout from "../../components/Layout";

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="8.5" cy="8.5" r="6" stroke="#999" strokeWidth="1.5"/>
    <path d="M13 13L17 17" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 13V3M8 3L4 7M8 3L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Default icon for components
const DefaultIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

interface Component {
  id: string;
  name: string;
  shortDescription: string | null;
  slug: {
    current: string;
  } | null;
}

const IOSPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Query components from CMS
  const data = useStaticQuery(graphql`
    query IOSComponentsQuery {
      allSanityComponent(
        filter: { platform: { eq: "ios" } }
        sort: { name: ASC }
      ) {
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

  const components: Component[] = data?.allSanityComponent?.nodes || [];

  const filteredComponents = components.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout currentPlatform="ios" currentPath="/docs/ios">
      <div style={{ padding: "48px 40px", maxWidth: "1000px" }}>
        {/* Header section */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "#f5f5f7",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#1d1d1f",
              marginBottom: "16px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.5 1.75C9.8 1.75 9.1 2.1 8.75 2.8C8.4 2.1 7.7 1.75 7 1.75C5.95 1.75 5.25 2.45 5.25 3.5C5.25 5.6 8.75 8.05 8.75 8.05C8.75 8.05 12.25 5.6 12.25 3.5C12.25 2.45 11.55 1.75 10.5 1.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 5.25H1.75V12.25H10.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            iOS Platform
          </div>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 700,
              color: "#1c1c1e",
              marginBottom: "16px",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            iOS Components
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#555",
              marginBottom: "24px",
              maxWidth: "700px",
            }}
          >
            Eufemia Native iOS is a customized subset of components that fits
            seamlessly with native Apple components, letting you build unique DNB
            experiences that feel native to the platform.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link
              to="/docs/ios/getting-started/design"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                background: "#a5e1d2",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Start designing
            </Link>
            <Link
              to="/docs/ios/getting-started/develop"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                background: "#fff",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#333",
                textDecoration: "none",
              }}
            >
              Start developing
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "#e0e0e0",
            margin: "40px 0",
          }}
        />

        {/* Search Input */}
        <div style={{ position: "relative", marginBottom: "32px" }}>
          <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 14px 14px 48px",
              border: "2px solid #e8e8e8",
              borderRadius: "12px",
              fontSize: "15px",
              color: "#333",
              background: "#fafafa",
              boxSizing: "border-box",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#a5e1d2";
              e.currentTarget.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#e8e8e8";
              e.currentTarget.style.background = "#fafafa";
            }}
          />
        </div>

        {/* Empty state */}
        {components.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#f9f9f9",
              borderRadius: "12px",
              border: "1px dashed #ddd",
            }}
          >
            <p style={{ fontSize: "16px", color: "#666", marginBottom: "8px" }}>
              No iOS components yet
            </p>
            <p style={{ fontSize: "14px", color: "#999" }}>
              Add components in Sanity Studio to see them here.
            </p>
          </div>
        )}

        {/* Component Grid */}
        {filteredComponents.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "48px",
            }}
          >
            {filteredComponents.map((component) => (
              <Link
                key={component.id}
                to={`/docs/ios/components/${component.slug?.current}`}
                onMouseEnter={() => setHoveredCard(component.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transform: hoveredCard === component.id ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: hoveredCard === component.id
                    ? "0 12px 32px rgba(0, 0, 0, 0.12)"
                    : "0 2px 8px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    height: "120px",
                    background: hoveredCard === component.id
                      ? "#a5e1d2"
                      : "#f8f8f8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    color: hoveredCard === component.id ? "#fff" : "#666",
                  }}
                >
                  <DefaultIcon />
                </div>
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#1c1c1e",
                      marginBottom: "8px",
                    }}
                  >
                    {component.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      lineHeight: 1.5,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {component.shortDescription || "No description available."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No results */}
        {components.length > 0 && filteredComponents.length === 0 && searchQuery && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "#666",
            }}
          >
            <p>No components found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 18px",
            background: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            color: "#a5e1d2",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          Back to top
          <ArrowUpIcon />
        </button>
      </div>
    </Layout>
  );
};

export default IOSPage;

export const Head = () => <title>iOS Components | Eufemia Design System</title>;
