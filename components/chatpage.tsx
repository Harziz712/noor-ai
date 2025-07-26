"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatTitle from "./ui/ChatTitle";
import ChatMessage from "./ui/ChatMessage";
import ChatInput from "./ui/ChatInput";
import { Menu } from "lucide-react";
import useChats from "@/hooks/useChat";
import MessageWall from "./ui/MessageWall";
import ChatSuggestions from "./ui/ChatInputSuggestions";

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
  const [showSuggestions, setShowSuggestions] = useState(true); 

  const sendMessage = (msg: string) => {
  if (showGreeting) setShowGreeting(false);
      setShowSuggestions(false); 
      originalSendMessage(msg);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    useEffect(() => {
  if (!isTitleUpdated && messages.length > 0) {
    const firstUserMessage = messages.find((msg) => msg.sender === "me");
    if (firstUserMessage) {
      const newTitle = firstUserMessage.message.split(" ").slice(0, 5).join(" ");
      setTitle(newTitle.charAt(0).toUpperCase() + newTitle.slice(1)); // Capitalize first letter
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
      <div className="flex-1 px-2 pb-24 ">
        <MessageWall showGreeting={showGreeting} />

        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            message={msg.message}
            sender={msg.sender === "me" ? "me" : "bot"}
            time={msg.time}
            isTyping={msg.message === "Typing..."}
          />
        ))}
        <div className="w-full flex justify-center">
          <div className="pt-20 md:pt-50 w-[50%]">
            <ChatSuggestions
              visible={showSuggestions && message.length === 0}
              onSuggestionClick={(text) => {
                setMessage(text)
                setShowSuggestions(false)
              }}
              className="text-center justify-center "
            />
          </div>
        </div>

        {/* 🔽 Scroll target */}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <ChatInput
        className="absolute bottom-0 left-0 right-0"
        message={message}
        setMessage={(val) => {
          setMessage(val)
          if (val.length > 0) {
            setShowSuggestions(false)
          } else {
            setShowSuggestions(true)
          }
        }}
        sendMessage={sendMessage}
      />
    </main>
  );
};

export default ChatPage;
