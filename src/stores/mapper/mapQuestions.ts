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
    let parsedText: IQuestionText = { text: '', options: [], answer: 0 };
    let originalTextString: string = '';

    if (typeof item.text === 'string') {
      originalTextString = item.text;
      try {
        parsedText = JSON.parse(item.text) as IQuestionText;
      } catch (e) {
        console.error('Error parsing text for question:', item.id, e);
        parsedText = { text: item.text, options: [], answer: 0 };
      }
    } else {
      // If item.text is already an object, stringify it for later use
      originalTextString = JSON.stringify(item.text);
      parsedText = item.text;
    }

    return {
      key: item.id,
      text: parsedText.text,
      content: parseTextContent(item.text),
      subject: item.subjectId,
      type: item.type,
      section: item.sectionId,
      options: parsedText.options ? parsedText.options.map(option => option.text) : [],
      answer: parsedText.answer
    };
  });
}
