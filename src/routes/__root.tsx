import type { QueryClient } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { DevTools } from "@/components/layout/devtools";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

/**
 * 라우터 전역 컨텍스트 타입
 * queryClient는 main.tsx에서 주입되며 라우트 loader에서 사용한다
 */
export interface RouterContext {
  queryClient: QueryClient;
  /** 컴포넌트 밖에서 인증 여부를 읽기 위한 가드 */
  auth: { readonly isAuthenticated: boolean };
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
});

/** 모든 페이지를 감싸는 기본 레이아웃 */
function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <Toaster />
      <DevTools />
    </div>
  );
}

/** 존재하지 않는 경로에 표시되는 화면 */
function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="font-bold text-2xl">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground text-sm">요청하신 주소가 존재하지 않습니다.</p>
      <Button asChild>
        <Link to="/">홈으로 이동</Link>
      </Button>
    </div>
  );
}

/** 라우트 렌더링 중 발생한 오류를 표시하는 화면 */
function ErrorBoundary({ error }: ErrorComponentProps) {
  const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="font-bold text-2xl">오류가 발생했습니다</h1>
      <p className="text-muted-foreground text-sm">{message}</p>
      <Button asChild>
        <Link to="/">홈으로 이동</Link>
      </Button>
    </div>
  );
}
