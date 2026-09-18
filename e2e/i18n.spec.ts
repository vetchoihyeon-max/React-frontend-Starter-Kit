import { expect, test } from "@playwright/test";

test.describe("다국어", () => {
  test("브라우저 언어가 한국어면 한국어로 표시한다", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "React Frontend Starter Kit" })).toBeVisible();
    await expect(page.getByRole("link", { name: "소개" })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  });

  test("언어를 영어로 바꾸면 화면과 lang 속성이 함께 바뀐다", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "언어 변경" }).click();
    await page.getByRole("menuitem", { name: "English" }).click();

    await expect(page.getByRole("link", { name: "About" })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("선택한 언어는 새로고침 후에도 유지된다", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "언어 변경" }).click();
    await page.getByRole("menuitem", { name: "English" }).click();
    await expect(page.getByRole("link", { name: "About" })).toBeVisible();

    await page.reload();

    await expect(page.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("폼 검증 메시지도 선택한 언어를 따른다", async ({ page }) => {
    await page.goto("/examples/form");

    await page.getByRole("button", { name: "제출" }).click();
    await expect(page.getByText("이름은 2자 이상 입력하세요.")).toBeVisible();

    await page.getByRole("button", { name: "언어 변경" }).click();
    await page.getByRole("menuitem", { name: "English" }).click();

    await expect(page.getByText("Name must be at least 2 characters.")).toBeVisible();
  });
});
