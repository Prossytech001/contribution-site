"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/Component/ui/input"; // Ensure this UI component accepts value/onChange

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Fetch registered users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");


// Inside handleLogin in LoginPage
const foundUser = savedUsers.find(
  (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
);

// Inside your Login handleLogin function:
if (foundUser) {
  if (!foundUser.verified && !email.includes("admin")) {
    setError("Your account is pending admin approval.");
    return;
  }
  // ... rest of login logic
}

if (foundUser) {
  // Save the logged-in user's info to session
  localStorage.setItem("currentUser", JSON.stringify(foundUser));
  
  if (email.toLowerCase().includes("admin")) {
    router.push("/dashboard/admin");
  } else {
    router.push("/dashboard/user");
  }
}
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">Log In</h1>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input 
            label="Email" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••" 
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            required 
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}