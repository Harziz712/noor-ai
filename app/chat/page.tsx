"use client";

import useUser from "@/hooks/useUser";
import ChatInput from "@/components/ui/ChatInput";
import ChatSuggestions from "@/components/ui/ChatInputSuggestions";
import ChatMessage from "@/components/ui/ChatMessage";
import ChatTitle from "@/components/ui/ChatTitle";
import MessageWall from "@/components/ui/MessageWall";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import useChats from "@/hooks/useChat";
import { Sheet, Menu } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const {
    message,
    setMessage,
    messages,
    showGreeting,
    setShowGreeting,
    sendMessage,
    chatTitle, // 👈 from hook
  } = useChats();
  const { user, loading } = useUser();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex flex-col h-screen relative text-white bg-gradient-to-b from-[#1f0932] via-[#1a0033] to-purple-700">
      {/* Chat Header */}
      <ChatTitle
        title={chatTitle} // 👈 now AI sets it
        action={
          <Sheet>
            <SheetTrigger asChild>
              <span className="h-9 w-9 flex items-center justify-center bg-[#3d2072] hover:bg-[#5e2ea3] rounded-full transition-colors duration-200 cursor-pointer shadow-md">
                <Menu className="text-white" size={20} />
              </span>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] bg-[#1f0932] text-white border-none shadow-xl"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold tracking-wide text-white">
                  Chats
                </SheetTitle>
                <SheetDescription className="text-sm text-white/60">
                  Your recent conversations
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-3">
                <div className="p-3 bg-[#3d2072]/40 hover:bg-[#3d2072]/60 rounded-lg cursor-pointer transition-colors">
                  {chatTitle}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        }
      />

      {/* Chat Body */}
      <div className="flex-1 px-2 pb-24 h-screen overflow-auto">
        <MessageWall
          showGreeting={showGreeting}
          user={`${user?.user_metadata?.full_name || user?.email}`}
        />
        {messages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            message={msg.message}
            sender={msg.sender === "me" ? "me" : "bot"}
            time={msg.time}
            isTyping={msg.message === "Typing..."}
          />
        ))}

        {/* Suggestions */}
        <div className="w-full flex justify-center">
          <div className="md:pt-50 md:w-[50%]">
            <ChatSuggestions
  visible={showSuggestions && messages.length === 0 && message.length === 0}
  onSuggestionClick={(text) => {
    setMessage(text);
    setShowSuggestions(false);
  }}
  className="text-center justify-center"
/>
          </div>
        </div>
        <div ref={scrollRef} />
      </div>

      {/* Chat Input */}
      <ChatInput
        className="fixed bottom-0 left-0 right-0"
        message={message}
        setMessage={(val) => {
          setMessage(val);
          setShowSuggestions(val.length === 0);
        }}
        sendMessage={sendMessage}
      />
    </main>
  );
}
