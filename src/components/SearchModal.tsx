import React, { useState, useEffect, useRef } from "react";
import { navigate } from "gatsby";
import webComponentsData from "../data/web-components.json";

interface SearchResult {
  title: string;
  description: string;
  path: string;
  category: string;
  external?: boolean;
}

// Build searchable content from the generated JSON + static pages
const webComponents: SearchResult[] = webComponentsData.components.map(c => ({
  title: c.name,
  description: c.description,
  path: c.path,
  category: c.category,
  external: c.external
}));

const staticPages: SearchResult[] = [
  // iOS components (internal)
  { title: "Avatar", description: "Show an image or text to represent a person", path: "/docs/ios/components/avatar", category: "iOS Components" },
  { title: "Avatar Group", description: "Display multiple avatars together", path: "/docs/ios/components/avatar-group", category: "iOS Components" },
  { title: "Button (iOS)", description: "iOS native button component", path: "/docs/ios/components/button", category: "iOS Components" },
  { title: "Checkbox", description: "Select one or more options", path: "/docs/ios/components/checkbox", category: "iOS Components" },
  // Pages
  { title: "Web Overview", description: "Overview of web components", path: "https://eufemia.dnb.no/uilib/", category: "Pages", external: true },
  { title: "iOS Overview", description: "Overview of iOS components", path: "/docs/ios", category: "Pages" },
  { title: "Getting Started", description: "Start building with Eufemia", path: "/getting-started", category: "Pages" },
  { title: "About Eufemia", description: "Learn about the design system", path: "/about", category: "Pages" },
  { title: "Changelog", description: "Latest updates and releases", path: "/changelog", category: "Pages" },
  // Guides - external links
  { title: "Typography", description: "Typography guidelines and styles", path: "https://eufemia.dnb.no/uilib/typography/", category: "Guides", external: true },
  { title: "Colors", description: "Eufemia color palette", path: "https://eufemia.dnb.no/uilib/usage/layout/colors/", category: "Guides", external: true },
  { title: "Icons", description: "Icon library and usage", path: "https://eufemia.dnb.no/icons/", category: "Guides", external: true },
  { title: "Spacing", description: "Layout spacing system", path: "https://eufemia.dnb.no/uilib/usage/layout/spacing/", category: "Guides", external: true },
  { title: "Theming", description: "Customize the look and feel", path: "https://eufemia.dnb.no/uilib/usage/customisation/theming/", category: "Guides", external: true },
];

const searchableContent: SearchResult[] = [...webComponents, ...staticPages];

const recentSearches = ["Button", "Typography", "Getting Started"];
const quickActions = [
  { label: "Browse Components", path: "https://eufemia.dnb.no/uilib/", external: true },
  { label: "Start Designing", path: "/docs/design", external: false },
  { label: "Start Developing", path: "https://eufemia.dnb.no/uilib/getting-started/", external: true },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredResults = query.length > 0
    ? searchableContent.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filteredResults.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        const result = filteredResults[selectedIndex];
        if (result.external) {
          window.open(result.path, "_blank");
        } else {
          navigate(result.path);
        }
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          zIndex: 1000,
          opacity: isAnimating ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "12%",
          left: "50%",
          transform: `translateX(-50%) ${isAnimating ? "translateY(0)" : "translateY(-10px)"}`,
          width: "100%",
          maxWidth: "600px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.15)",
          zIndex: 1001,
          overflow: "hidden",
          opacity: isAnimating ? 1 : 0,
          transition: "all 0.2s ease",
        }}
      >

        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px 20px",
            gap: "12px",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: "#888", flexShrink: 0 }}>
            <circle cx="8.5" cy="8.5" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search components, guides, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "16px",
              color: "#1a1a1a",
              background: "transparent",
            }}
          />
          <kbd
            style={{
              padding: "4px 8px",
              background: "#f5f5f5",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 500,
              color: "#666",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(0, 0, 0, 0.06)" }} />

        {/* Results */}
        <div
          style={{
            maxHeight: "420px",
            overflowY: "auto",
          }}
        >
          {query.length === 0 ? (
            <div style={{ padding: "16px 20px" }}>
              {/* Quick Actions */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.5px" }}>
                  Quick Actions
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {quickActions.map((action) => (
                    <button
                      key={action.path}
                      onClick={() => {
                        if (action.external) {
                          window.open(action.path, "_blank");
                        } else {
                          navigate(action.path);
                        }
                        onClose();
                      }}
                      style={{
                        padding: "8px 14px",
                        background: "#f5f5f5",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#333",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#eee";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#f5f5f5";
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", marginBottom: "10px", letterSpacing: "0.5px" }}>
                  Recent Searches
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setQuery(search)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "8px 10px",
                        background: "transparent",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#555",
                        textAlign: "left",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#f5f5f5";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.4 }}>
                        <path d="M8 14A6 6 0 108 2a6 6 0 000 12z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div
              style={{
                padding: "40px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "15px", fontWeight: 500, color: "#1a1a1a", marginBottom: "4px" }}>
                No results found
              </div>
              <div style={{ fontSize: "14px", color: "#888" }}>
                Try searching for something else
              </div>
            </div>
          ) : (
            <div style={{ padding: "8px 12px" }}>
              {Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} style={{ marginBottom: "12px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#888",
                      textTransform: "uppercase",
                      padding: "6px 8px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {category}
                  </div>
                  {items.map((result) => {
                    flatIndex++;
                    const isSelected = flatIndex === selectedIndex;
                    const currentIndex = flatIndex;

                    return (
                      <div
                        key={result.path}
                        onClick={() => {
                          if (result.external) {
                            window.open(result.path, "_blank");
                          } else {
                            navigate(result.path);
                          }
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                          padding: "10px 12px",
                          cursor: "pointer",
                          background: isSelected ? "#f5f5f5" : "transparent",
                          borderRadius: "6px",
                          transition: "background 0.1s ease",
                        }}
                      >
                        <div style={{ minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: isSelected ? "#007272" : "#1a1a1a",
                              marginBottom: "2px",
                            }}
                          >
                            {result.title}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#888",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {result.description}
                          </div>
                        </div>
                        {isSelected && (
                          <kbd
                            style={{
                              padding: "2px 6px",
                              background: "#e8e8e8",
                              borderRadius: "4px",
                              fontSize: "11px",
                              fontWeight: 500,
                              color: "#666",
                              flexShrink: 0,
                            }}
                          >
                            Enter
                          </kbd>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: "#fafafa",
            borderTop: "1px solid #eee",
            fontSize: "12px",
            color: "#888",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <kbd style={{ padding: "2px 5px", background: "#fff", borderRadius: "3px", border: "1px solid #ddd", fontSize: "11px" }}>↑</kbd>
              <kbd style={{ padding: "2px 5px", background: "#fff", borderRadius: "3px", border: "1px solid #ddd", fontSize: "11px" }}>↓</kbd>
              Navigate
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <kbd style={{ padding: "2px 5px", background: "#fff", borderRadius: "3px", border: "1px solid #ddd", fontSize: "11px" }}>↵</kbd>
              Open
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
