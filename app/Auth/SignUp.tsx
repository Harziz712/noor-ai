"use client";

import OtpInput from "@/components/OtpInput";
import supabase from "@/lib/supabase";
import React, { useState } from "react";
import { toast } from "sonner";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"signup" | "verify">("signup");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  // Step 1: Signup
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const emailValue = formData.get("email") as string;
    const pass = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!username || !emailValue || !pass) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (pass !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Create the user (no auto login, just send OTP email)
    const { error } = await supabase.auth.signUp({
      email: emailValue,
      password: pass,
      options: {
        emailRedirectTo: undefined, // no redirect
      },
    });

    if (error) {
      toast.error(error.message || "Signup failed. Please try again");
      setLoading(false);
      return;
    }

    toast.success("Signup successful! Check your email for the OTP.");
    setEmail(emailValue);
    setFullName(username);
    setPassword(pass);
    setStep("verify");
    setLoading(false);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!otp || otp.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup", // ✅ correct type for email sign-up OTP
    });

    if (error) {
      toast.error(error.message || "OTP verification failed");
      setLoading(false);
      return;
    }

    // ✅ Only insert profile after verification
    if (data?.user) {
      const { id } = data.user;

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id,
          full_name: fullName,
          email: email,
        });

      if (profileError) {
        console.error("Error inserting into profiles:", profileError);
        toast.error("Account verified, but profile save failed");
      }
    }

    toast.success("Email verified successfully! You can now log in.");
    setStep("signup"); // reset form
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 min-h-screen">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          {step === "signup" ? "Create your account" : "Verify your email"}
        </h2>

        {step === "signup" ? (
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
            <OtpInput length={6} onChange={(code) => setOtp(code)} />
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
