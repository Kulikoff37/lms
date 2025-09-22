import { ITestingServer } from "./questions"

export type TestingState = {
  testing: ITestingServer | null
  currentIndex: number
  answersByQuestionId: Record<string, number | number[]>
  completed: boolean
  score: number
}

export type TestingActions = {
  getTesting: () => void
  selectAnswer: (questionId: string, selected: number | number[]) => void
  goNext: () => void
  goPrev: () => void
}

export type TestingStore = TestingState & TestingActions
