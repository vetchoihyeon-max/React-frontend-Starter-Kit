import { Button } from "@/components/ui/button";

/**
 * 애플리케이션 루트 컴포넌트
 * Tailwind와 shadcn/ui 설정이 정상 동작하는지 확인하는 임시 화면
 */
function App() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="font-bold text-3xl">Hello Starter</h1>
      <Button>시작하기</Button>
    </main>
  );
}

export default App;
