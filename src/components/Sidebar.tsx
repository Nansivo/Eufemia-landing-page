import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import { useTheme } from "../context/ThemeContext";
import { radius, font } from "../theme/tokens";
import { NAV_HEIGHT } from "./Header";

type Platform = "web" | "ios" | "android" | null;

type IconKind = "home" | "chevron" | "grid" | "arrow";

interface NavItem {
  label: string;
  path: string;
  icon: IconKind;
  indent?: boolean;
}

// Web nav mirrors the Figma "About Eufemia" frame sidebar.
const webNavItems: NavItem[] = [
  { label: "Overview", path: "/docs/web", icon: "home" },
  { label: "Usage", path: "/docs/web/usage", icon: "chevron", indent: true },
  { label: "Typography", path: "/docs/web/typography", icon: "chevron", indent: true },
  { label: "Helper Classes", path: "/docs/web/helper-classes", icon: "chevron", indent: true },
  { label: "Patterns", path: "/docs/web/patterns", icon: "chevron", indent: true },
  { label: "Development", path: "/docs/web/development", icon: "chevron", indent: true },
  { label: "Performance", path: "/docs/web/performance", icon: "chevron", indent: true },
  { label: "Components", path: "/docs/web/components", icon: "grid" },
  { label: "Layout", path: "/docs/web/layout", icon: "grid" },
  { label: "HTML Elements", path: "/docs/web/html-elements", icon: "grid" },
  { label: "Extensions", path: "/docs/web/extensions", icon: "grid" },
];

const iosNavItems: NavItem[] = [
  { label: "Overview", path: "/docs/ios", icon: "home" },
  { label: "Components", path: "/docs/ios/components", icon: "grid" },
  { label: "Design Tokens", path: "/docs/ios/design-tokens", icon: "grid" },
];

const androidNavItems: NavItem[] = [
  { label: "Overview", path: "/docs/android", icon: "home" },
  { label: "Components", path: "/docs/android/components", icon: "grid" },
  { label: "Design Tokens", path: "/docs/android/design-tokens", icon: "grid" },
];

const Icon = ({ kind }: { kind: IconKind }) => {
  const common = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", style: { flexShrink: 0 } } as const;
  switch (kind) {
    case "home":
      return (
        <svg {...common}>
          <path d="M2 6L8 1.5L14 6V13.5C14 14.05 13.55 14.5 13 14.5H3C2.45 14.5 2 14.05 2 13.5V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
          <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};

interface SidebarProps {
  currentPlatform?: Platform;
  currentPath?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPlatform = null, currentPath = "" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { colors } = useTheme();

  const navItems =
    currentPlatform === "web"
      ? webNavItems
      : currentPlatform === "ios"
      ? iosNavItems
      : currentPlatform === "android"
      ? androidNavItems
      : [];

  const platformLabels: Record<string, string> = { web: "Web", ios: "iOS", android: "Android" };
  const displayLabel = currentPlatform ? platformLabels[currentPlatform] : "Select platform";

  // Figma uses colour-only selection (no pill): active = #e4eed7 + arrow icon,
  // others = mint. Hover only nudges brightness.
  const rowStyle = (active: boolean, hover: boolean, indent?: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingLeft: indent ? "16px" : 0,
    textDecoration: "none",
    fontFamily: font.family,
    fontSize: `${font.size.body}px`,
    lineHeight: `${font.lineHeight.body}px`,
    fontWeight: active ? 500 : 400,
    color: active ? colors.textSelected : colors.accent,
    opacity: hover && !active ? 0.8 : 1,
    whiteSpace: "nowrap",
    transition: "opacity 0.15s ease",
  });

  const renderRow = (item: NavItem) => {
    const active = currentPath === item.path;
    return (
      <Link
        key={item.path}
        to={item.path}
        onMouseEnter={() => setHovered(item.path)}
        onMouseLeave={() => setHovered(null)}
        style={rowStyle(active, hovered === item.path, item.indent)}
      >
        <Icon kind={active ? "arrow" : item.icon} />
        {item.label}
      </Link>
    );
  };

  return (
    <aside
      style={{
        width: "384px",
        height: `calc(100vh - ${NAV_HEIGHT}px)`,
        position: "fixed",
        top: `${NAV_HEIGHT}px`,
        left: 0,
        background: colors.pageBg,
        borderRight: `1px solid ${colors.strokeSubtle}`, // the vertical divider @ x=384
        overflowY: "auto",
        padding: "55px 24px 40px",
        boxSizing: "border-box",
        fontFamily: font.family,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "27px", width: "336px" }}>
        {/* Menu */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {(() => {
            const active = currentPath === "/about";
            return (
              <Link
                to="/about"
                onMouseEnter={() => setHovered("about")}
                onMouseLeave={() => setHovered(null)}
                style={rowStyle(active, hovered === "about")}
              >
                <Icon kind={active ? "arrow" : "chevron"} />
                About Eufemia
              </Link>
            );
          })()}
          {(() => {
            const active = currentPath === "/getting-started";
            return (
              <Link
                to="/getting-started"
                onMouseEnter={() => setHovered("getting-started")}
                onMouseLeave={() => setHovered(null)}
                style={rowStyle(active, hovered === "getting-started")}
              >
                <Icon kind={active ? "arrow" : "chevron"} />
                Getting started
              </Link>
            );
          })()}
        </nav>

        {/* Platform selector */}
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: `${font.size.body}px`, lineHeight: `${font.lineHeight.body}px`, color: colors.text, marginBottom: "7px" }}>
            Platform
          </div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "4px 16px",
              border: `1px solid ${colors.strokeAction}`,
              borderRadius: `${radius.sm}px`,
              background: colors.surface,
              cursor: "pointer",
              fontFamily: font.family,
              fontSize: `${font.size.body}px`,
              lineHeight: `${font.lineHeight.body}px`,
              color: colors.accent,
            }}
          >
            {displayLabel}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                background: colors.surface,
                border: `1px solid ${colors.strokeSubtle}`,
                borderRadius: `${radius.md}px`,
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                zIndex: 10,
                overflow: "hidden",
              }}
            >
              {(["web", "ios", "android"] as ("web" | "ios" | "android")[]).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setDropdownOpen(false);
                    if (p === "web") window.open("https://eufemia.dnb.no/uilib/", "_blank");
                    else navigate(p === "ios" ? "/docs/ios" : "/docs/android");
                  }}
                  onMouseEnter={() => setHovered(`platform-${p}`)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: "100%",
                    padding: "8px 16px",
                    border: "none",
                    background: currentPlatform === p ? colors.selectedSubtle : hovered === `platform-${p}` ? colors.surfaceAlt : "transparent",
                    cursor: "pointer",
                    fontFamily: font.family,
                    fontSize: `${font.size.body}px`,
                    color: currentPlatform === p ? colors.textSelected : colors.accent,
                    textAlign: "left",
                  }}
                >
                  {platformLabels[p]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Platform navigation */}
        {navItems.length > 0 && (
          <nav style={{ display: "flex", flexDirection: "column", gap: "32px", width: "142px" }}>
            {/* Overview (home) */}
            {renderRow(navItems[0])}
            {/* Indented section */}
            {navItems.some((i) => i.indent) && (
              <div style={{ display: "flex", flexDirection: "column", gap: "32px", paddingLeft: "16px" }}>
                {navItems.filter((i) => i.indent).map((i) => renderRow({ ...i, indent: false }))}
              </div>
            )}
            {/* Remaining top-level (grid) items */}
            {navItems.slice(1).filter((i) => !i.indent).map((i) => renderRow(i))}
          </nav>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
