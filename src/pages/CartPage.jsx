import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Ticket,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
  X,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'
import { PRODUCTS } from '../data/products'

export default function CartPage() {
  const navigate = useNavigate()
  const {
    cart,
    addToCart,
    removeFromCart,
    clearItemFromCart,
    clearCart,
    cartItemCount,
    cartSubtotal,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    deliveryFee,
    roomHandlingFee,
    discountAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
    grandTotal,
  } = useShop()

  const [inputCoupon, setInputCoupon] = useState('')
  const [couponFeedback, setCouponFeedback] = useState(null)

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (!inputCoupon.trim()) return
    const res = applyCoupon(inputCoupon)
    setCouponFeedback(res)
    if (res.success) {
      setInputCoupon('')
    }
  }

  // Progress percentage for free delivery
  const freeDeliveryProgress = Math.min(
    100,
    Math.round((cartSubtotal / freeDeliveryThreshold) * 100)
  )

  if (cartItemCount === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 text-center border border-slate-200/80 shadow-xs">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4">
            🛒
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            Looks like you haven't added any snacks or meals yet. Explore our campus menu to satisfy your cravings!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl text-xs shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
          >
            <span>Explore Campus Menu</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Hostel Shopping Cart
            </h1>
            <p className="text-xs text-slate-500">
              {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 p-2 rounded-xl hover:bg-rose-50 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* Free Delivery Threshold Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-6">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span>🚚</span>
              {amountNeededForFreeDelivery > 0 ? (
                <span>
                  Add <strong className="text-emerald-700">₹{amountNeededForFreeDelivery}</strong> more for <strong>FREE Room Delivery!</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-black flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Unlocked! Free Room Delivery on this order.
                </span>
              )}
            </span>
            <span className="font-bold text-slate-500 text-[11px]">
              ₹{cartSubtotal} / ₹{freeDeliveryThreshold}
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${freeDeliveryProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 space-y-3">
            {Object.entries(cart).map(([id, qty]) => {
              const product = PRODUCTS.find((p) => p.id === id)
              if (!product) return null

              return (
                <div
                  key={id}
                  className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3 sm:gap-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => clearItemFromCart(id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium mb-3">
                      ₹{product.price} each • {product.weight}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-1">
                        <button
                          onClick={() => removeFromCart(id)}
                          className="hover:text-slate-900 active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-black text-xs min-w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => addToCart(id)}
                          className="text-emerald-700 active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      <div className="font-black text-sm text-slate-900">
                        ₹{product.price * qty}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Coupon & Bill Summary */}
          <div className="lg:col-span-5 space-y-4">
            {/* Coupon Box */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-3">
                <Ticket className="w-4 h-4 text-emerald-600" />
                <span>Student Coupon & Offers</span>
              </div>

              {couponCode ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-emerald-800 font-mono">
                      {couponCode}
                    </span>
                    <span className="text-[11px] block text-emerald-600 font-medium">
                      Applied (-₹{discountAmount})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter FIRSTNEST or EXAM50"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 text-xs font-mono uppercase px-3 py-2.5 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                    >
                      Apply
                    </button>
                  </div>

                  {couponFeedback && (
                    <div
                      className={`text-[11px] font-medium p-2 rounded-xl ${
                        couponFeedback.success
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {couponFeedback.message}
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 pt-1">
                    Try <strong className="text-slate-600 font-mono">FIRSTNEST</strong> for ₹25 off or <strong className="text-slate-600 font-mono">EXAM50</strong> for 15% off.
                  </div>
                </form>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="font-black text-sm text-slate-900 pb-2 border-b border-slate-100">
                Order Bill Summary
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-slate-900">₹{cartSubtotal}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Hostel Delivery Fee</span>
                  <span className="font-bold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-black">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Room Doorstep Handling</span>
                  <span className="font-bold text-slate-900">₹{roomHandlingFee}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Student Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                  <div>
                    <div className="text-sm font-black text-slate-900">
                      Total Payable
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Includes all campus taxes
                    </div>
                  </div>
                  <div className="text-xl font-black text-emerald-700">
                    ₹{grandTotal}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout/details')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-700/20 active:scale-98 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm mt-3"
              >
                <span>Proceed to Campus Checkout</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
