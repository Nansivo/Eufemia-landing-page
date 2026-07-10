import React, { useState } from "react";
import { Link } from "gatsby";
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

const components = [
  {
    name: "Button",
    description: "Buttons are used to trigger actions or navigate to new pages. They come in different variants and sizes.",
    path: "/docs/web/components/button",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Input",
    description: "Input fields allow users to enter and edit text. They support various types and validation states.",
    path: "/docs/web/components/input",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 12H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "Dropdown",
    description: "Dropdowns allow users to select an option from a list of choices.",
    path: "/docs/web/components/dropdown",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 11L12 14L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Card",
    description: "Cards are used to group related content and actions about a single subject.",
    path: "/docs/web/components/card",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: "Modal",
    description: "Modals are dialog windows that appear on top of the main content to capture user attention.",
    path: "/docs/web/components/modal",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 20L12 16L18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: "Table",
    description: "Tables display data in rows and columns for easy scanning and comparison.",
    path: "/docs/web/components/table",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 9H21M3 15H21M9 4V20M15 4V20" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
];

const WebPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredComponents = components.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout currentPlatform="web" currentPath="/docs/web">
      <div style={{ padding: "48px 40px", maxWidth: "1000px" }}>
        {/* Header section */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 12px",
              background: "linear-gradient(135deg, #e6f2f2 0%, #d4ebeb 100%)",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#a5e1d2",
              marginBottom: "16px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 3V7L9.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Web Platform
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
            Web Components
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
            A comprehensive set of React components that follow DNB's design
            guidelines and accessibility standards. Build beautiful, consistent,
            and accessible web applications.
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link
              to="/docs/web/getting-started/design"
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
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#005f5f";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#a5e1d2";
              }}
            >
              Start designing
            </Link>
            <Link
              to="/docs/web/getting-started/develop"
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
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#a5e1d2";
                e.currentTarget.style.color = "#a5e1d2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e0e0e0";
                e.currentTarget.style.color = "#333";
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
            background: "linear-gradient(90deg, #e0e0e0, transparent)",
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
              transition: "all 0.2s ease",
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

        {/* Component Grid */}
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
              key={component.name}
              to={component.path}
              onMouseEnter={() => setHoveredCard(component.name)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "16px",
                overflow: "hidden",
                transform: hoveredCard === component.name ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hoveredCard === component.name
                  ? "0 12px 32px rgba(0, 0, 0, 0.12)"
                  : "0 2px 8px rgba(0, 0, 0, 0.04)",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  height: "120px",
                  background: hoveredCard === component.name
                    ? "linear-gradient(135deg, #a5e1d2 0%, #a5e1d2 100%)"
                    : "linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  color: hoveredCard === component.name ? "#fff" : "#666",
                }}
              >
                {component.icon}
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
                  {component.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

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
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
          }}
        >
          Back to top
          <ArrowUpIcon />
        </button>
      </div>
    </Layout>
  );
};

export default WebPage;

export const Head = () => <title>Web Overview | Eufemia Design System</title>;
