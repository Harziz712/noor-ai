import { useState } from "react";
import { Message } from "@/data/interfaces";

const useChats = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const sendMessage = async (newMessage: string) => {
    if (newMessage.trim() === "") return;

    const now = () => new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      sender: "me",
      message: newMessage,
      time: now(),
      isMoneyTransfer: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // 1. Show "typing..." message
    setIsTyping(true);
    const typingMessage: Message = {
      sender: "bot",
      message: "Typing...",
      time: now(),
      isMoneyTransfer: false,
    };
    setMessages((prev) => [...prev, typingMessage]);

    // 2. Simulate response after 1.5s
    setTimeout(() => {
      setIsTyping(false);

      const aiReply: Message = {
        sender: "bot",
        message: generateBotReply(newMessage),
        time: now(),
        isMoneyTransfer: false,
      };

      setMessages((prev) => {
        // Remove the "typing..." message before adding real reply
        const withoutTyping = prev.filter(msg => msg.message !== "Typing...");
        return [...withoutTyping, aiReply];
      });
    }, 1500);
  };

  const generateBotReply = (input: string): string => {
    if (input.toLowerCase().includes("hello")) return "Hi there! 👋";
    if (input.toLowerCase().includes("your name")) return "I'm Nooria, your AI assistant.";
    return "That's interesting! Tell me more.";
  };

  return { message, setMessage, messages, sendMessage, isTyping };
};

export default useChats;
