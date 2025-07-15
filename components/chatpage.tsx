"use client";

import React from "react";
import ChatTitle from "./ui/ChatTitle";
import ChatInput from "./ui/ChatInput";
import ChatMessage from "./ui/ChatMessage";
import { Menu } from "lucide-react";
import useChats from "@/hooks/useChat";

interface ChatPageProps {
  chatName?: string;
}

const ChatPage: React.FC<ChatPageProps> = ({
  chatName = "Noor ai ",
}) => {
  const { message, setMessage, messages, sendMessage } = useChats();

  return (
    <main className="flex flex-col h-screen relative text-white bg-gradient-to-b from-[#1f0932] via-[#1a0033] to-purple-700">
      <ChatTitle
        title={chatName}
        action={
          <span className="h-[36px] w-[36px] flex justify-center items-center bg-[#3d2072] hover:bg-[#5e2ea3] rounded-full transition">
            <Menu className="cursor-pointer text-white" size={20} />
          </span>
        }
      />

      {/* Message wall */}
<div className="flex-1 overflow-y-auto px-2 pt-4 pb-32">
  {messages.map((msg, idx) => (
    <ChatMessage
      key={idx}
      message={msg.message}
      sender={msg.sender === "me" ? "me" : "bot"}
      time={msg.time}
      isTyping={msg.message === "Typing..."}
    />
  ))}
</div>


      {/* Input */}
      <ChatInput
        className="absolute bottom-0 left-0 right-0"
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </main>
  );
};

export default ChatPage;
