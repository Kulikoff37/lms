import { createQuestion, fetchQuestions, fetchSubjects, fetchSections } from '@/services/api'
import { EditorState, EditorStore } from '@/types/editor'
import { IQuestionServer } from '@/types/questions'
import { createStore } from 'zustand'
import { mapQuestions } from './mapper/mapQuestions'

export const defaultInitState: EditorState = {
  questions: [],
  subjects: [],
  sections: [],
  isEditModalOpen: false,
  selectedQuestion: null,
  isAddModalOpen: false,
  selectedQuestionIds: [],
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
    getSections: async () => {
      try {
        const response = await fetchSections();
        if (response) {
          set({ sections: response?.data })
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching sections:', error.message);
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
    addQuestion: async (question: IQuestionServer) => {
      try {
        const response = await createQuestion(question);
        if (response) {
          const newQuestion = mapQuestions([response.data])[0];
          set((state) => ({
            questions: [...state.questions, newQuestion],
            isAddModalOpen: false,
          }));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error creating question:', error.message);
        }
      }
    },
    setSelectedQuestionIds: (ids) => set({ selectedQuestionIds: ids }),
    toggleQuestionSelection: (id) => set((state) => {
      const currentIds = state.selectedQuestionIds;
      if (currentIds.includes(id)) {
        return { selectedQuestionIds: currentIds.filter(item => item !== id) };
      } else {
        return { selectedQuestionIds: [...currentIds, id] };
      }
    }),
  }))
}
