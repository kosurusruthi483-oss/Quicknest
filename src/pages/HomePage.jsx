import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight,
  Star,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Flame,
} from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { useShop } from '../context/ShopContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart, selectedAddress, setSelectedAddress, addresses } = useShop()
  const [searchTerm, setSearchTerm] = useState('')
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  // Popular items
  const popularDishes = PRODUCTS.slice(0, 6)

  // Special offers
  const specialOffers = [
    {
      code: 'FIRSTNEST',
      title: 'Flat ₹25 OFF',
      desc: 'On your first hostel room order above ₹99',
      bg: 'from-emerald-600 to-teal-700',
      badge: 'NEW STUDENT',
    },
    {
      code: 'EXAM50',
      title: '15% Midnight Munchies',
      desc: 'Special discount during night study hours',
      bg: 'from-amber-600 to-rose-600',
      badge: 'LATE NIGHT',
    },
    {
      code: 'FREEDEL',
      title: 'FREE Delivery',
      desc: 'Automatic free room delivery on orders above ₹149',
      bg: 'from-blue-600 to-indigo-700',
      badge: 'POPULAR',
    },
  ]

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchTerm)}`)
    } else {
      navigate('/menu')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white overflow-hidden py-12 sm:py-16 px-4">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-semibold mb-4 text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Campus Quick-Commerce Prototype</span>
              <span className="text-white/40">•</span>
              <span className="text-amber-300">15–20 Mins Delivery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
              Your Everyday <br />
              <span className="text-amber-400">Essentials & Food</span>, <br />
              Delivered.
            </h1>

            <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6">
              Crispy burgers, cheesy pizzas, piping hot Maggi, chilled energy drinks, snacks, notebooks, and hostel needs — brought straight to your hostel room.
            </p>

            {/* Delivery Location Selector Pill */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md p-1.5 pl-3 rounded-2xl border border-white/20 mb-6 text-xs max-w-full">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="text-emerald-100 font-medium truncate">
                Delivering to: <strong className="text-white">{selectedAddress?.hostelBlock} • {selectedAddress?.roomNumber}</strong>
              </span>
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-xl font-bold transition-all ml-1 shrink-0"
              >
                Change
              </button>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto lg:mx-0 relative mb-6">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search burgers, pizza, Maggi, Sting, Kurkure, notebooks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-slate-900 pl-12 pr-28 py-3.5 rounded-2xl text-sm font-medium shadow-xl shadow-black/10 focus:outline-hidden focus:ring-3 focus:ring-amber-400 transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
              >
                Find Food
              </button>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                to="/menu"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm shadow-lg shadow-amber-400/20 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Browse Full Menu</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/cart"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl text-sm border border-white/20 transition-all"
              >
                View Cart & Offers
              </Link>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&auto=format&fit=crop&q=80"
                alt="Delicious Campus Food"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5">
                <span className="text-amber-400 text-xs font-black uppercase tracking-wider mb-1">
                  ⚡ Verified Campus Team
                </span>
                <h3 className="text-xl font-black text-white">
                  Hot Meals & Fresh Munchies
                </h3>
                <p className="text-xs text-slate-200">
                  Delivered inside your hostel building within 20 mins.
                </p>
              </div>
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-4 -left-2 bg-white text-slate-900 p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 max-w-[210px]">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-[11px] leading-tight">
                <div className="font-black text-slate-900">15–20 Mins</div>
                <div className="text-slate-500 font-medium">Average room delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOOD & ESSENTIAL CATEGORIES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Explore Categories
            </h2>
            <p className="text-xs text-slate-500">
              Everything college students crave and need on campus
            </p>
          </div>
          <Link
            to="/menu"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <Link
              key={cat.id}
              to={`/menu?category=${cat.id}`}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 text-center hover:border-emerald-400 hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div className="font-bold text-xs text-slate-800 group-hover:text-emerald-700">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SPECIAL OFFERS & COUPONS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4 mb-8">
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Campus Discounts</span>
          </div>
          <h2 className="text-xl font-black text-slate-900">
            Special Deals & Student Coupons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {specialOffers.map((offer) => (
            <div
              key={offer.code}
              className={`rounded-3xl p-5 bg-gradient-to-r ${offer.bg} text-white shadow-lg relative overflow-hidden`}
            >
              <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full mb-2 inline-block">
                {offer.badge}
              </span>
              <h3 className="text-xl font-black mb-1">{offer.title}</h3>
              <p className="text-xs text-white/90 mb-3">{offer.desc}</p>
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-mono font-bold border border-white/20">
                <span>Code:</span>
                <span className="text-amber-300">{offer.code}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR DISHES & RECOMMENDED ITEMS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Popular Campus Dishes
            </h2>
            <p className="text-xs text-slate-500">
              Most ordered meals and snacks across all hostels this week
            </p>
          </div>
          <Link
            to="/menu"
            className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl hover:bg-emerald-100 transition-colors"
          >
            See Full Menu
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {popularDishes.map((product) => {
            const qty = cart[product.id] || 0
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-28 rounded-2xl overflow-hidden mb-2 bg-slate-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-2 left-2 text-[8px] font-black text-white px-1.5 py-0.5 rounded-md ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{product.rating}</span>
                    <span className="text-slate-400">({product.reviews})</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-xs line-clamp-1 mb-0.5">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 truncate mb-2">
                    {product.variant}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div className="text-sm font-black text-slate-900">
                    ₹{product.price}
                  </div>

                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-7 h-7 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 active:scale-90 transition-transform"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-300 rounded-full px-1.5 py-0.5 text-emerald-800">
                      <button onClick={() => removeFromCart(product.id)}>
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs px-1">{qty}</span>
                      <button onClick={() => addToCart(product.id)}>
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. LOCATION SELECTOR MODAL */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-base text-slate-900">
                  Select Delivery Location
                </h3>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Choose your campus hostel or academic block for 15–20 minute delivery:
            </p>

            <div className="space-y-2 mb-5">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddress(addr)
                    setIsLocationModalOpen(false)
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedAddress?.id === addr.id
                      ? 'border-emerald-600 bg-emerald-50/60'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                    <span>{addr.title}</span>
                    {selectedAddress?.id === addr.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {addr.hostelBlock} • Room {addr.roomNumber} ({addr.floor})
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs transition-colors"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
