'use client'

import { TestingVariants } from './TestVariants';

export const Testing: React.FC = () => {
  return (
    <div>
      <h2>Выберите вариант для прохождения тестирования</h2>
      <TestingVariants />
    </div>
  )
}
