import React from 'react'
import { Checkbox, Space } from 'antd'
import { IMultiple, IQuestionServer } from '@/types/questions'
import { useTestingStore } from '@/providers/testingStoreProvider'
import { useShallow } from 'zustand/react/shallow'

type Props = {
  question: IQuestionServer
  parsedQuestion: IMultiple
}

export const MultipleChoiceQuestion: React.FC<Props> = ({ question, parsedQuestion }) => {
  const { selectAnswer, selected, completed } = useTestingStore(
    useShallow(s => ({
      selectAnswer: s.selectAnswer,
      selected: s.answersByQuestionId[question.id],
      completed: s.completed,
    }))
  )

  return (
    <Space direction="vertical">
      <Checkbox.Group
        onChange={(vals) => selectAnswer(question.id, vals as number[])}
        value={Array.isArray(selected) ? selected : []}
        disabled={completed}
      >
        <Space direction="vertical">
          {parsedQuestion.options.map((o, i) => {
            const isCorrect = parsedQuestion.answer.includes(i)
            const isSelected = Array.isArray(selected) && selected.includes(i)
            const color = completed && isSelected && !isCorrect ? 'red' : completed && isCorrect ? 'green' : undefined
            const style = completed && isCorrect ? { textDecoration: 'underline', textDecorationColor: 'green' } : undefined
            return (
              <Checkbox key={i} value={i} style={{ color, ...(style ?? {}) }}>
                {o.text}
              </Checkbox>
            )
          })}
        </Space>
      </Checkbox.Group>
    </Space>
  )
}
