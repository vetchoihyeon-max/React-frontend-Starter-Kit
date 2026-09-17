import { queryOptions } from "@tanstack/react-query";
import { fetchPost, fetchPosts } from "@/features/example/api";

/** 예제 기능의 쿼리 키 팩토리 */
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (limit: number) => [...postKeys.lists(), { limit }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (postId: number) => [...postKeys.details(), postId] as const,
};

/**
 * 게시글 목록 쿼리 옵션을 생성한다
 * 라우트 loader의 프리패치와 컴포넌트의 useSuspenseQuery에서 공유한다
 * @param limit 가져올 개수
 */
export function postListQueryOptions(limit = 10) {
  return queryOptions({
    queryKey: postKeys.list(limit),
    queryFn: () => fetchPosts(limit),
  });
}

/**
 * 게시글 단건 쿼리 옵션을 생성한다
 * @param postId 게시글 식별자
 */
export function postDetailQueryOptions(postId: number) {
  return queryOptions({
    queryKey: postKeys.detail(postId),
    queryFn: () => fetchPost(postId),
  });
}
