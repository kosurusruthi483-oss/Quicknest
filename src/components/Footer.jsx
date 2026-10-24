import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Heart, ShieldCheck, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center">
                Q
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Quick<span className="text-emerald-400">Nest</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              Your Everyday Essentials, Delivered. Delivering snacks, warm meals, cold drinks, stationery, and hostel needs right to your room in 15–20 minutes.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>Campus Delivery: 6:00 PM – 2:30 AM Daily</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-emerald-400 transition-colors">
                  Food & Snacks Menu
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-emerald-400 transition-colors">
                  Shopping Cart & Offers
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-emerald-400 transition-colors">
                  Order History & Profile
                </Link>
              </li>
              <li>
                <Link to="/partner" className="hover:text-emerald-400 transition-colors">
                  Delivery Partner Portal
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-emerald-400 transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Campus Essentials
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Burgers, Kathi Rolls & Fast Food</li>
              <li>Pizzas & Garlic Breads</li>
              <li>Paneer Butter Masala & Rice Bowls</li>
              <li>Maggi 2-Minute Noodles & Chinese</li>
              <li>Chilled Sting, Cold Coffee & Sodas</li>
              <li>Hostel Mosquito Vaporizers & Cables</li>
            </ul>
          </div>

          {/* Col 4: Campus Support & Contact */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-[11px]">
              Campus Hub & Support
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Hostel Hub Storage Room, Campus Central Wing</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Helpline: +91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>orders@quicknest.campus</span>
              </li>
            </ul>
            <div className="mt-4 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cash & UPI on Delivery accepted at hostel door</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px]">
          <p>© 2026 QuickNest Campus Quick-Commerce • Built for College Students with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
