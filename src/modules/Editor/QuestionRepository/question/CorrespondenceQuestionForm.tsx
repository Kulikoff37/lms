import React, { useState } from 'react'
import { Form, Input, Space, Button, Typography } from 'antd'
import { ICorrespondence, ICorrespondenceAnswer } from '@/types/questions'

type Props = {
  questionData: ICorrespondence
  onChange: (data: ICorrespondence) => void
}

export const CorrespondenceQuestionForm: React.FC<Props> = ({ questionData, onChange }) => {
  const [sources, setSources] = useState<string[]>(questionData.source || ['', ''])
  const [recipients, setRecipients] = useState<string[]>(questionData.recipient || ['', ''])
  const [answers, setAnswers] = useState<ICorrespondenceAnswer[]>(questionData.answer || [])

  const onAddSource = () => {
    const newSources = [...sources, '']
    setSources(newSources)
    onChange({ 
      ...questionData, 
      source: newSources,
      recipient: recipients,
      answer: answers
    })
  }

  const onAddRecipient = () => {
    const newRecipients = [...recipients, '']
    setRecipients(newRecipients)
    onChange({ 
      ...questionData, 
      source: sources,
      recipient: newRecipients,
      answer: answers
    })
  }

  const onChangeSource = (idx: number, val: string) => {
    const newSources = [...sources]
    newSources[idx] = val
    setSources(newSources)
    onChange({ 
      ...questionData, 
      source: newSources,
      recipient: recipients,
      answer: answers
    })
  }

  const onChangeRecipient = (idx: number, val: string) => {
    const newRecipients = [...recipients]
    newRecipients[idx] = val
    setRecipients(newRecipients)
    onChange({ 
      ...questionData, 
      source: sources,
      recipient: newRecipients,
      answer: answers
    })
  }

  const onAnswerChange = (sourceIndex: number, recipientIndex: number) => {
    const newAnswers = [...answers]
    const existingAnswerIndex = newAnswers.findIndex(a => a.source === sources[sourceIndex])
    
    if (existingAnswerIndex !== -1) {
      newAnswers[existingAnswerIndex] = { 
        source: sources[sourceIndex], 
        recipient: recipients[recipientIndex] 
      }
    } else {
      newAnswers.push({ 
        source: sources[sourceIndex], 
        recipient: recipients[recipientIndex] 
      })
    }
    
    setAnswers(newAnswers)
    onChange({ 
      ...questionData, 
      source: sources,
      recipient: recipients,
      answer: newAnswers
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
      <Form.Item label="Источники (левая колонка)">
        <Space direction="vertical" style={{ width: '100%' }}>
          {sources.map((source, idx) => (
            <Input 
              key={`source-${idx}`} 
              value={source} 
              onChange={(e) => onChangeSource(idx, e.target.value)} 
              placeholder={`Источник ${idx + 1}`}
            />
          ))}
          <Button onClick={onAddSource}>Добавить источник</Button>
        </Space>
      </Form.Item>
      <Form.Item label="Получатели (правая колонка)">
        <Space direction="vertical" style={{ width: '100%' }}>
          {recipients.map((recipient, idx) => (
            <Input 
              key={`recipient-${idx}`} 
              value={recipient} 
              onChange={(e) => onChangeRecipient(idx, e.target.value)} 
              placeholder={`Получатель ${idx + 1}`}
            />
          ))}
          <Button onClick={onAddRecipient}>Добавить получателя</Button>
        </Space>
      </Form.Item>
      <Form.Item label="Сопоставления (ответы)">
        <Space direction="vertical" style={{ width: '100%' }}>
          {sources.map((source, sourceIdx) => (
            <div key={`answer-${sourceIdx}`} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography.Text style={{ minWidth: '150px' }}>
                {source || `Источник ${sourceIdx + 1}`}
              </Typography.Text>
              <span style={{ margin: '0 10px' }}>→</span>
              <select 
                value={answers.find(a => a.source === source)?.recipient || ''}
                onChange={(e) => onAnswerChange(sourceIdx, recipients.indexOf(e.target.value))}
                style={{ flex: 1, padding: '4px', borderRadius: '4px', border: '1px solid #d9d9d9' }}
              >
                <option value="">Выберите получателя</option>
                {recipients.map((recipient, recipientIdx) => (
                  <option key={`mapping-${sourceIdx}-${recipientIdx}`} value={recipient}>
                    {recipient || `Получатель ${recipientIdx + 1}`}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </Space>
      </Form.Item>
    </div>
  )
}