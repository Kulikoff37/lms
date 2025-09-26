import { IQuestion, IQuestionServer } from "@/types/questions"
import { stripWrappingQuotes } from "@/utils/string"

const mapTetxt = (text: string): string => {
  const json = stripWrappingQuotes(text)
  return JSON.parse(json)?.text || ''
}

export const mapQuestions = (severData: IQuestionServer[]): IQuestion[] => {
  if (!severData && !Array.isArray(severData)) {
    return [];
  }
  return severData.map((item) => ({
      key: item.id,
      text: item.text,
      content: mapTetxt(item.text),
      subject: item.subject.name,
      type: item.type,
      section: item.section
  }));
}
