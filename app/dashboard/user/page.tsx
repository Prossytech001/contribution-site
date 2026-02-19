"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wallet, Utensils, ArrowUpRight, ArrowDownLeft, History, Users, CheckCircle2, Plus } from "lucide-react";

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Available Groups Mock Data
  const AVAILABLE_GROUPS = [
    { id: 1, name: "December Rice Pack", members: 124, target: "₦50,000" },
    { id: 2, name: "Sallah Ram Savings", members: 89, target: "₦120,000" },
    { id: 3, name: "Weekly Meat Sharing", members: 45, target: "₦15,000" },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      router.push("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      // Initialize groups if not exists
      if (!parsedUser.groups) parsedUser.groups = [];
      setUser(parsedUser);
    }
  }, [router]);

  // --- FUNCTION: JOIN GROUP ---
  const handleJoinGroup = (groupName: string) => {
    if (user.groups.includes(groupName)) return;

    const updatedUser = {
      ...user,
      groups: [...user.groups, groupName]
    };

    saveUserData(updatedUser);
    alert(`Successfully joined ${groupName}!`);
  };

  // --- FUNCTION: SAVE DATA HELPER ---
  const saveUserData = (updatedUser: any) => {
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
    // Sync with main users list
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsersList = allUsers.map((u: any) => 
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsersList));
  };
  

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <Link href="/" className="font-bold text-xl text-slate-800">ĐǻΖΉ</Link>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-900">{user.name}</p>
            <p className="text-xs text-gray-500">ID: #{user.memberId || '4492'}</p>
          </div>
          <button onClick={handleLogout} className="bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 px-4 py-2 text-sm rounded-lg transition font-medium">
            Log Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Welcome, {user.name.split(" ")[0]}</h2>
            <p className="text-gray-500">Dashboard</p>
          </div>
        </header>

        {/* ACCOUNT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* DAILY ACCOUNT */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
              <div>
                <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">Daily Contribution</span>
                <h3 className="text-4xl font-bold mb-1">₦{(user.dailyBalance || 0).toLocaleString()}</h3>
              </div>
              <div className="mt-8 flex gap-3">
                <Link href="/dashboard/deposit?account=daily" className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2">
                  <ArrowUpRight size={16} /> Deposit
                </Link>
                {/* NEW WITHDRAW BUTTON */}
                <Link href="/dashboard/withdraw?account=daily" className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 border border-white/20">
                  <ArrowDownLeft size={16} /> Withdraw
                </Link>
              </div>
            </div>
          </div>

          {/* FOOD ACCOUNT */}
          <div className="bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
              <div>
                <span className="text-orange-100 text-xs font-bold uppercase tracking-wider">Food Account</span>
                <h3 className="text-4xl font-bold mb-1">₦{(user.foodBalance || 0).toLocaleString()}</h3>
              </div>
              <div className="mt-8 flex gap-3">
                <Link href="/dashboard/deposit?account=food" className="flex-1 bg-white text-orange-700 hover:bg-orange-50 py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2">
                  <ArrowUpRight size={16} /> Deposit
                </Link>
                <Link href="/dashboard/withdraw?account=food" className="flex-1 bg-orange-800/30 hover:bg-orange-800/50 py-3 rounded-xl text-center text-sm font-bold flex items-center justify-center gap-2 border border-white/20">
                  <ArrowDownLeft size={16} /> Withdraw
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* RECENT TRANSACTIONS */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg flex items-center gap-2"><History size={30}/> Transactions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-gray-50">
                  {user.transactions?.map((tx: any) => (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-6 font-medium capitalize">{tx.category}</td>
                      <td className="py-4 px-6 text-gray-500">{tx.date}</td>
                      <td className="py-4 px-6 text-slate-700">{tx.description}</td>
                      <td className={`py-4 px-6 text-right font-bold ${tx.description.includes('Withdraw') ? 'text-red-600' : 'text-slate-900'}`}>
                        {tx.description.includes('Withdraw') ? '-' : '+'}₦{tx.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* GROUPS SECTION */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Users size={20}/> Savings Groups</h3>
              <div className="space-y-4">
                {AVAILABLE_GROUPS.map((group) => {
                  const isJoined = user.groups?.includes(group.name);
                  return (
                    <div key={group.id} className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm">{group.name}</h4>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500">{group.members} members</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">Target: {group.target}</p>
                      <button 
                        onClick={() => handleJoinGroup(group.name)}
                        disabled={isJoined}
                        className={`w-full py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 ${
                          isJoined 
                          ? "bg-emerald-50 text-emerald-600 cursor-default" 
                          : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                        }`}
                      >
                        {isJoined ? <><CheckCircle2 size={15}/> Joined</> : <><Plus size={14}/> Join Group</>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}