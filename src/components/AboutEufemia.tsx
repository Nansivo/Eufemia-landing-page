import React, { useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import { NAV_HEIGHT } from "./Header";
import { useTheme } from "../context/ThemeContext";
import { font } from "../theme/tokens";

type Block =
  | { type: "p"; text: string }
  | { type: "names"; items: string[] }
  | { type: "bullets"; items: string[] }
  | { type: "subhead"; text: string }
  | { type: "links"; items: { label: string; href: string }[] };

interface Section {
  title: string;
  step: string; // label shown in the right-hand stepper
  blocks: Block[];
}

// Exact copy from the Figma "Home" frame (About Eufemia) + expanded sections.
const sections: Section[] = [
  {
    title: "The vision",
    step: "The Vision",
    blocks: [
      { type: "p", text: "Eufemia is DNB's design system, providing resources for designers and developers to maintain consistency and efficiency when building accessible web applications. The goal is a single source of truth for design-covering color, typography, layout guidelines, and fully coded components for applications." },
    ],
  },
  {
    title: "Human & AI Ready",
    step: "Human & AI Ready",
    blocks: [
      { type: "p", text: "Eufemia is built to serve both human designers and developers, and the AI systems working alongside them. As a single source of truth for DNB's design language, Eufemia provides structured, machine-readable tokens, components, and guidelines — so whether you're a person crafting an interface or an AI agent generating one, you're always working from the same foundation." },
    ],
  },
  {
    title: "Accessibility",
    step: "Accessibility",
    blocks: [
      { type: "p", text: "With Eufemia, DNB can continually increase product quality for both visual users and users relying on assistive technologies. It follows industry and regulatory standards-UU Tilsynet and WCAG 2.1." },
      { type: "p", text: "You can read more about DNB UX's minimal accessibility requirements for web applications." },
    ],
  },
  {
    title: "Please contribute",
    step: "Contribute",
    blocks: [
      { type: "p", text: "Eufemia is a living design system that does not have a 'finished' state. Continuous improvement, removal, and addition of content are essential to keeping it relevant as a resource for current and future DNB products and services." },
      { type: "p", text: "Your input, comments, and discussions are all valuable. Please reach out to us and contribute." },
    ],
  },
  {
    title: "Special thanks",
    step: "Special thanks",
    blocks: [
      { type: "p", text: "Thank you to everyone who has contributed to building Eufemia. Notable contributors include:" },
      {
        type: "names",
        items: [
          "Jens Thuland", "Casper Brekke", "Mats Ødegaard Vassli", "Sindre Marken",
          "Kevin Murphy", "Tobias Høegh", "Anders Langseth", "Joakim Bjerknes",
          "Snorre Kim", "Henrik Haugberg", "Yngve Sundfjord", "Dina Rosvoll",
          "Thayanan Tharmapalan", "Hans Kristian Smedsrød", "Arne Haltstrand", "Kirsti Merete Frelsøy",
        ],
      },
    ],
  },
  {
    title: "Transparency",
    step: "Transparency",
    blocks: [
      { type: "p", text: "The UX team created the Eufemia design system to streamline design and development processes at DNB." },
      { type: "p", text: "Access to code and documentation is essential for building strong relationships and maintaining balance between contribution, development, and communication." },
      { type: "p", text: "To ensure transparency, we've made both the code on GitHub and the Eufemia Portal available without restrictions." },
      { type: "p", text: "This approach:" },
      {
        type: "bullets",
        items: [
          "Enables anyone to contribute",
          "Strengthens the identity of design and development processes at DNB",
          "Defines user ownership of the design system",
          "Increases professionalization of development processes",
          "Contributes to maximum transparency with partners and DNB customers",
          "Simplifies daily work for design system users",
          "Makes the design system available to those without internal DNB access",
        ],
      },
      { type: "p", text: "It reflects DNB's reputation for clarity, transparency, and pride in our work. Sharing our design system openly makes it accessible to collaborators and signals our continuous commitment to creating the best solutions." },
    ],
  },
  {
    title: "Credits",
    step: "Credits",
    blocks: [
      { type: "p", text: "The Eufemia Portal includes third-party services." },
      { type: "subhead", text: "Additional links" },
      {
        type: "links",
        items: [
          { label: "Privacy", href: "https://www.dnb.no/en/about-us/privacy-policy" },
          { label: "License", href: "https://github.com/dnbexperience/eufemia/blob/main/LICENSE" },
        ],
      },
    ],
  },
];

const AboutEufemia: React.FC = () => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState<Set<number>>(() => new Set([0]));
  const [hl, setHl] = useState<{ top: number; height: number }>({ top: 0, height: 0 });
  const [track, setTrack] = useState<{ top: number; height: number }>({ top: 0, height: 0 });
  const [hoverStep, setHoverStep] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const labelRefs = useRef<(HTMLElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement | null>(null);

  // Scroll-spy: highlight every step whose section is currently on screen,
  // and size the rail's highlight segment to span those visible steps.
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const topEdge = NAV_HEIGHT + 8;
      const next = new Set<number>();
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh - 8 && r.bottom > topEdge) next.add(i);
      });
      if (next.size === 0) next.add(0);
      setVisible((prev) => {
        if (prev.size === next.size && [...next].every((n) => prev.has(n))) return prev;
        return next;
      });

      const idxs = [...next];
      const first = labelRefs.current[Math.min(...idxs)];
      const last = labelRefs.current[Math.max(...idxs)];
      const rail = railRef.current;
      if (first && last && rail) {
        // Use the text glyph bounds (Range) so the segment hugs the text,
        // ignoring the line-height leading above/below the glyphs.
        const base = rail.getBoundingClientRect().top;
        const range = document.createRange();
        const glyph = (el: HTMLElement) => {
          range.selectNodeContents(el);
          return range.getBoundingClientRect();
        };
        const fTop = glyph(first).top;
        const lBottom = glyph(last).bottom;
        const top = fTop - base;
        const height = lBottom - fTop;
        setHl((prev) => (prev.top === top && prev.height === height ? prev : { top, height }));

        // Grey track spans the full list, first label top → last label bottom.
        const all = labelRefs.current.filter(Boolean) as HTMLElement[];
        if (all.length) {
          const tTop = glyph(all[0]).top - base;
          const tHeight = glyph(all[all.length - 1]).bottom - base - tTop;
          setTrack((prev) => (prev.top === tTop && prev.height === tHeight ? prev : { top: tTop, height: tHeight }));
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const paraStyle: React.CSSProperties = {
    margin: 0,
    fontFamily: font.family,
    fontSize: `${font.size.body}px`,
    lineHeight: `${font.lineHeight.body}px`,
    color: colors.text,
  };

  const scrollTo = (i: number) => {
    const el = sectionRefs.current[i];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - (NAV_HEIGHT + 24);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const renderBlock = (b: Block, key: number) => {
    switch (b.type) {
      case "p":
        return <p key={key} style={paraStyle}>{b.text}</p>;
      case "subhead":
        return (
          <h3
            key={key}
            style={{
              margin: 0,
              fontFamily: font.family,
              fontWeight: 500,
              fontSize: `${font.size.lead}px`,
              lineHeight: `${font.lineHeight.lead}px`,
              color: colors.text,
            }}
          >
            {b.text}
          </h3>
        );
      case "names":
        return (
          <div key={key} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "24px", rowGap: "8px" }}>
            {b.items.map((n) => (
              <span key={n} style={paraStyle}>{n}</span>
            ))}
          </div>
        );
      case "bullets":
        return (
          <ul key={key} style={{ margin: 0, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {b.items.map((it) => (
              <li key={it} style={paraStyle}>{it}</li>
            ))}
          </ul>
        );
      case "links":
        return (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {b.items.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                style={{ ...paraStyle, color: colors.accent, textDecoration: "underline", textUnderlineOffset: "3px", width: "fit-content" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        );
    }
  };

  return (
    <Layout currentPath="/about" currentPlatform="web">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "160px",
          padding: "104px 72px",
          fontFamily: font.family,
          color: colors.text,
        }}
      >
        {/* Content column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "72px",
            flex: "1 1 0",
            minWidth: 0,
            maxWidth: "720px",
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

          {sections.map((s, i) => (
            <section
              key={s.title}
              ref={(el) => (sectionRefs.current[i] = el)}
              style={{ display: "flex", flexDirection: "column", gap: "24px", scrollMarginTop: `${NAV_HEIGHT + 24}px` }}
            >
              <h2
                style={{
                  margin: 0,
                  fontFamily: font.family,
                  fontWeight: 500,
                  fontSize: `${font.size.headingLg}px`,
                  lineHeight: `${font.lineHeight.headingLg}px`,
                  color: colors.text,
                }}
              >
                {s.title}
              </h2>
              {s.blocks.map((b, j) => renderBlock(b, j))}
            </section>
          ))}
        </div>

        {/* Right-hand sticky rail nav ("on this page") */}
        <nav
          aria-label="On this page"
          style={{
            position: "sticky",
            top: `${NAV_HEIGHT + 80}px`,
            width: "289px",
            flexShrink: 0,
            padding: "16px 0",
          }}
        >
          {/* Shared coordinate space so the rail lines up with the labels */}
          <div ref={railRef} style={{ position: "relative" }}>
            {/* Subtle track spanning the labels' text extent */}
            <div style={{ position: "absolute", left: 0, top: `${track.top}px`, height: `${track.height}px`, width: "1px", background: colors.stroke }} />
            {/* Bright segment spanning the visible steps */}
            <div
              style={{
                position: "absolute",
                left: 0,
                width: "2px",
                top: `${hl.top}px`,
                height: `${hl.height}px`,
                background: colors.accent,
                transition: "top 0.2s ease, height 0.2s ease",
              }}
            />

            {/* Labels */}
            <div style={{ display: "flex", flexDirection: "column", paddingLeft: "16px" }}>
              {sections.map((s, i) => {
                const isActive = visible.has(i);
                const isHover = hoverStep === i;
                return (
                  <button
                    key={s.step}
                    onClick={() => scrollTo(i)}
                    onMouseEnter={() => setHoverStep(i)}
                    onMouseLeave={() => setHoverStep(null)}
                    style={{
                      display: "block",
                      width: "100%",
                      paddingBottom: "24px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      ref={(el) => (labelRefs.current[i] = el)}
                      style={{
                        display: "inline-block",
                        fontFamily: font.family,
                        fontSize: `${font.size.bodyMedium}px`,
                        lineHeight: `${font.lineHeight.body}px`,
                        fontWeight: isActive ? 500 : 400,
                        color: isActive || isHover ? colors.text : colors.textMuted,
                        transform: isHover ? "translateX(3px)" : "translateX(0)",
                        transition: "color 0.15s ease, transform 0.15s ease",
                      }}
                    >
                      {s.step}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </Layout>
  );
};

export default AboutEufemia;
