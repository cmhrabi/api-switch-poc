/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Proxy both APIs through Vite so the browser sees a single origin (no CORS).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:4000",
      "/graphql": "http://localhost:4000",
    },
  },
  test: {
    environment: "node",
  },
});
