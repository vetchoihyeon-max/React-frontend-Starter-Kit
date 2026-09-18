import { expect, type Page, test } from "@playwright/test";

/**
 * 서비스 워커가 활성화될 때까지 기다린다
 * waitForFunction은 async 콜백이 돌려준 Promise를 값으로 보고 바로 통과시키므로,
 * 비동기 확인에는 evaluate와 expect.poll을 함께 쓴다
 * @param page 대상 페이지
 */
async function waitForActivatedServiceWorker(page: Page) {
  await expect
    .poll(
      () =>
        page.evaluate(async () => {
          const registrations = await navigator.serviceWorker.getRegistrations();

          return registrations.some((registration) => registration.active?.state === "activated");
        }),
      { message: "서비스 워커가 활성화되지 않았습니다" },
    )
    .toBe(true);
}

test.describe("PWA", () => {
  test("매니페스트가 설치에 필요한 정보를 담고 있다", async ({ page, request }) => {
    await page.goto("/");

    const href = await page.locator('link[rel="manifest"]').getAttribute("href");

    expect(href).toBeTruthy();

    const response = await request.get(href as string);

    expect(response.ok()).toBe(true);

    const manifest = await response.json();

    expect(manifest.name).toBe("React Frontend Starter Kit");
    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("/");

    const sizes = manifest.icons.map((icon: { sizes: string }) => icon.sizes);

    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");

    // 홈 화면 아이콘이 잘리지 않으려면 maskable 아이콘이 필요하다
    const maskable = manifest.icons.filter(
      (icon: { purpose?: string }) => icon.purpose === "maskable",
    );

    expect(maskable.length).toBeGreaterThan(0);
  });

  test("매니페스트가 가리키는 아이콘 파일이 실제로 존재한다", async ({ request }) => {
    const manifest = await (await request.get("/manifest.webmanifest")).json();

    for (const icon of manifest.icons as { src: string }[]) {
      const response = await request.get(`/${icon.src}`);

      expect(response.ok(), `${icon.src}를 찾을 수 없습니다`).toBe(true);
    }
  });

  test("서비스 워커가 등록되고 활성화된다", async ({ page }) => {
    await page.goto("/");
    await waitForActivatedServiceWorker(page);

    const scriptUrl = await page.evaluate(async () => {
      const [registration] = await navigator.serviceWorker.getRegistrations();

      return registration?.active?.scriptURL ?? null;
    });

    expect(scriptUrl).toContain("/sw.js");
  });

  test("서비스 워커가 앱 셸을 캐시해 오프라인에서도 화면을 띄운다", async ({ page, context }) => {
    await page.goto("/");
    await waitForActivatedServiceWorker(page);

    // 첫 방문에서는 페이지가 아직 서비스 워커의 제어를 받지 않는다.
    // 한 번 더 이동해 제어가 시작된 뒤에 오프라인으로 바꾼다
    await page.reload();
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);

    await context.setOffline(true);

    try {
      await page.reload();

      await expect(page.getByRole("heading", { name: "React Frontend Starter Kit" })).toBeVisible();
    } finally {
      await context.setOffline(false);
    }
  });
});
