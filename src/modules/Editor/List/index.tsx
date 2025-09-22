import { IQuestion } from "@/types/questions";
import { Table } from "antd";
import { columns } from "./columns";
import { useEditorStore } from "@/providers/editorStoreProvider";

export const List: React.FC = () => {
  const { questions } = useEditorStore((state) => state)
  return (
    <Table<IQuestion> columns={columns} dataSource={questions || []} />
  )
};