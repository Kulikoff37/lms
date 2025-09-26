import { fetchTesting } from '@/services/api'
import { IQuestionServer } from '@/types/questions'
import { parseSingle } from '@/modules/Testing/parseSingle'
import { TestingState, TestingStore } from '@/types/testing'
import { createStore } from 'zustand'

export const defaultInitState: TestingState = {
  testing: null,
  currentIndex: 0,
  answersByQuestionId: {},
  completed: false,
  score: 0,
}

export const createTestingStore = (
  initState: TestingState = defaultInitState,
) => {
  return createStore<TestingStore>()((set, get) => ({
    ...initState,
    getTesting: async () => {
      try {
        const response = await fetchTesting();
        if (response) {
          set({ testing: response.data, currentIndex: 0, answersByQuestionId: {}, completed: false, score: 0 })
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching testing:', error.message);
        }
      }
    },
    selectAnswer: (questionId, optionIndex) => {
      const state = get()
      const previous = state.answersByQuestionId
      const nextAnswers = { ...previous, [questionId]: optionIndex }
      set({ answersByQuestionId: nextAnswers })
    },
    checkResults: () => {
      const state = get()
      const questions: IQuestionServer[] = state.testing?.questions ?? []
      const answers = state.answersByQuestionId
      const answeredCount = questions.filter(q => answers[q.id] !== undefined && (Array.isArray(answers[q.id]) ? (answers[q.id] as number[]).length > 0 : true)).length
      if (questions.length === 0 || answeredCount !== questions.length) {
        return
      }
      let score = 0
      for (const q of questions) {
        const parsed = parseSingle(q.text)
        const selected = answers[q.id]
        if (!parsed) continue
        if (Array.isArray(parsed.answer)) {
          if (Array.isArray(selected)) {
            const a = [...parsed.answer].sort((x, y) => x - y)
            const b = [...selected].sort((x, y) => x - y)
            const equal = a.length === b.length && a.every((v, i) => v === b[i])
            if (equal) score += 1
          }
        } else {
          if (!Array.isArray(selected) && selected === parsed.answer) score += 1
        }
      }
      set({ completed: true, score })
    },
    resetTesting: () => {
      set({ currentIndex: 0, answersByQuestionId: {}, completed: false, score: 0 })
    },
    goNext: () => {
      const state = get()
      const total = state.testing?.questions.length ?? 0
      const nextIndex = Math.min(state.currentIndex + 1, Math.max(total - 1, 0))
      set({ currentIndex: nextIndex })
    },
    goPrev: () => {
      const state = get()
      const prevIndex = Math.max(state.currentIndex - 1, 0)
      set({ currentIndex: prevIndex })
    }
  }))
}


