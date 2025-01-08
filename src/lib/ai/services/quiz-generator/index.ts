"use server";
import { OpenAI } from "openai";
import { IQuiz } from "@/utils/types";
import { z } from "zod";
import { BASIC_QUIZ_PROMPT, PYQS_PROMPT } from "@/utils/constants";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const QuizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctOption: z.string(),
      explanation: z.string(),
    })
  ),
});

export const generateQuiz = async (
  topic: string,
  type: "quiz" | "pyq",
  numberOfQuestions: number = 5
): Promise<IQuiz[]> => {
  const prompt =
    type === "quiz"
      ? BASIC_QUIZ_PROMPT(topic, numberOfQuestions)
      : PYQS_PROMPT(topic, numberOfQuestions);

  const response = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: zodResponseFormat(QuizSchema, "quiz"),
  });

  try {
    const content = response.choices[0].message.parsed;
    return content?.questions || [];
  } catch (error) {
    console.error("Failed to parse or validate quiz data:", error);
    return [];
  }
};

export type QuizResponse = z.infer<typeof QuizSchema>;
