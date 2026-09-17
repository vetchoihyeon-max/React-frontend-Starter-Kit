import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { roleOptions, type SignUpInput, signUpSchema } from "@/features/example/schemas";
import { logger } from "@/lib/logger";

export const Route = createFileRoute("/examples/form")({
  component: FormExamplePage,
});

/** 필드 하위에 표시되는 에러 메시지 */
function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-destructive text-sm">{message}</p>;
}

/** react-hook-form + zod 폼 예제 페이지 */
function FormExamplePage() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      introduction: "",
    },
  });

  /**
   * 폼 제출을 처리한다
   * @param values 검증을 통과한 입력값
   */
  const onSubmit = (values: SignUpInput) => {
    logger.debug("폼 제출 값", values);
    toast.success("제출이 완료되었습니다.", { description: `${values.name}님 환영합니다.` });
    reset();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">폼 예제</h1>
        <p className="text-muted-foreground text-sm">
          zod 스키마로 검증하고 react-hook-form으로 상태를 관리하는 패턴입니다.
        </p>
      </div>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>가입 정보</CardTitle>
          <CardDescription>모든 필수 항목을 입력해 주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" {...register("name")} />
              <FieldError message={errors.name?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              <FieldError message={errors.email?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="role">역할</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="역할을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.role?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="introduction">소개 (선택)</Label>
              <Textarea id="introduction" rows={3} {...register("introduction")} />
              <FieldError message={errors.introduction?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name="agreed"
                  render={({ field }) => (
                    <Checkbox
                      id="agreed"
                      checked={field.value === true}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  )}
                />
                <Label htmlFor="agreed">이용약관에 동의합니다.</Label>
              </div>
              <FieldError message={errors.agreed?.message} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              제출
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
