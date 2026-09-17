import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

/** 로그인한 사용자만 볼 수 있는 페이지 */
function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">대시보드</h1>
        <p className="text-muted-foreground text-sm">
          로그인한 사용자만 접근할 수 있는 보호된 페이지입니다.
        </p>
      </div>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>내 정보</CardTitle>
          <CardDescription>인증 스토어에 저장된 값입니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 text-sm">
          <p>이름: {user?.name}</p>
          <p>이메일: {user?.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}
