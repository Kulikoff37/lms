import { FC } from "react"

interface IProps {
  question: string
  showImage?: boolean
}

export const Single: FC<IProps> = ({ question, showImage = true }) => {
  const parsed = JSON.parse(question)

  return (
    <>
      <p style={{ margin: 0 }}>{parsed?.text}</p>
      {showImage && parsed?.imageUrl && (
        <img
          src={parsed.imageUrl}
          alt="Question illustration"
          style={{
            maxWidth: '100%',
            marginTop: '10px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      )}
    </>
  )
}
