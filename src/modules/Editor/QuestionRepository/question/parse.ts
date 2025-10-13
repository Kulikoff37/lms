import { IMultiple, ISingle } from '@/types/questions'
import { parseSingle as testingParseSingle } from '@/modules/Testing/parseSingle'

export type ParsedQuestion = ISingle | IMultiple

type Parser = (text: string | null | undefined) => ParsedQuestion | null

const parsers: Record<string, Parser> = {
  single: testingParseSingle,
  multiple: testingParseSingle,
}

export function registryParseQuestion(type: string, text: string | null | undefined): ParsedQuestion | null {
  const parser = parsers[type]
  if (!parser) return null
  return parser(text)
}

export function registerParser(type: string, parser: Parser) {
  parsers[type] = parser
}



