import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/** 스타터 킷에 포함된 기술 스택 목록 */
const stackItems = [
  { name: "Vite + React + TypeScript", description: "빠른 개발 서버와 타입 안전성" },
  { name: "Tailwind CSS + shadcn/ui", description: "유틸리티 기반 스타일과 접근성 컴포넌트" },
  { name: "TanStack Router", description: "파일 기반 라우팅과 타입 안전한 내비게이션" },
];

/** 홈 페이지 */
function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-3xl">React Frontend Starter Kit</h1>
        <p className="text-muted-foreground">
          라우팅, 상태관리, 스타일, 테스트 설정이 미리 구성된 프로젝트 템플릿입니다.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stackItems.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <CardTitle className="text-base">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </div>
  );
}
