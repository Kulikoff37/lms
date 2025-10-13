import type { IQuestion, IQuestionServer, IQuestionText } from "@/types/questions"

const parseTextContent = (text: string | IQuestionText): string => {
  if (typeof text === 'string') {
    return text;
  }
  return JSON.stringify(text);
}

export const mapQuestions = (serverData: IQuestionServer[]): IQuestion[] => {
  if (!serverData || !Array.isArray(serverData)) {
    return [];
  }
  return serverData.map((item) => {
    const parsedText = typeof item.text === 'string' ? JSON.parse(item.text) as IQuestionText : item.text;
    return {
      key: item.id,
      text: parsedText.text,
      content: parseTextContent(item.text),
      subject: item.subjectId,
      type: item.type,
      section: item.sectionId,
      options: parsedText.options.map(option => option.text),
      answer: parsedText.answer
    };
  });
}
