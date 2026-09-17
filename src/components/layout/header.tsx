import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/layout/theme-toggle";

/** 헤더 내비게이션 항목 정의 */
const navItems = [
  { to: "/", label: "홈" },
  { to: "/about", label: "소개" },
  { to: "/examples/query", label: "서버 상태" },
  { to: "/examples/store", label: "클라이언트 상태" },
  { to: "/examples/form", label: "폼" },
] as const;

/**
 * 전역 헤더 내비게이션
 * 현재 경로와 일치하는 링크에 활성 스타일을 적용한다
 */
export function Header() {
  return (
    <header className="border-border border-b bg-background">
      <nav className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <span className="font-semibold text-sm">React Starter Kit</span>
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="text-muted-foreground text-sm transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
