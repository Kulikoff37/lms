import type { IQuestion, IQuestionServer, ISubject } from "./questions"

export type EditorState = {
  questions: IQuestion[]
  subjects: ISubject[]
  isEditModalOpen: boolean
  selectedQuestion: IQuestionServer | null
  isAddModalOpen: boolean
}

export type EditorActions = {
  getQuestions: () => void
  getSubjects: () => void
  openEditModal: (question: IQuestionServer) => void
  closeEditModal: () => void
  updateQuestion: (updated: IQuestionServer) => void
  openAddModal: () => void
  closeAddModal: () => void
  addQuestion: (question: IQuestionServer) => void
}

export type EditorStore = EditorState & EditorActions
