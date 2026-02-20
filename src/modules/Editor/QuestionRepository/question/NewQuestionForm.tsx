'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Card, Typography, Form, Input, Space, Button, Select } from 'antd'
import { useEditorStore } from '@/providers/editorStoreProvider'
import { IQuestionServer, ISingle, IMultiple, ICorrespondence, TQuestionType } from '@/types/questions'
import { v4 as uuidv4 } from 'uuid'
import { SingleQuestionForm } from './SingleQuestionForm'
import { MultipleQuestionForm } from './MultipleQuestionForm'
import { CorrespondenceQuestionForm } from './CorrespondenceQuestionForm'

export const NewQuestionForm: React.FC = () => {
  const { addQuestion, closeAddModal, subjects, sections, getSubjects, getSections } = useEditorStore((s) => s)
  const [type, setType] = useState<TQuestionType>('single')
  const [questionText, setQuestionText] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [sectionId, setSectionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // State for different question types
  const [singleData, setSingleData] = useState<ISingle>({
    text: '',
    options: [{ text: '' }, { text: '' }],
    answer: 0
  })

  const [multipleData, setMultipleData] = useState<IMultiple>({
    text: '',
    options: [{ text: '' }, { text: '' }],
    answer: []
  })

  const [correspondenceData, setCorrespondenceData] = useState<ICorrespondence>({
    text: '',
    source: ['', ''],
    recipient: ['', ''],
    answer: []
  })

  useEffect(() => {
    if (!subjects || subjects.length === 0) {
      getSubjects()
    }
    if (!sections || sections.length === 0) {
      getSections()
    }
  }, [subjects, sections, getSubjects, getSections])

  useEffect(() => {
    if (!subjectId && subjects && subjects.length > 0) {
      setSubjectId(subjects[0].id)
    }
  }, [subjects, subjectId])

  useEffect(() => {
    if (!sectionId && sections && sections.length > 0) {
      setSectionId(sections[0].id)
    }
  }, [sections, sectionId])

  // Update text in all question data when questionText changes
  useEffect(() => {
    setSingleData(prev => ({ ...prev, text: questionText }))
    setMultipleData(prev => ({ ...prev, text: questionText }))
    setCorrespondenceData(prev => ({ ...prev, text: questionText }))
  }, [questionText])

  const canSave = useMemo(() => {
    const hasText = questionText.trim().length > 0

    switch (type) {
      case 'single':
        return hasText && singleData.options.filter(o => o.text.trim().length > 0).length >= 2
      case 'multiple':
        return hasText && multipleData.options.filter(o => o.text.trim().length > 0).length >= 2
      case 'correspondence':
        const hasSources = correspondenceData.source.filter(s => s.trim().length > 0).length > 0
        const hasRecipients = correspondenceData.recipient.filter(r => r.trim().length > 0).length > 0
        return hasText && hasSources && hasRecipients
      default:
        return false
    }
  }, [questionText, type, singleData, multipleData, correspondenceData])

  const handleSave = async () => {
    setLoading(true)
    setError(null)

    try {
      const id = uuidv4()
      const selectedSubject = subjects.find((s) => s.id === subjectId)

      let questionTextData;
      switch (type) {
        case 'single':
          questionTextData = JSON.stringify(singleData)
          break
        case 'multiple':
          questionTextData = JSON.stringify(multipleData)
          break
        case 'correspondence':
          questionTextData = JSON.stringify(correspondenceData)
          break
        default:
          throw new Error(`Unsupported question type: ${type}`)
      }

      const newQuestion: IQuestionServer = {
        id,
        text: questionTextData,
        subjectId: selectedSubject?.id || subjectId || 'subject',
        type,
        sectionId: sectionId,
        subject: selectedSubject ?? { id: subjectId || 'subject', name: 'Предмет', label: 'Предмет' },
      }

      await addQuestion(newQuestion)
      closeAddModal()
    } catch (err) {
      setError('Ошибка при сохранении вопроса. Попробуйте снова.')
      console.error('Error saving question:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <Form layout="vertical">
        <Form.Item label="Тип вопроса">
          <Select
            value={type}
            options={[
              { value: 'single', label: 'Один ответ' },
              { value: 'multiple', label: 'Несколько ответов' },
              { value: 'correspondence', label: 'Соответствие' }
            ]}
            onChange={(v) => setType(v as TQuestionType)}
          />
        </Form.Item>
        <Form.Item label="Предмет">
          <Select
            value={subjectId}
            options={(subjects || []).map((s) => ({ value: s.id, label: s.label }))}
            onChange={(v) => setSubjectId(v)}
            placeholder="Выберите предмет"
          />
        </Form.Item>
        <Form.Item label="Раздел">
          <Select
            value={sectionId}
            options={(sections || []).map((s) => ({ value: s.id, label: s.sectionId }))}
            onChange={(v) => setSectionId(v)}
            placeholder="Выберите раздел"
          />
        </Form.Item>
        <Form.Item label="Текст вопроса">
          <Input.TextArea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={3}
          />
        </Form.Item>

        {type === 'single' && (
          <SingleQuestionForm
            questionData={singleData}
            onChange={setSingleData}
          />
        )}

        {type === 'multiple' && (
          <MultipleQuestionForm
            questionData={multipleData}
            onChange={setMultipleData}
          />
        )}

        {type === 'correspondence' && (
          <CorrespondenceQuestionForm
            questionData={correspondenceData}
            onChange={setCorrespondenceData}
          />
        )}

        <Space direction="vertical" style={{ width: '100%' }}>
          {error && (
            <Typography.Text type="danger">{error}</Typography.Text>
          )}
          <Space>
            <Button
              type="primary"
              disabled={!canSave || loading}
              onClick={handleSave}
              loading={loading}
            >
              Сохранить
            </Button>
            <Button onClick={closeAddModal} disabled={loading}>
              Отмена
            </Button>
          </Space>
        </Space>
      </Form>
    </Card>
  )
}




