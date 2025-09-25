import React from 'react'
import { Checkbox } from 'antd'
import { IMultiple, IQuestionServer } from '@/types/questions'
import { useTestingStore } from '@/providers/testingStoreProvider'
import { useShallow } from 'zustand/react/shallow'

type Props = {
  question: IQuestionServer
  parsedQuestion: IMultiple
}

export const MultipleChoiceQuestion: React.FC<Props> = ({ question, parsedQuestion }) => {
  const { selectAnswer, selected } = useTestingStore(
    useShallow(s => ({
      selectAnswer: s.selectAnswer,
      selected: s.answersByQuestionId[question.id],
    }))
  )

  return (
    <Checkbox.Group
      options={parsedQuestion.options.map((o, i) => ({ label: o.text, value: i }))}
      onChange={(vals) => selectAnswer(question.id, vals as number[])}
      value={Array.isArray(selected) ? selected : []}
    />
  )
}
