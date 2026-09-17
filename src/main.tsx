import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { logger } from "./lib/logger";
import { createQueryClient } from "./lib/query-client";
import { createRouter } from "./router";
import { watchSystemTheme } from "./stores/theme-store";
import "./styles/globals.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("#root 엘리먼트를 찾을 수 없습니다. index.html을 확인하세요.");
}

/**
 * 부팅 단계에서 실패하면 원인을 화면에 표시한다
 * 환경변수 누락 같은 문제를 흰 화면 대신 바로 확인할 수 있게 한다
 * @param error 발생한 예외
 */
function renderBootError(error: unknown, container: HTMLElement) {
  const message = error instanceof Error ? error.message : String(error);

  logger.error("앱을 시작하지 못했습니다.", error);
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.setAttribute(
    "style",
    "font-family: system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem;",
  );

  const heading = document.createElement("h1");
  heading.textContent = "앱을 시작하지 못했습니다";
  heading.setAttribute("style", "font-size: 1.25rem; margin-bottom: 0.75rem;");

  const detail = document.createElement("pre");
  detail.textContent = message;
  detail.setAttribute("style", "white-space: pre-wrap; color: #b91c1c; margin: 0;");

  wrapper.append(heading, detail);
  container.append(wrapper);
}

try {
  // 시스템 테마 변경을 앱 전체 수명 동안 구독한다
  watchSystemTheme();

  const queryClient = createQueryClient();
  const router = createRouter(queryClient);

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
} catch (error) {
  renderBootError(error, rootElement);
}
