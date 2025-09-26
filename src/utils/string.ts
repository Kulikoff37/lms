/**
 * Убирает кавычки с начала и конца строки
 */
export function stripWrappingQuotes(raw: string): string {
  if (!raw) return raw;
  const trimmed = raw.trim();
  const startsWithQuote =
    trimmed.startsWith('"') || trimmed.startsWith("'");
  const endsWithQuote =
    trimmed.endsWith('"') || trimmed.endsWith("'");
  
  if (startsWithQuote && endsWithQuote && trimmed.length >= 2) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}
