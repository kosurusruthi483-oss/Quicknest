import React from 'react'

export default function App() {
  const categories = [
    { name: 'Snacks & Chips', icon: '🍟', desc: 'Kurkure, Lays, Nachos' },
    { name: 'Beverages', icon: '🥤', desc: 'Cold drinks, Juices, Energy' },
    { name: 'Instant Food', icon: '🍜', desc: 'Maggi, Cup noodles, Soup' },
    { name: 'Chocolates & Sweets', icon: '🍫', desc: 'Dairy Milk, KitKat, Bars' },
    { name: 'Personal Care', icon: '🧼', desc: 'Soap, Shampoo, Face wash' },
    { name: 'Stationery', icon: '✏️', desc: 'Notebooks, Pens, Highlighters' },
    { name: 'Hostel Needs', icon: '🔌', desc: 'Adapters, Cables, Essentials' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-emerald-700 text-emerald-50 text-xs sm:text-sm font-medium py-2 px-4 text-center">
        ⚡ <strong>Fast Campus Delivery:</strong> Delivering to all hostel blocks in 15–20 minutes!
      </div>

      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-500/20">
              Q
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                Quick<span className="text-emerald-600">Nest</span>
              </span>
              <span className="text-[10px] block text-slate-500 font-medium -mt-1 uppercase tracking-wider">
                Hostel Delivery
              </span>
            </div>
          </div>

          {/* Delivery Location Indicator */}
          <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs px-3 py-1.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold">Hostel Hub:</span> Active & Taking Orders
          </div>

          {/* Cart Placeholder */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all">
              <span>🛒 Cart</span>
              <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-5">
            <span>✨ Campus Prototype</span>
            <span className="text-emerald-400">•</span>
            <span>Phase 1 Initial Foundation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Quick<span className="text-emerald-600">Nest</span>
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
            Your Everyday Essentials, Delivered.
          </p>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
            Snacks, chips, beverages, instant food, personal-care products, and hostel essentials — brought directly to your hostel room in minutes.
          </p>

          {/* Quick Stats / Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto text-left">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-emerald-600 font-bold text-base sm:text-lg">15–20 Mins</div>
              <div className="text-xs text-slate-500 font-medium">To your hostel room</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-emerald-600 font-bold text-base sm:text-lg">Hostel Inventory</div>
              <div className="text-xs text-slate-500 font-medium">In-stock & verified</div>
            </div>
            <div className="col-span-2 sm:col-span-1 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-emerald-600 font-bold text-base sm:text-lg">Student Delivery</div>
              <div className="text-xs text-slate-500 font-medium">Delivered by campus peers</div>
            </div>
          </div>
        </div>

        {/* Categories Preview Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Explore Categories
              </h2>
              <p className="text-xs text-slate-500">
                Preview of everyday campus categories coming up next
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
              {categories.length} Categories
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 1 Setup Status Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-500/10">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Phase 1 Milestone Complete
            </span>
            <h3 className="text-2xl font-black mb-2">
              React + Vite + Tailwind CSS Foundation Ready!
            </h3>
            <p className="text-sm text-emerald-50 leading-relaxed mb-4">
              The project structure, responsive styling system, and clean QuickNest branding are successfully configured. Next up: building the interactive product cards, search filter, and the slide-over cart drawer.
            </p>
            <div className="text-xs font-semibold bg-emerald-900/30 border border-emerald-400/30 rounded-xl px-4 py-2.5 inline-block">
              📍 Working Folder: <code className="text-emerald-200">C:\projects\quicknest</code>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700 mb-1">
          QuickNest • Everyday Essentials for College Students
        </p>
        <p>Built with React & Tailwind CSS • College Project Prototype</p>
      </footer>
    </div>
  )
}
