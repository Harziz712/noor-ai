"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import NoorLoader from "@/components/ui/NoorLoader";
import Auth from "@/components/Auth/Auth";

const Home = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.push("/chat");
    }
  }, [loading, user, router]);

  return (
    <main className="bg-black max-h-screen">
      {showLoader ? (
        <NoorLoader />
      ) : loading ? (
        <div className="text-white">Checking session...</div>
      ) : (
        <Auth />
      )}
    </main>
  );
};

export default Home;
