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
  }
];