import { ITestingServer, IQuestionServer } from "./questions"

// Server-side type for the TestVariant model based on Prisma schema
export interface ITestVariantServer {
  id: number
  title: string
  questions: string[] // Array of question IDs stored as strings
  createdAt: Date
  updatedAt: Date
}

// Extended type for API response that includes questions data
export interface ITestVariantWithQuestions {
  id: number
  title: string
  questions: IQuestionServer[] // Actual question objects
  variantId?: string // ID of the test variant if needed
}

export type TestingState = {
  testing: ITestingServer | null
  currentIndex: number
  answersByQuestionId: Record<string, number | number[]>
  completed: boolean
  score: number
}

export type TestingActions = {
  getTesting: (variantId?: number) => void
  selectAnswer: (questionId: string, selected: number | number[]) => void
  checkResults: () => void
  resetTesting: () => void
  goNext: () => void
  goPrev: () => void
}

export type TestingStore = TestingState & TestingActions
