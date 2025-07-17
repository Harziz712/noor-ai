"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatTitle from "./ui/ChatTitle";
import ChatMessage from "./ui/ChatMessage";
import ChatInput from "./ui/ChatInput";
import { Menu } from "lucide-react";
import useChats from "@/hooks/useChat";
import MessageWall from "./ui/MessageWall";

interface ChatPageProps {
  chatName?: string;
}

const ChatPage: React.FC<ChatPageProps> = ({
  chatName = "Noor ai ",
}) => {
  const { message, setMessage, messages,showGreeting, setShowGreeting, sendMessage: originalSendMessage } = useChats();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = useState(chatName);
  const [isTitleUpdated, setIsTitleUpdated] = useState(false);

  const sendMessage = (msg: string) => {
    if (showGreeting) setShowGreeting(false); // 👈 Hide greeting
    originalSendMessage(msg);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    useEffect(() => {
    if (!isTitleUpdated) {
      const userMsg = messages.find((msg) => msg.sender === "me");
      if (userMsg) {
        // Create a short title from the first user message
        const newTitle = userMsg.message.split(" ").slice(0, 5).join(" ");
        setTitle(newTitle );
        setIsTitleUpdated(true);
      }
    }
  }, [messages, isTitleUpdated]);

  return (
    <main className="flex flex-col h-screen relative text-white bg-gradient-to-b from-[#1f0932] via-[#1a0033] to-purple-700">
    <ChatTitle
        title={title}
        action={
          <span className="h-[36px] w-[36px] flex justify-center items-center bg-[#3d2072] hover:bg-[#5e2ea3] rounded-full transition">
            <Menu className="cursor-pointer text-white" size={20} />
          </span>
        }
      />

      {/* Message wall */}
      <div className="flex-1 overflow-y-auto px-2 pt-4 pb-32">

   <MessageWall showGreeting={showGreeting}/>

        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            message={msg.message}
            sender={msg.sender === "me" ? "me" : "bot"}
            time={msg.time}
            isTyping={msg.message === "Typing..."}
          />
        ))}
        {/* 🔽 Scroll target */}
        <div ref={scrollRef} />
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
