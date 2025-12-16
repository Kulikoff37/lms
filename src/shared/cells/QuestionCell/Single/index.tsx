import { FC } from "react"

interface IProps {
  question: string
}

export const Single: FC<IProps> = ({ question }) => {
  const parsed = JSON.parse(question)
  return (
    <p style={{ margin: 0 }}>{ parsed?.text }</p>
  )
}
