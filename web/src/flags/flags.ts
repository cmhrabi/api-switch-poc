// Local mock of a feature-flag service. Swap this module for LaunchDarkly/
// Unleash/etc. later. Nothing outside flags/ needs to change.

export type ApiMode = "rest" | "graphql";

export interface Flags {
  apiMode: ApiMode;
}

const STORAGE_KEY = "poc.flags";

const envMode = import.meta.env.VITE_API_MODE;
export const defaultFlags: Flags = {
  apiMode: envMode === "graphql" ? "graphql" : "rest",
};

export function loadFlags(): Flags {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultFlags, ...(JSON.parse(raw) as Partial<Flags>) } : defaultFlags;
  } catch {
    return defaultFlags;
  }
}

export function saveFlags(flags: Flags): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  } catch {
    // storage unavailable – flag just won't persist across reloads
  }
}
