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

  const handleCreateVariant = async () => {
    if (!selectedQuestionIds.length) return alert("Выберите вопросы для варианта");
    const title = prompt("Введите название тестового варианта:");
    if (!title) return;

    await fetch("/api/testVariant/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, questionIds: selectedQuestionIds }),
    });
    alert("Вариант теста успешно создан!");
  };

  return (
    <div>
      <button
        onClick={handleCreateVariant}
        style={{ marginBottom: 16, padding: "8px 12px", backgroundColor: "#1677ff", color: "#fff", border: "none", borderRadius: 4 }}
      >
        Сформировать вариант
      </button>
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
              sectionId: record.section
            })
          }
        })}
      />
    </div>
  )
};