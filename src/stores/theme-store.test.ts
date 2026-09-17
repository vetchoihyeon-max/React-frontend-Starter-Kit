import { beforeEach, describe, expect, it, vi } from "vitest";
import { applyTheme, resolveTheme, useThemeStore, watchSystemTheme } from "@/stores/theme-store";

/**
 * matchMedia를 원하는 결과로 대체한다
 * @param matches prefers-color-scheme: dark 일치 여부
 */
function mockMatchMedia(matches: boolean) {
  const listeners = new Set<() => void>();

  vi.stubGlobal("matchMedia", (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
    dispatchEvent: () => false,
  }));

  return {
    emitChange: () => {
      for (const listener of listeners) {
        listener();
      }
    },
  };
}

describe("theme-store", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    useThemeStore.setState({ theme: "system" });
    document.documentElement.classList.remove("dark");
  });

  it("system은 시스템 설정을 따른다", () => {
    mockMatchMedia(true);

    expect(resolveTheme("system")).toBe("dark");

    mockMatchMedia(false);

    expect(resolveTheme("system")).toBe("light");
  });

  it("명시적으로 선택한 테마는 시스템 설정보다 우선한다", () => {
    mockMatchMedia(true);

    expect(resolveTheme("light")).toBe("light");
  });

  it("applyTheme은 html의 dark 클래스를 동기화한다", () => {
    mockMatchMedia(false);

    applyTheme("dark");
    expect(document.documentElement).toHaveClass("dark");

    applyTheme("light");
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("setTheme은 상태를 저장하고 화면에 반영한다", () => {
    mockMatchMedia(false);

    useThemeStore.getState().setTheme("dark");

    expect(useThemeStore.getState().theme).toBe("dark");
    expect(document.documentElement).toHaveClass("dark");
  });

  it("system 선택 시에만 시스템 테마 변경을 반영한다", () => {
    const { emitChange } = mockMatchMedia(true);
    const unwatch = watchSystemTheme();

    emitChange();
    expect(document.documentElement).toHaveClass("dark");

    useThemeStore.setState({ theme: "light" });
    document.documentElement.classList.remove("dark");
    emitChange();
    expect(document.documentElement).not.toHaveClass("dark");

    unwatch();
  });
});
