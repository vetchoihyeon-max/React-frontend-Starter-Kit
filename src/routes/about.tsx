import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

/** 소개 페이지 */
function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl">{t("about.title")}</h1>
      <p className="text-muted-foreground text-sm leading-relaxed">{t("about.description")}</p>
    </div>
  );
}
