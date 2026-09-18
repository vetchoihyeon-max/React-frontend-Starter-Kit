import i18next, { type ParseKeys } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en.json";
import ko from "@/locales/ko.json";

/** 지원하는 언어 목록 */
export const supportedLanguages = ["ko", "en"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

/** ko.json에 실제로 존재하는 번역 키만 허용하는 타입 */
export type TranslationKey = ParseKeys;

/**
 * 임의의 문자열이 번역 키인지 확인한다
 * zod 스키마는 메시지를 일반 문자열로 담기 때문에 화면에서 좁혀 써야 한다
 * @param value 확인할 문자열
 */
export function isTranslationKey(value: string): value is TranslationKey {
  return i18next.exists(value);
}

/** 언어 선택을 저장할 localStorage 키 */
export const LANGUAGE_STORAGE_KEY = "app-language";

const resources = {
  ko: { translation: ko },
  en: { translation: en },
};

/**
 * i18next를 초기화한다
 * 저장된 선택이 없으면 브라우저 언어를 따르고, 지원하지 않는 언어면 한국어를 사용한다
 * @param language 감지를 건너뛰고 고정할 언어. 테스트에서 결과를 일정하게 만들 때 사용한다
 */
export function initI18n(language?: SupportedLanguage) {
  return i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: "ko",
      supportedLngs: supportedLanguages,
      // ko-KR 같은 지역 코드를 ko로 정규화한다
      load: "languageOnly",
      detection: {
        order: ["localStorage", "navigator"],
        lookupLocalStorage: LANGUAGE_STORAGE_KEY,
        caches: ["localStorage"],
      },
      interpolation: {
        // React가 이미 이스케이프하므로 중복 처리하지 않는다
        escapeValue: false,
      },
    });
}

/**
 * html 요소의 lang 속성을 현재 언어와 동기화한다
 * 스크린 리더와 검색 엔진이 문서 언어를 올바르게 인식하게 한다
 */
export function syncDocumentLanguage() {
  const apply = (language: string) => {
    document.documentElement.lang = language;
  };

  apply(i18next.resolvedLanguage ?? "ko");
  i18next.on("languageChanged", apply);
}

export { i18next };
