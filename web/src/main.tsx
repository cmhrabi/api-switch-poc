import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { DataSourceProvider } from "./data/DataSourceProvider";
import { FlagProvider } from "./flags/FlagProvider";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FlagProvider>
      <DataSourceProvider>
        <App />
      </DataSourceProvider>
    </FlagProvider>
  </StrictMode>,
);
