'use client'

import { List } from "./List"
import { useEffect } from "react"
import { Modal, Button, Space } from "antd"
import { useEditorStore } from "@/providers/editorStoreProvider"
import { EditorQuestionForm } from "./question/EditorQuestionForm"
import { NewQuestionForm } from "./question/NewQuestionForm"

export const QuestionRepositiry: React.FC = () => {
  const { getQuestions, getSubjects, isEditModalOpen, selectedQuestion, closeEditModal, isAddModalOpen, openAddModal, closeAddModal } = useEditorStore((state) => state)
  useEffect(() => {
    getQuestions()
    getSubjects()
  }, [getQuestions, getSubjects])
  
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openAddModal}>Добавить вопрос</Button>
      </Space>
      <List />
      <Modal
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={null}
        width={720}
        destroyOnHidden
        title="Редактирование вопроса"
      >
        {selectedQuestion && (
          <EditorQuestionForm question={selectedQuestion} />
        )}
      </Modal>
      <Modal
        open={isAddModalOpen}
        onCancel={closeAddModal}
        footer={null}
        width={720}
        destroyOnHidden
        title="Добавить вопрос"
      >
        <NewQuestionForm />
      </Modal>
    </>
  )
}
