'use client'

import React from 'react'
import { Button, Flex } from 'antd'

type Props = {
  currentIndex: number
  total: number
  onPrev: () => void
  onNext: () => void
  onCheck: () => void
  canCheck: boolean
  showCheck: boolean
}

const Controls: React.FC<Props> = ({ currentIndex, total, onPrev, onNext, onCheck, canCheck, showCheck }) => {
  return (
    <Flex gap={8} style={{ marginTop: 12 }}>
      <Button onClick={onPrev} disabled={currentIndex === 0}>Предыдущий</Button>
      <Button type="primary" onClick={onNext} disabled={currentIndex >= Math.max(total - 1, 0)}>Следующий</Button>
      {showCheck ? (
        <Button onClick={onCheck} disabled={!canCheck}>Проверить</Button>
      ) : null}
    </Flex>
  )
}

export default Controls


