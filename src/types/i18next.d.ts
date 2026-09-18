import type ko from "@/locales/ko.json";

// 번역 키를 자동완성하고 오타를 타입 오류로 잡는다
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof ko;
    };
  }
}
