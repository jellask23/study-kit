export interface IQuiz {
  question: string;
  options: string[];
  correctOption: string;
  explanation: string;
}

export interface IMessage {
  role: "user" | "assistant" | "system";
  content: string;
}
