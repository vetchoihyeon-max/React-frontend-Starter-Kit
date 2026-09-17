import type { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

/**
 * 애플리케이션 라우터를 생성한다
 * @param queryClient 라우트 loader에서 사용할 QueryClient 인스턴스
 */
export function createRouter(queryClient: QueryClient) {
  return createTanStackRouter({
    routeTree,
    context: { queryClient },
    // 링크에 마우스를 올리면 미리 로드한다
    defaultPreload: "intent",
    // 데이터 신선도 관리는 TanStack Query에 위임한다
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
