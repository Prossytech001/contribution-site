"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Functional Input component with value/onChange
const Input = ({ 
  placeholder, 
  type = "text", 
  required, 
  value, 
  onChange 
}: { 
  placeholder: string; 
  type?: string; 
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input 
    type={type} 
    placeholder={placeholder} 
    required={required} 
    value={value}
    onChange={onChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" 
  />
);

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 1. Password validation (More than 7 characters)
    if (formData.password.length <= 7) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // 2. Get existing users or empty array
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // 3. Check if user already exists
    const userExists = existingUsers.some((u: any) => u.email === formData.email);
    if (userExists) {
      setError("Account already exists with this email.");
      return;
    }


// ... existing logic ...
const newUser = {
  ...formData,
  verified: false, // NEW: Users start as unverified
  dailyBalance: 0,
  foodBalance: 0,
  transactions: [],
  groups: [],
  memberId: Math.floor(1000 + Math.random() * 9000)
};

existingUsers.push(newUser);
localStorage.setItem("users", JSON.stringify(existingUsers));

    // 4. Save new user
    existingUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Account created successfully!");
    router.push("/login"); // Go to login after signup
  };

  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-bold text-slate-900">ĐǻΖΉ</Link>
        <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium">Log in</Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">Sign Up</h2>
          
          {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}

          <form onSubmit={handleSignup} className="space-y-4">
            <Input placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <Input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <Input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
            <Input type="password" placeholder="Password (Min 8 chars)" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            
            <button type="submit" className="w-full bg-emerald-500 text-white font-medium py-3 rounded-lg hover:bg-emerald-600 transition mt-4">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}