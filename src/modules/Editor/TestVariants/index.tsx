import { List } from 'antd';

const data = [
  'Вариант 1',
  'Вариант 2'
];

export const TestVariants = () => {
  return (
    <>
      <List
        header={<div>Варианты</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item onClick={() => console.log(item)}>
            {item}
          </List.Item>
        )}
      />
    </>
  )
}
