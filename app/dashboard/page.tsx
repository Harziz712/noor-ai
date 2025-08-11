'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import supabase from '@/lib/supabase';
import { toast } from 'sonner';

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Failed to log out, please try again.");
        } else {
            toast.success("Logged out successfully.");
            router.push('/Auth/login');// Redirect to login
        }
    };

    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100">
            <Link
                href="/chat"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
                Start Chatting
            </Link>

            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
                Log Out
            </button>
        </div>
    );
}
