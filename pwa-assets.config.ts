import { defineConfig, minimal2023Preset } from "@vite-pwa/assets-generator/config";

/**
 * PWA 아이콘 생성 설정
 * public/favicon.svg 하나로 홈 화면 아이콘과 파비콘을 만든다
 * 아이콘을 바꾸려면 원본 SVG를 교체하고 `npm run generate:pwa-assets`를 실행한다
 */
export default defineConfig({
  preset: minimal2023Preset,
  images: ["public/favicon.svg"],
});
