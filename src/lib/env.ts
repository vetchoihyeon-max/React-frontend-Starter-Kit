import { z } from "zod";

/** 클라이언트에서 사용하는 환경변수 스키마 */
const envSchema = z.object({
  /** API 서버 기본 주소 */
  VITE_API_BASE_URL: z.url({ error: "VITE_API_BASE_URL은 올바른 URL이어야 합니다." }),
  /** 애플리케이션 표시 이름 */
  VITE_APP_NAME: z.string().min(1).default("React Starter Kit"),
});

/**
 * import.meta.env를 검증한다
 * 검증에 실패하면 앱 시작 시점에 즉시 예외를 던져 설정 누락을 빠르게 알린다
 */
function parseEnv() {
  const result = envSchema.safeParse(import.meta.env);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`환경변수 설정이 올바르지 않습니다.\n${issues}`);
  }

  return result.data;
}

export const env = parseEnv();
