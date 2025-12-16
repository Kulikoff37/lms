import type { IQuestionServer, IResponce, ISubject, ISection, ITestingServer } from '@/types/questions';
import { API_URL, URL_PART, headers } from './urls';

export const fetchQuestions = async (): Promise<IResponce<IQuestionServer[]>> => {
  const res = await fetch(`${API_URL}${URL_PART.GET_ITEMS}`);
  return res.json();
}

export const fetchTesting = async (variantId?: number): Promise<IResponce<ITestingServer>> => {
  const url = variantId ? `${API_URL}${URL_PART.GET_TEST}?variant=${variantId}` : `${API_URL}${URL_PART.GET_TEST}`;
  const res = await fetch(url);
  return res.json();
}

export const fetchSubjects = async (): Promise<IResponce<ISubject[]>> => {
  const res = await fetch(`${API_URL}${URL_PART.GET_SUBJECTS}`);
  return res.json();
}

export const fetchSections = async (): Promise<IResponce<ISection[]>> => {
  const res = await fetch(`${API_URL}${URL_PART.GET_SECTIONS}`);
  return res.json();
}

export const createQuestion = async (question: IQuestionServer): Promise<IResponce<IQuestionServer>> => {
  const res = await fetch(`${API_URL}${URL_PART.CREATE_QUESTION}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(question),
  });
  return res.json();
}

export const deleteQuestion = async (id: string): Promise<IResponce<any>> => {
  const res = await fetch(`${API_URL}${URL_PART.DELETE_QUESTION}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ id }),
  });
  return res.json();
}
