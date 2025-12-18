'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Card, Typography, Form, Input, Space, Button, Select } from 'antd'
import { useEditorStore } from '@/providers/editorStoreProvider'
import { IQuestionServer } from '@/types/questions'
import { v4 as uuidv4 } from 'uuid'

export const NewQuestionForm: React.FC = () => {
  const { addQuestion, closeAddModal, subjects, sections, getSubjects, getSections } = useEditorStore((s) => s)
  const [type, setType] = useState<'single' | 'multiple'>('single')
  const [questionText, setQuestionText] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [options, setOptions] = useState<string[]>(['', ''])
  const [answer, setAnswer] = useState<string>('0')
  const [answersMultiple, setAnswersMultiple] = useState<string>('')
  const [subjectId, setSubjectId] = useState('')
  const [sectionId, setSectionId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const canSave = useMemo(() => {
    const hasText = questionText.trim().length > 0
    const filledOptions = options.filter(o => o.trim().length > 0)
    if (filledOptions.length < 2) return false
    if (type === 'single') return hasText && /^\d+$/.test(answer)
    // multiple
    return hasText && (answersMultiple.trim() === '' || /^(\s*\d+\s*)(,\s*\d+\s*)*$/.test(answersMultiple.trim()))
  }, [questionText, options, type, answer, answersMultiple])

  const onAddOption = () => setOptions(prev => [...prev, ''])
  const onChangeOption = (idx: number, val: string) => setOptions(prev => prev.map((o, i) => i === idx ? val : o))

  const handleSave = async () => {
    setLoading(true)
    setError(null)

    try {
      const id = uuidv4()
      const selectedSubject = subjects.find((s) => s.id === subjectId)
      const payload = type === 'single'
        ? {
            text: JSON.stringify({
              text: questionText,
              options: options.map(o => ({ text: o })),
              answer: Number(answer),
              imageUrl: imageURL ? imageURL : undefined
            }),
          }
        : {
            text: JSON.stringify({
              text: questionText,
              options: options.map(o => ({ text: o })),
              answer: answersMultiple
                .split(',')
                .map(s => s.trim())
                .filter(Boolean)
                .map(Number),
              imageUrl: type === 'single' && imageURL ? imageURL : undefined
            }),
          }

      const newQuestion: IQuestionServer = {
        id,
        text: payload.text,
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
            options={[{ value: 'single', label: 'Один ответ' }, { value: 'multiple', label: 'Несколько ответов' }]}
            onChange={(v) => setType(v)}
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
          <Input.TextArea value={questionText} onChange={(e) => setQuestionText(e.target.value)} rows={3} />
        </Form.Item>
        {type === 'single' && (
          <Form.Item label="Ссылка на изображение">
            <Input
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </Form.Item>
        )}
        <Form.Item label="Варианты ответа">
          <Space direction="vertical" style={{ width: '100%' }}>
            {options.map((opt, idx) => (
              <Input key={idx} value={opt} onChange={(e) => onChangeOption(idx, e.target.value)} />
            ))}
            <Button onClick={onAddOption}>Добавить вариант</Button>
          </Space>
        </Form.Item>
        {type === 'single' ? (
          <Form.Item label={'Индекс верного ответа'}>
            <Input value={answer} onChange={(e) => setAnswer(e.target.value)} />
          </Form.Item>
        ) : (
          <Form.Item label={'Индексы верных ответов (через запятую)'}>
            <Input value={answersMultiple} onChange={(e) => setAnswersMultiple(e.target.value)} />
          </Form.Item>
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




