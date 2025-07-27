import { Copy, Volume2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatMessageProps {
  message: string;
  sender: "me" | "bot";
  time: string;
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  time,
  isTyping = false,
}) => {
  const isMe = sender === "me";
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={`flex w-full mb-3 px-4 ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[75%] rounded-2xl px-4 py-3 text-sm   ${
          isMe
            ? "bg-[#5e2ea3] text-white rounded-br-none"
            : " text-white/90 rounded-bl-none"
        }`}
      >
  
        {/* Message */}
        {isTyping ? (
          <div className="flex gap-1">
            <span className="animate-bounce w-1.5 h-1.5 bg-white rounded-full" />
            <span className="animate-bounce w-1.5 h-1.5 bg-white rounded-full delay-100" />
            <span className="animate-bounce w-1.5 h-1.5 bg-white rounded-full delay-200" />
          </div>
        ) : (
          <p ref={messageRef} className="pr-10">
            {message}
          </p>
        )}
        {/* {message actions & timestamp} */}
        <div className="w-full flex justify-between pt-3 gap-2">
      {/* Action Buttons */}
        {!isTyping && (
          <div className=" flex gap-2">
            <button onClick={handleCopy}>
              <Copy className="w-4 h-4 text-white/60 hover:text-white transition" />
            </button>
            <button onClick={handleSpeak}>
              <Volume2 className="w-4 h-4 text-white/60 hover:text-white transition" />
            </button>
          </div>
        )}

        {/* Timestamp */}
        <span className="text-xs text-white/50 mt-1 block text-right">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
