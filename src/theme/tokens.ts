// Eufemia Portal design tokens — single source of truth.
// Derived from the Figma "Eufemia – Portal" dark redesign
// (file ZjY4oLlHz2pu6uPdW92IAJL5). Dark is the default; light mode
// uses the on-light equivalents so the theme toggle keeps working.

export type ThemeName = "light" | "dark";

export interface ColorTokens {
  // Surfaces
  pageBg: string; // page background
  surface: string; // neutral surface (cards, inputs, popover)
  surfaceAlt: string; // alternative/raised surface
  // Text
  text: string; // primary text
  textMuted: string; // secondary / placeholder text
  accent: string; // action / links / active nav
  // Strokes
  stroke: string; // bold stroke
  strokeSubtle: string; // subtle divider / border
  strokeAction: string; // accent-coloured stroke
  strokeActionAlt: string; // neutral control stroke (checkbox/switch)
  // Selected states
  selectedSubtle: string; // subtle selected background (toggle "on")
  selected: string; // strong selected background (knob/checkbox fill)
  textSelected: string; // text on selected surfaces
  buttonStrokeSelected: string; // selected toggle-button border
  actionAlt: string; // muted knob (switch "off")
}

const dark: ColorTokens = {
  pageBg: "#000000",
  surface: "#1c1c1e",
  surfaceAlt: "#333333",
  text: "#ffffff",
  textMuted: "#8e8e93",
  accent: "#a5e1d2",
  stroke: "#48484a",
  strokeSubtle: "#48484a",
  strokeAction: "#a5e1d2",
  strokeActionAlt: "#cccccc",
  selectedSubtle: "#0d4637",
  selected: "#e4eed7",
  textSelected: "#e4eed7",
  buttonStrokeSelected: "rgba(165, 225, 210, 0.4)",
  actionAlt: "#737373",
};

const light: ColorTokens = {
  pageBg: "#ffffff",
  surface: "#ffffff",
  surfaceAlt: "#f2f2f5",
  text: "#333333",
  textMuted: "#737373",
  accent: "#007272",
  stroke: "#cccccc",
  strokeSubtle: "#ebebeb",
  strokeAction: "#007272",
  strokeActionAlt: "#767676",
  selectedSubtle: "#e4eed7",
  selected: "#08454d",
  textSelected: "#08454d",
  buttonStrokeSelected: "rgba(0, 114, 114, 0.4)",
  actionAlt: "#a5a5a5",
};

export const colorsFor = (theme: ThemeName): ColorTokens =>
  theme === "dark" ? dark : light;

// Static, theme-independent scales -----------------------------------------

export const radius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
} as const;

export const font = {
  family: "DNB, sans-serif",
  size: {
    h1: 48,
    headingLg: 26,
    lead: 20,
    bodyMedium: 18,
    body: 18,
    small: 16,
  },
  lineHeight: {
    h1: 56,
    headingLg: 32,
    lead: 24,
    body: 24,
    small: 20,
  },
} as const;

export const shadow = {
  // UI standard drop shadow: 0 8 16 #00000014
  standard: "0 8px 16px rgba(0, 0, 0, 0.08)",
} as const;

// Content layout used across pages (matches the 560px Figma content column).
export const layout = {
  contentWidth: 560,
  contentPadding: 40,
} as const;
