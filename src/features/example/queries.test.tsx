import { useSuspenseQuery } from "@tanstack/react-query";
import { HttpResponse, http } from "msw";
import { Suspense } from "react";
import { describe, expect, it } from "vitest";
import { fetchPosts } from "@/features/example/api";
import { postListQueryOptions } from "@/features/example/queries";
import { mockPosts } from "@/mocks/handlers";
import { server } from "@/mocks/server";
import { renderWithProviders, screen } from "@/test/utils";

/** 쿼리 결과를 화면에 출력하는 테스트용 컴포넌트 */
function PostList() {
  const { data } = useSuspenseQuery(postListQueryOptions());

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

describe("postListQueryOptions", () => {
  it("목 서버가 반환한 게시글 목록을 렌더링한다", async () => {
    renderWithProviders(
      <Suspense fallback={<p>로딩 중</p>}>
        <PostList />
      </Suspense>,
    );

    expect(await screen.findByText(mockPosts[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockPosts[1].title)).toBeInTheDocument();
  });

  it("응답 스키마가 다르면 검증 오류를 던진다", async () => {
    server.use(http.get("*/posts", () => HttpResponse.json([{ id: "문자열" }])));

    await expect(fetchPosts()).rejects.toThrow();
  });
});
