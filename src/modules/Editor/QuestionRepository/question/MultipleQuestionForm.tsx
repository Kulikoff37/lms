import React, { useState } from 'react'
import { Form, Input, Space, Button } from 'antd'
import { IMultiple } from '@/types/questions'

type Props = {
  questionData: IMultiple
  onChange: (data: IMultiple) => void
}

export const MultipleQuestionForm: React.FC<Props> = ({ questionData, onChange }) => {
  const [options, setOptions] = useState<string[]>(questionData.options?.map(o => o.text) || ['', ''])
  const [answersMultiple, setAnswersMultiple] = useState<string>(
    questionData.answer ? (questionData.answer as number[]).join(', ') : ''
  )

  const onAddOption = () => setOptions(prev => [...prev, ''])
  const onChangeOption = (idx: number, val: string) => {
    const newOptions = [...options]
    newOptions[idx] = val
    setOptions(newOptions)
    
    // Convert answersMultiple string to number array
    const answerArray = answersMultiple
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(Number);
      
    onChange({ 
      ...questionData, 
      options: newOptions.map(text => ({ text })), 
      answer: answerArray 
    })
  }

  const handleAnswersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAnswersMultiple(value)
    
    // Convert string to number array
    const answerArray = value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(Number);
      
    onChange({ 
      ...questionData, 
      answer: answerArray,
      options: options.map(text => ({ text }))
    })
  }

  return (
    <div>
      <Form.Item label="Ссылка на изображение">
        <Input
          value={questionData.imageUrl || ''}
          onChange={(e) => onChange({ ...questionData, imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </Form.Item>
      <Form.Item label="Варианты ответа">
        <Space direction="vertical" style={{ width: '100%' }}>
          {options.map((opt, idx) => (
            <Input 
              key={idx} 
              value={opt} 
              onChange={(e) => onChangeOption(idx, e.target.value)} 
              placeholder={`Вариант ${idx + 1}`}
            />
          ))}
          <Button onClick={onAddOption}>Добавить вариант</Button>
        </Space>
      </Form.Item>
      <Form.Item label={'Индексы верных ответов (через запятую)'}>
        <Input value={answersMultiple} onChange={handleAnswersChange} placeholder="0, 1, 2..." />
      </Form.Item>
    </div>
  )
}