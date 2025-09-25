import { IQuestion, IQuestionServer } from "./questions"

export type EditorState = {
  questions: IQuestion[]
  isEditModalOpen: boolean
  selectedQuestion: IQuestionServer | null
  isAddModalOpen: boolean
}

export type EditorActions = {
  getQuestions: () => void
  openEditModal: (question: IQuestionServer) => void
  closeEditModal: () => void
  updateQuestion: (updated: IQuestionServer) => void
  openAddModal: () => void
  closeAddModal: () => void
  addQuestion: (question: IQuestionServer) => void
}

export type EditorStore = EditorState & EditorActions
