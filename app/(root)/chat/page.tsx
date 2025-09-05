"use client";

import useUser from "@/hooks/useUser";
import ChatInput from "@/components/ui/ChatInput";
import ChatSuggestions from "@/components/ui/ChatInputSuggestions";
import ChatMessage from "@/components/ui/ChatMessage";
import ChatTitle from "@/components/ui/ChatTitle";
import MessageWall from "@/components/ui/MessageWall";
import useChats from "@/hooks/useChat";
import React, { useEffect, useRef, useState } from "react";
import ChatSidebar from "@/components/ui/ChatSidebar";

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

  const [chats, setChats] = useState([
    { id: "1", title: "First Chat" },
    { id: "2", title: "Second Chat" },
  ]);
  const [activeChatId, setActiveChatId] = useState<string | null>("1");

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: chatTitle,
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

    const handleDeleteChat = (id: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(chats.length > 1 ? chats[0].id : null);
    }
  };


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
         <ChatSidebar
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={(id) => setActiveChatId(id)}
            onNewChat={handleNewChat}
            onDeleteChat={handleDeleteChat}
          />
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
