import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createQueryClient } from "./lib/query-client";
import { createRouter } from "./router";
import { watchSystemTheme } from "./stores/theme-store";
import "./styles/globals.css";

// 시스템 테마 변경을 앱 전체 수명 동안 구독한다
watchSystemTheme();

const queryClient = createQueryClient();
const router = createRouter(queryClient);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("#root 엘리먼트를 찾을 수 없습니다. index.html을 확인하세요.");
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
