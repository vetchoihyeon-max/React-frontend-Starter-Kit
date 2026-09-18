# 프로젝트 규칙

Vite + React + TypeScript 기반 프론트엔드 스타터 킷입니다.
전체 구조와 사용법은 `README.md`를 참고하세요.

## 자주 쓰는 명령어

- 개발 서버: `npm run dev`
- 빌드: `npm run build`
- 테스트: `npm run test`
- E2E 테스트: `npm run test:e2e`
- 린트: `npm run lint` (자동 수정은 `npm run lint:fix`)
- 타입 검사: `npm run typecheck`

작업을 마치기 전에 `npm run lint`, `npm run typecheck`, `npm run test`가 모두 통과해야 합니다.
라우팅, 인증, 언어처럼 화면 흐름을 바꿨다면 `npm run test:e2e`도 함께 확인합니다.

## 코딩 규칙

- 변수명과 함수명은 camelCase, 컴포넌트는 PascalCase를 사용합니다.
- 주석과 JSDoc은 한국어로 작성합니다. 함수에는 역할을 설명하는 JSDoc을 답니다.
- `console`을 직접 호출하지 말고 `src/lib/logger.ts`의 `logger`를 사용합니다.
- 환경변수는 `import.meta.env`를 직접 읽지 말고 `src/lib/env.ts`의 `env`를 사용합니다.
- HTTP 요청은 `src/lib/api-client.ts`의 `apiClient`를 통해 보냅니다.
- API 응답은 zod 스키마로 검증한 뒤 사용합니다.
- 화면에 보이는 문자열은 하드코딩하지 말고 `src/locales/`에 키를 추가해 `t()`로 읽습니다.
  키를 추가할 때는 `ko.json`과 `en.json`을 함께 수정합니다.
- 폼 검증 메시지는 zod 스키마에 번역 키를 담고 화면에서 번역합니다.

## 디렉터리 규칙

- 라우트는 `src/routes/` 아래 파일 위치가 곧 URL 경로입니다.
- 도메인 로직은 `src/features/<도메인>/`에 `schemas.ts`, `api.ts`, `queries.ts`로 나눕니다.
- 서버 데이터는 TanStack Query로, 전역 UI 상태는 Zustand로 관리합니다.
- 공용 레이아웃 컴포넌트는 `src/components/layout/`에 둡니다.
- 로그인이 필요한 페이지는 `src/routes/_authenticated/` 아래에 만듭니다.
- 단위 테스트는 대상 파일 옆에 두고, 브라우저 시나리오 테스트는 `e2e/`에 둡니다.

## 편집 금지 파일

- `src/routeTree.gen.ts`: TanStack Router가 자동 생성합니다.
- `src/components/ui/**`: shadcn CLI가 관리하며 린트 대상에서 제외됩니다.
  스타일 변경이 필요할 때만 직접 수정합니다.

## PWA

- 서비스 워커는 빌드에서만 동작합니다. 개발 서버에서는 꺼져 있습니다.
- API 응답은 캐시하지 않습니다. 캐싱이 필요하면 `vite.config.ts`의 `workbox.runtimeCaching`에 추가합니다.
- 아이콘은 `public/favicon.svg`에서 생성합니다. 원본 교체 후 `npm run generate:pwa-assets`를 실행합니다.
- `public/`의 생성된 아이콘 파일은 직접 편집하지 않습니다.

## 환경변수

- 기본값은 커밋된 `.env`에 둡니다. 이 파일은 개발과 프로덕션 빌드 모두에서 읽힙니다.
- 비밀값은 `.env`가 아니라 gitignore 되는 `.env.local`에만 작성합니다.
- 변수를 추가하면 `src/lib/env.ts`의 zod 스키마와 `.env.example`도 함께 수정합니다.

## 커밋

- 커밋 메시지는 한국어로 작성합니다.
- 커밋 전 pre-commit 훅이 스테이징된 파일에 `biome check --write`를 실행합니다.
