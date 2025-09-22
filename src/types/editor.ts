import { IQuestion } from "./questions"

export type EditorState = {
  questions: IQuestion[]
}

export type EditorActions = {
  getQuestions: () => void
}

export type EditorStore = EditorState & EditorActions
