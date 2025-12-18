import type { IQuestion } from "@/types/questions";
import type { FC } from "react";
import { Single } from "./Single";
import { Multiple } from "./Multiple";

interface Props {
  data: IQuestion
}

export const QuestionCell: FC<Props>  = ({ data }) => {
  const { type, content } = data;
  if (!type) {
    return <>-</>
  }
  if (type === 'single') {
    return <Single question={String(content)} showImage={false} />
  }
  if (type === 'multiple') {
    return <Multiple question={String(content)} showImage={false} />
  }
}