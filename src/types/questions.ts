export interface IResponce<T> {
  data: T;
}

export interface IQuestion {
  key: string;
  text: string
  subject: string;
  type: string;
  section: string;
  content: string;
}

export interface IQuestionServer {
  id: string;
  text: string;
  subjectId: string;
  type: string;
  section: string;
  subject: ISubject;
} 

export interface ITestingServer {
  questions: IQuestionServer[];
  topic: string
}

export interface ISubject {
  id: string;
  name: string;
  label: string
}

export interface ISingle {
  text: string;
  options: { text: string }[];
  answer: number;
}

export interface IMultiple {
  text: string;
  options: { text: string }[];
  answer: number[]
}
