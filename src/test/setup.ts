import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "@/mocks/server";

// 목 서버는 테스트 전체 수명 동안 유지하고 각 테스트마다 핸들러를 초기화한다
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => {
  cleanup();
  server.resetHandlers();
  // Radix 메뉴가 열린 채 정리되면 body에 pointer-events: none이 남아 다음 테스트의 클릭을 막는다
  document.body.style.pointerEvents = "";
});

afterAll(() => server.close());

// jsdom에는 matchMedia 구현이 없어 테마 로직을 위해 최소 구현을 주입한다
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
