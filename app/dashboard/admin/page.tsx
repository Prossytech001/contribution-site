import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">Admin Dashboard</h1>
        <Link href="/" className="bg-blue-600 text-white px-4 py-2 text-sm rounded">Log Out</Link>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add Contribution
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Users", val: "150" },
            { label: "Total Amount", val: "₦200,000" },
            { label: "Pending", val: "5" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">User List</h3>
            <ul className="space-y-4">
              {['Samimibeth', 'John Jice', 'Donre-is'].map((name, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span>{name}</span>
                  <span className="font-bold">10</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Recent Contributions</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3].map((_, i) => (
                  <tr key={i}>
                    <td className="py-4">Jessica Lue</td>
                    <td className="py-4 font-medium">₦5,000</td>
                    <td className="py-4 text-right text-emerald-500">Passed</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}