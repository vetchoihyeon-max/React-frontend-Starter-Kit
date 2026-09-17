import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

/**
 * 개발 모드에서만 렌더되는 디버깅 도구 모음
 * 프로덕션 빌드에서는 import.meta.env.DEV 분기로 제거된다
 */
export function DevTools() {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <>
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </>
  );
}
