import { Paperclip, Mic, Send } from "lucide-react";
import { useRef, useState } from "react";

type InputProp = {
  className?: string;
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: (msg: string) => void;
};

const ChatInput: React.FC<InputProp> = ({
  className,
  message,
  setMessage,
  sendMessage,
}) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognition.start();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    // You can convert the image to base64 or upload it to a server
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setMessage(message + ` [Image Attached]`);
      // Optional: you can pass this base64 to a sendImage(base64) function
    };
    reader.readAsDataURL(file);
  }
};

const handlePaperclipClick = () => {
  fileInputRef.current?.click();
};

  return (
    <div
      className={`flex items-center py-4 px-3 gap-2 w-full max-w-full bg-transparent backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-3 w-full rounded-full bg-[#3d2072] hover:bg-[#4c2d92] transition px-4 py-4">
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


        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-sm"
        />

       <button
  onClick={handleVoiceInput}
  className={`text-white/70 hover:text-white relative ${
    isRecording ? "animate-bounce text-green-400" : ""
  }`}
>
  <Mic className="w-5 h-5" />
  {isRecording && (
    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white animate-pulse">
      🎤 Listening...
    </span>
  )}
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