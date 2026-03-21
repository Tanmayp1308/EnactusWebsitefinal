"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleUpdate = async () => {
    if (!password) {
      setMessage("Enter a new password");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Password updated successfully!");
      setTimeout(() => {
        router.push("/admin/login");
      }, 1500);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#1f1b1b] p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">
          Set New Password
        </h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 bg-black border border-white text-white"
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Update Password
        </button>

        {message && (
          <p className="text-sm text-center text-white mt-4">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}