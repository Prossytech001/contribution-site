"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Users, Wallet, Clock, ShieldCheck, Trash2, 
  Power, Plus, LayoutDashboard, UserCheck, Search 
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  
  // States
  const [activeTab, setActiveTab] = useState<"overview" | "management">("overview");
  const [users, setUsers] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalMoney: 0, totalTransactions: 0 });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    // 1. Load Users
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // 2. Load/Initialize Groups
    let savedGroups = JSON.parse(localStorage.getItem("groups") || "[]");
    if (savedGroups.length === 0) {
      savedGroups = [
        { id: 1, name: "December Rice Pack", members: 124 },
        { id: 2, name: "Sallah Ram Savings", members: 89 }
      ];
      localStorage.setItem("groups", JSON.stringify(savedGroups));
    }

    // 3. Calculate Global Stats
    const totalMoney = savedUsers.reduce((acc: number, u: any) => acc + (u.dailyBalance || 0) + (u.foodBalance || 0), 0);
    const totalTransactions = savedUsers.reduce((acc: number, u: any) => acc + (u.transactions?.length || 0), 0);

    setUsers(savedUsers);
    setGroups(savedGroups);
    setStats({ totalUsers: savedUsers.length, totalMoney, totalTransactions });
  };

  // --- ACTIONS ---
  const handleUserAction = (email: string, action: 'verify' | 'delete') => {
    let updatedUsers;
    if (action === 'verify') {
      updatedUsers = users.map((u: any) => u.email === email ? { ...u, verified: true } : u);
    } else {
      updatedUsers = users.filter((u: any) => u.email !== email);
    }
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    refreshData();
  };

  const handleShutdownGroup = (id: number) => {
    const updatedGroups = groups.filter(g => g.id !== id);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
    setGroups(updatedGroups);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  // Compute master transactions for Overview
  const allTransactions = users.flatMap(user => 
    (user.transactions || []).map((tx: any) => ({ ...tx, userName: user.name }))
  ).sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans flex flex-col">
      
      {/* NAVIGATION BAR */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-8">
           <Link href="/" className="font-bold text-xl text-blue-600">ĐǻΖΉ ADMIN</Link>
          
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition ${activeTab === "overview" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <LayoutDashboard size={16} /> Overview
            </button>
            <button 
              onClick={() => setActiveTab("management")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition ${activeTab === "management" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              <UserCheck size={16} /> User Management
            </button>
          </div>
        </div>

        <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 text-sm rounded-lg font-bold hover:bg-red-100 transition">
          Log Out
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 w-full">
        
        {/* STATS SECTION (Always visible at top) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 text-blue-600 mb-2 font-medium text-sm"><Users size={18}/> Total Users</div>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 text-emerald-600 mb-2 font-medium text-sm"><Wallet size={18}/> Platform Money</div>
            <p className="text-3xl font-bold">₦{stats.totalMoney.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 text-orange-600 mb-2 font-medium text-sm"><Clock size={18}/> Activity Count</div>
            <p className="text-3xl font-bold">{stats.totalTransactions}</p>
          </div>
        </div>

        {/* TAB CONTENT: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {/* User Mini List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
              <h3 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">Active Members</h3>
              <div className="space-y-4">
                {users.slice(0, 6).map((u, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <p className="text-sm font-bold">{u.name}</p>
                    <p className="text-xs text-blue-600 font-bold">₦{((u.dailyBalance || 0) + (u.foodBalance || 0)).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Activity Feed */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b font-bold">Live Activity Feed</div>
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-gray-50">
                  {allTransactions.map((tx, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="p-4 px-6">
                        <p className="font-bold">{tx.userName}</p>
                        <p className="text-[10px] text-gray-400">{tx.date}</p>
                      </td>
                      <td className="p-4 capitalize text-gray-500">{tx.category}</td>
                      <td className={`p-4 font-bold ${tx.description.includes('Withdraw') ? 'text-red-500' : 'text-slate-900'}`}>
                        {tx.description.includes('Withdraw') ? '-' : '+'}₦{tx.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB CONTENT: MANAGEMENT */}
        {activeTab === "management" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
            
            {/* User Verification Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b bg-slate-50 font-bold">User Approvals & Security</div>
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-gray-50">
                  {users.filter(u => !u.email.includes("admin")).map((u, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-6">
                        <p className="font-bold">{u.name}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </td>
                      <td className="p-6">
                        {u.verified ? 
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">VERIFIED</span> :
                          <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-[10px] font-bold">PENDING</span>
                        }
                      </td>
                      <td className="p-6 text-right flex gap-2 justify-end">
                        {!u.verified && (
                          <button onClick={() => handleUserAction(u.email, 'verify')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                            <ShieldCheck size={20} />
                          </button>
                        )}
                        <button onClick={() => handleUserAction(u.email, 'delete')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Group Control */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Active Savings Groups</h3>
                <button className="bg-blue-600 text-white p-2 rounded-lg"><Plus size={16}/></button>
              </div>
              <div className="space-y-4">
                {groups.map(g => (
                  <div key={g.id} className="flex justify-between items-center p-4 border rounded-xl">
                    <div>
                      <p className="font-bold text-sm">{g.name}</p>
                      <p className="text-xs text-gray-400">{g.members} members</p>
                    </div>
                    <button onClick={() => handleShutdownGroup(g.id)} className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg text-xs font-bold hover:bg-red-600 hover:text-white transition">
                      <Power size={14}/> Shutdown
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}