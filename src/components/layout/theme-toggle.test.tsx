import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useThemeStore } from "@/stores/theme-store";
import { renderWithProviders, screen } from "@/test/utils";

describe("ThemeToggle", () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: "system" });
    document.documentElement.classList.remove("dark");
  });

  it("메뉴에서 다크를 선택하면 테마가 저장되고 화면에 반영된다", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "테마 변경" }));
    await user.click(await screen.findByRole("menuitem", { name: "다크" }));

    expect(useThemeStore.getState().theme).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
  });
});
