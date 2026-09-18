import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
import { isTranslationKey } from "@/lib/i18n";
import { logger } from "@/lib/logger";

export const Route = createFileRoute("/examples/form")({
  component: FormExamplePage,
});

/**
 * 필드 하위에 표시되는 에러 메시지
 * 스키마가 담아둔 번역 키를 현재 언어로 바꿔 보여준다
 */
function FieldError({ messageKey }: { messageKey?: string }) {
  const { t } = useTranslation();

  if (!messageKey) {
    return null;
  }

  // 등록되지 않은 키라면 원문을 그대로 보여준다
  const message = isTranslationKey(messageKey) ? t(messageKey) : messageKey;

  return <p className="text-destructive text-sm">{message}</p>;
}

/** react-hook-form + zod 폼 예제 페이지 */
function FormExamplePage() {
  const { t } = useTranslation();
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
    toast.success(t("formExample.successTitle"), {
      description: t("formExample.successDescription", { name: values.name }),
    });
    reset();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">{t("formExample.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("formExample.description")}</p>
      </div>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>{t("formExample.cardTitle")}</CardTitle>
          <CardDescription>{t("formExample.cardDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{t("formExample.name")}</Label>
              <Input
                id="name"
                placeholder={t("formExample.namePlaceholder")}
                {...register("name")}
              />
              <FieldError messageKey={errors.name?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("formExample.email")}</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              <FieldError messageKey={errors.email?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="role">{t("formExample.role")}</Label>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder={t("formExample.rolePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {t(option.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError messageKey={errors.role?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="introduction">{t("formExample.introduction")}</Label>
              <Textarea id="introduction" rows={3} {...register("introduction")} />
              <FieldError messageKey={errors.introduction?.message} />
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
                <Label htmlFor="agreed">{t("formExample.agreed")}</Label>
              </div>
              <FieldError messageKey={errors.agreed?.message} />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {t("common.submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
