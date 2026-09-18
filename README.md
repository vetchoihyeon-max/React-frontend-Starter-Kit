# React Frontend Starter Kit

Vite, React, TypeScript, Tailwind CSS 기반의 프론트엔드 스타터 킷입니다.
라우팅, 서버/클라이언트 상태관리, 폼 검증, 테스트, 린트, CI가 모두 연결된 상태로 제공됩니다.

## 기술 스택

| 영역 | 라이브러리 | 역할 |
| --- | --- | --- |
| 빌드 | Vite 8 | 개발 서버와 프로덕션 번들링 |
| UI | React 19 | 컴포넌트 렌더링 |
| 언어 | TypeScript | 정적 타입 검사 |
| 스타일 | Tailwind CSS 4 | 유틸리티 기반 스타일 (CSS-first 설정) |
| 컴포넌트 | shadcn/ui | 프로젝트가 코드를 소유하는 접근성 컴포넌트 |
| 라우팅 | TanStack Router | 파일 기반 + 타입 안전한 라우팅 |
| 서버 상태 | TanStack Query | 데이터 캐싱, 재요청, 동기화 |
| 클라이언트 상태 | Zustand | 전역 UI 상태 관리 |
| 폼 | react-hook-form + zod | 스키마 기반 폼 검증 |
| HTTP | ky | fetch 기반 경량 HTTP 클라이언트 |
| 린트/포맷 | Biome | 린터와 포매터 통합 |
| 다국어 | i18next + react-i18next | 한국어/영어 번역과 언어 감지 |
| 테스트 | Vitest + Testing Library + MSW | 단위/통합 테스트와 API 목킹 |
| E2E | Playwright | 실제 브라우저에서 시나리오 검증 |
| CI | GitHub Actions | 린트, 타입 검사, 테스트, 빌드 자동화 |

## 요구사항

- Node.js 22.22 이상 (`.nvmrc` 기준 24)
- npm 11 이상

## 시작하기

```bash
npm install
npm run dev
```

기본 환경변수는 커밋된 `.env`에 들어 있어 별도 설정 없이 바로 실행됩니다.
값을 바꾸려면 `.env.example`을 참고해 `.env.local`을 만드세요.

개발 서버는 기본적으로 <http://localhost:5173> 에서 실행됩니다.

## 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 타입 검사 후 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run typecheck` | 타입 검사만 실행 |
| `npm run lint` | 린트와 포맷 검사 |
| `npm run lint:fix` | 린트와 포맷 자동 수정 |
| `npm run format` | 포맷만 자동 수정 |
| `npm run test` | 테스트 1회 실행 |
| `npm run test:watch` | 테스트 감시 모드 |
| `npm run test:coverage` | 커버리지 리포트 생성 |
| `npm run test:e2e` | Playwright E2E 테스트 실행 |
| `npm run test:e2e:ui` | Playwright UI 모드로 실행 |

## 환경변수

`src/lib/env.ts`에서 zod 스키마로 검증합니다. 값이 없거나 형식이 틀리면 앱 시작 시점에 예외가 발생합니다.

| 변수 | 필수 | 설명 |
| --- | --- | --- |
| `VITE_API_BASE_URL` | 예 | API 서버 기본 주소 |
| `VITE_APP_NAME` | 아니오 | 애플리케이션 표시 이름 |

파일 우선순위는 Vite 규칙을 따릅니다.

| 파일 | 커밋 | 용도 |
| --- | --- | --- |
| `.env` | 예 | 모든 모드에서 읽는 기본값. 비밀값을 넣지 않습니다 |
| `.env.test` | 예 | 테스트 전용 기본값 |
| `.env.local` | 아니오 | 개인 설정과 비밀값 |

`.env`는 개발과 프로덕션 빌드 모두에서 읽히므로, 여기에 값이 없으면 빌드 결과물이 시작 시점에
실패합니다. 이 경우 흰 화면 대신 원인 메시지가 표시됩니다.

## 디렉터리 구조

```
src/
├── main.tsx              # 진입점. Provider 구성
├── router.tsx            # 라우터 생성과 타입 등록
├── routeTree.gen.ts      # 자동 생성 파일 (편집 금지)
├── routes/               # 파일 기반 라우트. 경로 = 파일 위치
├── components/
│   ├── ui/               # shadcn 컴포넌트 (CLI가 관리)
│   └── layout/           # 헤더, 테마/언어 토글 등 레이아웃
├── features/             # 도메인별 api, queries, schemas 묶음
├── stores/               # Zustand 스토어 (인증, 테마, 카운터)
├── hooks/                # 공용 훅
├── lib/                  # env, logger, api-client, query-client, i18n
├── locales/              # 언어별 번역 리소스 (ko.json, en.json)
├── mocks/                # MSW 핸들러와 목 서버
├── styles/globals.css    # Tailwind 진입점과 테마 토큰
├── types/                # 전역 타입 선언 (번역 키 타입 등)
└── test/                 # 테스트 setup과 렌더 유틸

e2e/                      # Playwright 시나리오 테스트
```

## 작업 가이드

### 새 페이지 추가하기

`src/routes/` 아래에 파일을 만들면 경로가 자동으로 생성됩니다.
예를 들어 `src/routes/settings.tsx`는 `/settings`가 됩니다.

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return <h1>설정</h1>;
}
```

개발 서버가 실행 중이면 `routeTree.gen.ts`가 자동으로 갱신됩니다.
서버를 끈 상태라면 `npm run build`를 한 번 실행하세요.

### 새 feature 추가하기

도메인 단위로 `src/features/<도메인>/` 디렉터리를 만들고 다음을 배치합니다.

- `schemas.ts`: zod 스키마와 타입
- `api.ts`: `apiClient`를 사용하는 요청 함수. 응답은 스키마로 검증
- `queries.ts`: `queryOptions`로 쿼리 키와 함수를 묶어 export

`queryOptions`로 만들면 라우트 loader의 프리패치와 컴포넌트의 `useSuspenseQuery`가
같은 캐시를 공유합니다.

```tsx
export const Route = createFileRoute("/posts")({
  loader: ({ context }) => context.queryClient.ensureQueryData(postListQueryOptions()),
  component: PostsPage,
});
```

### 새 스토어 추가하기

`src/stores/`에 파일을 만들고 액션을 스토어 내부에 정의합니다.
컴포넌트에서는 셀렉터로 필요한 값만 구독해 불필요한 리렌더를 막습니다.

```ts
const count = useCounterStore((state) => state.count);
```

서버에서 내려오는 데이터는 스토어가 아니라 TanStack Query로 관리합니다.

### 보호된 페이지 추가하기

로그인한 사용자만 볼 수 있는 페이지는 `src/routes/_authenticated/` 아래에 만듭니다.
밑줄로 시작하는 `_authenticated`는 URL에 나타나지 않는 레이아웃 라우트이고,
그 `beforeLoad`에서 인증 여부를 확인해 미로그인 시 로그인 화면으로 보냅니다.

```tsx
// src/routes/_authenticated/settings.tsx → /settings
export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});
```

인증 여부는 라우터 컨텍스트의 `auth`로 읽습니다. 이 값은 `src/stores/auth-store.ts`의
`authGuard`이며, 컴포넌트 밖에서도 구독 없이 현재 상태를 확인할 수 있습니다.
실제 프로젝트에서는 스토어의 `login`이 인증 API를 호출하도록 바꾸면 됩니다.

### 문구 추가와 번역하기

화면에 보이는 문자열은 `src/locales/ko.json`과 `en.json`에 키로 넣고 `t()`로 읽습니다.
`src/types/i18next.d.ts`가 `ko.json`을 기준으로 키 타입을 만들어 주므로,
없는 키를 쓰면 타입 오류로 잡힙니다.

```tsx
const { t } = useTranslation();

return <h1>{t("home.title")}</h1>;
```

폼 검증 메시지는 zod 스키마에 번역된 문장 대신 키를 담고, 화면에서 번역합니다.
이렇게 하면 이미 표시된 에러 메시지도 언어를 바꾸는 즉시 함께 바뀝니다.

```ts
name: z.string().min(2, "validation.nameMin"),
```

언어는 저장된 선택을 먼저 보고, 없으면 브라우저 언어를 따릅니다.
다국어가 필요 없다면 `src/lib/i18n.ts`, `src/locales/`, `LanguageToggle`을 지우고
`t("...")` 호출을 문자열로 되돌리면 됩니다.

### shadcn 컴포넌트 추가하기

```bash
npx shadcn@latest add <컴포넌트명>
```

`src/components/ui/`에 생성되며 이 디렉터리는 린트와 포맷 대상에서 제외됩니다.
스타일을 바꿔야 하면 생성된 파일을 직접 수정하면 됩니다.

## 테스트

단위 테스트는 `src/` 안에 대상 파일과 나란히 두고, E2E는 `e2e/`에 둡니다.

```bash
npm run test       # Vitest 단위/통합 테스트
npm run test:e2e   # Playwright E2E (빌드 후 preview 서버를 자동으로 띄웁니다)
```

E2E를 처음 실행하기 전에 브라우저를 한 번 설치해야 합니다.

```bash
npx playwright install chromium
```

테스트는 실행 환경의 로케일과 무관하게 같은 결과를 내도록 언어를 한국어로 고정합니다.
단위 테스트는 `src/test/setup.ts`에서, E2E는 `playwright.config.ts`의 `locale` 옵션에서 지정합니다.

## 예제 페이지

- `/examples/query`: 라우트 loader 프리패치와 `useSuspenseQuery`
- `/examples/store`: Zustand 셀렉터 구독
- `/examples/form`: react-hook-form과 zod 검증
- `/login`, `/dashboard`: 인증 가드와 로그인 후 원래 경로 복귀

실제 프로젝트를 시작할 때는 `src/routes/examples/`와 `src/features/example/`을 삭제하세요.
인증 예제를 그대로 쓸 경우 `src/stores/auth-store.ts`의 `login`을 실제 인증 API로 바꾸세요.
