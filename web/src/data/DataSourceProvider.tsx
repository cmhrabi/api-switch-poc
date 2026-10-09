import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useFlags } from "../flags/FlagProvider";
import { createDataSource } from "./createDataSource";
import type { DataSource } from "./DataSource";

const DataSourceContext = createContext<DataSource | null>(null);

export function DataSourceProvider({ children }: { children: ReactNode }) {
  const { flags } = useFlags();
  const source = useMemo(() => {
    console.info(`[data] using ${flags.apiMode.toUpperCase()} data source`);
    return createDataSource(flags.apiMode);
  }, [flags.apiMode]);

  return <DataSourceContext.Provider value={source}>{children}</DataSourceContext.Provider>;
}

export function useDataSource(): DataSource {
  const source = useContext(DataSourceContext);
  if (!source) throw new Error("useDataSource must be used inside <DataSourceProvider>");
  return source;
}
