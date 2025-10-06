import { IQuestion } from "@/types/questions";
import { Table } from "antd";
import { columns } from "./columns";
import { useEditorStore } from "@/providers/editorStoreProvider";

export const List: React.FC = () => {
  const { questions, openEditModal, selectedQuestionIds, setSelectedQuestionIds } = useEditorStore((state) => state)
  
  const rowSelection = {
    selectedRowKeys: selectedQuestionIds,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedQuestionIds(selectedRowKeys as string[]);
    },
  };

  return (
    <Table<IQuestion>
      rowSelection={rowSelection}
      columns={columns}
      dataSource={questions || []}
      onRow={(record) => ({
        onClick: () => {
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