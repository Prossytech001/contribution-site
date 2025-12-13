"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Wallet, Utensils, CreditCard } from "lucide-react";
import { useState, Suspense } from "react";

// We need Suspense for useSearchParams to work correctly in Next.js App Router during build
function DepositContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accountType = searchParams.get("account") || "daily"; // Default to daily if null

  const isFood = accountType === "food";
  const themeColor = isFood ? "bg-orange-600" : "bg-blue-600";
  const themeText = isFood ? "text-orange-600" : "text-blue-600";

  const [amount, setAmount] = useState("");

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Successfully deposited ₦${amount} to ${accountType.toUpperCase()} account!`);
    router.push("/dashboard/user");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className={`${themeColor} p-6 text-white`}>
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4 transition"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              {isFood ? <Utensils size={24} /> : <Wallet size={24} />}
            </div>
            <div>
              <h1 className="text-xl font-bold capitalize">{accountType} Contribution</h1>
              <p className="text-sm opacity-90">Make a secure deposit</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleDeposit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Deposit (₦)</label>
              <input 
                type="number" 
                placeholder="e.g. 5000" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className={`border-2 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition ${themeColor === "bg-blue-600" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-orange-600 bg-orange-50 text-orange-700"}`}>
                  <CreditCard size={24} />
                  <span className="text-sm font-bold">Card</span>
                </button>
                <button type="button" className="border border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-gray-50 text-gray-600 transition">
                  <Wallet size={24} />
                  <span className="text-sm font-bold">Transfer</span>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className={`w-full ${themeColor} text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg mt-4`}
            >
              Pay ₦{amount || "0.00"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default function DepositPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DepositContent />
    </Suspense>
  );
}