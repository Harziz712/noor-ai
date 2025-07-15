import { useState } from "react";
import { ChatMessages } from "@/data";
import { Message } from "@/data/interfaces";

const useChats = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(ChatMessages);

  const sendMessage = (newMessage: string) => {
    if (newMessage.trim() === "") return; // Prevent sending empty messages
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const messageToSend: Message = {
      sender: "me",
      message: newMessage,
      time: currentTime,
      isMoneyTransfer: false,
    };
    setMessages((prevMessages) => [...prevMessages, messageToSend]);
    setMessage(""); // Clear the input after sending
  };

  return { message, setMessage, messages, sendMessage };
};

export default useChats;
