import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// vite.config.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/external-api": "https://http.dog", // External API proxy
    },
  },
});
