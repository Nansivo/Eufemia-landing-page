import React, { useState } from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const content = {
  badge: "DNB Design System",
  headline: "Build consistent experiences with Eufemia",
  subheadline: "Components, patterns, and guidelines for building accessible applications at DNB.",
  primaryButtonText: "Get started",
  primaryButtonLink: "/getting-started",
  secondaryButtonText: "Browse components",
  secondaryButtonLink: "https://eufemia.dnb.no/uilib/",
  designCardTitle: "Design",
  designCardDescription: "Figma libraries and design guidelines",
  developCardTitle: "Develop",
  developCardDescription: "React components and API docs",
};

const updates = [
  {
    date: "Jan 10, 2025",
    title: "DatePicker component",
    description: "New DatePicker with range selection support.",
  },
  {
    date: "Dec 18, 2024",
    title: "Bundle size reduced",
    description: "15% smaller through better tree-shaking.",
  },
  {
    date: "Dec 5, 2024",
    title: "Toast notifications",
    description: "Non-blocking notification component added.",
  },
];

const resources = [
  { label: "Typography", path: "https://eufemia.dnb.no/uilib/typography/" },
  { label: "Colors", path: "https://eufemia.dnb.no/uilib/usage/layout/colors/" },
  { label: "Icons", path: "https://eufemia.dnb.no/icons/" },
  { label: "Spacing", path: "https://eufemia.dnb.no/uilib/usage/layout/spacing/" },
  { label: "Theming", path: "https://eufemia.dnb.no/uilib/usage/customisation/theming/" },
];

const IndexPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <Layout currentPath="/">
      <div style={{ maxWidth: "840px", padding: "56px 40px" }}>
        {/* Hero */}
        <div style={{ marginBottom: "56px" }}>
          <p style={{ fontSize: "14px", color: "#007272", fontWeight: 500, marginBottom: "12px" }}>
            {content.badge}
          </p>
          <h1 style={{
            fontSize: "40px",
            fontWeight: 600,
            color: "#111",
            marginBottom: "16px",
            lineHeight: 1.2,
            letterSpacing: "-0.5px"
          }}>
            {content.headline}
          </h1>
          <p style={{
            fontSize: "17px",
            lineHeight: 1.6,
            color: "#555",
            marginBottom: "28px",
            maxWidth: "560px"
          }}>
            {content.subheadline}
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link
              to={content.primaryButtonLink}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                background: "#007272",
                borderRadius: "6px",
                color: "#fff",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {content.primaryButtonText}
              <ArrowIcon />
            </Link>
            <a
              href={content.secondaryButtonLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "6px",
                color: "#333",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {content.secondaryButtonText}
            </a>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "56px" }}>
          <Link
            to="/docs/design"
            onMouseEnter={() => setHoveredCard("design")}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: "block",
              padding: "28px",
              background: "#007272",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              transform: hoveredCard === "design" ? "translateY(-2px)" : "none",
              boxShadow: hoveredCard === "design" ? "0 4px 12px rgba(0,114,114,0.2)" : "none",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>
              {content.designCardTitle}
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.5 }}>
              {content.designCardDescription}
            </p>
          </Link>

          <a
            href="https://eufemia.dnb.no/uilib/getting-started/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredCard("develop")}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: "block",
              padding: "28px",
              background: "#1a1a1a",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              transform: hoveredCard === "develop" ? "translateY(-2px)" : "none",
              boxShadow: hoveredCard === "develop" ? "0 4px 12px rgba(0,0,0,0.15)" : "none",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>
              {content.developCardTitle}
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.5 }}>
              {content.developCardDescription}
            </p>
          </a>
        </div>

        {/* Updates */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111" }}>
              Recent updates
            </h2>
            <Link
              to="/changelog"
              style={{
                fontSize: "14px",
                color: "#007272",
                textDecoration: "none",
              }}
            >
              View all
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#eee", borderRadius: "8px", overflow: "hidden" }}>
            {updates.map((update, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "16px 20px",
                  background: "#fff",
                }}
              >
                <span style={{ fontSize: "13px", color: "#888", minWidth: "90px", flexShrink: 0 }}>
                  {update.date}
                </span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#111", marginBottom: "2px" }}>
                    {update.title}
                  </p>
                  <p style={{ fontSize: "13px", color: "#666", margin: 0 }}>
                    {update.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#111", marginBottom: "16px" }}>
            Resources
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {resources.map((resource) => (
              <a
                key={resource.path}
                href={resource.path}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 14px",
                  background: "#f5f5f5",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#444",
                  textDecoration: "none",
                }}
              >
                {resource.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Eufemia | DNB Design System</title>;
