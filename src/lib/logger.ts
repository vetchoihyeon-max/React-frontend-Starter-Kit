/** 로그 레벨 정의 */
type LogLevel = "debug" | "info" | "warn" | "error";

/** 레벨별 우선순위 (낮을수록 상세) */
const levelPriority: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

/** 개발 모드에서는 debug부터, 프로덕션에서는 warn부터 출력한다 */
const minLevel: LogLevel = import.meta.env.DEV ? "debug" : "warn";

/**
 * 해당 레벨의 로그를 출력해야 하는지 판단한다
 * @param level 확인할 로그 레벨
 */
function shouldLog(level: LogLevel) {
  return levelPriority[level] >= levelPriority[minLevel];
}

/**
 * 실제 출력을 수행한다
 * @param level 로그 레벨
 * @param args 출력할 값 목록
 */
function write(level: LogLevel, args: unknown[]) {
  if (!shouldLog(level)) {
    return;
  }

  const prefix = `[${level.toUpperCase()}]`;

  switch (level) {
    case "error":
      console.error(prefix, ...args);
      break;
    case "warn":
      console.warn(prefix, ...args);
      break;
    case "info":
      console.info(prefix, ...args);
      break;
    default:
      console.debug(prefix, ...args);
  }
}

/**
 * 애플리케이션 공용 로거
 * console을 직접 호출하지 말고 이 로거를 사용한다
 */
export const logger = {
  debug: (...args: unknown[]) => write("debug", args),
  info: (...args: unknown[]) => write("info", args),
  warn: (...args: unknown[]) => write("warn", args),
  error: (...args: unknown[]) => write("error", args),
};
