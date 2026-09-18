import type { QueryClient } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="font-bold text-2xl">{t("error.notFoundTitle")}</h1>
      <p className="text-muted-foreground text-sm">{t("error.notFoundDescription")}</p>
      <Button asChild>
        <Link to="/">{t("common.goHome")}</Link>
      </Button>
    </div>
  );
}

/** 라우트 렌더링 중 발생한 오류를 표시하는 화면 */
function ErrorBoundary({ error }: ErrorComponentProps) {
  const { t } = useTranslation();
  const message = error instanceof Error ? error.message : t("error.unknown");

  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="font-bold text-2xl">{t("error.title")}</h1>
      <p className="text-muted-foreground text-sm">{message}</p>
      <Button asChild>
        <Link to="/">{t("common.goHome")}</Link>
      </Button>
    </div>
  );
}
