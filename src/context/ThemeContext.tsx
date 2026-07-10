import React, { createContext, useContext, useState, useEffect } from 'react';
import { createShader, playSweep, accentPair, type Palette } from 'glimm';
import { colorsFor, ThemeName, BrandName, ColorTokens } from '../theme/tokens';

type ThemeMode = 'auto' | 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeName; // resolved theme actually applied
  mode: ThemeMode; // user preference (auto follows the OS)
  brand: BrandName; // active brand (DNB / Sbanken)
  colors: ColorTokens; // resolved token set for the active theme + brand
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  setBrand: (brand: BrandName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const resolve = (mode: ThemeMode): ThemeName =>
  mode === 'auto' ? (prefersDark() ? 'dark' : 'light') : mode;

interface SweepLook {
  palette: Palette;
  direction: 'ltr' | 'rtl' | 'ttb' | 'btt';
  brightness: number;
}

// Play a glimm WebGL "sweep" across the viewport and run `apply` (the actual
// theme/brand swap) at the band's midpoint, so the change happens hidden
// behind it. Falls back to an instant apply on SSR / reduced-motion / no WebGL.
const runThemeSweep = (apply: () => void, look: SweepLook) => {
  if (typeof window === 'undefined') return apply();
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  const canvas = document.createElement('canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '2147483647',
    pointerEvents: 'none',
  });
  document.body.appendChild(canvas);

  const ctrl = createShader({ canvas });
  if (reduced || !ctrl) {
    apply();
    ctrl?.destroy();
    canvas.remove();
    return;
  }

  playSweep(ctrl, {
    palette: look.palette,
    direction: look.direction,
    brightness: look.brightness,
    onMidpoint: apply,
    onComplete: () => {
      ctrl.destroy();
      canvas.remove();
    },
  });
};

// Build the sweep look from the TARGET theme's own tokens, so the band
// previews the colours you're switching into (teal for DNB, purple for
// Sbanken; brighter in light, dimmed in dark).
const themeLook = (target: ThemeName, brand: BrandName): SweepLook => {
  const c = colorsFor(target, brand);
  return {
    palette: accentPair(c.selectedSubtle, c.accent),
    direction: target === 'dark' ? 'ltr' : 'rtl',
    brightness: target === 'dark' ? 0.9 : 1,
  };
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dark is the default for the redesigned portal.
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [theme, setTheme] = useState<ThemeName>('dark');
  const [brand, setBrandState] = useState<BrandName>('DNB');

  const applyTheme = (t: ThemeName, b: BrandName) => {
    if (typeof window === 'undefined') return; // SSR safety
    const c = colorsFor(t, b);
    const root = document.documentElement;
    root.style.colorScheme = t;
    root.style.backgroundColor = c.pageBg;
    root.style.color = c.text;
  };

  // Load saved preferences on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = (localStorage.getItem('theme-mode') as ThemeMode | null) ?? 'dark';
    const savedBrand = (localStorage.getItem('theme-brand') as BrandName | null) ?? 'DNB';
    const resolved = resolve(saved);
    setModeState(saved);
    setTheme(resolved);
    setBrandState(savedBrand);
    applyTheme(resolved, savedBrand);
  }, []);

  // When in auto mode, follow OS changes live.
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const resolved = resolve('auto');
      setTheme(resolved);
      applyTheme(resolved, brand);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mode, brand]);

  const setMode = (m: ThemeMode) => {
    const resolved = resolve(m);
    runThemeSweep(() => {
      setModeState(m);
      setTheme(resolved);
      applyTheme(resolved, brand);
      if (typeof window !== 'undefined') localStorage.setItem('theme-mode', m);
    }, themeLook(resolved, brand));
  };

  const setBrand = (b: BrandName) => {
    runThemeSweep(() => {
      setBrandState(b);
      applyTheme(theme, b);
      if (typeof window !== 'undefined') localStorage.setItem('theme-brand', b);
    }, themeLook(theme, b));
  };

  const toggleTheme = () => setMode(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider
      value={{ theme, mode, brand, colors: colorsFor(theme, brand), toggleTheme, setMode, setBrand }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // Safe defaults when used outside the provider (SSR / tests).
    return {
      theme: 'dark' as ThemeName,
      mode: 'dark' as ThemeMode,
      brand: 'DNB' as BrandName,
      colors: colorsFor('dark', 'DNB'),
      toggleTheme: () => {},
      setMode: (_: ThemeMode) => {},
      setBrand: (_: BrandName) => {},
    };
  }
  return context;
};
