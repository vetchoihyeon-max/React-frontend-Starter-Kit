import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

/**
 * 인증이 필요한 라우트를 묶는 레이아웃 라우트
 * 파일명이 밑줄로 시작하므로 URL 경로에는 나타나지 않는다
 */
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      // 로그인 후 원래 가려던 경로로 되돌리기 위해 주소를 넘긴다
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: () => <Outlet />,
});
