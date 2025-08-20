"use client";

import MessageBubble from "./MessageBubble";

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
    <div
      className={`flex w-full mb-3 px-4 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      <MessageBubble
        message={message}
        time={time}
        isTyping={isTyping}
        isMe={isMe}
      />
    </div>
  );
};

export default ChatMessage;
