import React from "react";
import clsx from "clsx";
import { UserCircle } from "lucide-react"; // fallback icon

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
    <div className={clsx("flex gap-2 px-4 mb-3", isMe ? "justify-end" : "justify-start")}>
      {/* Avatar / Icon */}
      {!isMe && (
        <img
          src="/bot-avatar.png" // Replace with actual avatar if you have one
          alt="Bot Avatar"
          className="w-7 h-7 rounded-full self-end"
        />
      )}

      {/* Message Bubble */}
      <div className={clsx("flex flex-col max-w-[75%]")}>
        <div
          className={clsx(
            "rounded-2xl px-4 py-3 text-sm relative",
            isMe
              ? "bg-[#6b39c5] text-white rounded-br-none"
              : "bg-[#2f185b] text-white/90 rounded-bl-none"
          )}
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
        </div>

        {/* Time */}
        <span className="text-xs text-white/40 mt-1 ml-2">{time}</span>
      </div>

      {/* Gemini Icon */}
      {isMe && (
        <div className="self-end">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            {/* Replace with actual Gemini icon if available */}
            <img src="/gemini-icon.svg" alt="Gemini" className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
