import React, { useState } from 'react'
import {
  TrendingUp,
  Users,
  DollarSign,
  Bike,
  Clock,
  CheckCircle2,
  Package,
  Search,
  Filter,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { PRODUCTS } from '../data/products'

export default function AdminPage() {
  const { orders, updateOrderStatus } = useShop()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  // Calculate metrics
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const pendingOrders = orders.filter((o) => o.status !== 'Delivered').length
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length
  const activeRunners = 4
  const totalCustomers = 48

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'PENDING' && ord.status !== 'Delivered') ||
      (statusFilter === 'DELIVERED' && ord.status === 'Delivered')
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mb-1">
            QuickNest Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Campus Admin Control Center
          </h1>
          <p className="text-xs text-slate-500">
            Real-time overview of college orders, inventory, and delivery runners
          </p>
        </div>

        {/* 1. SUMMARY CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Total Orders
            </span>
            <div className="text-xl font-black text-slate-900">{totalOrders}</div>
            <span className="text-[10px] text-emerald-600 font-bold">↑ Active</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Total Revenue
            </span>
            <div className="text-xl font-black text-emerald-700">₹{totalRevenue}</div>
            <span className="text-[10px] text-slate-400">Campus billing</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Pending Orders
            </span>
            <div className="text-xl font-black text-amber-600">{pendingOrders}</div>
            <span className="text-[10px] text-amber-700 font-bold">Needs packing</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Delivered
            </span>
            <div className="text-xl font-black text-green-700">{deliveredOrders}</div>
            <span className="text-[10px] text-slate-400">Completed</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Active Runners
            </span>
            <div className="text-xl font-black text-slate-900">{activeRunners}</div>
            <span className="text-[10px] text-emerald-600 font-bold">On campus</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Students
            </span>
            <div className="text-xl font-black text-slate-900">{totalCustomers}</div>
            <span className="text-[10px] text-slate-400">Registered</span>
          </div>
        </div>

        {/* 2. ORDERS MANAGEMENT TABLE */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden mb-8">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-black text-base text-slate-900">
              Campus Orders Table
            </h2>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search order ID or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending Only</option>
                <option value="DELIVERED">Delivered Only</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {ord.id}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{ord.address}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium">
                      {ord.items.map((i) => `${i.name} (x${i.qty})`).join(', ')}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      ₹{ord.total}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {ord.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          ord.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className="bg-white border border-slate-200 text-[11px] font-bold p-1 rounded-lg"
                      >
                        <option>Order Confirmed</option>
                        <option>Preparing at Campus Hub</option>
                        <option>Ready for Pickup</option>
                        <option>Picked Up by Delivery Runner</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
