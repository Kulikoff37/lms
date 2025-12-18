import type { JsonValue } from "@prisma/client/runtime/binary";

export interface IResponce<T> {
  data: T;
}

export interface IQuestion {
  key: string;
  text: string;
  subject: string;
  type: TQuestionType;
  section: string;
  content: string;
  options?: string[];
  answer?: number | number[];
}

export interface IQuestionServer {
  id: string;
  text: JsonValue;
  subjectId: string | null;
  type: string;
  sectionId: string | null;
}

export interface IQuestionText {
  text: string;
  options: { text: string }[];
  answer: number | number[];
}

export interface ITestingServer {
  questions: IQuestionServer[];
  topic: string;
}

export interface ISubject {
  id: string;
  name: string;
  label: string
}

export interface ISection {
  id: string;
  name: string;
  sectionId: string;
}

export interface ISingle {
  text: string;
  options: { text: string }[];
  answer: number;
  imageUrl?: string;
}

export interface IMultiple {
  text: string;
  options: { text: string }[];
  answer: number[]
  imageUrl?: string;
}

export type TQuestionType = 'single' | 'multiple';