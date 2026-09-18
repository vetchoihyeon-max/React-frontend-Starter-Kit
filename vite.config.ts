import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // tanstackRouter는 반드시 react 플러그인보다 먼저 실행되어야 한다
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    VitePWA({
      // 새 버전을 감지하면 서비스 워커를 교체하고 화면에서 갱신 여부를 묻는다
      registerType: "prompt",
      includeAssets: ["favicon.svg", "favicon.ico", "apple-touch-icon-180x180.png"],
      manifest: {
        name: "React Frontend Starter Kit",
        short_name: "Starter Kit",
        description: "라우팅, 상태관리, 테스트 설정이 미리 구성된 React 프로젝트 템플릿",
        lang: "ko",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        // SPA이므로 알 수 없는 경로는 index.html로 돌린다
        navigateFallback: "index.html",
        // API 응답은 캐시하지 않고 항상 네트워크로 보낸다.
        // 캐싱 전략은 데이터 성격에 따라 달라지므로 각 프로젝트에서 정한다
        runtimeCaching: [],
        cleanupOutdatedCaches: true,
      },
      devOptions: {
        // 개발 중에는 서비스 워커를 끄고 HMR을 그대로 쓴다
        enabled: false,
      },
    }),
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
