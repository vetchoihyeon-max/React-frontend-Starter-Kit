import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounterStore } from "@/stores/counter-store";

export const Route = createFileRoute("/examples/store")({
  component: StoreExamplePage,
});

/** Zustand 사용 예제 페이지 */
function StoreExamplePage() {
  const { t } = useTranslation();
  // 셀렉터로 필요한 값만 구독해 불필요한 리렌더를 막는다
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">{t("storeExample.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("storeExample.description")}</p>
      </div>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>{t("storeExample.counter")}</CardTitle>
          <CardDescription>{t("storeExample.counterDescription")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <output className="block text-center font-bold text-4xl tabular-nums">{count}</output>
          <div className="flex gap-2">
            <Button onClick={decrement} variant="outline" className="flex-1">
              {t("storeExample.decrement")}
            </Button>
            <Button onClick={increment} className="flex-1">
              {t("storeExample.increment")}
            </Button>
            <Button onClick={reset} variant="ghost">
              {t("storeExample.reset")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
