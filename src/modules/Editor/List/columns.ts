import { IQuestion } from '@/types/questions';
import type { TableProps } from 'antd';

export const columns: TableProps<IQuestion>['columns'] = [
  {
    title: 'Текст вопроса',
    dataIndex: 'text',
    key: 'text'
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

export const data: IQuestion[] = [
  {
    key: '1',
    text: 'Верны ли следующие суждения о грибах? А. Клеточная оболочка грибов образована клетчаткой. Б. Плесневые грибы используют для получения антибиотиков',
    subject: 'Биология',
    type: 'Один ответ',
    section: '4.1'
  },
  {
    key: '2',
    text: 'Верны ли следующие суждения о грибах? А. Клеточная оболочка грибов образована клетчаткой. Б. Плесневые грибы используют для получения антибиотиков',
    subject: 'Биология',
    type: 'Один ответ',
    section: '4.1'
  }
  
]