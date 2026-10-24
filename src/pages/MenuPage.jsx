import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  Star,
  Plus,
  Minus,
  Heart,
  Filter,
  X,
  ShoppingCart,
  ShieldCheck,
  Check,
} from 'lucide-react'
import { CATEGORIES, PRODUCTS } from '../data/products'
import { useShop } from '../context/ShopContext'

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') || 'all'
  const searchParam = searchParams.get('search') || ''

  const [activeCategory, setActiveCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState(searchParam)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [vegOnly, setVegOnly] = useState(false)

  const { cart, addToCart, removeFromCart, favorites, toggleFavorite, cartItemCount, grandTotal } = useShop()

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesVeg = !vegOnly || product.isVeg
      return matchesCategory && matchesSearch && matchesVeg
    })
  }, [activeCategory, searchQuery, vegOnly])

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 pb-28">
      {/* Menu Header */}
      <div className="bg-white border-b border-slate-200/80 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 inline-block mb-1">
                QuickNest Food & Essentials Menu
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Order Meals, Snacks & Supplies
              </h1>
            </div>

            {/* Quick Filter Pill: Veg Only Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  vegOnly
                    ? 'bg-green-600 text-white border-green-700 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                <span>Pure Veg Only</span>
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search burgers, pizzas, Maggi, biryani, cold coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-11 pr-10 py-3 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-all placeholder:text-slate-400"
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
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* Horizontal Category Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setSearchParams({ category: cat.id })
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-102'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="text-sm font-black text-slate-800">
            {CATEGORIES.find((c) => c.id === activeCategory)?.name || 'Menu'}
            <span className="text-xs text-slate-400 font-normal ml-2">
              ({filteredProducts.length} items available)
            </span>
          </div>
        </div>

        {/* Product Cards Grid (Figma Style) */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-12">
            <div className="text-5xl mb-3">🍽️</div>
            <h3 className="font-bold text-slate-800 text-base mb-1">
              No items found matching your filters
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Try searching for "burger", "pizza", or clear your veg filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
                setVegOnly(false)
              }}
              className="bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredProducts.map((product) => {
              const qty = cart[product.id] || 0
              const isFav = favorites[product.id]

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white rounded-3xl p-3 sm:p-3.5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group cursor-pointer relative"
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
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(product.id)
                      }}
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
                  <div className="w-full h-32 sm:h-38 rounded-2xl overflow-hidden mb-2.5 bg-slate-50 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Rating & Veg indicator */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">
                      {product.rating}
                    </span>
                    <span className="text-slate-400">({product.reviews})</span>
                    {product.isVeg ? (
                      <span
                        className="ml-auto w-3.5 h-3.5 rounded-xs border border-green-600 flex items-center justify-center"
                        title="100% Vegetarian"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                      </span>
                    ) : (
                      <span
                        className="ml-auto w-3.5 h-3.5 rounded-xs border border-red-600 flex items-center justify-center"
                        title="Non-Vegetarian"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="mb-2.5">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-slate-500 line-clamp-1 font-medium">
                      {product.variant} • {product.weight}
                    </p>
                  </div>

                  {/* Price & Stepper */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
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

                    {qty === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product.id)
                        }}
                        className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 active:scale-90 transition-transform"
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    ) : (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 rounded-full px-2 py-1 text-emerald-800"
                      >
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="hover:text-emerald-950 active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <span className="font-black text-xs px-1">{qty}</span>
                        <button
                          onClick={() => addToCart(product.id)}
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
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {selectedProduct.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(selectedProduct.id)}
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

            <div className="w-full h-56 rounded-2xl overflow-hidden my-4 bg-slate-50 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                </div>
                {selectedProduct.isVeg ? (
                  <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    🟢 Vegetarian
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                    🔴 Non-Vegetarian
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-slate-900 mb-1">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium mb-3">
                {selectedProduct.variant} • {selectedProduct.weight}
              </p>

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

              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                  Description
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  Delivered hot/chilled to your hostel room in <strong>15–20 mins</strong> by QuickNest student runners.
                </span>
              </div>
            </div>

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
    </div>
  )
}
