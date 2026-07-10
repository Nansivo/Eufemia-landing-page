import React from "react";
import { Logo } from "@dnb/eufemia";
import Header, { NAV_HEIGHT } from "./Header";
import Sidebar from "./Sidebar";
import { useTheme } from "../context/ThemeContext";
import { font } from "../theme/tokens";

interface LayoutProps {
  children: React.ReactNode;
  currentPlatform?: "web" | "ios" | "android" | null;
  currentPath?: string;
  hideSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentPlatform = null,
  currentPath = "",
  hideSidebar = false,
}) => {
  const { colors } = useTheme();
  const sidebarOffset = hideSidebar ? 0 : 384;

  return (
    <div style={{ minHeight: "100vh", background: colors.pageBg, fontFamily: font.family }}>
      <Header />
      {!hideSidebar && <Sidebar currentPlatform={currentPlatform} currentPath={currentPath} />}
      <main
        style={{
          marginLeft: sidebarOffset,
          marginTop: `${NAV_HEIGHT}px`,
          minHeight: `calc(100vh - ${NAV_HEIGHT}px)`,
          background: colors.pageBg,
          color: colors.text,
        }}
      >
        {children}
      </main>
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px",
          background: colors.pageBg,
          borderTop: `1px solid ${colors.strokeSubtle}`,
          marginLeft: sidebarOffset,
        }}
      >
        <Logo height={38} color={colors.text} aria-label="DNB" />
        <span
          style={{
            fontFamily: font.family,
            fontSize: `${font.size.body}px`,
            lineHeight: `${font.lineHeight.body}px`,
            color: colors.accent,
          }}
        >
          © <span style={{ textDecoration: "underline" }}>Copyright 2018-present DNB.no</span>
        </span>
      </footer>
    </div>
  );
};

export default Layout;
