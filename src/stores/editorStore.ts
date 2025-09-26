import { fetchQuestions, fetchSubjects } from '@/services/api'
import { EditorState, EditorStore } from '@/types/editor'
import { createStore } from 'zustand'
import { mapQuestions } from './mapper/mapQuestions'

export const defaultInitState: EditorState = {
  questions: [],
  subjects: [],
  isEditModalOpen: false,
  selectedQuestion: null,
  isAddModalOpen: false,
}

export const createEditorStore = (
  initState: EditorState = defaultInitState,
) => {
  return createStore<EditorStore>()((set) => ({
    ...initState,
    getQuestions: async () => {
      try {
        const response = await fetchQuestions();
        if (response) {
          set({ questions: mapQuestions(response?.data) })
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching questions:', error.message);
        }
      }
    },
    getSubjects: async () => {
      try {
        const response = await fetchSubjects();
        if (response) {
          set({ subjects: response?.data })
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching questions:', error.message);
        }
      } 
    },
    openEditModal: (question) => set({ isEditModalOpen: true, selectedQuestion: question }),
    closeEditModal: () => set({ isEditModalOpen: false }),
    updateQuestion: (updated) => set(() => ({
      selectedQuestion: updated,
    })),
    openAddModal: () => set({ isAddModalOpen: true }),
    closeAddModal: () => set({ isAddModalOpen: false }),
    addQuestion: (question) => set((state) => ({
      questions: [
        ...state.questions,
        {
          key: question.id,
          text: question.text,
          subject: question.subject?.name || question.subjectId,
          type: question.type,
          section: question.section,
        },
      ],
      isAddModalOpen: false,
    })),
  }))
}
