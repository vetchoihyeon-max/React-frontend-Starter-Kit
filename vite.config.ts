import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // tanstackRouter는 반드시 react 플러그인보다 먼저 실행되어야 한다
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    // Vite 8부터 rollupOptions 대신 rolldownOptions를 사용한다
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler")) {
            return "react-vendor";
          }

          if (id.includes("@tanstack")) {
            return "tanstack-vendor";
          }
        },
      },
    },
  },
});
