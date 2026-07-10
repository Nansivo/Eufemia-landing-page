import React from "react";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";

const changelog = [
  {
    version: "10.15.0",
    date: "January 10, 2025",
    changes: [
      { type: "feature", description: "Added new DatePicker component with range selection support" },
      { type: "improvement", description: "Improved Button component accessibility with better focus indicators" },
      { type: "fix", description: "Fixed Modal closing animation on Safari browsers" },
    ],
  },
  {
    version: "10.14.2",
    date: "December 18, 2024",
    changes: [
      { type: "fix", description: "Fixed Input validation state not updating correctly" },
      { type: "fix", description: "Fixed Dropdown z-index issues in nested contexts" },
    ],
  },
  {
    version: "10.14.0",
    date: "December 5, 2024",
    changes: [
      { type: "feature", description: "Added Skeleton component for loading states" },
      { type: "feature", description: "Added Toast notification component" },
      { type: "improvement", description: "Updated color tokens for better contrast ratios" },
      { type: "improvement", description: "Reduced bundle size by 15% through tree-shaking improvements" },
    ],
  },
  {
    version: "10.13.0",
    date: "November 22, 2024",
    changes: [
      { type: "feature", description: "Added Accordion component with animation support" },
      { type: "improvement", description: "Improved Table component performance for large datasets" },
      { type: "fix", description: "Fixed Card shadow not rendering correctly in dark mode" },
      { type: "breaking", description: "Removed deprecated `size` prop from Icon component, use `width` and `height` instead" },
    ],
  },
  {
    version: "10.12.1",
    date: "November 12, 2024",
    changes: [
      { type: "improvement", description: "Updated icon sizes for component Button variant tertiary (16px default, 24px for icon position top)" },
      { type: "improvement", description: "Updated icon sizes for component Button" },
    ],
  },
  {
    version: "10.12.0",
    date: "October 28, 2024",
    changes: [
      { type: "feature", description: "Added Tabs component with keyboard navigation" },
      { type: "feature", description: "Added Breadcrumb component" },
      { type: "improvement", description: "Improved form validation messages with better UX" },
    ],
  },
  {
    version: "10.11.0",
    date: "October 8, 2024",
    changes: [
      { type: "improvement", description: "Default shadow (defaultDropShadow() and .dnb-drop-shadow) was changed to 0.8pc 16px rgba(51,51,51, 0.08)" },
      { type: "fix", description: "Fixed Checkbox label alignment in RTL layouts" },
    ],
  },
];

const getTypeStyles = (type: string) => {
  switch (type) {
    case "feature":
      return { background: "#e6f2f2", color: "#a5e1d2", label: "New" };
    case "improvement":
      return { background: "#e6f0ff", color: "#0055cc", label: "Improved" };
    case "fix":
      return { background: "#fff3e6", color: "#cc7a00", label: "Fixed" };
    case "breaking":
      return { background: "#ffe6e6", color: "#cc0000", label: "Breaking" };
    default:
      return { background: "#f5f5f5", color: "#666", label: type };
  }
};

const ChangelogPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Layout currentPath="/changelog">
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
              color: "#a5e1d2",
              marginBottom: "16px",
            }}
          >
            Changelog
          </div>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 700,
              color: isDark ? "#fff" : "#1c1c1e",
              marginBottom: "16px",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            What's New in Eufemia
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: isDark ? "#999" : "#555",
              maxWidth: "700px",
            }}
          >
            Track all updates, new features, improvements, and bug fixes across
            Eufemia releases. Stay up to date with the latest changes.
          </p>
        </div>

        {/* Changelog entries */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {changelog.map((release) => (
            <div
              key={release.version}
              id={release.version.replace(/\./g, "-")}
              style={{
                padding: "28px",
                background: isDark ? "#1c1c1e" : "#fff",
                border: `1px solid ${isDark ? "#333" : "#e8e8e8"}`,
                borderRadius: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "22px", fontWeight: 600, color: isDark ? "#fff" : "#1c1c1e", margin: 0 }}>
                  v{release.version}
                </h2>
                <span
                  style={{
                    fontSize: "13px",
                    color: isDark ? "#999" : "#888",
                    padding: "4px 12px",
                    background: isDark ? "#222" : "#fafafa",
                    borderRadius: "6px",
                  }}
                >
                  {release.date}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {release.changes.map((change, index) => {
                  const typeStyles = getTypeStyles(change.type);
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "12px 16px",
                        background: isDark ? "#222" : "#fafafa",
                        borderRadius: "8px",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          padding: "2px 8px",
                          background: typeStyles.background,
                          color: typeStyles.color,
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        {typeStyles.label}
                      </span>
                      <p style={{ fontSize: "14px", color: isDark ? "#999" : "#444", lineHeight: 1.5, margin: 0 }}>
                        {change.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Load more hint */}
        <div
          style={{
            marginTop: "48px",
            padding: "24px",
            background: isDark ? "#1c1c1e" : "#fafafa",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "14px", color: isDark ? "#999" : "#666", margin: 0 }}>
            For the complete changelog history, check the{" "}
            <a
              href="https://github.com/dnbexperience/eufemia/releases"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#a5e1d2", textDecoration: "underline" }}
            >
              GitHub releases page
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ChangelogPage;

export const Head = () => <title>Changelog | Eufemia Design System</title>;
