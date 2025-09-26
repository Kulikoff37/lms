'use client'

import { useStore } from 'zustand/react'
import { ReactNode, createContext, useRef, useContext } from 'react'
import { createTestingStore } from '@/stores/testingStore'
import { TestingStore } from '@/types/testing'

export type TestingStoreApi = ReturnType<typeof createTestingStore>

export const TestingStoreContext = createContext<TestingStoreApi | undefined>(
  undefined,
)

export interface TestingStoreProviderProps {
  children: ReactNode
}

export const TestingStoreProvider = ({
  children,
}: TestingStoreProviderProps) => {
  const storeRef = useRef<TestingStoreApi | null>(null)

  if (!storeRef.current) {
    storeRef.current = createTestingStore()
  }

  return (
    <TestingStoreContext.Provider value={storeRef.current}>
      {children}
    </TestingStoreContext.Provider>
  )
}

export const useTestingStore = <T,>(
  selector: (store: TestingStore) => T
): T => {
  const testingStoreContext = useContext(TestingStoreContext)

  if (!testingStoreContext) {
    throw new Error(
      'useTestingStore должен использоваться внутри TestingStoreProvider'
    )
  }

  return useStore(testingStoreContext, selector)
}


