import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Star,
  RefreshCw,
  Home,
  MessageSquare,
  Sparkles,
} from 'lucide-react'
import { useShop } from '../context/ShopContext'

export default function OrderCompletedPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { orders, rateOrder, addToCart } = useShop()

  const order = orders.find((o) => o.id === orderId) || orders[0]

  const [rating, setRating] = useState(order?.rating || 5)
  const [review, setReview] = useState(order?.review || '')
  const [submitted, setSubmitted] = useState(false)

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    if (order) {
      rateOrder(order.id, rating, review)
      setSubmitted(true)
    }
  }

  const handleReorder = () => {
    if (order) {
      order.items.forEach((item) => {
        addToCart(item.id)
      })
      navigate('/cart')
    }
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] py-16 px-4 text-center">
        <h2 className="text-xl font-black mb-2">Order Not Found</h2>
        <Link to="/" className="text-emerald-700 font-bold text-xs underline">
          Return Home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        {/* Celebration Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl text-center mb-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
            🎉
          </div>

          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full mb-3 inline-block">
            Delivered Successfully
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Order Received! Enjoy Your Food!
          </h1>
          <p className="text-xs text-slate-500 mb-6 max-w-sm mx-auto">
            Your package has been delivered to <strong>{order.address}</strong>.
          </p>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 max-w-sm mx-auto grid grid-cols-2 gap-3 text-left text-xs mb-6">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Order ID
              </span>
              <span className="font-mono font-black text-slate-900">
                {order.id}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                Final Bill
              </span>
              <span className="font-black text-emerald-700">
                ₹{order.total}
              </span>
            </div>
          </div>

          {/* Customer Rating Section */}
          <div className="bg-emerald-50/50 rounded-3xl p-5 border border-emerald-100 mb-6">
            <h3 className="font-black text-sm text-slate-900 mb-1">
              Rate Your Hostel Delivery Experience
            </h3>
            <p className="text-[11px] text-slate-500 mb-3">
              How was the delivery speed and packaging?
            </p>

            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="text-xs font-bold text-emerald-800 bg-emerald-100 p-2.5 rounded-xl flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Thank you! Your feedback has been saved.</span>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="Leave a comment (e.g. delivered in 10 mins, hot food!)"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs p-2.5 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>

          {/* Action Buttons: Reorder & Back to Home */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleReorder}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reorder These Items</span>
            </button>

            <Link
              to="/"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
