import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

/** 헤더 내비게이션 항목 정의 */
const navItems = [
  { to: "/", labelKey: "nav.home" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/examples/query", labelKey: "nav.query" },
  { to: "/examples/store", labelKey: "nav.store" },
  { to: "/examples/form", labelKey: "nav.form" },
  { to: "/dashboard", labelKey: "nav.dashboard" },
] as const;

/**
 * 전역 헤더 내비게이션
 * 현재 경로와 일치하는 링크에 활성 스타일을 적용한다
 */
export function Header() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  /** 로그아웃 후 홈으로 이동한다 */
  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <header className="border-border border-b bg-background">
      <nav className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <span className="font-semibold text-sm">{t("common.appName")}</span>
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              {t("common.logout")}
            </Button>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">{t("common.login")}</Link>
            </Button>
          )}
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
