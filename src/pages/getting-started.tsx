import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const paths = [
  {
    title: "For Designers",
    description: "Get access to Figma libraries, design tokens, and learn how to use Eufemia's design language effectively.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    link: "/docs/design",
    color: "#007272",
  },
  {
    title: "For Developers",
    description: "Install Eufemia packages, learn the API, and start building accessible React applications.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    link: "/docs/web/getting-started/develop",
    color: "#1a1a1a",
  },
];

const platforms = [
  {
    name: "Web",
    description: "React components for building web applications with full TypeScript support.",
    link: "/docs/web",
    status: "Stable",
  },
  {
    name: "iOS",
    description: "Native SwiftUI components that integrate seamlessly with Apple's design patterns.",
    link: "/docs/ios",
    status: "Stable",
  },
  {
    name: "Android",
    description: "Jetpack Compose components following Material Design guidelines with DNB styling.",
    link: "/docs/android",
    status: "Beta",
  },
];

const resources = [
  {
    title: "Design Tokens",
    description: "Colors, spacing, typography, and other design primitives",
    link: "/docs/web/tokens",
  },
  {
    title: "Components",
    description: "Pre-built UI components ready for production use",
    link: "/docs/web",
  },
  {
    title: "Icons",
    description: "A comprehensive icon library for all your UI needs",
    link: "/docs/web/icons",
  },
  {
    title: "Accessibility",
    description: "Guidelines and best practices for inclusive design",
    link: "/docs/web/accessibility",
  },
];

const GettingStartedPage: React.FC = () => {
  const [hoveredPath, setHoveredPath] = React.useState<number | null>(null);
  const [hoveredResource, setHoveredResource] = React.useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout currentPath="/getting-started">
      <div style={{ padding: "48px 40px", maxWidth: "900px" }}>
        {/* Hero */}
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 12px",
              background: "linear-gradient(135deg, #e6f2f2 0%, #d4ebeb 100%)",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#007272",
              marginBottom: "16px",
            }}
          >
            Getting Started
          </div>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 700,
              color: isDark ? "#fff" : "#1a1a1a",
              marginBottom: "16px",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            Start building with Eufemia
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: isDark ? "#999" : "#555",
              maxWidth: "700px",
            }}
          >
            Whether you're a designer setting up Figma or a developer installing packages,
            we've got you covered. Choose your path below to get started.
          </p>
        </div>

        {/* Designer/Developer Paths */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "48px" }}>
          {paths.map((path, index) => (
            <Link
              key={path.title}
              to={path.link}
              onMouseEnter={() => setHoveredPath(index)}
              onMouseLeave={() => setHoveredPath(null)}
              style={{
                position: "relative",
                display: "block",
                padding: "32px",
                background: `linear-gradient(135deg, ${path.color} 0%, ${path.color}dd 100%)`,
                borderRadius: "16px",
                textDecoration: "none",
                overflow: "hidden",
                transform: hoveredPath === index ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hoveredPath === index
                  ? `0 20px 40px ${path.color}40`
                  : `0 8px 24px ${path.color}20`,
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  right: "-30px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              />
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  color: "#fff",
                }}
              >
                {path.icon}
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#fff", marginBottom: "8px" }}>
                {path.title}
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.85)", lineHeight: 1.6, margin: 0 }}>
                {path.description}
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "20px",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#fff",
                }}
              >
                Get started
                <ArrowIcon />
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${isDark ? "#444" : "#e0e0e0"}, transparent)`,
            margin: "48px 0",
          }}
        />

        {/* Platforms */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1a1a1a",
            marginBottom: "16px",
            letterSpacing: "-0.3px",
          }}
        >
          Choose your platform
        </h2>
        <p style={{ fontSize: "16px", color: isDark ? "#999" : "#666", marginBottom: "24px" }}>
          Eufemia is available across multiple platforms. Select the one that matches your project.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "48px" }}>
          {platforms.map((platform) => (
            <Link
              key={platform.name}
              to={platform.link}
              style={{
                display: "block",
                padding: "24px",
                background: isDark ? "#1a1a1a" : "#fff",
                border: `1px solid ${isDark ? "#333" : "#e8e8e8"}`,
                borderRadius: "12px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#007272";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e8e8e8";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
                  {platform.name}
                </h3>
                <span
                  style={{
                    padding: "2px 8px",
                    background: platform.status === "Stable" ? "#e6f2f2" : "#fff3e6",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: platform.status === "Stable" ? "#007272" : "#cc7a00",
                  }}
                >
                  {platform.status}
                </span>
              </div>
              <p style={{ fontSize: "14px", color: isDark ? "#999" : "#666", lineHeight: 1.5, margin: 0 }}>
                {platform.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${isDark ? "#444" : "#e0e0e0"}, transparent)`,
            margin: "48px 0",
          }}
        />

        {/* Resources */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1a1a1a",
            marginBottom: "24px",
            letterSpacing: "-0.3px",
          }}
        >
          Key Resources
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {resources.map((resource) => (
            <Link
              key={resource.title}
              to={resource.link}
              onMouseEnter={() => setHoveredResource(resource.title)}
              onMouseLeave={() => setHoveredResource(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px",
                background: hoveredResource === resource.title ? isDark ? "#222" : "#fafafa" : isDark ? "#1a1a1a" : "#fff",
                border: `1px solid ${isDark ? "#333" : "#e8e8e8"}`,
                borderRadius: "8px",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#007272", marginBottom: "4px" }}>
                  {resource.title}
                </h3>
                <p style={{ fontSize: "13px", color: isDark ? "#999" : "#666", margin: 0 }}>
                  {resource.description}
                </p>
              </div>
              <div style={{ color: "#007272" }}>
                <ArrowIcon />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GettingStartedPage;

export const Head = () => <title>Getting Started | Eufemia Design System</title>;
