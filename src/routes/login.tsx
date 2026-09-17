import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/auth-store";

/** 로그인 후 돌아갈 경로를 검색 파라미터로 받는다 */
const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ context, search }) => {
    // 이미 로그인한 상태라면 로그인 화면을 보여주지 않는다
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect ?? "/dashboard" });
    }
  },
  component: LoginPage,
});

/** 데모용 로그인 페이지 */
function LoginPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  /**
   * 데모 로그인을 수행한다
   * 실제 프로젝트에서는 인증 API 응답으로 사용자 정보를 채운다
   * @param event 폼 제출 이벤트
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    login({ id: "demo-user", name: "데모 사용자", email });
    navigate({ to: search.redirect ?? "/dashboard" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">로그인</h1>
        <p className="text-muted-foreground text-sm">
          인증 가드 동작을 보여주는 데모입니다. 아무 값이나 입력해도 로그인됩니다.
        </p>
      </div>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>계정 정보</CardTitle>
          <CardDescription>입력한 이메일이 그대로 저장됩니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                defaultValue="demo@example.com"
              />
            </div>
            <Button type="submit">로그인</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
