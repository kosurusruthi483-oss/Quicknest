import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import AuthPage from './pages/AuthPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderTrackingPage from './pages/OrderTrackingPage'
import OrderCompletedPage from './pages/OrderCompletedPage'
import PartnerPage from './pages/PartnerPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
          <Navbar />
          <div className="flex-1">
            <Routes>
              {/* Page 1: Home */}
              <Route path="/" element={<HomePage />} />

              {/* Page 2: Food & Essentials Menu */}
              <Route path="/menu" element={<MenuPage />} />

              {/* Page 3: Shopping Cart */}
              <Route path="/cart" element={<CartPage />} />

              {/* Page 4: Registration, Login & Profile */}
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/profile" element={<AuthPage />} />

              {/* Page 5, 6, 7 & 8: Customer Details, Location, Payment & Order */}
              <Route path="/checkout/details" element={<CheckoutPage />} />
              <Route path="/checkout/payment" element={<CheckoutPage />} />
              <Route path="/checkout" element={<Navigate to="/checkout/details" replace />} />

              {/* Page 9: Live Order Tracking */}
              <Route path="/track/:orderId" element={<OrderTrackingPage />} />
              <Route path="/track" element={<Navigate to="/profile" replace />} />

              {/* Page 10: Order Received & Feedback */}
              <Route path="/order-completed/:orderId" element={<OrderCompletedPage />} />

              {/* Section 4: Delivery Partner Portal */}
              <Route path="/partner" element={<PartnerPage />} />

              {/* Section 5: Admin Dashboard */}
              <Route path="/admin" element={<AdminPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ShopProvider>
    </BrowserRouter>
  )
}
