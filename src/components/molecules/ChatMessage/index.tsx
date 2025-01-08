interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div
      className={`p-3 rounded-lg ${
        role === "user"
          ? "bg-blue-500 ml-auto max-w-[80%]"
          : "bg-gray-700 mr-auto max-w-[80%]"
      }`}
    >
      <p className="text-white">{content}</p>
    </div>
  );
}
