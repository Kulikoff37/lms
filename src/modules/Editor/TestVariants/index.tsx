import { List } from 'antd';

import { useEffect, useState } from "react";


export const TestVariants = () => {
  interface TestVariant {
    id: number;
    title: string;
    questions: string[];
    createdAt: string;
  }

  const [variants, setVariants] = useState<TestVariant[]>([]);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const res = await fetch("/api/testVariant/get");
        const data = await res.json();
        setVariants(data);
      } catch (error) {
        console.error("Error fetching test variants:", error);
      }
    };
    fetchVariants();
  }, []);

  return (
    <List
      header={<div>Варианты</div>}
      bordered
      dataSource={variants}
      renderItem={(variant) => (
        <List.Item onClick={() => console.log(variant)}>
          {variant.title}
        </List.Item>
      )}
    />
  );
};
