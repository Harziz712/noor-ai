"use client";

import { Copy, Volume2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRef } from "react";

interface MessageBubbleProps {
  message: string;
  time: string;
  isTyping?: boolean;
  isMe?: boolean;
}

const ActionButton = ({
  onClick,
  icon: Icon,
}: {
  onClick: () => void;
  icon: React.ElementType;
}) => (
  <button onClick={onClick}>
    <Icon className="w-4 h-4 text-white/60 hover:text-white transition" />
  </button>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  time,
  isTyping = false,
  isMe = false,
}) => {
  const messageRef = useRef<HTMLDivElement | null>(null);

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
    <div
      className={`relative max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
        isMe
          ? "bg-[#2f185b] text-white rounded-br-none"
          : "bg-gray-800 text-white/90 rounded-bl-none w-full"
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
        <div ref={messageRef} className="prose prose-invert max-w-none pr-10">
<ReactMarkdown
  components={{
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match?.[1] || "text"}
          PreTag="div"
          className="rounded-lg"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-black/30 px-1 py-0.5 rounded" {...props}>
          {children}
        </code>
      );
    },
  }}
>
  {message}
</ReactMarkdown>


        </div>
      )}

      {/* Actions + Timestamp */}
      <div className="w-full flex justify-between pt-3 gap-2">
        {!isTyping && (
          <div className="flex gap-2">
            <ActionButton onClick={handleCopy} icon={Copy} />
            <ActionButton onClick={handleSpeak} icon={Volume2} />
          </div>
        )}
        <span className="text-xs text-white/50 mt-1 block text-right">
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
