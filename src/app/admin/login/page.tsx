"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ALLOWED_ADMINS = [
  "tanmaypandit1308@gmail.com",
  "garvg2606@gmail.com",
  "khushipandey93540@gmail.com",
  "vidhigarg247@gmail.com",
  "monisharai056@gmail.com",
  "komalsaini257408@gmail.com",
  "09bhoomikasinghal@gmail.com",
  "pragungulati9@gmail.com",
  "bahulikasrivastava@gmail.com",
  "alisha.ahlawat.75@gmail.com",
];

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const userEmail = data.user?.email;

    if (!userEmail || !ALLOWED_ADMINS.includes(userEmail)) {
      await supabase.auth.signOut();
      setError("You are not authorized to access admin");
      return;
    }

    router.push("/admin");
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your email first");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/admin/reset",
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent!");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f7fb] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm border border-black">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-black">Admin Login</h1>
          <p className="text-sm text-black mt-1">
            Enactus Aryabhatta · Internal Access
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {message && (
            <p className="text-sm text-green-600 text-center">{message}</p>
          )}

          <button onClick={handleLogin} className="admin-btn-blue">
            Login
          </button>

          <button
            type="button"
            onClick={handleResetPassword}
            className="text-sm text-blue-600 underline mt-3 w-full text-center"
          >
            Forgot password?
          </button>
        </div>

        <p className="text-xs text-center text-black mt-6">
          Only authorized members are allowed
        </p>
      </div>

      <style jsx>{`
        .admin-input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          outline: none;
          color: #000;
        }

        .admin-btn-blue {
          width: 100%;
          background: #2563eb;
          color: white;
          padding: 10px;
          border-radius: 10px;
          font-weight: 500;
        }
      `}</style>
    </main>
  );
}