import { defineConfig, devices } from "@playwright/test";

/** CI에서는 프로덕션 빌드를, 로컬에서는 개발 서버를 사용한다 */
const isCI = Boolean(process.env.CI);
const port = 4173;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? "github" : "html",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
    // 브라우저 언어에 따라 화면 문구가 달라지므로 한국어로 고정한다
    locale: "ko-KR",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npm run preview -- --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
