import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/", // IMPORTANT: github repo name OR just "/" if custom domain
  plugins: [react()],
});
