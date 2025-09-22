import { IQuestion, IQuestionServer } from "@/types/questions"

export const mapQuestions = (severData: IQuestionServer[]): IQuestion[] => {
  if (!severData && !Array.isArray(severData)) {
    return [];
  }
  return severData.map((item) => ({
      key: item.id,
      text: item.text,
      subject: item.subject.name,
      type: item.type,
      section: item.section
  }));
}
