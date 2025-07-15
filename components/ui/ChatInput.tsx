import useChats from "@/hooks/useChat";
import { Mic, Paperclip, Send } from "lucide-react";
import React from "react";

interface InputProp {
  className?: string;
}

const ChatInput: React.FC = ({className}:InputProp) => {
  const { message, setMessage, sendMessage } = useChats();

  const handleSend = () => {
    sendMessage(message);
  };

  return (
    <div className={`flex items-center py-2 px-2 gap-2 w-full max-w-full ${className}`}>
      <div className="bg-shedding px-3 py-2 rounded-full w-full flex grid-cols-3 items-center bg-blue-600/70 hover:bg-blue-600 text-white">
     <button className="text-paragraph col-span-1">
          <Paperclip className="w-5 h-5 " />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="flex-1 p-2 text-paragraph col-span-2 outline-none bg-transparent text-base"
        />
           <button className="text-white col-span-1">
          <Mic className="w-5 h-5" />
        </button>
      </div>
        <button
          onClick={handleSend}
          className="bg-blue-600/70 hover:bg-blue-600 text-white rounded-full p-4"
        >
          <Send className="w-5 h-5" />
        </button>
   
    </div>
  );
};

export default ChatInput;