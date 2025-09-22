'use client'

import { useEffect } from 'react'
import { Button, Flex, Typography } from 'antd'
import { useTestingStore } from '@/providers/testingStoreProvider'
import { QuestionForm } from './QuestionForm'
import { useDeepEqual } from '@/hooks/useDeepEqual'

export const Testing: React.FC = () => {
  const {
    topic,
    questions,
    currentIndex,
    goNext,
    goPrev,
    completed,
    score,
    getTesting,
  } = useTestingStore(useDeepEqual((s) => ({
    topic: s.testing?.topic,
    questions: s.testing?.questions ?? [],
    currentIndex: s.currentIndex,
    goNext: s.goNext,
    goPrev: s.goPrev,
    completed: s.completed,
    score: s.score,
    getTesting: s.getTesting,
  })))

  useEffect(() => {
    getTesting()
  }, [getTesting])

  const current = questions[currentIndex]

  return (
    <>
      <Typography.Title level={4}>{topic ?? '...'}</Typography.Title>
      {completed ? (
        <Typography.Text>Результат: {score} / {questions.length}</Typography.Text>
      ) : null}
      {current ? (
        <QuestionForm question={current} />
      ) : null}
      <Flex gap={8} style={{ marginTop: 12 }}>
        <Button onClick={goPrev} disabled={currentIndex === 0}>Предыдущий</Button>
        <Button type="primary" onClick={goNext} disabled={currentIndex >= Math.max(questions.length - 1, 0)}>Следующий</Button>
      </Flex>
    </>
  )
}
