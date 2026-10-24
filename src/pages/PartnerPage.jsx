import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bike,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  Building,
  ToggleLeft,
  ToggleRight,
  Package,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'

export default function PartnerPage() {
  const { orders, updateOrderStatus } = useShop()
  const [partnerStatus, setPartnerStatus] = useState('Available') // 'Available' | 'On Delivery' | 'Offline'

  const activeOrders = orders.filter((o) => o.status !== 'Delivered')
  const completedOrders = orders.filter((o) => o.status === 'Delivered')

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-2xl">
                🚴
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                  QuickNest Partner Portal
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Rohan Mehra (Campus Runner)
                </h1>
                <p className="text-xs text-slate-400">
                  ID: #RUN-204 • Vehicle: Campus Bicycle
                </p>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
              {['Available', 'On Delivery', 'Offline'].map((st) => (
                <button
                  key={st}
                  onClick={() => setPartnerStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    partnerStatus === st
                      ? st === 'Available'
                        ? 'bg-emerald-600 text-white'
                        : st === 'On Delivery'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Assigned
              </span>
              <span className="text-base font-black text-white">
                {activeOrders.length}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Completed
              </span>
              <span className="text-base font-black text-emerald-400">
                {completedOrders.length}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Runner Rating
              </span>
              <span className="text-base font-black text-amber-300">★ 4.9</span>
            </div>
          </div>
        </div>

        {/* Assigned Orders Section */}
        <h2 className="text-lg font-black text-slate-900 mb-4">
          Assigned Campus Tasks ({activeOrders.length})
        </h2>

        {activeOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/80 mb-6">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="font-bold text-slate-800 text-sm">
              All deliveries completed!
            </h3>
            <p className="text-xs text-slate-400">
              New orders will appear here automatically when students place them.
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {activeOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-slate-900">
                      {ord.id}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {ord.status}
                    </span>
                  </div>
                  <span className="font-black text-sm text-slate-900">
                    ₹{ord.total} ({ord.paymentMethod})
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1">
                  <div className="font-bold text-slate-800">
                    📍 Delivery Address: {ord.address}
                  </div>
                  {ord.deliveryNotes && (
                    <div className="text-amber-800 font-medium">
                      ⚠️ Note: {ord.deliveryNotes}
                    </div>
                  )}
                  <div className="text-slate-500">
                    Items: {ord.items.map((i) => `${i.name} (x${i.qty})`).join(', ')}
                  </div>
                </div>

                {/* Status Advancement Buttons */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() =>
                      updateOrderStatus(ord.id, 'Picked Up by Delivery Runner')
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                  >
                    Mark Picked Up
                  </button>
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'Out for Delivery')}
                    className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                  >
                    Mark Out for Delivery
                  </button>
                  <button
                    onClick={() => updateOrderStatus(ord.id, 'Delivered')}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                  >
                    Confirm Delivered ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
