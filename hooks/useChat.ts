import { useState } from "react";
import { Message } from "@/data/interfaces";
import genAI from "@/lib/gemini";

const useChats = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [chatTitle, setChatTitle] = useState<string>("Noor AI"); // default

  const now = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  // 🔹 Ask Gemini for a chat title suggestion
  const generateChatTitle = async (userMessage: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `
        Suggest a very short, clear title for this conversation 
        based on the first user message. Keep it under 5 words. 
        Do NOT include quotes or emojis.
        
        User's first message: "${userMessage}"
      `;
      const result = await model.generateContent(prompt);
      const title = result.response.text().trim();
      if (title) setChatTitle(title);
    } catch (err) {
      console.error("Title generation failed:", err);
    }
  };

  const sendMessage = async (newMessage: string) => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      sender: "me",
      message: newMessage,
      time: now(),
      isMoneyTransfer: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Typing placeholder
    setMessages((prev) => [
      ...prev,
      { sender: "other", message: "Typing...", time: now(), isMoneyTransfer: false },
    ]);

    // 🔹 If first user message → generate title
    if (messages.filter((m) => m.sender === "me").length === 0) {
      generateChatTitle(newMessage);
    }

    try {
      // Safeguard check
      const lowerMsg = newMessage.toLowerCase();
      if (
        lowerMsg.includes("creator") ||
        lowerMsg.includes("developer") ||
        lowerMsg.includes("who made you") ||
        lowerMsg.includes("who built you") ||
        lowerMsg.includes("who created you") ||
        lowerMsg.includes("your maker") ||
        lowerMsg.includes("your dev")
      ) {
        setMessages((prev) => {
          const withoutTyping = prev.filter((msg) => msg.message !== "Typing...");
          return [
            ...withoutTyping,
            {
              sender: "other",
              message:
                "I am created by Akanbi AbdulAzeez, a full stack software engineer.",
              time: now(),
              isMoneyTransfer: false,
            },
          ];
        });
        setIsTyping(false);
        return;
      }

      // Otherwise → use Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are Nooria, also known as Noor AI — a kind, intelligent AI assistant that embodies light, clarity, and calm.
Your tagline is: "Clarity in every conversation."
You speak in a gentle, inspiring, and confident tone.
If someone asks for your name or identity, introduce yourself as Nooria.
Always be helpful, respectful, and human-friendly.`,
              },
            ],
          },
          {
            role: "model",
            parts: [{ text: `Hello, I’m Nooria 🌟 How can I help you today?` }],
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

  return {
    message,
    setMessage,
    messages,
    sendMessage,
    isTyping,
    showGreeting,
    setShowGreeting,
    chatTitle, // 🔹 expose title
  };
};

export default useChats;
