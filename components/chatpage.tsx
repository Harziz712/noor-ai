"use client";

import React from "react";
import ChatTitle from "./ui/ChatTitle";
import ChatInput from "./ui/ChatInput";
import { Menu } from "lucide-react";


interface ChatPageProps {
  chatName?: string;
}

const ChatPage: React.FC<ChatPageProps> = ({
  chatName = "Noor ai ",
}) => {



  return (
    <main className="flex flex-col bg-yellow-200 h-screen relative">
      <ChatTitle
        title={ chatName }
        action ={    <span className="h-[36px] w-[36px] flex justify-center items-center bg-blue-600/30 hover:bg-blue-600 rounded-full">
          <Menu
            className="cursor-pointer text-white  "
            size={20}
          />
          </span>}
      />


      <ChatInput className=" absolute bottom-0 left-0 right-0" />
    </main>
  );
};

export default ChatPage;

    //   <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
    //     {ChatMessages.map((msg, index) => (
    //       <React.Fragment key={index}>
    //         {/* If you want to show a day divider, you can add logic here */}
    //         {/* <ChatDayDivider day="Today" /> */}
    //         <ChatMessage key={index} {...msg} />
    //       </React.Fragment>
    //     ))}
    //   </div>