import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Users, Wallet, Check } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* 1. FIXED NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Money Contribution
          </h1>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#plans" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              Plans & Pricing
            </Link>
            <Link href="#why-us" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              Why Save With Us
            </Link>
            <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600 hidden sm:block">
              Log in
            </Link>
            <Link href="/signup" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              Join Now
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center mt-0">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')" 
          }}
        ></div>
        <div className="absolute inset-0 bg-slate-900/60 z-10"></div>

        <div className="relative z-20 text-center max-w-4xl px-6 mt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-sm font-bold mb-6 backdrop-blur-md">
            #1 Trusted Savings Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Grow Your Business, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Secure Your Capital.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            Join thousands of traders, mechanics, and professionals who trust us to manage their daily contributions and lump-sum payouts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition transform hover:-translate-y-1 shadow-xl flex items-center justify-center gap-2"
            >
              Join Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHY SAVE WITH US */}
      <section id="why-us" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Save With Us?</h2>
            <p className="text-gray-500 mt-4 text-lg">We simplify cooperative savings for modern professionals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: ShieldCheck, title: "100% Secure", desc: "Your funds are protected with bank-grade security and real-time transaction tracking." },
              { icon: Wallet, title: "Automated Deposits", desc: "Set it and forget it. We handle the daily or weekly deductions automatically." },
              { icon: Users, title: "Transparent Payouts", desc: "See exactly when your turn is coming. No stories, just guaranteed payouts." },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition duration-300">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO IS THIS FOR? (The 4 Categories) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Built For Your Profession</h2>
            <p className="text-gray-600 mt-2">Select your category and start growing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: "The Trader", 
                desc: "Save daily from your sales. Collect a lump sum to restock your shop and expand inventory.",
                // UPDATED IMAGE LINK BELOW
                img: "https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?q=80&w=900&auto=format&fit=crop"
              },
              { 
                title: "The Importer", 
                desc: "Secure your capital against fluctuations. Plan your next container shipment with ease.",
                img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop"
              },
              { 
                title: "The Mechanic", 
                desc: "Upgrade your workshop. Buy modern diagnostic tools by setting aside small amounts.",
                img: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=900&auto=format&fit=crop"
              },
              { 
                title: "The Transporter", 
                desc: "Maintain your fleet. Save for vehicle repairs, insurance, or buying a new truck.",
                img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=900&auto=format&fit=crop"
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group border border-gray-100">
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition z-10"/>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" 
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 flex-1 leading-relaxed">{item.desc}</p>
                  <Link 
                    href="/signup" 
                    className="w-full text-center py-3 rounded-lg font-bold transition-colors duration-200 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEW: CONTRIBUTION PLANS (Prices Section) */}
      <section id="plans" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Choose Your Plan</h2>
            <p className="text-gray-500 mt-4 text-lg">Flexible contribution options designed for every budget.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* PLAN 1: DAILY STARTER */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition relative bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Daily Starter</h3>
              <p className="text-gray-500 text-sm mt-2">Perfect for daily earners</p>
              <div className="my-6">
                <span className="text-4xl font-bold text-slate-900">₦2,000</span>
                <span className="text-gray-500"> / day</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Daily automated deduction', 'Standard support', 'Monthly payout option'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-lg bg-white border border-gray-300 font-bold text-slate-900 hover:border-blue-600 hover:text-blue-600 transition">
                Start Saving
              </Link>
            </div>

            {/* PLAN 2: BUSINESS PRO (Highlighted) */}
            <div className="border-2 border-blue-600 rounded-2xl p-8 shadow-2xl relative bg-white transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold text-gray-900">Business Pro</h3>
              <p className="text-gray-500 text-sm mt-2">For serious business growth</p>
              <div className="my-6">
                <span className="text-4xl font-bold text-slate-900">₦5,000</span>
                <span className="text-gray-500"> / day</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['Priority payout slot', 'Dedicated account manager', 'Weekly performance report', 'Emergency withdrawal access'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
                Start Saving
              </Link>
            </div>

            {/* PLAN 3: WEEKLY SAVER */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-xl transition relative bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Daily</h3>
              <p className="text-gray-500 text-sm mt-2">For salary earners</p>
              <div className="my-6">
                <span className="text-4xl font-bold text-slate-900">₦3,000</span>
                <span className="text-gray-500"> / week</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['One-time weekly deduction', 'Investment advisory', 'Quarterly lump sum payout'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-lg bg-white border border-gray-300 font-bold text-slate-900 hover:border-blue-600 hover:text-blue-600 transition">
                Start Saving
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 6. RULES & REGULATIONS */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full opacity-10 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-white">
            <ShieldCheck className="text-emerald-400 w-10 h-10" /> 
            <span>Platform Rules & Guidelines</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              "Members must deposit funds by the specified due date to maintain group integrity.",
              "Withdrawals are strictly processed on the scheduled payout rotation dates.",
              "All members must upload valid identification before joining a contribution cycle.",
              "Respect for group administrators and fellow members is mandatory at all times.",
              "Proof of payment receipts must be uploaded to the dashboard immediately.",
              "Accounts inactive for more than 3 months without notice will be suspended."
            ].map((rule, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full text-sm font-bold text-white shadow-lg shadow-blue-600/50">
                  {i + 1}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed pt-1">{rule}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">By creating an account, you agree to abide by these rules.</p>
              <Link href="/signup" className="text-slate-900 bg-emerald-400 hover:bg-emerald-300 px-8 py-3 rounded-full text-sm font-bold transition shadow-lg shadow-emerald-400/20">
                I Agree, Get Started
              </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-50 border-t border-gray-200 py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Money Contribution</h2>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-6">
              The safest way to save with your community. Transparent, automated, and designed for your financial growth.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-blue-600">Home</Link></li>
              <li><Link href="#plans" className="hover:text-blue-600">Pricing Plans</Link></li>
              <li><Link href="#why-us" className="hover:text-blue-600">Why Save With Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li>support@moneycontribution.com</li>
              <li>+234 800 123 4567</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Money Contribution App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}