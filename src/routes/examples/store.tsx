import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounterStore } from "@/stores/counter-store";

export const Route = createFileRoute("/examples/store")({
  component: StoreExamplePage,
});

/** Zustand 사용 예제 페이지 */
function StoreExamplePage() {
  // 셀렉터로 필요한 값만 구독해 불필요한 리렌더를 막는다
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">클라이언트 상태 예제</h1>
        <p className="text-muted-foreground text-sm">
          Zustand 스토어를 셀렉터로 구독하는 패턴입니다. 테마 전환도 같은 방식으로 동작합니다.
        </p>
      </div>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>카운터</CardTitle>
          <CardDescription>액션은 스토어 내부에 정의되어 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <output className="block text-center font-bold text-4xl tabular-nums">{count}</output>
          <div className="flex gap-2">
            <Button onClick={decrement} variant="outline" className="flex-1">
              감소
            </Button>
            <Button onClick={increment} className="flex-1">
              증가
            </Button>
            <Button onClick={reset} variant="ghost">
              초기화
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
