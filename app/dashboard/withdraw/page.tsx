"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowDownLeft } from "lucide-react";
import { useState, Suspense } from "react";

function WithdrawContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const accountType = searchParams.get("account") || "daily";

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const amountNum = parseFloat(amount);

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const balance = accountType === "daily" ? currentUser.dailyBalance : currentUser.foodBalance;

    if (amountNum > balance) {
      setError("Insufficient balance!");
      return;
    }

    // Process Withdrawal
    if (accountType === "daily") currentUser.dailyBalance -= amountNum;
    else currentUser.foodBalance -= amountNum;

    const newTransaction = {
      id: Date.now(),
      category: accountType,
      date: new Date().toLocaleDateString(),
      description: `Withdrawal to Bank`,
      amount: amountNum,
      status: "Success"
    };
    currentUser.transactions = [newTransaction, ...currentUser.transactions];

    // Save
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = allUsers.map((u: any) => u.email === currentUser.email ? currentUser : u);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Withdrawal successful! Funds sent to your registered bank.");
    router.push("/dashboard/user");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <button onClick={() => router.back()} className="text-gray-400 flex items-center gap-2 mb-6 hover:text-gray-600">
          <ArrowLeft size={16}/> Back
        </button>
        <h2 className="text-2xl font-bold mb-2">Withdraw Funds</h2>
        <p className="text-gray-500 text-sm mb-6 capitalize">From {accountType} account</p>

        {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</p>}

        <form onSubmit={handleWithdraw} className="space-y-4">
          <input 
            type="number" placeholder="Enter Amount" 
            className="w-full p-4 border rounded-xl text-xl font-bold"
            value={amount} onChange={(e) => setAmount(e.target.value)} required
          />
          <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2">
            <ArrowDownLeft size={18}/> Withdraw Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default function WithdrawPage() {
  return <Suspense><WithdrawContent /></Suspense>;
}