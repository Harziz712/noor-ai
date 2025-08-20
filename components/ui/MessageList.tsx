"use client";

import useUser from "@/hooks/useUser";
import ChatInput from "@/components/ui/ChatInput";
import ChatSuggestions from "@/components/ui/ChatInputSuggestions";
import ChatMessage from "@/components/ui/ChatMessage";
import ChatTitle from "@/components/ui/ChatTitle";
import MessageWall from "@/components/ui/MessageWall";
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import useChats from "@/hooks/useChat";
import { Sheet, Menu } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const chatName = "Noor ai";
  const { message, setMessage, messages, showGreeting, setShowGreeting, sendMessage: originalSendMessage } = useChats();
  const { user, loading } = useUser();
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
        setTitle(newTitle.charAt(0).toUpperCase() + newTitle.slice(1));
        setIsTitleUpdated(true);
      }
    }
  }, [messages, isTitleUpdated]);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex flex-col h-screen relative text-white bg-gradient-to-b from-[#1f0932] via-[#1a0033] to-purple-700">
      <ChatTitle
        title={`${title}`}
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
                  {title}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        }
      />

      <div className="flex-1 px-2 pb-24 h-screen overflow-auto">
        <MessageWall showGreeting={showGreeting} user={`${user?.user_metadata?.full_name || user?.email}`}/>
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
          <div className="md:pt-50 md:w-[50%]">
            <ChatSuggestions
              visible={showSuggestions && message.length === 0}
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
