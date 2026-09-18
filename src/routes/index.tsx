import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/** 스타터 킷에 포함된 기술 스택 목록 */
const stackItems = [
  { name: "Vite + React + TypeScript", descriptionKey: "home.stack.base" },
  { name: "Tailwind CSS + shadcn/ui", descriptionKey: "home.stack.style" },
  { name: "TanStack Router", descriptionKey: "home.stack.router" },
] as const;

/** 홈 페이지 */
function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl">{t("home.title")}</h1>
        <p className="text-muted-foreground">{t("home.description")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackItems.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <CardTitle className="text-base">{item.name}</CardTitle>
              <CardDescription>{t(item.descriptionKey)}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </div>
  );
}
