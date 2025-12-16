import { List, Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";

export const TestVariants = () => {
  interface TestVariant {
    id: number;
    title: string;
    questions: string[];
    createdAt: string;
  }

  const [variants, setVariants] = useState<TestVariant[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/testVariant/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        message.success('Вариант успешно удален');
        // Refresh the list after deletion
        const res = await fetch("/api/testVariant/get");
        const data = await res.json();
        setVariants(data);
      } else {
        const errorData = await response.json();
        message.error(errorData.error || 'Ошибка при удалении варианта');
      }
    } catch (error) {
      console.error("Error deleting test variant:", error);
      message.error('Ошибка при удалении варианта');
    } finally {
      setLoading(false);
    }
  };

  return (
    <List
      header={<div>Варианты</div>}
      bordered
      dataSource={variants}
      renderItem={(variant) => (
        <List.Item
          actions={[
            <Popconfirm
              key="delete"
              title="Вы уверены, что хотите удалить этот вариант?"
              onConfirm={() => handleDelete(variant.id)}
              okText="Да"
              cancelText="Нет"
            >
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                loading={loading}
              />
            </Popconfirm>
          ]}
        >
          <List.Item.Meta
            title={variant.title}
            description={
              <div>
                <p>Количество вопросов: {variant.questions.length}</p>
                <p>Дата создания: {new Date(variant.createdAt).toLocaleDateString()}</p>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};
