import React, { createContext, useContext, useState, useEffect } from 'react'
import { PRODUCTS } from '../data/products'

const ShopContext = createContext()

export function ShopProvider({ children }) {
  // Cart state stored in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('quicknest_cart')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('quicknest_favs')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // User Profile
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('quicknest_user')
      return saved
        ? JSON.parse(saved)
        : {
            isLoggedIn: true,
            name: 'Campus Student',
            email: 'student@college.edu',
            phone: '9876543210',
            hostelBlock: 'Boys Hostel - Block B',
            roomNumber: '204',
            floor: '2nd Floor',
            landmark: 'Near Water Cooler',
            role: 'customer', // 'customer' | 'partner' | 'admin'
          }
    } catch {
      return null
    }
  })

  // Saved Addresses
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('quicknest_addresses')
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'addr-1',
              title: 'My Hostel Room (Primary)',
              hostelBlock: 'Boys Hostel - Block B',
              roomNumber: '204',
              floor: '2nd Floor',
              landmark: 'Near Water Cooler',
              phone: '9876543210',
            },
            {
              id: 'addr-2',
              title: 'Central Library Study Cubicle',
              hostelBlock: 'Central Library & Reading Hall',
              roomNumber: 'Table 18',
              floor: 'Ground Floor',
              landmark: 'Opposite Reference Section',
              phone: '9876543210',
            },
          ]
    } catch {
      return []
    }
  })

  // Active selected delivery address
  const [selectedAddress, setSelectedAddress] = useState(() => addresses[0] || null)

  // Applied Coupon
  const [couponCode, setCouponCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)

  // Orders List (Persistent history)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('quicknest_orders')
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'QN-94102',
              createdAt: 'Today, 2:30 PM',
              status: 'Delivered', // 'Order Confirmed' | 'Preparing' | 'Ready for Pickup' | 'Picked Up' | 'Out for Delivery' | 'Delivered'
              items: [
                { id: 'crispy-veg-burger', name: 'Crispy Herb Veg Burger', price: 89, qty: 1 },
                { id: 'chilled-sting-energy', name: 'Sting Energy Drink Can', price: 20, qty: 2 },
              ],
              total: 134,
              address: 'Boys Hostel - Block B • Room 204',
              runnerName: 'Aman Sharma',
              runnerPhone: '+91 98765 00012',
              rating: 5,
              review: 'Super fast delivery to 2nd floor!',
            },
          ]
    } catch {
      return []
    }
  })

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('quicknest_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('quicknest_favs', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('quicknest_user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('quicknest_orders', JSON.stringify(orders))
  }, [orders])

  useEffect(() => {
    localStorage.setItem('quicknest_addresses', JSON.stringify(addresses))
  }, [addresses])

  // Cart operations
  const addToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId) => {
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

  const clearItemFromCart = (productId) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[productId]
      return next
    })
  }

  const clearCart = () => {
    setCart({})
    setCouponCode('')
    setDiscountAmount(0)
  }

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }))
  }

  // Totals
  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = PRODUCTS.find((p) => p.id === id)
    return sum + (item ? item.price * qty : 0)
  }, 0)

  // Free delivery threshold: Free above ₹149
  const freeDeliveryThreshold = 149
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal)
  const deliveryFee = cartSubtotal >= freeDeliveryThreshold || cartSubtotal === 0 ? 0 : 20
  const roomHandlingFee = cartSubtotal > 0 ? 5 : 0
  const grandTotal = Math.max(0, cartSubtotal + deliveryFee + roomHandlingFee - discountAmount)

  // Coupon handling
  const applyCoupon = (code) => {
    const upper = code.trim().toUpperCase()
    if (upper === 'FIRSTNEST') {
      setCouponCode('FIRSTNEST')
      setDiscountAmount(25)
      return { success: true, message: '🎉 FIRSTNEST applied! ₹25 instant discount.' }
    } else if (upper === 'EXAM50') {
      const discount = Math.round(cartSubtotal * 0.15)
      setCouponCode('EXAM50')
      setDiscountAmount(discount)
      return { success: true, message: `🎉 EXAM50 applied! 15% discount (₹${discount}).` }
    } else {
      return { success: false, message: 'Invalid coupon code. Try FIRSTNEST or EXAM50.' }
    }
  }

  const removeCoupon = () => {
    setCouponCode('')
    setDiscountAmount(0)
  }

  // Create an order
  const createOrder = (orderData) => {
    const newOrderId = `QN-${Math.floor(10000 + Math.random() * 90000)}`
    const newOrder = {
      id: newOrderId,
      createdAt: 'Just now',
      status: 'Order Confirmed',
      items: Object.entries(cart).map(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id)
        return {
          id,
          name: product?.name || 'Item',
          price: product?.price || 0,
          qty,
          image: product?.image,
        }
      }),
      subtotal: cartSubtotal,
      deliveryFee,
      roomHandlingFee,
      discountAmount,
      total: grandTotal,
      address: `${orderData.hostelBlock} • Room ${orderData.roomNumber}`,
      paymentMethod: orderData.paymentMethod || 'UPI on Delivery',
      deliveryNotes: orderData.deliveryNotes || '',
      runnerName: 'Rohan Mehra (Hostel Runner)',
      runnerPhone: '+91 98765 43211',
      rating: null,
      review: null,
    }

    setOrders((prev) => [newOrder, ...prev])
    clearCart()
    return newOrderId
  }

  // Update order status (for runner / admin / simulation)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    )
  }

  // Rate order
  const rateOrder = (orderId, rating, review) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, rating, review } : ord))
    )
  }

  // Profile update
  const updateProfile = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }))
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        user,
        addresses,
        selectedAddress,
        setSelectedAddress,
        couponCode,
        discountAmount,
        orders,
        cartItemCount,
        cartSubtotal,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        deliveryFee,
        roomHandlingFee,
        grandTotal,
        addToCart,
        removeFromCart,
        clearItemFromCart,
        clearCart,
        toggleFavorite,
        applyCoupon,
        removeCoupon,
        createOrder,
        updateOrderStatus,
        rateOrder,
        updateProfile,
        setUser,
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop must be used within ShopProvider')
  return context
}
