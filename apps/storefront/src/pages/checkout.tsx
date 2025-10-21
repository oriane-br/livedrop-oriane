import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '@/components/templates/page-layout'
import { Card } from '@/components/atoms/card'
import { Button } from '@/components/atoms/button'
import { Price } from '@/components/atoms/price'
import { useCart } from '@/lib/store'
import { ordersAPI } from '@/lib/api' // CHANGED: Use ordersAPI

/**
 * Checkout page component with order summary and order placement
 * UPDATED FOR WEEK 5: Now creates real orders in database
 */
export default function Checkout() {
  const navigate = useNavigate()
  const cart = useCart()

  // State management
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Cart validation - redirect if empty
  useEffect(() => {
    if (cart.items.length === 0) {
      navigate('/cart')
    }
  }, [cart.items, navigate])

  // Calculate totals
  const subtotal = cart.getTotal()
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  // CHANGED: Place order with real API
  const handlePlaceOrder = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Get customer from localStorage (set during login)
      const customerData = localStorage.getItem('shoplite_customer')
      if (!customerData) {
        setError('Please log in to place an order')
        setLoading(false)
        return
      }

      const customer = JSON.parse(customerData)

      // Prepare order data
      const orderData = {
        customerId: customer._id,
        items: cart.items.map(item => ({
          productId: item.product.id,
          name: item.product.title,
          price: item.product.price,
          quantity: item.quantity
        })),
        total: total
      }

      // CHANGED: Call real API to create order
      const order = await ordersAPI.create(orderData)
      
      // Clear cart and navigate to order tracking
      cart.clearCart()
      navigate(`/order/${order._id}`)
    } catch (err: any) {
      console.error('Order creation failed:', err)
      setError(err.message || 'Failed to place order. Please try again.')
      setLoading(false)
    }
  }

  // Don't render if cart is empty (will redirect)
  if (cart.items.length === 0) {
    return null
  }

  return (
    <PageLayout maxWidth="md">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Order Summary */}
        <Card padding="lg" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-3 divide-y">
            {cart.items.map(item => (
              <div key={item.product.id} className="flex justify-between py-3 first:pt-0">
                <div className="flex-1">
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.quantity} × <Price amount={item.product.price} />
                  </p>
                </div>
                <div className="text-right">
                  <Price amount={item.product.price * item.quantity} size="md" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <Price amount={subtotal} />
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (10%)</span>
              <Price amount={tax} />
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <Price amount={total} size="lg" />
            </div>
          </div>
        </Card>
        
        {/* Note about payment */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a demo checkout. Your order will be created in the database and you can track it in real-time!
          </p>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/cart')}
            disabled={loading}
          >
            Back to Cart
          </Button>
          <Button
            className="flex-1"
            onClick={handlePlaceOrder}
            isLoading={loading}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}