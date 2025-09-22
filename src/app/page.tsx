"use client";
import { Testing } from "@/modules/Testing";
import { TestingStoreProvider } from "@/providers/testingStoreProvider";

export default function Home() {
  return (
    <>
      <TestingStoreProvider>
        <Testing />
      </TestingStoreProvider>
    </>
  );
}
