"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { processDocument } from "@/lib/ai/services/document-processor";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

interface DocumentUploadProps {
  onDocumentProcessed: (vectorStore: MemoryVectorStore) => void;
}

export default function DocumentUpload({ onDocumentProcessed }: DocumentUploadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const vectorStore = await processDocument(file);
      onDocumentProcessed(vectorStore);
    } catch (error) {
      console.error("Error processing document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept=".txt,.pdf,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
        id="document-upload"
      />
      <label htmlFor="document-upload">
        <Button
          as="span"
          color="primary"
          isLoading={isLoading}
        >
          Upload Document
        </Button>
      </label>
    </div>
  );
} 