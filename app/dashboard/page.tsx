'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import supabase from '@/lib/supabase';
import { toast } from 'sonner';

export default function Dashboard() {
    const router = useRouter();
    const [fullName, setFullName] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();

            if (error || !data.user) {
                router.push('/'); // if no user, redirect to login
                return;
            }

            // Grab from metadata (this is where your "Harziiz" is stored)
            const name = data.user.user_metadata?.full_name || data.user.email;
            setFullName(name);
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("Failed to log out, please try again.");
        } else {
            toast.success("Logged out successfully.");
            router.push('/'); // Redirect to login
        }
    };

    return (
        <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">
                {fullName ? `Welcome, ${fullName}! 🎉` : "Loading..."}
            </h1>

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
