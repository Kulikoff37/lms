import React from 'react'
import { Radio, Space } from 'antd'
import { IQuestionServer, ISingle } from '@/types/questions'
import { useTestingStore } from '@/providers/testingStoreProvider'
import { useShallow } from 'zustand/react/shallow'

type Props = {
  question: IQuestionServer
  parsedQuestion: ISingle
}

export const SingleChoiceQuestion: React.FC<Props> = ({ question, parsedQuestion }) => {
  const { selectAnswer, selected } = useTestingStore(
    useShallow(s => ({
      selectAnswer: s.selectAnswer,
      selected: s.answersByQuestionId[question.id],
    }))
  )

  return (
    <Radio.Group
      onChange={(e) => selectAnswer(question.id, e.target.value)}
      value={!Array.isArray(selected) ? selected : undefined}
    >
      <Space direction="vertical">
        {parsedQuestion.options.map((opt, idx) => (
          <Radio key={idx} value={idx}>
            {opt.text}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  )
}
