import Image from 'next/image';
import { FC, useState } from 'react';

interface QuestionImageProps {
  imageUrl: string;
  alt?: string;
}

export const QuestionImage: FC<QuestionImageProps> = ({ imageUrl, alt = 'Question illustration' }) => {
  const [useImgTag, setUseImgTag] = useState(false);

  if (useImgTag || !imageUrl.startsWith('http')) {
    return (
      <div style={{ marginTop: '10px' }}>
        <img
          src={imageUrl}
          alt={alt}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
          onError={() => {}} // Prevent additional error handling
        />
      </div>
    );
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <Image
        src={imageUrl}
        alt={alt}
        width={800}
        height={400}
        onError={() => setUseImgTag(true)}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
    </div>
  );
};