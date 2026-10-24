import React, { useState, useMemo } from 'react'
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Plus,
  Minus,
  X,
  ChevronRight,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Phone,
  Building,
} from 'lucide-react'
import { CATEGORIES, PRODUCTS } from './data/products'

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [favorites, setFavorites] = useState({})
  const [cart, setCart] = useState({}) // { productId: quantity }
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [hostel, setHostel] = useState('Boys Hostel - Block B')
  const [room, setRoom] = useState('204')
  const [studentPhone, setStudentPhone] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Toggle favorite heart
  const toggleFavorite = (productId, e) => {
    e?.stopPropagation()
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }))
  }

  // Cart operations
  const addToCart = (productId, e) => {
    e?.stopPropagation()
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId, e) => {
    e?.stopPropagation()
    setCart((prev) => {
      const current = prev[productId] || 0
      if (current <= 1) {
        const next = { ...prev }
        delete next[productId]
        return next
      }
      return { ...prev, [productId]: current - 1 }
    })
  }

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Cart totals
  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = PRODUCTS.find((p) => p.id === id)
    return sum + (item ? item.price * qty : 0)
  }, 0)

  const deliveryFee = cartSubtotal >= 99 || cartSubtotal === 0 ? 0 : 15
  const roomHandlingFee = cartSubtotal > 0 ? 5 : 0
  const grandTotal = cartSubtotal + deliveryFee + roomHandlingFee

  // Handle Demo Checkout
  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setOrderSuccess(true)
    setTimeout(() => {
      setCart({})
      setIsCartOpen(false)
      setOrderSuccess(false)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans pb-28">
      {/* 1. TOP CURVED APP HEADER (Figma Style) */}
      <header className="bg-gradient-to-b from-emerald-800 to-emerald-700 text-white rounded-b-3xl shadow-lg shadow-emerald-900/10 px-4 pt-4 pb-6 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto">
          {/* Top Row: Brand & Hostel Pill */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 font-black text-xl flex items-center justify-center shadow-md shadow-amber-400/20">
                Q
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-black tracking-tight leading-none text-white">
                    Quick<span className="text-amber-400">Nest</span>
                  </h1>
                  <span className="bg-emerald-600/60 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/40 text-emerald-100 uppercase">
                    Campus Hub
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-100 font-medium mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-300" />
                  <span className="truncate max-w-[180px] sm:max-w-none">
                    {hostel} • Room {room}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Guarantee Badge */}
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>15–20 Mins</span>
            </div>
          </div>

          {/* Search Bar (Figma Style) */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Kurkure, Maggi, Sting, Cold Drinks, Notebooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 pl-11 pr-4 py-3 rounded-2xl text-sm font-medium shadow-inner placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. MAIN STOREFRONT CONTENT */}
      <main className="max-w-4xl mx-auto px-4 w-full pt-4">
        {/* Banner: Campus Cravings Promo (Like Too Yumm! Figma Slide) */}
        {!searchQuery && (
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-5 mb-5 shadow-lg shadow-orange-500/15">
            <div className="relative z-10 max-w-[65%] sm:max-w-[70%]">
              <span className="inline-block bg-white/20 backdrop-blur-xs text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-1.5">
                ⚡ MIDNIGHT SPECIAL
              </span>
              <h2 className="text-xl sm:text-2xl font-black leading-tight mb-1">
                LATE NIGHT MUNCHIES?
              </h2>
              <p className="text-xs text-amber-100 font-medium mb-3 line-clamp-2">
                Kurkure, chilled Sting, instant Maggi & sweets brought to your hostel room.
              </p>
              <button
                onClick={() => setActiveCategory('snacks')}
                className="bg-white text-slate-900 hover:bg-amber-50 text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-transform active:scale-95"
              >
                Order Snacks Now
              </button>
            </div>
            {/* Visual Snack Decor */}
            <div className="absolute right-2 -bottom-2 text-7xl sm:text-8xl select-none opacity-90 drop-shadow-lg">
              🍟
            </div>
          </div>
        )}

        {/* 3. CATEGORY PILL FILTER BAR (Horizontal Scrollable, like Figma) */}
        <div className="mb-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 shadow-xs ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-102'
                      : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. PRODUCT CARDS GRID (Figma 2-Column Mobile Layout) */}
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-base font-bold text-slate-800">
            {CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Products'}
            <span className="text-xs text-slate-400 font-normal ml-2">
              ({filteredProducts.length} items)
            </span>
          </h2>
          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            Hostel In-Stock
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-6">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="font-bold text-slate-700 text-base mb-1">
              No matching essentials found
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Try searching for something else like "Kurkure", "Maggi", or "Sting"
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((product) => {
              const qty = cart[product.id] || 0
              const isFav = favorites[product.id]

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between group cursor-pointer relative"
                >
                  {/* Top Bar on Card: Badge & Favorite Heart */}
                  <div className="flex items-center justify-between mb-2">
                    {product.badge ? (
                      <span
                        className={`text-[9px] font-black text-white px-2 py-0.5 rounded-full ${product.badgeColor} uppercase tracking-wider`}
                      >
                        {product.badge}
                      </span>
                    ) : (
                      <span></span>
                    )}

                    <button
                      onClick={(e) => toggleFavorite(product.id, e)}
                      className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
                      title="Save item"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          isFav
                            ? 'fill-rose-500 text-rose-500'
                            : 'hover:text-rose-500'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden mb-2 bg-slate-50 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Rating & Veg indicator */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">
                      {product.rating}
                    </span>
                    <span className="text-slate-400">({product.reviews})</span>
                    {product.isVeg && (
                      <span
                        className="ml-auto w-3 h-3 rounded-xs border border-green-600 flex items-center justify-center"
                        title="100% Vegetarian"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                      </span>
                    )}
                  </div>

                  {/* Title & Variant */}
                  <div className="mb-2">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 truncate font-medium">
                      {product.variant} • {product.weight}
                    </p>
                  </div>

                  {/* Price & Figma-Style Add/Stepper Button */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm sm:text-base font-black text-slate-900">
                          ₹{product.price}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ₹{product.mrp}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Interactive Button */}
                    {qty === 0 ? (
                      <button
                        onClick={(e) => addToCart(product.id, e)}
                        className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 active:scale-90 transition-transform"
                        title="Add to cart"
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    ) : (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 rounded-full px-2 py-1 text-emerald-800"
                      >
                        <button
                          onClick={(e) => removeFromCart(product.id, e)}
                          className="hover:text-emerald-950 active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <span className="font-black text-xs px-1">{qty}</span>
                        <button
                          onClick={(e) => addToCart(product.id, e)}
                          className="hover:text-emerald-950 active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* 5. FIGMA PRODUCT DETAIL MODAL (Slide-up Sheet) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {selectedProduct.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleFavorite(selectedProduct.id, e)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-rose-500"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites[selectedProduct.id]
                        ? 'fill-rose-500 text-rose-500'
                        : ''
                    }`}
                  />
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Image */}
            <div className="w-full h-56 rounded-2xl overflow-hidden my-4 bg-slate-50 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                </div>
                {selectedProduct.isVeg && (
                  <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    🟢 Vegetarian
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-slate-900 mb-1">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium mb-3">
                {selectedProduct.variant} • {selectedProduct.weight}
              </p>

              {/* Price & Stepper */}
              <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl mb-4 border border-slate-200/60">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Price
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{selectedProduct.price}
                    </span>
                    {selectedProduct.mrp > selectedProduct.price && (
                      <span className="text-xs text-slate-400 line-through">
                        MRP ₹{selectedProduct.mrp}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-xs">
                  <button
                    onClick={() => removeFromCart(selectedProduct.id)}
                    disabled={!cart[selectedProduct.id]}
                    className="text-slate-600 disabled:opacity-30 active:scale-90"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-black text-sm min-w-5 text-center">
                    {cart[selectedProduct.id] || 0}
                  </span>
                  <button
                    onClick={() => addToCart(selectedProduct.id)}
                    className="text-emerald-700 active:scale-90"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                  Product Description
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Campus Perk Card */}
              <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  Delivered directly to your hostel room in <strong>15–20 mins</strong> by our campus team.
                </span>
              </div>
            </div>

            {/* Bottom Add Action */}
            <button
              onClick={() => {
                if (!cart[selectedProduct.id]) {
                  addToCart(selectedProduct.id)
                }
                setSelectedProduct(null)
              }}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>
                {cart[selectedProduct.id]
                  ? `Update in Cart (₹${selectedProduct.price * cart[selectedProduct.id]})`
                  : `Add to Cart • ₹${selectedProduct.price}`}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 6. FLOATING BOTTOM DOCK / CART ISLAND (Figma Style) */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 inset-x-4 max-w-lg mx-auto z-30 animate-in slide-in-from-bottom-6 duration-300">
          <div
            onClick={() => setIsCartOpen(true)}
            className="bg-slate-900 text-white p-3.5 rounded-3xl shadow-2xl flex items-center justify-between cursor-pointer hover:bg-black transition-all border border-slate-800"
          >
            <div className="flex items-center gap-3 pl-1">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
                  {cartItemCount}
                </span>
              </div>
              <div>
                <div className="text-xs text-slate-300 font-medium">
                  {cartItemCount} {cartItemCount === 1 ? 'essential' : 'essentials'} added
                </div>
                <div className="text-base font-black text-white">
                  ₹{grandTotal}{' '}
                  <span className="text-[10px] text-emerald-400 font-normal">
                    (₹{cartSubtotal} + fees)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-md transition-colors">
              <span>View Cart</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* 7. CART & CAMPUS CHECKOUT SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-5 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    🛒
                  </div>
                  <h3 className="text-base font-black text-slate-900">
                    Hostel Cart ({cartItemCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-3 mb-6 max-h-[35vh] overflow-y-auto pr-1">
                {Object.entries(cart).map(([id, qty]) => {
                  const item = PRODUCTS.find((p) => p.id === id)
                  if (!item) return null

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-slate-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          ₹{item.price} each • {item.weight}
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-2 py-1">
                        <button
                          onClick={() => removeFromCart(id)}
                          className="text-slate-500 active:scale-90"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs min-w-3 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => addToCart(id)}
                          className="text-emerald-700 active:scale-90"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-black text-xs text-slate-900 min-w-10 text-right">
                        ₹{item.price * qty}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Campus Delivery Address Form */}
              <form onSubmit={handlePlaceOrder} className="space-y-3 mb-6">
                <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <Building className="w-4 h-4 text-emerald-700" />
                    <span>Hostel Delivery Address</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                      Hostel Block
                    </label>
                    <select
                      value={hostel}
                      onChange={(e) => setHostel(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-xs font-medium rounded-xl p-2 text-slate-800"
                    >
                      <option>Boys Hostel - Block A</option>
                      <option>Boys Hostel - Block B</option>
                      <option>Boys Hostel - Block C</option>
                      <option>Girls Hostel - Block 1</option>
                      <option>Girls Hostel - Block 2</option>
                      <option>Campus Library & Study Area</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                        Room Number
                      </label>
                      <input
                        type="text"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        required
                        placeholder="e.g. 204"
                        className="w-full bg-white border border-slate-200 text-xs font-medium rounded-xl p-2 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold text-slate-500 block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        required
                        placeholder="e.g. 9876543210"
                        className="w-full bg-white border border-slate-200 text-xs font-medium rounded-xl p-2 text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Items Total</span>
                    <span className="font-semibold text-slate-800">
                      ₹{cartSubtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Hostel Delivery Fee</span>
                    <span className="font-semibold text-slate-800">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Room Doorstep Handling</span>
                    <span className="font-semibold text-slate-800">
                      ₹{roomHandlingFee}
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-slate-900">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                {/* Payment Mode Note */}
                <div className="text-[11px] text-slate-500 bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center gap-2">
                  <span>💵</span>
                  <span>
                    <strong>Payment Mode:</strong> Cash on Delivery or UPI QR upon hostel arrival.
                  </span>
                </div>

                {/* Place Order Button */}
                {orderSuccess ? (
                  <div className="bg-emerald-600 text-white p-3.5 rounded-2xl text-center font-bold text-xs flex items-center justify-center gap-2 animate-bounce">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Order Placed! Teammate is Packing Snacks...</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-700/20 active:scale-98 transition-all text-sm"
                  >
                    Place Demo Order • ₹{grandTotal}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
