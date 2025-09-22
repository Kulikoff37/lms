import { Editor } from "@/modules/Editor";
import { EditorStoreProvider } from "@/providers/editorStoreProvider";

export default function Home() {
  return (
    <>
      <EditorStoreProvider>
        <Editor />
      </EditorStoreProvider>
    </>
  );
}