"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Wallet, Utensils, CreditCard, Copy, CheckCircle2 } from "lucide-react";
import { useState, Suspense, useEffect } from "react";

function DepositContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accountType = searchParams.get("account") || "daily";

  const isFood = accountType === "food";
  const themeColor = isFood ? "bg-orange-600" : "bg-blue-600";
  const themeBorder = isFood ? "border-orange-600" : "border-blue-600";
  const themeBg = isFood ? "bg-orange-50" : "bg-blue-50";

  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate network delay
    setTimeout(() => {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) return;

      // 1. Get current data from localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const allUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // 2. Initialize balances if they don't exist
      if (!currentUser.dailyBalance) currentUser.dailyBalance = 0;
      if (!currentUser.foodBalance) currentUser.foodBalance = 0;
      if (!currentUser.transactions) currentUser.transactions = [];

      // 3. Update the specific balance
      if (accountType === "daily") {
        currentUser.dailyBalance += amountNum;
      } else {
        currentUser.foodBalance += amountNum;
      }

      // 4. Record the transaction
      const newTransaction = {
        id: Date.now(),
        category: accountType,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        description: `Deposit via ${paymentMethod.toUpperCase()}`,
        amount: amountNum,
        status: "Success"
      };
      currentUser.transactions = [newTransaction, ...currentUser.transactions];

      // 5. Save back to localStorage (Session and Main DB)
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      
      const updatedUsers = allUsers.map((u: any) => 
        u.email === currentUser.email ? currentUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      alert("Payment Successful!");
      router.push("/dashboard/user");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className={`${themeColor} p-6 text-white`}>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4 transition">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              {isFood ? <Utensils size={24} /> : <Wallet size={24} />}
            </div>
            <div>
              <h1 className="text-xl font-bold capitalize">{accountType} Account</h1>
              <p className="text-sm opacity-90">Secure Deposit</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleDeposit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount to Deposit (₦)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod("card")}
                  className={`border-2 p-4 rounded-xl flex flex-col items-center gap-2 transition ${paymentMethod === "card" ? `${themeBorder} ${themeBg} text-slate-900` : "border-gray-100 text-gray-400"}`}
                >
                  <CreditCard size={24} />
                  <span className="text-xs font-bold">Debit Card</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod("transfer")}
                  className={`border-2 p-4 rounded-xl flex flex-col items-center gap-2 transition ${paymentMethod === "transfer" ? `${themeBorder} ${themeBg} text-slate-900` : "border-gray-100 text-gray-400"}`}
                >
                  <Wallet size={24} />
                  <span className="text-xs font-bold">Bank Transfer</span>
                </button>
              </div>
            </div>

            {/* Conditional Transfer View */}
            {paymentMethod === "transfer" && (
              <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 animate-in fade-in slide-in-from-top-2">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-2">Manual Bank Transfer</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Bank Name</span>
                    <span className="text-sm font-bold">Kuda Microfinance</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Account Number</span>
                    <button type="button" className="text-sm font-bold flex items-center gap-1 text-blue-600">
                      2044928110 <Copy size={12} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Account Name</span>
                    <span className="text-sm font-bold uppercase">DAZE CONTRIBUTION</span>
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing || !amount}
              className={`w-full ${themeColor} text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg disabled:opacity-50 flex items-center justify-center gap-2`}
            >
              {isProcessing ? "Processing..." : `Pay ₦${Number(amount).toLocaleString()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function DepositPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DepositContent />
    </Suspense>
  );
}