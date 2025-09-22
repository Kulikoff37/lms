'use client'

import { useStore } from 'zustand/react'
import { ReactNode, createContext, useRef, useContext, useCallback } from 'react'
import { createEditorStore } from '@/stores/editorStore'
import { EditorStore } from '@/types/editor'

export type EditorStoreApi = ReturnType<typeof createEditorStore>

export const EditorStoreContext = createContext<EditorStoreApi | undefined>(
  undefined,
)

export interface EditorStoreProviderProps {
  children: ReactNode
}

export const EditorStoreProvider = ({
  children,
}: EditorStoreProviderProps) => {
  const storeRef = useRef<EditorStoreApi | null>(null)

  if (!storeRef.current) {
    storeRef.current = createEditorStore()
  }

  return (
    <EditorStoreContext.Provider value={storeRef.current}>
      {children}
    </EditorStoreContext.Provider>
  )
}

export const useEditorStore = <T,>(
  selector: (store: EditorStore) => T
): T => {
  const editorStoreContext = useContext(EditorStoreContext)

  if (!editorStoreContext) {
    throw new Error(
      'useEditorStore должен использоваться внутри EditorStoreProvider'
    )
  }

  const stableSelector = useCallback(selector, [])
  return useStore(editorStoreContext, stableSelector)
}
