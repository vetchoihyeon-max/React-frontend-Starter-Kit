import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type SupportedLanguage, supportedLanguages } from "@/lib/i18n";

/**
 * 언어 전환 버튼
 * 선택한 언어는 i18next의 localStorage 캐시에 저장된다
 */
export function LanguageToggle() {
  const { t, i18n } = useTranslation();

  /**
   * 언어를 변경한다
   * @param language 선택한 언어 코드
   */
  const handleSelect = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("language.change")}>
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => handleSelect(language)}
            className={i18n.resolvedLanguage === language ? "bg-accent" : undefined}
          >
            {t(`language.${language}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
