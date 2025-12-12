import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">Money Contribution</h1>
        <Link href="/" className="bg-blue-600 text-white px-4 py-2 text-sm rounded">Log Out</Link>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold">Welcome, Sam Kings</h2>
          <button className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 w-full md:w-auto">
            Make Deposit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 text-white rounded-xl p-8 shadow-lg">
              <h3 className="text-gray-300 mb-2">Total Deposits</h3>
              <p className="text-4xl font-bold">₦15,000</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Deposit History</h3>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500">
                    <th className="py-3">Amount</th>
                    <th className="py-3">Date</th>
                    <th className="py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-4 font-medium">₦8,000</td>
                    <td className="py-4 text-gray-500">Jan 10</td>
                    <td className="py-4 text-right text-emerald-500">Paid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-fit">
            <h3 className="font-bold text-lg mb-6">Contribution Status</h3>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Next Contribution</span>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
              <p className="text-xl font-bold">Jan 10</p>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Make Deposit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}