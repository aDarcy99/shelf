import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: '/shelf/', // Must match github repo name to host on Github Pages
  plugins: [react()],
});
