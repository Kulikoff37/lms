import { IQuestion } from '@/types/questions';
import type { TableProps } from 'antd';

export const columns: TableProps<IQuestion>['columns'] = [
  {
    title: 'Текст вопроса',
    dataIndex: 'content',
    key: 'content'
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