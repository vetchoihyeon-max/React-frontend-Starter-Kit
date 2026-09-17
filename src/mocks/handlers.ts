import { HttpResponse, http } from "msw";
import type { Post } from "@/features/example/schemas";

/** 테스트에서 사용할 게시글 목 데이터 */
export const mockPosts: Post[] = [
  { userId: 1, id: 1, title: "첫 번째 글", body: "첫 번째 본문" },
  { userId: 1, id: 2, title: "두 번째 글", body: "두 번째 본문" },
];

/** 기본 목 핸들러 목록 */
export const handlers = [
  http.get("*/posts", () => HttpResponse.json(mockPosts)),
  http.get("*/posts/:postId", ({ params }) => {
    const post = mockPosts.find((item) => item.id === Number(params.postId));

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(post);
  }),
];
