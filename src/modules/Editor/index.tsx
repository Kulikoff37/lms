'use client'

import { useEditorStore } from "@/providers/editorStoreProvider"
import { List } from "./List"
import { useEffect } from "react"

export const Editor: React.FC = () => {
  const { getQuestions } = useEditorStore((state) => state)
  useEffect(() => {
    getQuestions()
  }, [getQuestions])
  
  return (
    <>
      <List />
    </>
  )
}
