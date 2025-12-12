"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Input = ({ placeholder, type = "text", required }: { placeholder: string; type?: string; required?: boolean }) => (
  <input type={type} placeholder={placeholder} required={required} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
);

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup success -> Go to User Dashboard
    router.push("/dashboard/user");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <h1 className="text-xl font-bold text-slate-900">Money Contribution</h1>
        <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium">
          Log in
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">Sign Up</h2>
          <form onSubmit={handleSignup} className="space-y-2">
            <Input placeholder="Full Name" required />
            <Input type="email" placeholder="Email" required />
            <Input type="tel" placeholder="Phone" required />
            <Input type="password" placeholder="Password" required />
            
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