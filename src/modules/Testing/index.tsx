'use client'

import { useEffect } from 'react'
import { Button, Flex, Typography } from 'antd'
import Controls from './Controls'
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
    checkResults,
    answersByQuestionId,
    resetTesting,
  } = useTestingStore(useDeepEqual((s) => ({
    topic: s.testing?.topic,
    questions: s.testing?.questions ?? [],
    currentIndex: s.currentIndex,
    goNext: s.goNext,
    goPrev: s.goPrev,
    completed: s.completed,
    score: s.score,
    getTesting: s.getTesting,
    checkResults: s.checkResults,
    answersByQuestionId: s.answersByQuestionId,
    resetTesting: s.resetTesting,
  })))

  useEffect(() => {
    getTesting()
  }, [getTesting])

  const current = questions[currentIndex]
  const allAnswered = questions.length > 0 && questions.every(q => {
    const ans = (answersByQuestionId as any)[q.id]
    return ans !== undefined && (Array.isArray(ans) ? ans.length > 0 : true)
  })

  return (
    <>
      <Typography.Title level={4}>{topic ?? '...'}</Typography.Title>
      {!completed ? (
        <Typography.Text>
          {questions.length > 0 ? `Вопрос ${Math.min(currentIndex + 1, questions.length)} из ${questions.length}` : ''}
        </Typography.Text>
      ) : null}
      {completed ? (
        <Typography.Text>Результат: {score} / {questions.length}</Typography.Text>
      ) : null}
      {completed ? (
        <>
          {questions.map((q) => (
            <QuestionForm key={q.id} question={q} />
          ))}
        </>
      ) : (
        current ? (
          <QuestionForm 
            question={current} 
          />
        ) : null
      )}
      {!completed ? (
        <Controls 
          currentIndex={currentIndex}
          total={questions.length}
          onPrev={goPrev}
          onNext={goNext}
          onCheck={checkResults}
          canCheck={allAnswered}
          showCheck={currentIndex >= Math.max(questions.length - 1, 0)}
        />
      ) : (
        <Flex gap={8} style={{ marginTop: 12 }}>
          <Button type="primary" onClick={resetTesting}>Пройти заново</Button>
        </Flex>
      )}
    </>
  )
}
