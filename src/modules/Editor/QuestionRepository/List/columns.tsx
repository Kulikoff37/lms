import { QuestionCell } from '@/shared/cells/QuestionCell';
import { IQuestion, IQuestionServer } from '@/types/questions';
import type { TableProps } from 'antd';
import { Button, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEditorStore } from '@/providers/editorStoreProvider';
import { message } from 'antd';

export const useQuestionColumns = () => {
  const openEditModal = useEditorStore(state => state.openEditModal);
  const deleteQuestion = useEditorStore(state => state.deleteQuestion);
  const serverQuestions = useEditorStore(state => state.serverQuestions);

  const columns: TableProps<IQuestion>['columns'] = [
    {
      title: 'Текст вопроса',
      dataIndex: 'content',
      key: 'content',
      render: (_, record) => <QuestionCell data={record} />
    },
    {
      title: 'Предмет',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject) => {
        // If subject is an object, return its label; otherwise, return it as is
        if (typeof subject === 'object' && subject !== null && 'label' in subject) {
          return subject.label;
        }
        return subject;
      }
    },
    {
      title: 'Тип вопроса',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Раздел',
      dataIndex: 'section',
      key: 'section',
      render: (section) => {
        // If section is an object, return its sectionId; otherwise, return it as is
        if (typeof section === 'object' && section !== null && 'sectionId' in section) {
          return section.sectionId;
        }
        return section;
      }
    },
    {
      title: '',
      key: 'actions',
      render: (_, record) => {
        const handleDelete = async (id: string) => {
          try {
            await deleteQuestion(id);
            message.success('Вопрос успешно удален');
          } catch (error: any) {
            message.error(error.message || 'Ошибка при удалении вопроса');
          }
        };

        // Find the original server question by ID to pass to the edit modal
        const originalQuestion = serverQuestions?.find(q => q.id === record.key) || {
          id: record.key,
          text: record.text,
          subjectId: typeof record.subject === 'object' ? record.subject.id : record.subject,
          type: record.type,
          sectionId: typeof record.section === 'object' ? record.section.id : record.section
        };

        return (
          <Space size="middle">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => openEditModal(originalQuestion)}
            />
            <Popconfirm
              title="Вы уверены, что хотите удалить этот вопрос?"
              onConfirm={() => handleDelete(record.key)}
              okText="Да"
              cancelText="Нет"
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    }
  ];

  return columns;
};