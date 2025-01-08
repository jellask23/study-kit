"use client";
import { useState } from "react";
import ChatWindow from "@/components/organisms/ChatWindow";
import Quiz from "@/components/organisms/Quiz";
import QuizInput from "@/components/organisms/QuizInput";
import { IQuiz } from "@/utils/types";
// import { MemoryVectorStore } from "langchain/vectorstores/memory";

export default function Home() {
  const [quizData, setQuizData] = useState<IQuiz[] | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [quizContext, setQuizContext] = useState<string>("");
  // const [vectorStore, setVectorStore] = useState<MemoryVectorStore | null>(
  //   null
  // );

  const handleQuizGenerated = (questions: IQuiz[], topic: string) => {
    setQuizData(questions);
    // Create context for the chat
    const context = `Quiz Topic: ${topic}
Questions: ${JSON.stringify(questions)}`;
    console.log(context);
    setQuizContext(context);
    setTopic(topic);
  };

  // const handleDocumentProcessed = (store: MemoryVectorStore) => {
  //   setVectorStore(store);
  //   setQuizContext(
  //     "I'm ready to answer questions about the uploaded document."
  //   );
  // };

  return (
    <div className="">
      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          <QuizInput onQuizGenerated={handleQuizGenerated} />
          {/* <DocumentUpload onDocumentProcessed={handleDocumentProcessed} /> */}
        </div>
        {quizData && <Quiz quizData={quizData} topic={topic} />}
      </div>
      <div className="font-nunito">
        <ChatWindow initialContext={quizContext} vectorStore={undefined} />
      </div>
    </div>
  );
}
