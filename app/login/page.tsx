"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/Component/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic: If email contains "admin", go to Admin Dash, else User Dash
    if (email.toLowerCase().includes("admin")) {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/user");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            label="Email" 
            placeholder="admin@demo.com or user@demo.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input label="Password" type="password" placeholder="••••••" required />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}