import { ISingle, IMultiple } from "@/types/questions";
import { stripWrappingQuotes } from "@/utils/string";

function isISingle(value: unknown): value is ISingle {
  return (
    typeof value === "object" &&
    value !== null &&
    "text" in value &&
    typeof (value as Record<string, unknown>).text === "string" &&
    "options" in value &&
    Array.isArray((value as Record<string, unknown>).options) &&
    (value as Record<string, unknown>).options.every(
      (o: unknown): o is { text: string } =>
        typeof o === "object" &&
        o !== null &&
        "text" in o &&
        typeof (o as Record<string, unknown>).text === "string"
    ) &&
    "answer" in value &&
    typeof (value as Record<string, unknown>).answer === "number"
  );
}

function isIMultiple(value: unknown): value is IMultiple {
  return (
    typeof value === "object" &&
    value !== null &&
    "text" in value &&
    typeof (value as Record<string, unknown>).text === "string" &&
    "options" in value &&
    Array.isArray((value as Record<string, unknown>).options) &&
    (value as Record<string, unknown>).options.every(
      (o: unknown): o is { text: string } =>
        typeof o === "object" &&
        o !== null &&
        "text" in o &&
        typeof (o as Record<string, unknown>).text === "string"
    ) &&
    "answer" in value &&
    Array.isArray((value as Record<string, unknown>).answer) &&
    (value as Record<string, unknown>).answer.every(
      (n: unknown): n is number => typeof n === "number"
    )
  );
}



/**
 * Парсит текст вопроса в структуру ISingle или IMultiple
 */
export function parseSingle(text: string | ISingle | IMultiple | null | undefined): ISingle | IMultiple | null {
  if (!text) return null;

  let attempt: unknown = text;

  if (typeof text === 'string') {
    try {
      // Первый уровень парсинга
      attempt = JSON.parse(text);
    } catch (firstError) {
      // Если первый парсинг провалился, попробуем убрать кавычки
      try {
        const unwrapped = stripWrappingQuotes(text);
        attempt = JSON.parse(unwrapped);
      } catch (secondError) {
        return null;
      }
    }

    // Второй уровень: проверка, если результат - строка
    if (typeof attempt === "string") {
      try {
        attempt = JSON.parse(attempt);
      } catch (thirdError) {
        return null;
      }
    }
  }

  // Третий уровень: проверка типов
  if (isISingle(attempt)) return attempt;
  if (isIMultiple(attempt)) return attempt;
  return null;
}
