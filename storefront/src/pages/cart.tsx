import { useNavigate } from 'react-router-dom'
import { PageLayout } from '@/components/templates/page-layout'
import { Card } from '@/components/atoms/card'
import { Button } from '@/components/atoms/button'
import { Price } from '@/components/atoms/price'
import { CartLineItem } from '@/components/molecules/cart-line-item'
import { useCart } from '@/lib/store'

/**
 * Cart page component with full cart functionality
 */
export default function Cart() {
  const navigate = useNavigate()
  const cart = useCart()

  // Calculate totals
  const subtotal = cart.getTotal()
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  // Empty state
  if (cart.items.length === 0) {
    return (
      <PageLayout maxWidth="lg">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Start shopping to add items to your cart
          </p>
          <Button onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout maxWidth="lg">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map(item => (
              <CartLineItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={cart.updateQuantity}
                onRemove={cart.removeItem}
              />
            ))}
            
            {/* Clear Cart Button */}
            <Button
              variant="ghost"
              onClick={() => {
                if (confirm('Clear all items from cart?')) {
                  cart.clearCart()
                }
              }}
            >
              Clear Cart
            </Button>
          </div>
          
          {/* Right: Order Summary */}
          <div>
            <Card padding="lg" className="sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.getItemCount()} items)</span>
                  <Price amount={subtotal} />
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <Price amount={tax} />
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <Price amount={total} size="lg" />
                  </div>
                </div>
              </div>
              
              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <Button
                variant="ghost"
                className="w-full mt-2"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
