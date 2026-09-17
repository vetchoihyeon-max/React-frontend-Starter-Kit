import { expect, test } from "@playwright/test";

test.describe("기본 내비게이션", () => {
  test("헤더 링크로 페이지를 이동한다", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "React Frontend Starter Kit" })).toBeVisible();

    await page.getByRole("link", { name: "소개" }).click();

    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { name: "소개" })).toBeVisible();
  });

  test("존재하지 않는 경로에서 NotFound 화면을 보여준다", async ({ page }) => {
    await page.goto("/이런-경로는-없다");

    await expect(page.getByRole("heading", { name: "페이지를 찾을 수 없습니다" })).toBeVisible();

    await page.getByRole("link", { name: "홈으로 이동" }).click();

    await expect(page).toHaveURL("/");
  });
});
