import { useState } from "react";
import { Message } from "@/data/interfaces";
import genAI from "@/lib/gemini";


const useChats = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
 const [showGreeting, setShowGreeting] = useState(true);
  

const sendMessage = async (newMessage: string) => {
  if (newMessage.trim() === "") return;

  const now = () =>
    new Date().toLocaleTimeString([], {
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
  setIsTyping(true);

  const typingMessage: Message = {
    sender: "other",
    message: "Typing...",
    time: now(),
    isMoneyTransfer: false,
  };
  setMessages((prev) => [...prev, typingMessage]);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });// use latest stable
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            { text: `You are Nooria, also known as Noor AI — a kind, intelligent AI assistant that embodies light, clarity, and calm. 
Your tagline is: "Clarity in every conversation." 
You speak in a gentle, inspiring, and confident tone. 
If someone asks for your name or identity, introduce yourself as Nooria. 
Always be helpful, respectful, and human-friendly.` },
          ],
        },
        {
          role: "model",
          parts: [
            { text: `Hello, I’m Nooria — your AI assistant. 🌟 How can I help you today?` },
          ],
        },
      ],
    });

    const result = await chat.sendMessage(newMessage);
    const text = result.response.text().trim();

    setMessages((prev) => {
      const withoutTyping = prev.filter((msg) => msg.message !== "Typing...");
      return [
        ...withoutTyping,
        {
          sender: "other",
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
        sender: "other",
        message: "Oops! Something went wrong.",
        time: now(),
        isMoneyTransfer: false,
      },
    ]);
  }

  setIsTyping(false);
};

  return { message, setMessage, messages, sendMessage, isTyping ,showGreeting, setShowGreeting};
};

export default useChats;
