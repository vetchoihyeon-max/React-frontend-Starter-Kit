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
| 테스트 | Vitest + Testing Library + MSW | 단위/통합 테스트와 API 목킹 |
| CI | GitHub Actions | 린트, 타입 검사, 테스트, 빌드 자동화 |

## 요구사항

- Node.js 22.22 이상 (`.nvmrc` 기준 24)
- npm 11 이상

## 시작하기

```bash
npm install
cp .env.example .env.development
npm run dev
```

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

## 환경변수

`src/lib/env.ts`에서 zod 스키마로 검증합니다. 값이 없거나 형식이 틀리면 앱 시작 시점에 예외가 발생합니다.

| 변수 | 필수 | 설명 |
| --- | --- | --- |
| `VITE_API_BASE_URL` | 예 | API 서버 기본 주소 |
| `VITE_APP_NAME` | 아니오 | 애플리케이션 표시 이름 |

환경별 파일은 `.env.development`, `.env.test`를 사용하고, 비밀값이 담긴 `.env`는 커밋하지 않습니다.

## 디렉터리 구조

```
src/
├── main.tsx              # 진입점. Provider 구성
├── router.tsx            # 라우터 생성과 타입 등록
├── routeTree.gen.ts      # 자동 생성 파일 (편집 금지)
├── routes/               # 파일 기반 라우트. 경로 = 파일 위치
├── components/
│   ├── ui/               # shadcn 컴포넌트 (CLI가 관리)
│   └── layout/           # 헤더, 테마 토글 등 레이아웃
├── features/             # 도메인별 api, queries, schemas 묶음
├── stores/               # Zustand 스토어
├── hooks/                # 공용 훅
├── lib/                  # env, logger, api-client, query-client
├── mocks/                # MSW 핸들러와 목 서버
├── styles/globals.css    # Tailwind 진입점과 테마 토큰
└── test/                 # 테스트 setup과 렌더 유틸
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

### shadcn 컴포넌트 추가하기

```bash
npx shadcn@latest add <컴포넌트명>
```

`src/components/ui/`에 생성되며 이 디렉터리는 린트와 포맷 대상에서 제외됩니다.
스타일을 바꿔야 하면 생성된 파일을 직접 수정하면 됩니다.

## 예제 페이지

- `/examples/query`: 라우트 loader 프리패치와 `useSuspenseQuery`
- `/examples/store`: Zustand 셀렉터 구독
- `/examples/form`: react-hook-form과 zod 검증

실제 프로젝트를 시작할 때는 `src/routes/examples/`와 `src/features/example/`을 삭제하세요.
