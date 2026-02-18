import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
});

/**
 * FILE ROLE:
 * Vite configuration for NOMAD frontend tooling.
 *
 * CONNECTS TO:
 * - @vitejs/plugin-react
 *
 * USED BY:
 * - Vite dev server and build scripts
 */

