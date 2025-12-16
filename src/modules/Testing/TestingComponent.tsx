'use client'

import { useEffect } from 'react'
import { Button, Flex, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import Controls from './Controls'
import { useTestingStore } from '@/providers/testingStoreProvider'
import { QuestionForm } from './QuestionForm'
import { useDeepEqual } from '@/hooks/useDeepEqual'
import styles from './TestingComponent.module.css'

interface TestingComponentProps {
  variantId?: number;
}

export const TestingComponent: React.FC<TestingComponentProps> = ({ variantId }) => {
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
    getTesting(variantId);
  }, [getTesting, variantId]);

  const current = questions[currentIndex];
  const allAnswered = questions.length > 0 && questions.every(q => {
    const ans = (answersByQuestionId as any)[q.id]
    return ans !== undefined && (Array.isArray(ans) ? ans.length > 0 : true)
  });

  const router = useRouter();

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <>
      <Button onClick={handleGoBack} type="text" size="large" className={styles.backButton}>← Назад к списку текстов</Button>
      <Typography.Title level={4} className={styles.title}>{topic ?? '...'}</Typography.Title>
      {!completed ? (
        <Typography.Text>
          {questions.length > 0 ? `Вопрос ${Math.min(currentIndex + 1, questions.length)} из ${questions.length}` : ''}
        </Typography.Text>
      ) : null}
      {completed ? (
        <div className={styles.resultCard}>
          <Typography.Title level={5} className={styles.resultTitle}>Результат теста</Typography.Title>
          <div className={styles.resultStats}>
            <div className={styles.statItem}>
              <Typography.Text type="secondary">Всего вопросов:</Typography.Text>
              <Typography.Text strong>{questions.length}</Typography.Text>
            </div>
            <div className={styles.statItem}>
              <Typography.Text type="secondary">Правильно:</Typography.Text>
              <Typography.Text strong>{score}</Typography.Text>
            </div>
            <div className={styles.statItem}>
              <Typography.Text type="secondary">Ошибок:</Typography.Text>
              <Typography.Text strong>{questions.length - score}</Typography.Text>
            </div>
          </div>
        </div>
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
