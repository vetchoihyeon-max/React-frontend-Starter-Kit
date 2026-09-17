import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createQueryClient } from "./lib/query-client";
import { createRouter } from "./router";
import "./styles/globals.css";

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
