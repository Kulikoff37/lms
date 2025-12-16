"use client";
import { TestingComponent } from '@/modules/Testing/TestingComponent';
import { TestingStoreProvider } from '@/providers/testingStoreProvider';
import { useSearchParams } from 'next/navigation';

export default function TestingPage() {
  const searchParams = useSearchParams();
  const variantIdString = searchParams.get('variant');
  const variantId = variantIdString ? parseInt(variantIdString, 10) : undefined;

  return (
    <TestingStoreProvider>
      <div style={{ padding: '20px' }}>
        <TestingComponent variantId={variantId} />
      </div>
    </TestingStoreProvider>
  );
}
