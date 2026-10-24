import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Lock,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  LogOut,
  Package,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'

export default function AuthPage() {
  const navigate = useNavigate()
  const { user, setUser, updateProfile, orders } = useShop()

  const [mode, setMode] = useState(user?.isLoggedIn ? 'profile' : 'login')
  const [formData, setFormData] = useState({
    name: user?.name || 'Campus Student',
    email: user?.email || 'student@college.edu',
    phone: user?.phone || '9876543210',
    hostelBlock: user?.hostelBlock || 'Boys Hostel - Block B',
    roomNumber: user?.roomNumber || '204',
    password: '',
    confirmPassword: '',
  })
  const [feedback, setFeedback] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    setUser({
      isLoggedIn: true,
      name: formData.name || 'Campus Student',
      email: formData.email,
      phone: formData.phone || '9876543210',
      hostelBlock: formData.hostelBlock,
      roomNumber: formData.roomNumber,
      role: 'customer',
    })
    setFeedback('Logged in successfully!')
    setMode('profile')
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setFeedback('Passwords do not match.')
      return
    }
    setUser({
      isLoggedIn: true,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      hostelBlock: formData.hostelBlock,
      roomNumber: formData.roomNumber,
      role: 'customer',
    })
    setFeedback('Registration completed!')
    setMode('profile')
  }

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      name: '',
      email: '',
      phone: '',
      hostelBlock: '',
      roomNumber: '',
    })
    setMode('login')
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Tabs */}
        <div className="flex bg-slate-200/80 p-1 rounded-2xl max-w-sm mx-auto mb-8 text-xs font-bold">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setMode('profile')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              mode === 'profile'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Profile
          </button>
        </div>

        {feedback && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-2xl mb-6 text-center">
            {feedback}
          </div>
        )}

        {/* 1. LOGIN FORM */}
        {mode === 'login' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2 font-black text-xl">
                Q
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Welcome Back to QuickNest
              </h2>
              <p className="text-xs text-slate-500">
                Sign in to track orders and save your hostel room
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  College Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="student@college.edu"
                    className="w-full bg-slate-50 border border-slate-200 pl-10 pr-3 py-2.5 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 pl-10 pr-3 py-2.5 rounded-xl text-xs font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-emerald-700/20 transition-all"
              >
                Sign In
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 mt-5">
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-emerald-700 font-bold hover:underline"
              >
                Create one now
              </button>
            </div>
          </div>
        )}

        {/* 2. REGISTRATION FORM */}
        {mode === 'register' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl font-black text-slate-900">
                Create QuickNest Account
              </h2>
              <p className="text-xs text-slate-500">
                Order midnight food and campus essentials in seconds
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Sruthi Kosuru"
                    className="w-full bg-slate-50 border border-slate-200 pl-10 pr-3 py-2.5 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="9876543210"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Room Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.roomNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, roomNumber: e.target.value })
                    }
                    placeholder="e.g. 204"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hostel Block
                </label>
                <select
                  value={formData.hostelBlock}
                  onChange={(e) =>
                    setFormData({ ...formData, hostelBlock: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-800"
                >
                  <option>Boys Hostel - Block A</option>
                  <option>Boys Hostel - Block B</option>
                  <option>Boys Hostel - Block C</option>
                  <option>Girls Hostel - Block 1</option>
                  <option>Girls Hostel - Block 2</option>
                  <option>Campus Library & Study Area</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="student@college.edu"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-emerald-700/20 transition-all mt-2"
              >
                Create Account
              </button>
            </form>
          </div>
        )}

        {/* 3. PROFILE & ORDER HISTORY */}
        {mode === 'profile' && (
          <div className="space-y-6">
            {/* Student Info Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-emerald-500/20">
                    {user?.name ? user.name[0].toUpperCase() : 'S'}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      {user?.name || 'Campus Student'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {user?.email || 'student@college.edu'} • {user?.phone}
                    </p>
                    <span className="inline-block mt-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Verified Campus Student
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition-all flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                    Default Hostel
                  </span>
                  <span className="font-bold text-slate-800">
                    {user?.hostelBlock}
                  </span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                    Room Number
                  </span>
                  <span className="font-bold text-slate-800">
                    Room {user?.roomNumber} ({user?.floor || 'Floor 2'})
                  </span>
                </div>
              </div>
            </div>

            {/* Past Orders List */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-black text-base text-slate-900">
                    My Order History
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-bold">
                  {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No orders placed yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-black text-sm text-slate-900 font-mono">
                            {ord.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              ord.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {ord.createdAt} • {ord.address}
                        </div>
                        <div className="text-xs font-bold text-slate-800 mt-1">
                          {ord.items.map((i) => `${i.name} (x${i.qty})`).join(', ')}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Amount</div>
                          <div className="text-base font-black text-slate-900">
                            ₹{ord.total}
                          </div>
                        </div>

                        <Link
                          to={`/track/${ord.id}`}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all"
                        >
                          Track Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
