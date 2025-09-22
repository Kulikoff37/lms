'use client'

import { Card, Form, Radio, Typography, Checkbox } from 'antd'
import React, { useMemo } from 'react'
import { IQuestionServer } from '@/types/questions'
import { useTestingStore } from '@/providers/testingStoreProvider'
import { useShallow } from 'zustand/react/shallow'
import { parseSingle } from './parseSingle'

type Single = {
  text: string
  options: { text: string }[]
  answer: number
}

type Props = {
  question: IQuestionServer
}

export const QuestionForm: React.FC<Props> = ({ question }) => {
  const { selectAnswer, selected } = useTestingStore(useShallow(s => ({
    selectAnswer: s.selectAnswer,
    selected: s.answersByQuestionId[question.id],
  })))

  const single: Single | null = useMemo(() => parseSingle(question.text), [question.text])

  if (!single) {
    return (
      <Card>
        <Typography.Text>Неверный формат вопроса</Typography.Text>
      </Card>
    )
  }

  const isMultiple = Array.isArray(single.answer)

  return (
    <Card>
      <Typography.Paragraph>
        {single.text}
      </Typography.Paragraph>
      <Form layout="vertical">
        <Form.Item label="Варианты ответа">
          {isMultiple ? (
            <Checkbox.Group
              options={single.options.map((o, i) => ({ label: o.text, value: i }))}
              onChange={(vals) => selectAnswer(question.id, vals as number[])}
              value={Array.isArray(selected) ? selected : []}
            />
          ) : (
            <Radio.Group
              onChange={(e) => selectAnswer(question.id, e.target.value)}
              value={!Array.isArray(selected) ? selected : undefined}
            >
              {single.options.map((opt, idx) => (
                <Radio key={idx} value={idx}>{opt.text}</Radio>
              ))}
            </Radio.Group>
          )}
        </Form.Item>
      </Form>
    </Card>
  )
}


