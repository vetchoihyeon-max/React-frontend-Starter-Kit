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

/** 가입 폼에서 선택 가능한 역할 */
export const roleOptions = [
  { value: "developer", labelKey: "formExample.roles.developer" },
  { value: "designer", labelKey: "formExample.roles.designer" },
  { value: "pm", labelKey: "formExample.roles.pm" },
] as const;

/**
 * 가입 폼 입력값 스키마
 * 메시지에는 번역된 문장 대신 키를 담아, 화면에서 현재 언어로 번역한다
 */
export const signUpSchema = z.object({
  name: z.string().min(2, "validation.nameMin"),
  email: z.email("validation.emailInvalid"),
  role: z.enum(["developer", "designer", "pm"], { error: "validation.roleRequired" }),
  introduction: z.string().max(200, "validation.introductionMax").optional(),
  agreed: z.literal(true, { error: "validation.agreedRequired" }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
