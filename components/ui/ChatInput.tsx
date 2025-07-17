"use client";

import useInput, { InputProp } from "@/hooks/useInput";
import { Paperclip, Mic, Send } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface ChatInputProps {
  className?: string;
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: (msg: string) => void;
}

const ChatInput = ({
  className,
  message,
  setMessage,
  sendMessage,
}: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus(); // Auto-focus input on page load
  }, []);

  const {
    isRecording,
    inputMessage,
   setInputMessage,
    handleSend,
    handleKeyDown,
    handleVoiceInput,
    fileInputRef,
    handleFileUpload,
    handlePaperclipClick,
  } = useInput({ message, setMessage, sendMessage });

  return (
    <div
      className={`flex items-center py-4 px-3 gap-2 w-full max-w-full bg-transparent backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-3 w-full rounded-full bg-[#3d2072] hover:bg-[#4c2d92] transition px-4 py-4">
        {/* 📎 File Upload Button */}
        <button
          type="button"
          onClick={handlePaperclipClick}
          className="text-white/70 hover:text-white"
        >
          <Paperclip className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
        </button>

        {/* 💬 Input Box */}
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isRecording ? "Listening..." : "Ask me anything..."}
          className={`flex-1 bg-transparent outline-none text-white text-sm placeholder-white/60 transition-all duration-300 ${
            inputMessage ? "placeholder-opacity-0" : "placeholder-opacity-100"
          }`}
        />

        {/* 🎙️ Voice Button */}
        <button
          onClick={handleVoiceInput}
          className={`text-white/70 hover:text-white relative ${
            isRecording ? "animate-bounce text-green-400" : ""
          }`}
        >
          <Mic className="w-5 h-5" />
          {isRecording && (
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white animate-pulse">
              Listening...
            </span>
          )}
        </button>
      </div>

      {/* 📤 Send Button */}
      <button
        onClick={handleSend}
        disabled={!inputMessage.trim()}
        className={`p-3 rounded-full transition text-white ${
          inputMessage.trim()
            ? "bg-[#5e2ea3] hover:bg-[#7741cb]"
            : "bg-[#5e2ea3]/40 cursor-not-allowed"
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatInput;
