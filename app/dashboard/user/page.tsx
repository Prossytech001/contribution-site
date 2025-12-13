import Link from "next/link";
import { Wallet, Utensils, ArrowUpRight, History, Calendar, FileText } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <h1 className="font-bold text-xl text-slate-800">Money Contribution</h1>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-slate-900">Sam Kings</p>
            <p className="text-xs text-gray-500">Member ID: #4492</p>
          </div>
          <Link href="/" className="bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 px-4 py-2 text-sm rounded-lg transition font-medium">
            Log Out
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-gray-500">Manage your Daily and Food contribution accounts.</p>
        </header>

        {/* 2. THE TWO ACCOUNT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* ACCOUNT A: DAILY SAVINGS (Blue Theme) */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:shadow-2xl transition duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition duration-500">
              <Wallet size={120} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
              <div>
                <div className="flex items-center gap-2 mb-1 text-blue-200">
                  <Wallet size={20} />
                  <span className="font-medium">Daily Contribution</span>
                </div>
                <h3 className="text-4xl font-bold mb-1">₦15,000</h3>
                <p className="text-sm text-blue-200/80">Available Balance</p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Next Payment</p>
                  <p className="font-bold text-white flex items-center gap-1">
                    <Calendar size={14} /> Jan 10
                  </p>
                </div>
                {/* CLICKABLE LINK TO DEPOSIT PAGE */}
                <Link 
                  href="/dashboard/deposit?account=daily" 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-blue-900/50"
                >
                  Deposit <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* ACCOUNT B: FOOD SAVINGS (Orange Theme) */}
          <div className="bg-gradient-to-br from-orange-600 to-red-700 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:shadow-2xl transition duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition duration-500">
              <Utensils size={120} />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
              <div>
                <div className="flex items-center gap-2 mb-1 text-orange-100">
                  <Utensils size={20} />
                  <span className="font-medium">Food Account</span>
                </div>
                <h3 className="text-4xl font-bold mb-1">₦4,500</h3>
                <p className="text-sm text-orange-100/80">Available Balance</p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="text-xs text-orange-200 mb-1">Target Goal</p>
                  <p className="font-bold text-white">Rice & Oil Pack</p>
                </div>
                {/* CLICKABLE LINK TO DEPOSIT PAGE */}
                <Link 
                  href="/dashboard/deposit?account=food"
                  className="bg-white text-orange-700 hover:bg-orange-50 px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition shadow-lg"
                >
                  Deposit <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* 3. COMBINED HISTORY SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <History className="text-gray-400" size={20} />
                Recent Transactions
              </h3>
              <button className="text-sm text-blue-600 hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500">
                  <tr>
                    <th className="py-4 px-6 font-medium">Category</th>
                    <th className="py-4 px-6 font-medium">Date</th>
                    <th className="py-4 px-6 font-medium">Description</th>
                    <th className="py-4 px-6 font-medium text-right">Amount</th>
                    <th className="py-4 px-6 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        <Wallet size={12} /> Daily
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500">Jan 10, 2025</td>
                    <td className="py-4 px-6 text-slate-700">Daily Contribution</td>
                    <td className="py-4 px-6 text-right font-bold text-slate-900">₦2,000</td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold">Success</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                        <Utensils size={12} /> Food
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500">Jan 09, 2025</td>
                    <td className="py-4 px-6 text-slate-700">Bag of Rice Payment</td>
                    <td className="py-4 px-6 text-right font-bold text-slate-900">₦5,000</td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs font-bold">Success</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold text-lg mb-6">Payment Status</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Daily Account</span>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">On Track</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">70% of weekly goal reached</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Food Account</span>
                  <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Pending</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">40% towards December food pack</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              {/* CLICKABLE DUMMY LINK */}
              <button className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition text-sm font-bold flex items-center justify-center gap-2">
                <FileText size={16} /> Download Statement
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}