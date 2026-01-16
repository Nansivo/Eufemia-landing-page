import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import SearchModal from "./SearchModal";
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchCompareMode, setSearchCompareMode] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [themeHovered, setThemeHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  // Listen for cmd+k / ctrl+k keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    // Listen for compare mode trigger
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

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          height: "56px",
          borderBottom: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
          background: isDark ? "rgba(10, 10, 10, 0.8)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "15px",
            fontWeight: 600,
            color: isDark ? "#fff" : "#1a1a1a",
            textDecoration: "none",
            letterSpacing: "-0.2px",
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              background: "linear-gradient(135deg, #007272 0%, #009999 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L2 5L8 8L14 5L8 2Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 11L8 14L14 11" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 8L8 11L14 8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Eufemia
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setSearchOpen(true)}
            onMouseEnter={() => setSearchHovered(true)}
            onMouseLeave={() => setSearchHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              border: `1px solid ${isDark ? '#555' : '#e0e0e0'}`,
              borderRadius: "8px",
              background: isDark
                ? (searchHovered ? "#222" : "#1a1a1a")
                : (searchHovered ? "#f5f5f5" : "#fff"),
              cursor: "pointer",
              fontSize: "13px",
              color: isDark ? "#999" : "#666",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
              transition: "all 0.15s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Search...</span>
            <kbd
              style={{
                padding: "2px 6px",
                background: isDark ? "#222" : "#f0f0f0",
                borderRadius: "4px",
                fontSize: "11px",
                color: isDark ? "#666" : "#999",
                border: `1px solid ${isDark ? '#333' : '#e0e0e0'}`,
                marginLeft: "4px",
              }}
            >
              ⌘K
            </kbd>
          </button>
          <button
            onClick={toggleTheme}
            onMouseEnter={() => setThemeHovered(true)}
            onMouseLeave={() => setThemeHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              border: `1px solid ${isDark ? '#555' : '#e0e0e0'}`,
              borderRadius: "8px",
              background: isDark
                ? (themeHovered ? "#222" : "#1a1a1a")
                : (themeHovered ? "#f5f5f5" : "#fff"),
              cursor: "pointer",
              color: isDark ? "#999" : "#666",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
              transition: "all 0.15s ease",
            }}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.66 4.34L14.24 5.76M5.76 14.24L4.34 15.66M15.66 15.66L14.24 14.24M5.76 5.76L4.34 4.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
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
    </>
  );
};

export default Header;
