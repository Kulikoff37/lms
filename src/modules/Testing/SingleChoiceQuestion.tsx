import React from 'react'
import { Radio, Space } from 'antd'
import { IQuestionServer, ISingle } from '@/types/questions'
import { useTestingStore } from '@/providers/testingStoreProvider'
import { useShallow } from 'zustand/react/shallow'
import { QuestionImage } from '@/shared/components/QuestionImage'

type Props = {
  question: IQuestionServer
  parsedQuestion: ISingle
}

export const SingleChoiceQuestion: React.FC<Props> = ({ question, parsedQuestion }) => {
  const { selectAnswer, selected, completed } = useTestingStore(
    useShallow(s => ({
      selectAnswer: s.selectAnswer,
      selected: s.answersByQuestionId[question.id],
      completed: s.completed,
    }))
  )

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>
        <div>{parsedQuestion.text}</div>
        {parsedQuestion.imageUrl && <QuestionImage imageUrl={parsedQuestion.imageUrl} />}
      </div>

      <Radio.Group
        onChange={(e) => selectAnswer(question.id, e.target.value)}
        value={!Array.isArray(selected) ? selected : undefined}
        disabled={completed}
      >
        <Space direction="vertical">
          {parsedQuestion.options.map((opt, idx) => {
            const isCorrect = idx === parsedQuestion.answer
            const isSelected = selected === idx
            const color = completed && isSelected && !isCorrect ? 'red' : completed && isCorrect ? 'green' : undefined
            const style = completed && isCorrect ? { textDecoration: 'underline', textDecorationColor: 'green' } : undefined
            return (
              <Radio key={idx} value={idx} style={{ color, ...(style ?? {}) }}>
                {opt.text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </Space>
  )
}
