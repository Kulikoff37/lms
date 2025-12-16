'use client'

import { useState, useRef } from 'react';
import { Button, Select, Upload, message, Form, Card, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEditorStore } from '@/providers/editorStoreProvider';
import { useDeepEqual } from '@/hooks/useDeepEqual';
import type { RcFile } from 'antd/es/upload';

const { Option } = Select;

interface QuestionData {
  text: string;
  options: { text: string }[];
  correctAnswer?: string | number | number[]; // Can be string, number, or array of numbers
}

export const FileUploadTab: React.FC = () => {
  const { subjects, sections, getSubjects, getSections } = useEditorStore(useDeepEqual((state) => ({
    subjects: state.subjects,
    sections: state.sections,
    getSubjects: state.getSubjects,
    getSections: state.getSections,
  })));

  const [subjectId, setSubjectId] = useState<string>('');
  const [sectionId, setSectionId] = useState<string>('');
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [loading, setLoading] = useState(false);

  const uploadRef = useRef<any>(null);

  // Load subjects and sections on component mount
  useState(() => {
    getSubjects();
    getSections();
  });

  const handleFileChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFileList(info.fileList);
    } else {
      setFileList([]);
    }
  };

  const handleUpload = async () => {
    if (!subjectId) {
      message.error('Пожалуйста, выберите предмет');
      return;
    }

    if (!sectionId) {
      message.error('Пожалуйста, выберите раздел');
      return;
    }

    if (fileList.length === 0) {
      message.error('Пожалуйста, выберите файл для загрузки');
      return;
    }

    const file = fileList[0].originFileObj as File;
    if (!file) {
      message.error('Ошибка при чтении файла');
      return;
    }

    setLoading(true);

    try {
      // Read file content
      const content = await file.text();
      let jsonData: QuestionData[];

      try {
        jsonData = JSON.parse(content);
      } catch (e) {
        message.error('Неверный формат JSON файла');
        setLoading(false);
        return;
      }

      // Validate JSON structure
      if (!Array.isArray(jsonData)) {
        message.error('JSON должен содержать массив вопросов');
        setLoading(false);
        return;
      }

      // Validate each question structure
      for (const questionData of jsonData) {
        if (!questionData.text || !Array.isArray(questionData.options)) {
          message.error('Каждый вопрос должен содержать текст и массив опций');
          setLoading(false);
          return;
        }
      }

      // Transform questions to match the Prisma schema format
      const transformedQuestions = jsonData.map(questionData => {
        // Create the JSON structure that matches the database schema
        const questionText = JSON.stringify({
          text: questionData.text,
          options: questionData.options,
          answer: questionData.correctAnswer // This could be a number, array of numbers, etc.
        });

        return {
          text: questionText,
          subjectId,
          section: sectionId,
          type: Array.isArray(questionData.correctAnswer) ? 'multiple' : 'single' // Determine type based on answer structure
        };
      });

      // Upload all questions in a single request
      const response = await fetch('/api/editor/upload-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questions: transformedQuestions
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        message.error(`Ошибка при загрузке вопросов: ${responseData.error || 'Неизвестная ошибка'}`);
        setLoading(false);
        return;
      }

      message.success(`Загружено ${jsonData.length} вопросов успешно!`);
      setFileList([]); // This will clear the file list automatically
    } catch (error) {
      console.error('Error uploading questions:', error);
      message.error('Ошибка при загрузке вопросов');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Загрузить вопросы из JSON файла">
      <Form layout="vertical">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Form.Item label="Предмет">
            <Select
              value={subjectId}
              onChange={setSubjectId}
              placeholder="Выберите предмет"
              allowClear
            >
              {subjects?.map((subject) => (
                <Option key={subject.id} value={subject.id}>
                  {subject.label || subject.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Раздел">
            <Select
              value={sectionId}
              onChange={setSectionId}
              placeholder="Выберите раздел"
              allowClear
              disabled={!subjectId}
            >
              {sections?.map((section) => (
                <Option key={section.id} value={section.id}>
                  {section.sectionId ? `${section.sectionId} - ${section.name}` : section.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Файл JSON">
            <Upload
              ref={uploadRef}
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleFileChange}
              maxCount={1}
              accept=".json"
              fileList={fileList}
            >
              <Button icon={<UploadOutlined />}>Выбрать JSON файл</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              onClick={handleUpload}
              loading={loading}
              disabled={!subjectId || !sectionId || fileList.length === 0}
            >
              Загрузить вопросы
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
};