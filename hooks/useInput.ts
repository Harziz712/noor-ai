import { useRef, useState, useEffect } from "react";

export type InputProp = {
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: (msg: string) => void;
};

const useInput = ({ message, setMessage, sendMessage }: InputProp) => {
  const [inputMessage, setInputMessage] = useState(message);
  const [isRecording, setIsRecording] = useState(false);

  // 🔄 Sync external `message` into local `inputMessage` when it changes
  useEffect(() => {
    setInputMessage(message);
  }, [message]);

  const handleSend = () => {
    sendMessage(inputMessage);
    setInputMessage(""); // Clear input after sending
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
      setInputMessage(transcript); // 👈 update local input
    };

    recognition.start();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setInputMessage((prev) => prev + " [Image Attached]");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaperclipClick = () => {
    fileInputRef.current?.click();
  };

  return {
    isRecording,
    inputMessage,
    setInputMessage,
    handleSend,
    handleKeyDown,
    handleVoiceInput,
    fileInputRef,
    handleFileUpload,
    handlePaperclipClick,
  };
};

export default useInput;
