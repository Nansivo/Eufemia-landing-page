import React from "react";
import { Link } from "gatsby";
import Layout from "../../components/Layout";
import { useTheme } from "../../context/ThemeContext";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8L6.5 11.5L13 4.5" stroke="#a5e1d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const figmaLibraries = [
  {
    name: "Eufemia Core",
    description: "Foundation components, colors, typography, and spacing",
    link: "https://figma.com",
  },
  {
    name: "Eufemia Web",
    description: "Complete web component library with all variants",
    link: "https://figma.com",
  },
  {
    name: "Eufemia Icons",
    description: "Full icon set with multiple sizes and styles",
    link: "https://figma.com",
  },
  {
    name: "Eufemia Mobile",
    description: "iOS and Android specific components and patterns",
    link: "https://figma.com",
  },
];

const setupSteps = [
  "Sign in to Figma with your DNB account",
  "Navigate to the team libraries section",
  "Enable the Eufemia libraries you need",
  "Start using components in your designs",
];

const bestPractices = [
  {
    title: "Use components, don't detach",
    description: "Always use library components instead of detaching them. This ensures you receive updates automatically.",
  },
  {
    title: "Follow the naming conventions",
    description: "Use consistent naming for layers and frames. This helps with developer handoff and file organization.",
  },
  {
    title: "Leverage auto-layout",
    description: "Build your designs with auto-layout to ensure they're responsive and match component behavior.",
  },
  {
    title: "Document your work",
    description: "Add notes and annotations to explain design decisions and interactive states.",
  },
];

const DesignPage: React.FC = () => {
  const [hoveredLibrary, setHoveredLibrary] = React.useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Layout currentPath="/docs/design">
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
            Design
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
            Start Designing
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: isDark ? "#999" : "#555",
              maxWidth: "700px",
            }}
          >
            Get set up with Eufemia's Figma libraries and learn how to use our design
            system effectively. We provide everything you need to create consistent,
            beautiful designs.
          </p>
        </div>

        {/* Figma Setup */}
        <div
          style={{
            padding: "32px",
            background: isDark ? "#1c1c1e" : "#1c1c1e",
            borderRadius: "16px",
            marginBottom: "48px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M10.667 32C13.612 32 16 29.612 16 26.667V21.333H10.667C7.721 21.333 5.333 23.721 5.333 26.667C5.333 29.612 7.721 32 10.667 32Z" fill="#0ACF83"/>
              <path d="M5.333 16C5.333 13.055 7.721 10.667 10.667 10.667H16V21.333H10.667C7.721 21.333 5.333 18.945 5.333 16Z" fill="#A259FF"/>
              <path d="M5.333 5.333C5.333 2.388 7.721 0 10.667 0H16V10.667H10.667C7.721 10.667 5.333 8.279 5.333 5.333Z" fill="#F24E1E"/>
              <path d="M16 0H21.333C24.279 0 26.667 2.388 26.667 5.333C26.667 8.279 24.279 10.667 21.333 10.667H16V0Z" fill="#FF7262"/>
              <path d="M26.667 16C26.667 18.945 24.279 21.333 21.333 21.333C18.388 21.333 16 18.945 16 16C16 13.055 18.388 10.667 21.333 10.667C24.279 10.667 26.667 13.055 26.667 16Z" fill="#1ABCFE"/>
            </svg>
            <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#fff", margin: 0 }}>
              Figma Setup
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {setupSteps.map((step, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#fff",
                  }}
                >
                  {index + 1}
                </div>
                <span style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.9)" }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Figma Libraries */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1c1c1e",
            marginBottom: "16px",
            letterSpacing: "-0.3px",
          }}
        >
          Figma Libraries
        </h2>
        <p style={{ fontSize: "16px", color: isDark ? "#999" : "#666", marginBottom: "24px" }}>
          Enable these libraries in Figma to access all Eufemia components and styles.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "48px" }}>
          {figmaLibraries.map((library) => (
            <a
              key={library.name}
              href={library.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredLibrary(library.name)}
              onMouseLeave={() => setHoveredLibrary(null)}
              style={{
                display: "block",
                padding: "20px",
                background: isDark ? "#1c1c1e" : "#fff",
                border: `1px solid ${isDark ? "#333" : "#e8e8e8"}`,
                borderRadius: "12px",
                textDecoration: "none",
                transform: hoveredLibrary === library.name ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hoveredLibrary === library.name
                  ? "0 8px 24px rgba(0, 0, 0, 0.08)"
                  : "0 2px 8px rgba(0, 0, 0, 0.04)",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: isDark ? "#fff" : "#1c1c1e", margin: 0 }}>
                  {library.name}
                </h3>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: "#999" }}>
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p style={{ fontSize: "13px", color: isDark ? "#999" : "#666", margin: 0 }}>
                {library.description}
              </p>
            </a>
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

        {/* Best Practices */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1c1c1e",
            marginBottom: "24px",
            letterSpacing: "-0.3px",
          }}
        >
          Best Practices
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
          {bestPractices.map((practice) => (
            <div
              key={practice.title}
              style={{
                display: "flex",
                gap: "16px",
                padding: "20px",
                background: isDark ? "#222" : "#fafafa",
                borderRadius: "12px",
              }}
            >
              <div style={{ flexShrink: 0, marginTop: "2px" }}>
                <CheckIcon />
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: isDark ? "#fff" : "#1c1c1e", marginBottom: "4px" }}>
                  {practice.title}
                </h3>
                <p style={{ fontSize: "14px", color: isDark ? "#999" : "#666", lineHeight: 1.5, margin: 0 }}>
                  {practice.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div
          style={{
            padding: "32px",
            background: "linear-gradient(135deg, #a5e1d2 0%, #a5e1d2 100%)",
            borderRadius: "16px",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#fff", marginBottom: "12px" }}>
            Ready to explore components?
          </h3>
          <p style={{ fontSize: "15px", color: "rgba(255, 255, 255, 0.9)", marginBottom: "20px" }}>
            Now that you're set up, explore our component library and start designing.
          </p>
          <Link
            to="/docs/web"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "#fff",
              borderRadius: "8px",
              color: "#a5e1d2",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Browse components
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DesignPage;

export const Head = () => <title>Start Designing | Eufemia Design System</title>;
