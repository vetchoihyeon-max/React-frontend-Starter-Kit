import { type Post, postListSchema, postSchema } from "@/features/example/schemas";
import { apiClient } from "@/lib/api-client";

/**
 * 게시글 목록을 조회한다
 * @param limit 가져올 개수
 */
export async function fetchPosts(limit = 10): Promise<Post[]> {
  const data = await apiClient.get("posts", { searchParams: { _limit: limit } }).json();

  return postListSchema.parse(data);
}

/**
 * 게시글 단건을 조회한다
 * @param postId 게시글 식별자
 */
export async function fetchPost(postId: number): Promise<Post> {
  const data = await apiClient.get(`posts/${postId}`).json();

  return postSchema.parse(data);
}
