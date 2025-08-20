"use client";

import { Mic, StopCircle, Paperclip, SendHorizonal } from "lucide-react";
import useInput from "@/hooks/useInput";

interface ChatInputProps {
  message: string;
  setMessage: (val: string) => void;
  sendMessage: (msg: string) => void;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  sendMessage,
  className = "",
}) => {
 const {
  isRecording,
  inputMessage,
  setInputMessage,
  handleSend,
  handleKeyDown,
  startRecording,
  stopRecording,
  transcribing,
  fileInputRef,
  handleFileUpload,
  handlePaperclipClick,
  canvasRef,
} = useInput({ message, setMessage, sendMessage });

  return (
    <div
      className={`flex items-center gap-2 p-3 bg-[#2a0a44] border-t border-white/10 ${className}`}
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Paperclip */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded-full bg-purple-600 hover:bg-purple-700"
      >
        <Paperclip size={18} className="text-white" />
      </button>

      {/* Text Input */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder={transcribing ? "Transcribing..." : "Type your message..."}
        className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-sm"
      />

      {/* Mic + Waveform */}
      {isRecording ? (
        <>
          <canvas
            ref={canvasRef}
            width={60}
            height={24}
            className="rounded bg-black/30"
          />
          <button
            onClick={stopRecording}
            className="p-2 rounded-full bg-red-600"
          >
            <StopCircle size={18} className="text-white" />
          </button>
        </>
      ) : (
        <button
          onClick={startRecording}
          className="p-2 rounded-full bg-purple-600"
        >
          <Mic size={18} className="text-white" />
        </button>
      )}

      {/* Send */}
      <button
        onClick={handleSend}
        className="p-2 rounded-full bg-purple-700 hover:bg-purple-800"
      >
        <SendHorizonal size={18} className="text-white" />
      </button>
    </div>
  );
};

export default ChatInput;
