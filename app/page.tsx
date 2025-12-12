import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">Money Contribution</h1>
        <div className="space-x-4">
          <Link href="/signup" className="text-sm font-medium hover:underline">
            Create Account
          </Link>
          <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            Log in
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold leading-tight mb-6 text-slate-900">
              Easy, Secure <br /> Contribution
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Contribute to your group fund securely and back your contributions in real-time.
            </p>
            <div className="space-y-3 mb-8">
              {['Secure contributions', 'Easy deposits'].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                  <span className="text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Illustration Mockup */}
          <div className="bg-blue-100 h-96 rounded-3xl flex items-center justify-center">
             <span className="text-blue-400 font-bold">[Illustration Here]</span>
          </div>
        </div>
      </main>
    </div>
  );
}