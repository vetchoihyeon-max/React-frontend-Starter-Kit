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
  { value: "developer", label: "개발자" },
  { value: "designer", label: "디자이너" },
  { value: "pm", label: "기획자" },
] as const;

/** 가입 폼 입력값 스키마 */
export const signUpSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상 입력하세요."),
  email: z.email("올바른 이메일 형식이 아닙니다."),
  role: z.enum(["developer", "designer", "pm"], { error: "역할을 선택하세요." }),
  introduction: z.string().max(200, "소개는 200자 이내로 입력하세요.").optional(),
  agreed: z.literal(true, { error: "약관에 동의해야 합니다." }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
