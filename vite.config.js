/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: true,
  },
  base: "/",
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: "local", // Usar CSS Modules por defecto
      generateScopedName: "[name]__[local]___[hash:base64:5]", // Opcional: Para nombres de clase más legibles
    },
  },
});
