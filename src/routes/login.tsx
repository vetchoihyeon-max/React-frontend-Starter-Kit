import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const search = Route.useSearch();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  /**
   * 데모 로그인을 수행한다
   * 실제 프로젝트에서는 인증 API 응답으로 사용자 정보를 채운다
   * @param event 폼 제출 이벤트
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    login({ id: "demo-user", name: t("auth.demoUserName"), email });
    navigate({ to: search.redirect ?? "/dashboard" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">{t("auth.loginTitle")}</h1>
        <p className="text-muted-foreground text-sm">{t("auth.loginDescription")}</p>
      </div>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>{t("auth.loginCardTitle")}</CardTitle>
          <CardDescription>{t("auth.loginCardDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                defaultValue="demo@example.com"
              />
            </div>
            <Button type="submit">{t("common.login")}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
