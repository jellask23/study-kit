"use client";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { generateQuiz } from "@/lib/ai/services/quiz-generator";
import { IQuiz } from "@/utils/types";

interface QuizInputProps {
  onQuizGenerated: (questions: IQuiz[], topic: string) => void;
}

export default function QuizInput({ onQuizGenerated }: QuizInputProps) {
  const [topic, setTopic] = useState("");
  const [numOfQues, setNumOfQues] = useState("5");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (type: "quiz" | "pyq") => {
    if (!topic) return;
    
    setIsLoading(true);
    try {
      const questions = await generateQuiz(topic, type, parseInt(numOfQues));
      onQuizGenerated(questions, topic);
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-full max-w-md mx-auto">
      <Input
        fullWidth
        isRequired
        label="Topic"
        labelPlacement="outside"
        variant="bordered"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic"
      />
      <Input
        label="Number of Questions"
        labelPlacement="outside"
        variant="bordered"
        type="number"
        value={numOfQues}
        onChange={(e) => setNumOfQues(e.target.value)}
        placeholder="Number of questions"
      />
      <div className="flex gap-2">
        <Button
          color="primary"
          onPress={() => handleSubmit("quiz")}
          isLoading={isLoading}
        >
          Get Quiz
        </Button>
        <Button
          color="secondary"
          onPress={() => handleSubmit("pyq")}
          isLoading={isLoading}
        >
          Get PYQs
        </Button>
      </div>
    </div>
  );
}
