import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { loadFlags, saveFlags, type Flags } from "./flags";

interface FlagContextValue {
  flags: Flags;
  setFlag: <K extends keyof Flags>(key: K, value: Flags[K]) => void;
}

const FlagContext = createContext<FlagContextValue | null>(null);

export function FlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<Flags>(loadFlags);

  const setFlag = useCallback<FlagContextValue["setFlag"]>((key, value) => {
    setFlags((prev) => {
      const next = { ...prev, [key]: value };
      saveFlags(next);
      return next;
    });
  }, []);

  return <FlagContext.Provider value={{ flags, setFlag }}>{children}</FlagContext.Provider>;
}

export function useFlags(): FlagContextValue {
  const ctx = useContext(FlagContext);
  if (!ctx) throw new Error("useFlags must be used inside <FlagProvider>");
  return ctx;
}
