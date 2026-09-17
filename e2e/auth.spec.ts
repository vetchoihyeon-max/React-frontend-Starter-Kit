import { expect, test } from "@playwright/test";

test.describe("인증 가드", () => {
  test("로그인하지 않으면 보호된 경로에서 로그인 화면으로 보낸다", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole("heading", { name: "로그인" })).toBeVisible();
  });

  test("로그인하면 원래 가려던 경로로 돌아간다", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL(/\/login/);

    await page.getByLabel("이메일").fill("tester@example.com");
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByRole("heading", { name: "대시보드" })).toBeVisible();
    await expect(page.getByText("tester@example.com")).toBeVisible();
  });

  test("로그인 상태는 새로고침 후에도 유지되고 로그아웃하면 해제된다", async ({ page }) => {
    await page.goto("/login");

    await page.getByRole("button", { name: "로그인" }).click();
    await expect(page).toHaveURL("/dashboard");

    await page.reload();
    await expect(page.getByRole("heading", { name: "대시보드" })).toBeVisible();

    await page.getByRole("button", { name: "로그아웃" }).click();

    await expect(page).toHaveURL("/");

    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("이미 로그인했다면 로그인 화면 대신 대시보드로 보낸다", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "로그인" }).click();
    await expect(page).toHaveURL("/dashboard");

    await page.goto("/login");

    await expect(page).toHaveURL("/dashboard");
  });
});
