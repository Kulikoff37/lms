import { List, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ITestVariantServer } from '@/types/testing';

export const TestingVariants = () => {
  const [variants, setVariants] = useState<ITestVariantServer[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const res = await fetch('/api/testVariant/get');
        const data = await res.json();
        setVariants(data);
      } catch (error) {
        console.error('Error fetching test variants:', error);
      }
    };
    fetchVariants();
  }, []);

  const handleSelectVariant = (variantId: number) => {
    router.push(`/testing?variant=${variantId}`);
  };

  return (
    <List
      header={<div>Доступные варианты тестирования</div>}
      bordered
      dataSource={variants}
      renderItem={(variant) => (
        <List.Item
          key={variant.id}
          actions={[
            <Button
              key="btn"
              type="primary"
              onClick={() => handleSelectVariant(variant.id)}
            >
              Пройти тест
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={variant.title}
            description={`Количество вопросов: ${variant.questions.length}, создан: ${new Date(variant.createdAt).toLocaleDateString()}`}
          />
        </List.Item>
      )}
    />
  );
};