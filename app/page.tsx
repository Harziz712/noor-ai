"use client";

import { useState, useEffect } from "react";
import ChatPage from "@/components/chatpage";
import NoorLoader from "@/components/ui/NoorLoader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500); // match loader duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-black max-h-[100vh]">  
      {isLoading ? <NoorLoader /> : <ChatPage />}
    </main>
  );
};

export default Home;
