'use client';
import { Tabs } from 'antd';
import { items } from './config';

const onChange = (key: string) => {
  console.log(key);
};

export const Editor: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
