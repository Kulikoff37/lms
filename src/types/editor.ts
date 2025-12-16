import type { IQuestion, IQuestionServer, ISubject, ISection } from "./questions"

export type EditorState = {
  questions: IQuestion[]
  serverQuestions: IQuestionServer[]
  subjects: ISubject[]
  sections: ISection[]
  isEditModalOpen: boolean
  selectedQuestion: IQuestionServer | null
  isAddModalOpen: boolean
  selectedQuestionIds: string[]
}

export type EditorActions = {
  getQuestions: () => void
  getSubjects: () => void
  getSections: () => void
  openEditModal: (question: IQuestionServer) => void
  closeEditModal: () => void
  updateQuestion: (updated: IQuestionServer) => void
  openAddModal: () => void
  closeAddModal: () => void
  addQuestion: (question: IQuestionServer) => void
  setSelectedQuestionIds: (ids: string[]) => void
  deleteQuestion: (id: string) => Promise<any>
  toggleQuestionSelection: (id: string) => void
}

export type EditorStore = EditorState & EditorActions
