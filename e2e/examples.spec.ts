import { expect, test } from "@playwright/test";

test.describe("예제 페이지", () => {
  test("서버 상태 예제가 목록을 렌더링한다", async ({ page }) => {
    await page.route("**/posts?*", (route) =>
      route.fulfill({
        json: [{ userId: 1, id: 1, title: "E2E 게시글", body: "E2E 본문" }],
      }),
    );

    await page.goto("/examples/query");

    await expect(page.getByText("E2E 게시글")).toBeVisible();
  });

  test("카운터가 증가하고 초기화된다", async ({ page }) => {
    await page.goto("/examples/store");

    const counter = page.getByRole("status");

    await expect(counter).toHaveText("0");

    await page.getByRole("button", { name: "증가" }).click();
    await page.getByRole("button", { name: "증가" }).click();

    await expect(counter).toHaveText("2");

    await page.getByRole("button", { name: "초기화" }).click();

    await expect(counter).toHaveText("0");
  });

  test("폼이 빈 값 제출 시 검증 메시지를 보여준다", async ({ page }) => {
    await page.goto("/examples/form");

    await page.getByRole("button", { name: "제출" }).click();

    await expect(page.getByText("이름은 2자 이상 입력하세요.")).toBeVisible();
    await expect(page.getByText("올바른 이메일 형식이 아닙니다.")).toBeVisible();
    await expect(page.getByText("약관에 동의해야 합니다.")).toBeVisible();
  });

  test("테마를 다크로 바꾸면 새로고침 후에도 유지된다", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "테마 변경" }).click();
    await page.getByRole("menuitem", { name: "다크" }).click();

    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.reload();

    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});
