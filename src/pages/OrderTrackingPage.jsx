import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Package,
  Bike,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'

const STAGES = [
  'Order Confirmed',
  'Preparing at Campus Hub',
  'Ready for Pickup',
  'Picked Up by Delivery Runner',
  'Out for Delivery',
  'Delivered',
]

export default function OrderTrackingPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { orders, updateOrderStatus } = useShop()

  const order = orders.find((o) => o.id === orderId) || orders[0]

  const currentStageIndex = STAGES.indexOf(order?.status || 'Order Confirmed')

  // Status simulator for student demo
  const handleNextStatus = () => {
    if (currentStageIndex < STAGES.length - 1) {
      const nextStatus = STAGES[currentStageIndex + 1]
      updateOrderStatus(order.id, nextStatus)
      if (nextStatus === 'Delivered') {
        navigate(`/order-completed/${order.id}`)
      }
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] py-16 px-4 text-center">
        <h2 className="text-xl font-black mb-2">Order Not Found</h2>
        <Link to="/" className="text-emerald-700 font-bold text-xs underline">
          Go Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-900/10 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-emerald-200 text-xs font-bold uppercase tracking-wider block mb-1">
                ⚡ Live Campus Delivery Tracker
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Order #{order.id}
              </h1>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-center">
              <span className="text-[10px] text-emerald-200 block uppercase font-bold">
                Status
              </span>
              <span className="text-xs sm:text-sm font-black text-amber-300">
                {order.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-100">
            <Clock className="w-4 h-4 text-amber-300" />
            <span>Estimated delivery in: <strong>12–15 Minutes</strong></span>
          </div>
        </div>

        {/* 6-STAGE VISUAL TIMELINE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-6">
          <h2 className="font-black text-base text-slate-900 mb-6">
            Live Order Status Progression
          </h2>

          <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {STAGES.map((stage, idx) => {
              const isPast = idx < currentStageIndex
              const isCurrent = idx === currentStageIndex
              const isFuture = idx > currentStageIndex

              return (
                <div key={stage} className="relative flex items-start gap-4">
                  {/* Step Icon / Circle */}
                  <div
                    className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isPast
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                        : isCurrent
                        ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>

                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        isCurrent
                          ? 'text-emerald-800 font-black'
                          : isPast
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {idx === 0 && 'We have received your food & essentials order.'}
                      {idx === 1 && 'Our student hub team is boxing your order.'}
                      {idx === 2 && 'Package packed and sealed in campus hub.'}
                      {idx === 3 && 'Assigned student runner has picked up the bag.'}
                      {idx === 4 && 'Runner is cycling / walking to your hostel block.'}
                      {idx === 5 && 'Delivered directly to your room door!'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Interactive Demo Progression Control */}
          <div className="mt-8 pt-6 border-t border-slate-100 bg-emerald-50/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-950 block">
                College Project Demo Simulator
              </span>
              <span className="text-[11px] text-emerald-700">
                Click to simulate your delivery partner advancing the status!
              </span>
            </div>

            {currentStageIndex < STAGES.length - 1 ? (
              <button
                onClick={handleNextStatus}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 shrink-0"
              >
                Advance to Next Stage ➔
              </button>
            ) : (
              <Link
                to={`/order-completed/${order.id}`}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition-all shrink-0"
              >
                View Delivery Completed Screen ➔
              </Link>
            )}
          </div>
        </div>

        {/* ASSIGNED DELIVERY RUNNER CARD */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs mb-6">
          <h3 className="font-black text-sm text-slate-900 mb-4">
            Assigned Delivery Teammate
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-lg">
                🚴
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  {order.runnerName || 'Rohan Mehra'}
                </h4>
                <p className="text-[11px] text-slate-500">
                  Hostel Runner • Delivering via campus bicycle
                </p>
              </div>
            </div>

            <a
              href={`tel:${order.runnerPhone || '9876543210'}`}
              className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Runner</span>
            </a>
          </div>
        </div>

        {/* ORDER DETAILS SUMMARY */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <h3 className="font-black text-sm text-slate-900 mb-3 pb-2 border-b border-slate-100">
            Order Items
          </h3>

          <div className="space-y-2 mb-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">
                  {item.name} <strong className="text-slate-900">x{item.qty}</strong>
                </span>
                <span className="font-bold text-slate-900">
                  ₹{item.price * item.qty}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 flex justify-between font-black text-sm text-slate-900">
            <span>Total Bill Paid:</span>
            <span className="text-emerald-700">₹{order.total}</span>
          </div>

          <div className="text-[11px] text-slate-500 mt-2">
            📍 Delivered to: {order.address}
          </div>
        </div>
      </div>
    </div>
  )
}
