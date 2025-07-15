interface ChatMessageProps {
  message: string;
  sender: "me" | "bot";
  time: string;
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  time,
  isTyping = false,
}) => {
  const isMe = sender === "me";

  return (
    <div className={`flex w-full mb-3 px-4 ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm relative ${
          isMe
            ? "bg-[#5e2ea3] text-white rounded-br-none"
            : "bg-[#2f185b] text-white/90 rounded-bl-none"
        }`}
      >
        {isTyping ? (
          <div className="flex gap-1">
            <span className="animate-bounce w-1.5 h-1.5 bg-white rounded-full" />
            <span className="animate-bounce w-1.5 h-1.5 bg-white rounded-full delay-100" />
            <span className="animate-bounce w-1.5 h-1.5 bg-white rounded-full delay-200" />
          </div>
        ) : (
          <p>{message}</p>
        )}
        <span className="text-xs text-white/50 mt-1 block text-right">{time}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
