import { QueryClient } from "@tanstack/react-query";

/**
 * 애플리케이션 전역 QueryClient를 생성한다
 * 테스트에서도 동일한 기본값을 재사용할 수 있도록 팩토리 함수로 제공한다
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
