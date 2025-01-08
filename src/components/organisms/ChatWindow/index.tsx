"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  ScrollShadow,
  Input,
  Spinner,
  useDisclosure,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/react";
import { generateChatResponse } from "@/lib/ai/services/chat";
import { queryDocument } from "@/lib/ai/services/document-processor";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatWindowProps {
  initialContext?: string;
  vectorStore?: MemoryVectorStore;
}

export default function ChatWindow({
  initialContext,
  vectorStore,
}: ChatWindowProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialContext) {
      setMessages([
        {
          role: "system",
          content: `I'm ready to help you with questions about this quiz. ${initialContext}`,
        },
      ]);
    }
  }, [initialContext]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let response: string;

      if (vectorStore) {
        // Use document Q&A if vectorStore is available
        response = await queryDocument(vectorStore, userMessage.content);
      } else {
        // Use regular chat for quiz-related questions
        console.log("messages", [...messages, userMessage]);
        response = await generateChatResponse([...messages, userMessage]);
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response || "Sorry, I could not generate a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Button
        isIconOnly
        color="primary"
        variant="flat"
        aria-label="Chat"
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
        onPress={onOpen}
      >
        <span className="material-symbols-rounded">chat</span>
      </Button>

      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="right"
        size="lg"
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerBody className="relative before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <div className="h-full flex flex-col">
                  <ScrollShadow className="flex-grow my-4 space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={message.role + index}
                        className={`p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-primary ml-auto max-w-[80%]"
                            : "bg-gray-700 mr-auto max-w-[80%]"
                        }`}
                      >
                        <p className="">
                          {message.role === "system"
                            ? "System: Ask me anything about the quiz "
                            : message.content}
                        </p>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-center">
                        <Spinner size="sm" color="primary" />
                      </div>
                    )}
                  </ScrollShadow>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <div className="flex gap-2 w-full">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about the quiz..."
                    className="flex-grow"
                    disabled={isLoading}
                  />
                  <Button
                    color="primary"
                    onPress={handleSend}
                    isLoading={isLoading}
                  >
                    Send
                  </Button>
                </div>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
