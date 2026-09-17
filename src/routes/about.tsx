import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

/** 소개 페이지 */
function AboutPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl">소개</h1>
      <p className="text-muted-foreground text-sm leading-relaxed">
        이 스타터 킷은 새 프로젝트를 시작할 때 반복되는 초기 설정을 줄이기 위해 만들어졌습니다. 빌드
        도구, 라우팅, 서버/클라이언트 상태관리, 폼 검증, 테스트, 린트, CI가 모두 연결된 상태로
        제공됩니다.
      </p>
    </div>
  );
}
