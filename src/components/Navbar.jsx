import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, User, MapPin, Clock, Search } from 'lucide-react'
import { useShop } from '../context/ShopContext'

export default function Navbar() {
  const { cartItemCount, user, selectedAddress } = useShop()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Campus Announcement Bar */}
      <div className="bg-emerald-800 text-white text-[11px] font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="animate-pulse">⚡</span>
        <span>
          <strong>QuickNest Campus Hub:</strong> Delivering meals & essentials to hostel rooms in 15–20 minutes!
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-xl flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            Q
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black tracking-tight text-slate-900">
                Quick<span className="text-emerald-600">Nest</span>
              </span>
              <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full border border-amber-200">
                CAMPUS
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium block -mt-1">
              Your Everyday Essentials, Delivered
            </span>
          </div>
        </Link>

        {/* Hostel Location Pill (Desktop) */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full text-xs text-slate-700">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="font-semibold truncate max-w-[190px]">
            {selectedAddress ? `${selectedAddress.hostelBlock} • ${selectedAddress.roomNumber}` : 'Hostel Block B • 204'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-[11px] text-slate-400">15–20 Mins</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
          <Link
            to="/"
            className={`transition-colors hover:text-emerald-600 ${
              isActive('/') ? 'text-emerald-700' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/menu"
            className={`transition-colors hover:text-emerald-600 ${
              isActive('/menu') ? 'text-emerald-700' : ''
            }`}
          >
            Menu
          </Link>
          <Link
            to="/cart"
            className={`transition-colors hover:text-emerald-600 ${
              isActive('/cart') ? 'text-emerald-700' : ''
            }`}
          >
            Offers & Cart
          </Link>
          <Link
            to="/profile"
            className={`transition-colors hover:text-emerald-600 ${
              isActive('/profile') ? 'text-emerald-700' : ''
            }`}
          >
            My Orders
          </Link>
          <Link
            to="/partner"
            className="text-slate-400 hover:text-slate-600 text-[11px]"
          >
            Runner Portal
          </Link>
          <Link
            to="/admin"
            className="text-slate-400 hover:text-slate-600 text-[11px]"
          >
            Admin
          </Link>
        </nav>

        {/* Right Action Icons: Profile & Cart */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/profile"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all"
            title="My Profile & Orders"
          >
            <User className="w-4 h-4" />
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md text-[10px] font-black">
              {cartItemCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
