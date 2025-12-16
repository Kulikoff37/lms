import { IQuestion } from "@/types/questions";
import { Table } from "antd";
import { columns } from "./columns";
import { useEditorStore } from "@/providers/editorStoreProvider";
import { useDeepEqual } from '@/hooks/useDeepEqual';

export const List: React.FC = () => {
  const { questions, subjects, sections, openEditModal, selectedQuestionIds, setSelectedQuestionIds } = useEditorStore(useDeepEqual((state) => ({
    questions: state.questions,
    subjects: state.subjects,
    sections: state.sections,
    openEditModal: state.openEditModal,
    selectedQuestionIds: state.selectedQuestionIds,
    setSelectedQuestionIds: state.setSelectedQuestionIds,
  })))

  // Map the questions to include full subject and section objects
  const enhancedQuestions = questions?.map(question => {
    const subjectObj = subjects?.find(subject => subject.id === question.subject);
    const sectionObj = sections?.find(section => section.id === question.section);

    return {
      ...question,
      subject: subjectObj || question.subject,  // If found, use the full object; otherwise, keep the original
      section: sectionObj || question.section   // If found, use the full object; otherwise, keep the original
    };
  }) || [];

  const rowSelection = {
    selectedRowKeys: selectedQuestionIds,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedQuestionIds(selectedRowKeys as string[]);
    },
  };

  return (
    <div>
      <Table<IQuestion>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={enhancedQuestions || []}
        onRow={(record) => ({
          onClick: () => {
            openEditModal({
              id: record.key,
              text: record.text,
              subjectId: typeof record.subject === 'object' ? record.subject.id : record.subject,
              type: record.type,
              sectionId: typeof record.section === 'object' ? record.section.id : record.section
            })
          }
        })}
      />
    </div>
  )
};