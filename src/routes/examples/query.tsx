import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { postListQueryOptions } from "@/features/example/queries";

export const Route = createFileRoute("/examples/query")({
  // 라우트 진입 전에 데이터를 미리 채워 로딩 깜빡임을 줄인다
  loader: ({ context }) => context.queryClient.ensureQueryData(postListQueryOptions()),
  component: QueryExamplePage,
});

/** TanStack Query 사용 예제 페이지 */
function QueryExamplePage() {
  const { t } = useTranslation();
  const { data: posts } = useSuspenseQuery(postListQueryOptions());

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">{t("queryExample.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("queryExample.description")}</p>
      </div>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.id}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{post.body}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
