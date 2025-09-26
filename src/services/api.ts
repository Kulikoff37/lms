import type { IQuestionServer, IResponce, ISubject, ITestingServer } from '@/types/questions';
import { API_URL, URL_PART } from './urls';

export const fetchQuestions = async (): Promise<IResponce<IQuestionServer[]>> => {
  const res = await fetch(`${API_URL}${URL_PART.GET_ITEMS}`);
  return res.json();
}

export const fetchTesting = async (): Promise<IResponce<ITestingServer>> => {
  const res = await fetch(`${API_URL}${URL_PART.GET_TEST}`);
  return res.json();
}

export const fetchSubjects = async (): Promise<IResponce<ISubject[]>> => {
  const res = await fetch(`${API_URL}${URL_PART.GET_SUBJECTS}`);
  return res.json();
}
