"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Plus, Menu, Trash2, MessageCirclePlus, MessageCircleCode, MessageCircleIcon } from "lucide-react";
import React from "react";

interface ChatSidebarProps {
  chats: { id: string; title: string }[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onDeleteChat: (id: string) => void; // 👈 added delete handler
}

export default function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}: ChatSidebarProps) {
  return (
    <Sheet>
      {/* Trigger button (hamburger menu) */}
      <SheetTrigger asChild>
        <span className="h-9 w-9 flex items-center justify-center bg-[#3d2072] hover:bg-[#5e2ea3] rounded-full transition-colors duration-200 cursor-pointer shadow-md">
          <Menu className="text-white" size={20} />
        </span>
      </SheetTrigger>

      {/* Sidebar content */}
      <SheetContent
        side="left"
        className="w-[280px] sm:w-[400px] bg-[#1f0932] text-white border-none shadow-xl px-5"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold tracking-wide text-white">
            Chats
          </SheetTitle>
          <SheetDescription className="text-sm text-white/60">
            Your recent conversations with Noor
          </SheetDescription>
        </SheetHeader>

<div className="grid w-full gap-2  mt-4">
        <button
          onClick={onNewChat}
          className="flex  items-center gap-2 px-3 py-2 bg-[#3d2072] hover:bg-[#5e2ea3] w-[35%] rounded-lg transition-colors  text-sm font-medium"
        >
          <MessageCirclePlus size={16} /> New Chat
        </button>
            <button
          onClick={onNewChat}
          className=" flex items-center gap-2 px-3 py-2 bg-[#3d2072] hover:bg-[#5e2ea3] w-[35%] rounded-lg transition-colors  text-sm font-medium"
        >
          <MessageCircleIcon size={16} /> Saved Chat
        </button>
</div>
        {/* Chat list */}
        <div className="mt-6 space-y-3 border-t-2 border-white/10 pt-4 overflow-y-auto max-h-[70vh]">
          {chats.length === 0 ? (
            <p className="text-sm text-white/50">No chats yet</p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors group ${
                  chat.id === activeChatId
                    ? "bg-[#5e2ea3]"
                    : "bg-[#3d2072]/40 hover:bg-[#3d2072]/60"
                }`}
              >
                {/* Chat title (click to open chat) */}
                <span
                  onClick={() => onSelectChat(chat.id)}
                  className="flex-1 cursor-pointer truncate"
                >
                  {chat.title}
                </span>

                {/* Delete button (shows on hover) */}
                <button
                  onClick={() => onDeleteChat(chat.id)}
                  className="ml-2 opacity-60 hover:opacity-100 text-red-400 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
