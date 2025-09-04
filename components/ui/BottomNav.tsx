"use client";

import { Home, Image, MessageCircle, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={22} />, path: "/dashboard" },
    { id: "gallery", label: "Gallery", icon: <Image size={22} />, path: "/gallery" },
    { id: "chat", label: "Chat", icon: <MessageCircle size={22} />, path: "/chat" },
    { id: "history", label: "History", icon: <Clock size={22} />, path: "/history" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 py-3 flex justify-around items-center">
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center text-sm transition-colors duration-300 ${
              isActive ? "text-white" : "text-gray-300"
            }`}
          >
            <div
              className={`transition-all duration-300 flex  justify-center gap-2 items-center  ${
                isActive
                  ? "bg-purple-600/60 rounded-full p-2  shadow-md scale-110"
                  : "bg-purple-600/50 rounded-full p-3  "
              }`}
            >
             <span   
             className={` ${
                isActive
                  ? "bg-gradient-to-b from-purple-950 via-purple-700 to-purple-500 rounded-full p-2 shadow-md "
                  : " rounded-full p-1"
              }`}> {item.icon}</span>
                          {isActive && <span className="text-sm text-white">{item.label}</span>}
            </div>

          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
