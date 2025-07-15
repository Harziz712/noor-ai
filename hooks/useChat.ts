import { useState } from "react";
import { Message } from "@/data/interfaces";
import genAI from "@/lib/gemini";


const useChats = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sendMessage = async (newMessage: string) => {
    if (newMessage.trim() === "") return;

    const now = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    // Add user message
    const userMessage: Message = {
      sender: "me",
      message: newMessage,
      time: now(),
      isMoneyTransfer: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Show "typing..." loader
    setIsTyping(true);
    const typingMessage: Message = {
      sender: "bot",
      message: "Typing...",
      time: now(),
      isMoneyTransfer: false,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      // Set up Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Send prompt
      const result = await model.generateContent(newMessage);
      const response = await result.response;
      const text = response.text().trim();

      // Replace "typing..." with actual reply
      setMessages((prev) => {
        const withoutTyping = prev.filter((msg) => msg.message !== "Typing...");
        return [
          ...withoutTyping,
          {
            sender: "bot",
            message: text || "Hmm... I couldn't understand that.",
            time: now(),
            isMoneyTransfer: false,
          },
        ];
      });
    } catch (err) {
      console.error("Gemini error:", err);
      setMessages((prev) => [
        ...prev.filter((msg) => msg.message !== "Typing..."),
        {
          sender: "bot",
          message: "Oops! Something went wrong.",
          time: now(),
          isMoneyTransfer: false,
        },
      ]);
    }

    setIsTyping(false);
  };

  return { message, setMessage, messages, sendMessage, isTyping };
};

export default useChats;
