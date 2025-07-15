import { Message } from "@/data/interfaces";
import React from "react";

export const ChatMessage: React.FC<Message> = ({
  message,
  time,
  sender,
  isMoneyTransfer,
}) => {
  return (
    <div
      className={`flex flex-col gap-1 ${
        sender === "me" ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`rounded-2xl px-4 py-2 text-sm max-w-[80%] ${
          sender === "system" && "text-paragraphtext-xs mx-auto"
        } ${sender === "me" && "bg-stone-200 text-stone-800"} ${
          sender === "other" && "bg-shedding"
        } ${
          isMoneyTransfer &&
          "bg-primary text-text-stone-900 flex items-center gap-2"
        }`}
      >
        {isMoneyTransfer ? (
          <>
            <span className="flex w-6 h-6 bg-white text-primary rounded-full items-center justify-center font-bold">
              ↺
            </span>
            <span>
              Money Transfer
              <br />
              <strong>{message}</strong>
            </span>
          </>
        ) : (
          message
        )}
      </div>
      {sender !== "system" && (
        <span className="text-xs text-stone-300 mt-0.5">{time}</span>
      )}
    </div>
  );
};

export default ChatMessage;
