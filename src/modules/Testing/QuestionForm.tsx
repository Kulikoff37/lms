'use client'

import React, { useMemo } from 'react'
import { Card, Typography, Form } from 'antd'
import { IMultiple, IQuestionServer, ISingle } from '@/types/questions'
import { parseSingle } from './parseSingle'
import { SingleChoiceQuestion } from './SingleChoiceQuestion'
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion'

type Props = {
  question: IQuestionServer
}

export const QuestionForm: React.FC<Props> = ({ question }) => {
  const single = useMemo(() => parseSingle(question.text), [question.text])

  if (!single) {
    return (
      <Card>
        <Typography.Text>Неверный формат вопроса</Typography.Text>
      </Card>
    )
  }

  const isMultiple = question.type === 'multiple'

  return (
    <Card>
      <Form layout="vertical">
        <Form.Item>
          {isMultiple ? (
            <MultipleChoiceQuestion 
              question={question} 
              parsedQuestion={single as IMultiple} 
            />
          ) : (
            <SingleChoiceQuestion 
              question={question} 
              parsedQuestion={single as ISingle} 
            />
          )}
        </Form.Item>
      </Form>
    </Card>
  )
}
