import { useRouter } from 'next/navigation';
import Link from 'next/link';

'use client';


export default function Dashboard() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Link
                href="/chat"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
                Start Chatting
            </Link>
        </div>
    );
}