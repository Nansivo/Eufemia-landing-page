import React from "react";
import "@dnb/eufemia/style/core"; // Import DNB fonts and base styles
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme } from "../context/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
  currentPlatform?: "web" | "ios" | "android" | null;
  currentPath?: string;
  hideSidebar?: boolean;
}

// Eufemia Logo component (matching the header)
const EufemiaLogo = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
      <span style={{ fontSize: "14px", fontWeight: 600, color: isDark ? "#fff" : "#1a1a1a" }}>Eufemia</span>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({
  children,
  currentPlatform = null,
  currentPath = "",
  hideSidebar = false,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{ minHeight: "100vh", background: isDark ? "#0a0a0a" : "#fff", fontFamily: "DNB, sans-serif" }}>
      <Header />
      {!hideSidebar && (
        <Sidebar currentPlatform={currentPlatform} currentPath={currentPath} />
      )}
      <main
        style={{
          marginLeft: hideSidebar ? 0 : "248px",
          marginTop: "56px",
          minHeight: "calc(100vh - 56px)",
          background: isDark ? "#0a0a0a" : "#fff",
          color: isDark ? "#fff" : "#000",
        }}
      >
        {children}
      </main>
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 32px",
          background: isDark ? "#1a1a1a" : "#fafafa",
          borderTop: `1px solid ${isDark ? '#333' : '#e8e8e8'}`,
          marginLeft: hideSidebar ? 0 : "248px",
          color: isDark ? "#ccc" : "#888",
        }}
      >
        <EufemiaLogo />
        <span style={{ fontSize: "13px", color: isDark ? "#ccc" : "#888" }}>
          © DNB ASA {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
};

export default Layout;
