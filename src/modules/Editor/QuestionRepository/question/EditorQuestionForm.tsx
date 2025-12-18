'use client'

import React, { useMemo } from 'react'
import { Card, Typography, Form, Input, Space, Button } from 'antd'
import { IQuestionServer, IMultiple, ISingle } from '@/types/questions'
import { registryParseQuestion } from './parse'

type Props = {
  question: IQuestionServer
}

export const EditorQuestionForm: React.FC<Props> = ({ question }) => {
  const parsed = useMemo(() => registryParseQuestion(question.type, question.text), [question.type, question.text])

  if (!parsed) {
    return (
      <Card>
        <Typography.Text>Неверный формат вопроса</Typography.Text>
      </Card>
    )
  }

  const isMultiple = question.type === 'multiple'
  const hasImageUrl = 'imageUrl' in parsed && parsed.imageUrl;

  return (
    <Card>
      <Form layout="vertical">
        <Form.Item label="Текст вопроса">
          <Input.TextArea defaultValue={parsed.text} rows={3} />
        </Form.Item>
        {question.type === 'single' && (
          <Form.Item label="Ссылка на изображение">
            <Input defaultValue={hasImageUrl ? parsed.imageUrl : ''} placeholder="https://example.com/image.jpg" />
          </Form.Item>
        )}
        <Form.Item label="Варианты ответа">
          <Space direction="vertical" style={{ width: '100%' }}>
            {parsed.options.map((opt, idx) => (
              <Input key={idx} defaultValue={opt.text} />
            ))}
          </Space>
        </Form.Item>
        <Form.Item label={isMultiple ? 'Индексы верных ответов (через запятую)' : 'Индекс верного ответа'}>
          <Input defaultValue={isMultiple ? (parsed as IMultiple).answer.join(',') : String((parsed as ISingle).answer)} />
        </Form.Item>
        <Space>
          <Button type="primary">Сохранить</Button>
          <Button>Отмена</Button>
        </Space>
      </Form>
    </Card>
  )
}



