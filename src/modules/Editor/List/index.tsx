import { IQuestion } from "@/types/questions";
import { Table } from "antd";
import { columns } from "./columns";
import { useEditorStore } from "@/providers/editorStoreProvider";

export const List: React.FC = () => {
  const { questions, openEditModal } = useEditorStore((state) => state)
  return (
    <Table<IQuestion>
      columns={columns}
      dataSource={questions || []}
      onRow={(record) => ({
        onClick: () => {
          // Map table row to server shape minimal data for modal
          openEditModal({
            id: record.key,
            text: record.text,
            subjectId: record.subject,
            type: record.type,
            section: record.section,
            subject: { id: record.subject, name: record.subject, label: record.subject }
          })
        }
      })}
    />
  )
};