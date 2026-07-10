import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import SearchModal from "./SearchModal";
import PortalSettings from "./PortalSettings";
import EufemiaWordmark from "./EufemiaWordmark";
import { useTheme } from "../context/ThemeContext";
import { radius, font } from "../theme/tokens";

export const NAV_HEIGHT = 64;

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6.75" cy="6.75" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CogIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M19.4 13a7.8 7.8 0 0 0 0-2l2.06-1.6a.5.5 0 0 0 .12-.64l-1.95-3.38a.5.5 0 0 0-.6-.22l-2.43.98a7.6 7.6 0 0 0-1.73-1l-.37-2.58a.5.5 0 0 0-.5-.42h-3.9a.5.5 0 0 0-.5.42l-.37 2.58c-.62.25-1.2.59-1.73 1l-2.43-.98a.5.5 0 0 0-.6.22L2.42 8.76a.5.5 0 0 0 .12.64L4.6 11a7.8 7.8 0 0 0 0 2l-2.06 1.6a.5.5 0 0 0-.12.64l1.95 3.38a.5.5 0 0 0 .6.22l2.43-.98c.53.41 1.11.75 1.73 1l.37 2.58a.5.5 0 0 0 .5.42h3.9a.5.5 0 0 0 .5-.42l.37-2.58c.62-.25 1.2-.59 1.73-1l2.43.98a.5.5 0 0 0 .6-.22l1.95-3.38a.5.5 0 0 0-.12-.64L19.4 13Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchCompareMode, setSearchCompareMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [cogHovered, setCogHovered] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    const handleCompareMode = () => {
      setSearchCompareMode(true);
      setSearchOpen(true);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("openSearchCompare", handleCompareMode);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("openSearchCompare", handleCompareMode);
    };
  }, []);

  const iconButton = (hovered: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    border: "none",
    borderRadius: `${radius.md}px`,
    background: hovered ? colors.surface : "transparent",
    cursor: "pointer",
    color: colors.text,
    transition: "background 0.15s ease",
  });

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: `${NAV_HEIGHT}px`,
          borderBottom: `1px solid ${colors.strokeSubtle}`,
          background: colors.pageBg,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          fontFamily: font.family,
        }}
      >
        <Link
          to="/"
          aria-label="Eufemia — home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: colors.text,
            textDecoration: "none",
            lineHeight: 0,
          }}
        >
          <EufemiaWordmark height={22} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => setSearchOpen(true)}
            onMouseEnter={() => setSearchHovered(true)}
            onMouseLeave={() => setSearchHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 16px",
              width: "194px",
              border: `1px solid ${searchHovered ? colors.strokeAction : colors.strokeSubtle}`,
              borderRadius: `${radius.lg}px`,
              background: colors.surface,
              cursor: "pointer",
              fontSize: `${font.size.body}px`,
              color: colors.textMuted,
              transition: "border-color 0.15s ease",
              fontFamily: font.family,
            }}
          >
            <SearchIcon />
            <span>cmd + k</span>
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            onMouseEnter={() => setCogHovered(true)}
            onMouseLeave={() => setCogHovered(false)}
            style={iconButton(cogHovered)}
            title="Portal settings"
            aria-label="Portal settings"
          >
            <CogIcon />
          </button>
        </div>
      </header>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          setSearchCompareMode(false);
        }}
        initialCompareMode={searchCompareMode}
      />

      <PortalSettings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default Header;
