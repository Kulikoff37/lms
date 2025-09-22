export type Single = {
  text: string
  options: { text: string }[]
  answer: number
}

export type Multiple = {
  text: string
  options: { text: string }[]
  answer: number[]
}

function isSingle(value: any): value is Single {
  return (
    value &&
    typeof value.text === 'string' &&
    Array.isArray(value.options) &&
    value.options.every((o: any) => o && typeof o.text === 'string') &&
    typeof value.answer === 'number'
  )
}

function isMultiple(value: any): value is Multiple {
  return (
    value &&
    typeof value.text === 'string' &&
    Array.isArray(value.options) &&
    value.options.every((o: any) => o && typeof o.text === 'string') &&
    Array.isArray(value.answer) &&
    value.answer.every((n: any) => typeof n === 'number')
  )
}

function stripWrappingQuotes(raw: string): string {
  if (!raw) return raw
  const trimmed = raw.trim()
  const starts = trimmed.startsWith('"') || trimmed.startsWith("'")
  const ends = trimmed.endsWith('"') || trimmed.endsWith("'")
  if (starts && ends && trimmed.length >= 2) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

export function parseSingle(text: string | null | undefined): Single | Multiple | null {
  if (!text) return null

  // First attempt: raw text
  let attempt: any = null
  try {
    attempt = JSON.parse(text)
  } catch (_) {
    // Second attempt: strip wrapping quotes and parse
    try {
      const unwrapped = stripWrappingQuotes(text)
      attempt = JSON.parse(unwrapped)
    } catch (_) {
      return null
    }
  }

  // If parsed value is still a string (double-encoded), parse again
  if (typeof attempt === 'string') {
    try {
      attempt = JSON.parse(attempt)
    } catch (_) {
      return null
    }
  }

  if (isSingle(attempt) || isMultiple(attempt)) return attempt
  return null
}


