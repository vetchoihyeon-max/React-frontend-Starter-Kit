import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

/** 로그인한 사용자만 볼 수 있는 페이지 */
function DashboardPage() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">{t("auth.dashboardTitle")}</h1>
        <p className="text-muted-foreground text-sm">{t("auth.dashboardDescription")}</p>
      </div>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>{t("auth.myInfo")}</CardTitle>
          <CardDescription>{t("auth.myInfoDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1 text-sm">
          <p>
            {t("auth.name")}: {user?.name}
          </p>
          <p>
            {t("auth.email")}: {user?.email}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
