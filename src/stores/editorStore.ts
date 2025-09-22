import { fetchQuestions } from '@/services/api'
import { EditorState, EditorStore } from '@/types/editor'
import { createStore } from 'zustand'
import { mapQuestions } from './mapper/mapQuestions'

export const defaultInitState: EditorState = {
  questions: [],
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
    }    
  }))
}
