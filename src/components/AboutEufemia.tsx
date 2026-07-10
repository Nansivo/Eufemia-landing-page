import React from "react";
import Layout from "./Layout";
import { useTheme } from "../context/ThemeContext";
import { font, layout } from "../theme/tokens";

interface Section {
  title: string;
  paragraphs: string[];
}

// Exact copy from the Figma "Home" frame (About Eufemia).
const sections: Section[] = [
  {
    title: "The vision",
    paragraphs: [
      "Eufemia is DNB's design system, providing resources for designers and developers to maintain consistency and efficiency when building accessible web applications. The goal is a single source of truth for design-covering color, typography, layout guidelines, and fully coded components for applications.",
    ],
  },
  {
    title: "Human & AI Ready",
    paragraphs: [
      "Eufemia is built to serve both human designers and developers, and the AI systems working alongside them. As a single source of truth for DNB's design language, Eufemia provides structured, machine-readable tokens, components, and guidelines — so whether you're a person crafting an interface or an AI agent generating one, you're always working from the same foundation.",
    ],
  },
  {
    title: "For everyone",
    paragraphs: [
      "With Eufemia, DNB can continually increase product quality for both visual users and users relying on assistive technologies. It follows industry and regulatory standards-UU Tilsynet and WCAG 2.1.",
      "You can read more about DNB UX's minimal accessibility requirements for web applications.",
    ],
  },
  {
    title: "Please contribute",
    paragraphs: [
      "Eufemia is a living design system that does not have a 'finished' state. Continuous improvement, removal, and addition of content are essential to keeping it relevant as a resource for current and future DNB products and services.",
      "Your input, comments, and discussions are all valuable. Please reach out to us and contribute.",
    ],
  },
];

const AboutEufemia: React.FC = () => {
  const { colors } = useTheme();
  const paraStyle: React.CSSProperties = {
    margin: 0,
    fontFamily: font.family,
    fontSize: `${font.size.body}px`,
    lineHeight: `${font.lineHeight.body}px`,
    color: colors.text,
  };

  return (
    <Layout currentPath="/about" currentPlatform="web">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          width: `${layout.contentWidth}px`,
          maxWidth: "100%",
          padding: "72px 56px",
          boxSizing: "content-box",
          color: colors.text,
          fontFamily: font.family,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: font.family,
            fontWeight: 500,
            fontSize: `${font.size.h1}px`,
            lineHeight: `${font.lineHeight.h1}px`,
            color: colors.text,
          }}
        >
          About Eufemia
        </h1>

        {sections.map((s) => (
          <section key={s.title} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={paraStyle}>{s.title}</p>
            {s.paragraphs.map((p, i) => (
              <p key={i} style={paraStyle}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </Layout>
  );
};

export default AboutEufemia;
