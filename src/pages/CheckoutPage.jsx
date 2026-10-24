import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  MapPin,
  Clock,
  ShieldCheck,
  Building,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
  Navigation,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { PRODUCTS } from '../data/products'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const {
    cart,
    cartItemCount,
    cartSubtotal,
    deliveryFee,
    roomHandlingFee,
    discountAmount,
    grandTotal,
    user,
    addresses,
    selectedAddress,
    setSelectedAddress,
    createOrder,
  } = useShop()

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || 'Campus Student',
    phone: user?.phone || '9876543210',
    email: user?.email || 'student@college.edu',
    hostelBlock: selectedAddress?.hostelBlock || 'Boys Hostel - Block B',
    roomNumber: selectedAddress?.roomNumber || '204',
    floor: selectedAddress?.floor || '2nd Floor',
    landmark: selectedAddress?.landmark || 'Near Water Cooler',
    pincode: '302026',
    deliveryNotes: 'Call when reaching hostel main gate.',
  })

  const [paymentMethod, setPaymentMethod] = useState('UPI on Delivery')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [locationStatus, setLocationStatus] = useState('')

  // Geolocation button handler
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.')
      return
    }
    setLocationStatus('Locating campus hub...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('📍 Verified inside College Campus zone!')
      },
      (error) => {
        setLocationStatus('Permission denied. Please select your hostel block manually.')
      }
    )
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    if (cartItemCount === 0) {
      alert('Your cart is empty!')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      const newOrderId = createOrder({
        ...formData,
        paymentMethod,
      })
      navigate(`/track/${newOrderId}`)
    }, 1200)
  }

  if (cartItemCount === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] py-16 px-4 text-center">
        <h2 className="text-xl font-black mb-2">Cart is empty</h2>
        <Link to="/menu" className="text-emerald-700 font-bold text-xs underline">
          Return to Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Campus Checkout & Hostel Delivery
        </h1>
        <p className="text-xs text-slate-500 mb-8">
          Complete your hostel room details and confirm payment method
        </p>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Details & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. HOSTEL DELIVERY DETAILS */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-black text-base text-slate-900">
                    Hostel Delivery Location
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>GPS Check</span>
                </button>
              </div>

              {locationStatus && (
                <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 mb-4">
                  {locationStatus}
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Hostel Block / Academic Hall *
                  </label>
                  <select
                    value={formData.hostelBlock}
                    onChange={(e) =>
                      setFormData({ ...formData, hostelBlock: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium text-slate-800"
                  >
                    <option>Boys Hostel - Block A</option>
                    <option>Boys Hostel - Block B</option>
                    <option>Boys Hostel - Block C</option>
                    <option>Girls Hostel - Block 1</option>
                    <option>Girls Hostel - Block 2</option>
                    <option>Central Library & Reading Hall</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Room / Cubicle # *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 204"
                      value={formData.roomNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, roomNumber: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:bg-white focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Floor *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2nd Floor"
                      value={formData.floor}
                      onChange={(e) =>
                        setFormData({ ...formData, floor: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Hostel Landmark / Wing
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Water Cooler / West Wing"
                    value={formData.landmark}
                    onChange={(e) =>
                      setFormData({ ...formData, landmark: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Special Delivery Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please leave outside room door or call twice"
                    value={formData.deliveryNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryNotes: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 2. PAYMENT METHOD SELECTION */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="font-black text-base text-slate-900 pb-3 border-b border-slate-100 mb-4">
                Select Payment Mode
              </h3>

              <div className="space-y-3">
                {/* Option 1: UPI on Delivery */}
                <label
                  onClick={() => setPaymentMethod('UPI on Delivery')}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'UPI on Delivery'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-slate-900 flex items-center justify-between">
                      <span>UPI on Delivery (Recommended)</span>
                      <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded-md font-bold">
                        FASTEST
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Scan teammate's GPay / PhonePe / Paytm QR upon room arrival.
                    </p>
                  </div>
                </label>

                {/* Option 2: Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-slate-900">
                      Cash on Delivery
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Pay with cash when your food package reaches your room.
                    </p>
                  </div>
                </label>

                {/* Option 3: Simulated Card Test Mode */}
                <label
                  onClick={() => setPaymentMethod('Online Card (Simulated Test Mode)')}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod.includes('Simulated')
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-slate-900">
                      Online Card Payment (Simulated Test Mode)
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Safe demo card simulator for development review.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Confirm Button */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-black text-sm text-slate-900 pb-2 border-b border-slate-100">
                Order Review ({cartItemCount} items)
              </h3>

              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {Object.entries(cart).map(([id, qty]) => {
                  const p = PRODUCTS.find((item) => item.id === id)
                  if (!p) return null
                  return (
                    <div key={id} className="flex justify-between text-xs">
                      <div className="truncate max-w-[200px]">
                        <span className="font-bold text-slate-800">{p.name}</span>
                        <span className="text-slate-400 ml-1">x{qty}</span>
                      </div>
                      <span className="font-bold text-slate-900">₹{p.price * qty}</span>
                    </div>
                  )
                })}
              </div>

              <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs border border-slate-200/60">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Hostel Delivery</span>
                  <span className="font-bold text-emerald-700">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Doorstep Handling</span>
                  <span className="font-bold">₹{roomHandlingFee}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-base text-slate-900">
                  <span>Final Payable Amount</span>
                  <span className="text-emerald-700">₹{grandTotal}</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 text-[11px] text-emerald-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Estimated delivery time: <strong>15–20 minutes</strong>
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-700/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm"
              >
                {isSubmitting ? (
                  <span>Securing Order ID...</span>
                ) : (
                  <span>Place Order • ₹{grandTotal}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
