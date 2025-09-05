"use client";

import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import { MessageCircle, FileText, ListTodo, BookOpen, LogOut } from "lucide-react";
import DashboardCard from "@/components/ui/DashboardCard";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useUser();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to log out, please try again.");
    } else {
      toast.success("Logged out successfully.");
      router.push("/");
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f0932] via-[#1a0033] to-purple-700 text-white p-8">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-md font-bold">
          Welcome, <br/>{user?.user_metadata?.full_name || user?.email} 👋
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 
                     text-white text-xs w-26 font-medium px-4 py-2 rounded-lg shadow transition"
        >
          <LogOut size={18} /> Log Out
        </button>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="AI Chat"
          description="Start chatting with Noor AI in real time."
          href="/chat"
          icon={MessageCircle}
        />
        <DashboardCard
          title="Notes & Summaries"
          description="Upload text or documents and let Noor summarize key points."
          href="/notes"
          icon={FileText}
        />
        <DashboardCard
          title="Tasks & Reminders"
          description="Turn conversations into tasks with due dates."
          href="/tasks"
          icon={ListTodo}
        />
        <DashboardCard
          title="Study Mode"
          description="Explain concepts, practice questions, and flashcards."
          href="/study"
          icon={BookOpen}
        />
      </main>
    </div>
  );
}