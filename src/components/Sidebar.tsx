import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import { useTheme } from "../context/ThemeContext";

type Platform = "web" | "ios" | "android" | null;

interface SidebarProps {
  currentPlatform?: Platform;
  currentPath?: string;
}

const webNavItems = [
  { label: "Overview", path: "/docs/web", isHome: true },
  { label: "Usage", path: "/docs/web/usage" },
  { label: "Typography", path: "/docs/web/typography" },
  { label: "Helper Classes", path: "/docs/web/helper-classes" },
  { label: "Patterns", path: "/docs/web/patterns" },
  { label: "Development", path: "/docs/web/development" },
  { label: "Performance", path: "/docs/web/performance" },
];

const iosNavItems = [
  { label: "Overview", path: "/docs/ios", isHome: true },
  { label: "Components", path: "/docs/ios/components" },
  { label: "Design Tokens", path: "/docs/ios/design-tokens" },
];

const androidNavItems = [
  { label: "Overview", path: "/docs/android", isHome: true },
  { label: "Components", path: "/docs/android/components" },
  { label: "Design Tokens", path: "/docs/android/design-tokens" },
];

const ChevronIcon = ({ rotated = false }: { rotated?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{
      flexShrink: 0,
      transform: rotated ? "rotate(90deg)" : "none",
      transition: "transform 0.2s ease",
    }}
  >
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M2 6L8 1.5L14 6V13.5C14 14.05 13.55 14.5 13 14.5H3C2.45 14.5 2 14.05 2 13.5V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({
  currentPlatform = null,
  currentPath = "",
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navItems =
    currentPlatform === "web"
      ? webNavItems
      : currentPlatform === "ios"
      ? iosNavItems
      : currentPlatform === "android"
      ? androidNavItems
      : [];

  const platformLabels: Record<string, string> = {
    web: "Web",
    ios: "iOS",
    android: "Android",
  };

  const displayLabel = currentPlatform ? platformLabels[currentPlatform] : "Select platform";

  return (
    <aside
      style={{
        width: "248px",
        height: "calc(100vh - 56px)",
        position: "fixed",
        top: "56px",
        left: 0,
        background: isDark ? "#1a1a1a" : "#fafafa",
        borderRight: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
        overflowY: "auto",
        paddingTop: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Top navigation links */}
      <nav style={{ marginBottom: "8px" }}>
        <Link
          to="/about"
          onMouseEnter={() => setHoveredItem("about")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
            color: hoveredItem === "about" ? "#007272" : (isDark ? "#999" : "#555"),
            background: hoveredItem === "about" ? (isDark ? "#2a2a2a" : "#fff") : "transparent",
            transition: "all 0.15s ease",
          }}
        >
          <ChevronIcon />
          About Eufemia
        </Link>
        <Link
          to="/getting-started"
          onMouseEnter={() => setHoveredItem("getting-started")}
          onMouseLeave={() => setHoveredItem(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
            color: hoveredItem === "getting-started" ? "#007272" : (isDark ? "#999" : "#555"),
            background: hoveredItem === "getting-started" ? (isDark ? "#2a2a2a" : "#fff") : "transparent",
            transition: "all 0.15s ease",
          }}
        >
          <ChevronIcon />
          Getting started
        </Link>
      </nav>

      {/* Divider */}
      <div style={{ height: "1px", background: isDark ? "#333" : "#e8e8e8", margin: "12px 20px" }} />

      {/* Platform selector dropdown */}
      <div style={{ padding: "8px 16px", position: "relative" }}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            border: `1px solid ${isDark ? '#444' : '#e0e0e0'}`,
            borderRadius: "8px",
            background: isDark ? "#2a2a2a" : "#fff",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
            color: currentPlatform ? "#007272" : (isDark ? "#999" : "#666"),
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#007272";
          }}
          onMouseLeave={(e) => {
            if (!dropdownOpen) {
              e.currentTarget.style.borderColor = isDark ? '#444' : '#e0e0e0';
            }
          }}
        >
          {displayLabel}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transform: dropdownOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.2s ease",
            }}
          >
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: "16px",
              right: "16px",
              background: isDark ? "#2a2a2a" : "#fff",
              border: `1px solid ${isDark ? '#444' : '#e0e0e0'}`,
              borderRadius: "8px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            {(["web", "ios", "android"] as ("web" | "ios" | "android")[]).map((p) => (
              <button
                key={p}
                onClick={() => {
                  setDropdownOpen(false);
                  if (p === "web") {
                    // External link to existing Eufemia docs
                    window.open("https://eufemia.dnb.no/uilib/", "_blank");
                  } else {
                    const platformPaths: Record<string, string> = {
                      ios: "/docs/ios",
                      android: "/docs/android",
                    };
                    navigate(platformPaths[p]);
                  }
                }}
                onMouseEnter={() => setHoveredItem(`platform-${p}`)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "none",
                  background: currentPlatform === p
                    ? isDark ? "#1a3333" : "#e6f2f2"
                    : hoveredItem === `platform-${p}`
                    ? isDark ? "#333" : "#f5f5f5"
                    : "transparent",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: currentPlatform === p ? 500 : 400,
                  color: currentPlatform === p ? "#007272" : (isDark ? "#ccc" : "#333"),
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                {platformLabels[p]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Platform-specific navigation */}
      {navItems.length > 0 && (
        <>
          <div style={{ height: "1px", background: isDark ? "#333" : "#e8e8e8", margin: "12px 20px" }} />
          <nav>
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 20px 10px 28px",
                    textDecoration: "none",
                    fontSize: "14px",
                    color: isActive ? "#007272" : hoveredItem === item.path ? "#007272" : (isDark ? "#999" : "#555"),
                    fontWeight: isActive ? 500 : 400,
                    background: isActive
                      ? isDark ? "linear-gradient(90deg, rgba(0, 122, 122, 0.2), transparent)" : "linear-gradient(90deg, #e6f2f2, transparent)"
                      : hoveredItem === item.path
                      ? isDark ? "#2a2a2a" : "#fff"
                      : "transparent",
                    borderLeft: isActive ? "3px solid #007272" : "3px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  {item.isHome ? <HomeIcon /> : <ChevronIcon />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
