import { create } from "zustand";
import { persist } from "zustand/middleware";

/** 선택 가능한 테마 값 */
export type Theme = "light" | "dark" | "system";

/** localStorage에 저장될 때 사용하는 키 (index.html의 인라인 스크립트와 동일해야 한다) */
export const THEME_STORAGE_KEY = "app-theme";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

/**
 * 실제로 적용할 테마를 계산한다
 * @param theme 사용자가 선택한 테마
 */
export function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system") {
    return theme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * html 요소에 dark 클래스를 반영한다
 * @param theme 사용자가 선택한 테마
 */
export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", resolveTheme(theme) === "dark");
}

/**
 * 테마 상태 스토어
 * persist 미들웨어로 사용자의 선택을 localStorage에 유지한다
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
    }),
    {
      name: THEME_STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        // 저장된 값을 복원한 직후 화면에 반영한다
        applyTheme(state?.theme ?? "system");
      },
    },
  ),
);

/**
 * 시스템 테마 변경을 구독한다
 * 'system'을 선택한 경우에만 화면을 갱신한다
 * @returns 구독 해제 함수
 */
export function watchSystemTheme() {
  const query = window.matchMedia("(prefers-color-scheme: dark)");

  const handleChange = () => {
    if (useThemeStore.getState().theme === "system") {
      applyTheme("system");
    }
  };

  query.addEventListener("change", handleChange);

  return () => query.removeEventListener("change", handleChange);
}
