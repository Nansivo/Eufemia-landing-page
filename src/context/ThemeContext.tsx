import React, { createContext, useContext, useState, useEffect } from 'react';
import { colorsFor, ThemeName, ColorTokens } from '../theme/tokens';

type ThemeMode = 'auto' | 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeName; // resolved theme actually applied
  mode: ThemeMode; // user preference (auto follows the OS)
  colors: ColorTokens; // resolved token set for the active theme
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const resolve = (mode: ThemeMode): ThemeName =>
  mode === 'auto' ? (prefersDark() ? 'dark' : 'light') : mode;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dark is the default for the redesigned portal.
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [theme, setTheme] = useState<ThemeName>('dark');

  const applyTheme = (t: ThemeName) => {
    if (typeof window === 'undefined') return; // SSR safety
    const c = colorsFor(t);
    const root = document.documentElement;
    root.style.colorScheme = t;
    root.style.backgroundColor = c.pageBg;
    root.style.color = c.text;
  };

  // Load saved preference on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = (localStorage.getItem('theme-mode') as ThemeMode | null) ?? 'dark';
    const resolved = resolve(saved);
    setModeState(saved);
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  // When in auto mode, follow OS changes live.
  useEffect(() => {
    if (typeof window === 'undefined' || mode !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      const resolved = resolve('auto');
      setTheme(resolved);
      applyTheme(resolved);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [mode]);

  const setMode = (m: ThemeMode) => {
    const resolved = resolve(m);
    setModeState(m);
    setTheme(resolved);
    applyTheme(resolved);
    if (typeof window !== 'undefined') localStorage.setItem('theme-mode', m);
  };

  const toggleTheme = () => setMode(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider
      value={{ theme, mode, colors: colorsFor(theme), toggleTheme, setMode }}
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
      colors: colorsFor('dark'),
      toggleTheme: () => {},
      setMode: (_: ThemeMode) => {},
    };
  }
  return context;
};
