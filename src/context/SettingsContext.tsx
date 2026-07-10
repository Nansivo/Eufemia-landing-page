import React, { createContext, useContext, useEffect, useState } from "react";

export type Platform = "Web" | "iOS" | "Android";
export const ALL_PLATFORMS: Platform[] = ["Web", "iOS", "Android"];
export type DocPlatform = "web" | "ios" | "android";

export type PlatformState = Record<Platform, boolean>;

interface SettingsContextType {
  platforms: PlatformState;
  setPlatform: (p: Platform, value: boolean) => void;
  togglePlatform: (p: Platform) => void;
  // Platforms that should be shown. When none are explicitly enabled we treat
  // it as "All platforms" (show everything).
  activePlatforms: Platform[];
  isAllPlatforms: boolean;
  // The currently-selected docs platform (persists across navigation).
  docPlatform: DocPlatform;
  setDocPlatform: (p: DocPlatform) => void;
}

const DEFAULT: PlatformState = { Web: true, iOS: true, Android: true };

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [platforms, setPlatforms] = useState<PlatformState>(DEFAULT);
  const [docPlatform, setDocPlatformState] = useState<DocPlatform>("web");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("preferred-platforms");
    if (saved) {
      try {
        setPlatforms({ ...DEFAULT, ...JSON.parse(saved) });
      } catch {
        /* ignore */
      }
    }
    const savedDoc = localStorage.getItem("doc-platform") as DocPlatform | null;
    if (savedDoc === "web" || savedDoc === "ios" || savedDoc === "android") setDocPlatformState(savedDoc);
  }, []);

  const persist = (next: PlatformState) => {
    setPlatforms(next);
    if (typeof window !== "undefined") localStorage.setItem("preferred-platforms", JSON.stringify(next));
  };

  const setPlatform = (p: Platform, value: boolean) => persist({ ...platforms, [p]: value });
  const togglePlatform = (p: Platform) => persist({ ...platforms, [p]: !platforms[p] });

  const setDocPlatform = (p: DocPlatform) => {
    setDocPlatformState(p);
    if (typeof window !== "undefined") localStorage.setItem("doc-platform", p);
  };

  const enabled = ALL_PLATFORMS.filter((p) => platforms[p]);
  const isAllPlatforms = enabled.length === 0 || enabled.length === ALL_PLATFORMS.length;
  const activePlatforms = isAllPlatforms ? ALL_PLATFORMS : enabled;

  return (
    <SettingsContext.Provider
      value={{ platforms, setPlatform, togglePlatform, activePlatforms, isAllPlatforms, docPlatform, setDocPlatform }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const usePortalSettings = (): SettingsContextType => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    return {
      platforms: DEFAULT,
      setPlatform: () => {},
      togglePlatform: () => {},
      activePlatforms: ALL_PLATFORMS,
      isAllPlatforms: true,
      docPlatform: "web",
      setDocPlatform: () => {},
    };
  }
  return ctx;
};
