import { z } from "zod";

/** 예제 API가 반환하는 게시글 스키마 */
export const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

/** 게시글 목록 스키마 */
export const postListSchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;
