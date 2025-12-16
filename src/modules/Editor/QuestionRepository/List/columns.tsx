import { QuestionCell } from '@/shared/cells/QuestionCell';
import { IQuestion } from '@/types/questions';
import type { TableProps } from 'antd';


export const columns: TableProps<IQuestion>['columns'] = [
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
  }
];