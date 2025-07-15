import { Mic, Paperclip, Send } from "lucide-react";
import React from "react";

interface InputProp {
  className?: string;
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: (msg: string) => void;
}

const ChatInput: React.FC<InputProp> = ({
  className,
  message,
  setMessage,
  sendMessage,
}) => {
  const handleSend = () => {
    sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`flex items-center py-4 px-3 gap-2 w-full max-w-full bg-transparent backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-3 w-full rounded-full bg-[#3d2072] hover:bg-[#4c2d92] transition px-4 py-4">
        <button className="text-white/70 hover:text-white">
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-sm"
        />

        <button className="text-white/70 hover:text-white">
          <Mic className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={handleSend}
        className="p-3 bg-[#5e2ea3] hover:bg-[#7741cb] rounded-full transition text-white"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatInput;
