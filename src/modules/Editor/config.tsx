import { TabsProps } from "antd";
import { QuestionRepositiry } from "./QuestionRepository";
import { TestVariants } from "./TestVariants";
import { FileUploadTab } from "./FileUploadTab";

export const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Банк вопросов',
    children: <QuestionRepositiry />,
  },
  {
    key: '2',
    label: 'Варианты',
    children: <TestVariants />,
  },
  {
    key: '3',
    label: 'Загрузить файл',
    children: <FileUploadTab />,
  }
];