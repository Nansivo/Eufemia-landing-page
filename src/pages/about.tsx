import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const principles = [
  {
    title: "Accessibility First",
    description: "Every component is built with accessibility in mind, following WCAG 2.1 AA standards. We believe great design should be inclusive and usable by everyone.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Consistency",
    description: "A unified design language across all platforms ensures that DNB customers have a seamless experience, whether on web, iOS, or Android.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: "Efficiency",
    description: "Pre-built, tested components let teams focus on solving business problems rather than reinventing the wheel. Ship faster with confidence.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Flexibility",
    description: "While opinionated by default, Eufemia components can be customized through theming and props to meet specific product needs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const team = [
  { role: "Design", description: "Creating and maintaining the visual language, components, and design tokens" },
  { role: "Engineering", description: "Building and maintaining React, iOS, and Android component libraries" },
  { role: "Documentation", description: "Writing guides, API references, and keeping everything up to date" },
  { role: "Accessibility", description: "Ensuring all components meet accessibility standards and best practices" },
];

const AboutPage: React.FC = () => {
  const [hoveredPrinciple, setHoveredPrinciple] = React.useState<number | null>(null);

  return (
    <Layout currentPath="/about">
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
            About
          </div>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: "16px",
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
            }}
          >
            About Eufemia
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#555",
              maxWidth: "700px",
            }}
          >
            Eufemia is DNB's design system, named after the medieval queen known for
            her patronage of literature and the arts. Just as Queen Eufemia brought
            cultural refinement to Scandinavia, our design system brings visual and
            functional consistency to DNB's digital products.
          </p>
        </div>

        {/* Mission */}
        <div
          style={{
            padding: "32px",
            background: "linear-gradient(135deg, #007272 0%, #009999 100%)",
            borderRadius: "16px",
            marginBottom: "48px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#fff", marginBottom: "12px" }}>
            Our Mission
          </h2>
          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "rgba(255, 255, 255, 0.9)", margin: 0 }}>
            To empower DNB teams to build consistent, accessible, and beautiful digital
            experiences that delight our customers. We provide the building blocks, so
            teams can focus on what matters most: solving customer problems.
          </p>
        </div>

        {/* Principles */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1a1a1a",
            marginBottom: "24px",
            letterSpacing: "-0.3px",
          }}
        >
          Design Principles
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              onMouseEnter={() => setHoveredPrinciple(index)}
              onMouseLeave={() => setHoveredPrinciple(null)}
              style={{
                padding: "24px",
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: "12px",
                transform: hoveredPrinciple === index ? "translateY(-2px)" : "translateY(0)",
                boxShadow: hoveredPrinciple === index
                  ? "0 8px 24px rgba(0, 0, 0, 0.08)"
                  : "0 2px 8px rgba(0, 0, 0, 0.04)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: hoveredPrinciple === index ? "#007272" : "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  color: hoveredPrinciple === index ? "#fff" : "#666",
                  transition: "all 0.2s ease",
                }}
              >
                {principle.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a1a", marginBottom: "8px" }}>
                {principle.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6, margin: 0 }}>
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #e0e0e0, transparent)",
            margin: "48px 0",
          }}
        />

        {/* Team */}
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "#1a1a1a",
            marginBottom: "24px",
            letterSpacing: "-0.3px",
          }}
        >
          The Team
        </h2>
        <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#555", marginBottom: "24px" }}>
          Eufemia is maintained by a dedicated team within DNB, working across multiple disciplines:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "48px" }}>
          {team.map((member) => (
            <div
              key={member.role}
              style={{
                padding: "20px",
                background: "#fafafa",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#007272", marginBottom: "6px" }}>
                {member.role}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.5, margin: 0 }}>
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            padding: "32px",
            background: "#fafafa",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1a1a1a", marginBottom: "12px" }}>
            Ready to get started?
          </h3>
          <p style={{ fontSize: "15px", color: "#666", marginBottom: "20px" }}>
            Jump into our getting started guide and start building with Eufemia today.
          </p>
          <Link
            to="/getting-started"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "#007272",
              borderRadius: "8px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 500,
              transition: "all 0.2s ease",
            }}
          >
            Get started
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;

export const Head = () => <title>About Eufemia | DNB Design System</title>;
