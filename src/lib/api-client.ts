import ky from "ky";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

/**
 * 공용 HTTP 클라이언트
 * 인증 헤더 주입과 에러 로깅을 훅에서 처리한다
 */
export const apiClient = ky.create({
  prefix: env.VITE_API_BASE_URL,
  timeout: 10_000,
  retry: { limit: 1 },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        // 인증 토큰이 필요한 경우 여기에서 헤더를 추가한다
        const token = localStorage.getItem("accessToken");

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      ({ request, response }) => {
        if (!response.ok) {
          logger.error(`요청 실패: ${request.method} ${request.url} (${response.status})`);
        }
      },
    ],
  },
});
