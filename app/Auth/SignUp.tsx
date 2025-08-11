import supabase from '@/lib/supabase';
import React, { useState } from 'react';
import { toast } from "sonner";

const SignUp = () => {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'signup' | 'verify'>('signup');
    const [email, setEmail] = useState('');

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const emailValue = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (!username || !emailValue || !password) {
            toast.error("Please fill in all fields");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: emailValue,
            password,
            options: {
                data: { username }, // ✅ store username in user_metadata
                emailRedirectTo: `${window.location.origin}/Auth/login`, // ✅ fallback for link verification
            },
        });

        setLoading(false);

        if (error) {
            toast.error(error.message || "Signup failed. Please try again");
            return;
        }

        // If OTP is enabled in Supabase, ask for it
        if (data?.user && !data.user.confirmed_at) {
            toast.success("Signup successful! Please check your email for OTP or confirmation link.");
            setEmail(emailValue);
            setStep('verify');
        } else {
            toast.success("Signup successful! You can now log in.");
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const otp = formData.get("otp") as string;

        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'signup', // email sign-up OTP
        });

        setLoading(false);

        if (error) {
            toast.error(error.message || "OTP verification failed");
            return;
        }

        toast.success("Email verified successfully! You can now log in.");
        setStep('signup');
    };

    return (
        <div className="flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                    {step === 'signup' ? 'Create your account' : 'Verify your email'}
                </h2>

                {step === 'signup' ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="username"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Username"
                            />
                            <input
                                type="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Email address"
                            />
                            <input
                                type="password"
                                name="password"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Password"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                className="w-full px-3 py-2 border rounded-md"
                                placeholder="Confirm Password"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md"
                        >
                            {loading ? "Loading..." : "Sign up"}
                        </button>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
                        <input
                            type="text"
                            name="otp"
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter OTP"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 text-white bg-green-600 rounded-md"
                        >
                            {loading ? "Verifying..." : "Verify Email"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SignUp;
