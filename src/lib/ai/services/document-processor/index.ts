"use server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { PromptTemplate } from "@langchain/core/prompts";

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export async function processDocument(file: File): Promise<MemoryVectorStore> {
  const text = await file.text();
  
  // Split the text into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const chunks = await splitter.createDocuments([text]);
  
  // Create vector store
  const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);
  return vectorStore;
}

export async function queryDocument(
  vectorStore: MemoryVectorStore,
  query: string
): Promise<string> {
  // Create retrieval chain
  const retrievalChain = await createRetrievalChain({
    combineDocsChain: await createStuffDocumentsChain({
      llm: model,
      prompt: PromptTemplate.fromTemplate(
        "Answer the following question based on the provided context. If you cannot find the answer in the context, say so.\nQuestion: {question}\nContext: {context}"
      ),
    }),
    retriever: vectorStore.asRetriever(),
  });

  const response = await retrievalChain.invoke({
    question: query,
    input: query,
  });

  return response.answer;
} 