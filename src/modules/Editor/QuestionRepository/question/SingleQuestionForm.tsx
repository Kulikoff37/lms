import React, { useState } from 'react'
import { Form, Input, Space, Button } from 'antd'
import { ISingle } from '@/types/questions'

type Props = {
  questionData: ISingle
  onChange: (data: ISingle) => void
}

export const SingleQuestionForm: React.FC<Props> = ({ questionData, onChange }) => {
  const [options, setOptions] = useState<string[]>(questionData.options?.map(o => o.text) || ['', ''])
  const [answer, setAnswer] = useState<string>(questionData.answer?.toString() || '0')

  const onAddOption = () => setOptions(prev => [...prev, ''])
  const onChangeOption = (idx: number, val: string) => {
    const newOptions = [...options]
    newOptions[idx] = val
    setOptions(newOptions)
    onChange({ ...questionData, options: newOptions.map(text => ({ text })), answer: Number(answer) })
  }

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAnswer(value)
    onChange({ ...questionData, answer: Number(value), options: options.map(text => ({ text })) })
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
      <Form.Item label={'Индекс верного ответа'}>
        <Input value={answer} onChange={handleAnswerChange} placeholder="0, 1, 2..." />
      </Form.Item>
    </div>
  )
}