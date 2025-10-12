import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout } from '@/components/templates/page-layout'
import { Card } from '@/components/atoms/card'
import { Button } from '@/components/atoms/button'
import { Price } from '@/components/atoms/price'
import { OrderStatusBadge } from '@/components/molecules/order-status-badge'
import { getOrderStatus } from '@/lib/api'
import { Order } from '@/lib/api'

/**
 * Order status page component with order details and progress tracking
 */
export default function OrderStatus() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // State management
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Data fetching
  useEffect(() => {
    const loadOrder = async () => {
      if (!id) {
        setNotFound(true)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setNotFound(false)
        const orderData = await getOrderStatus(id)
        
        if (!orderData) {
          setNotFound(true)
        } else {
          setOrder(orderData)
        }
      } catch (error) {
        console.error('Error loading order:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [id])

  // Loading state
  if (loading) {
    return (
      <PageLayout maxWidth="md">
        <div className="py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  // Not found state
  if (notFound || !order) {
    return (
      <PageLayout maxWidth="md">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-4">The order you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            Back to Products
          </Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout maxWidth="md">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Order Status</h1>
        
        <Card padding="lg" className="mb-6">
          {/* Order ID */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-lg font-mono font-semibold">{order.orderId}</p>
          </div>
          
          {/* Status */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Status</p>
            <OrderStatusBadge
              status={order.status}
              carrier={order.carrier}
              eta={order.eta}
              size="lg"
            />
          </div>
          
          {/* Shipping Info (if Shipped or Delivered) */}
          {(order.status === 'Shipped' || order.status === 'Delivered') && (
            <div className="mb-6 bg-blue-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📦</div>
                <div>
                  <p className="font-semibold mb-1">
                    {order.status === 'Shipped' ? 'In Transit' : 'Delivered'}
                  </p>
                  {order.carrier && (
                    <p className="text-sm text-gray-700">
                      Carrier: {order.carrier}
                    </p>
                  )}
                  {order.eta && (
                    <p className="text-sm text-gray-700">
                      Expected: {new Date(order.eta).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Order Timeline */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Order Progress</h3>
            <div className="space-y-3">
              {['Placed', 'Packed', 'Shipped', 'Delivered'].map((status, idx) => {
                const isComplete = ['Placed', 'Packed', 'Shipped', 'Delivered']
                  .indexOf(order.status) >= idx
                const isCurrent = order.status === status
                
                return (
                  <div key={status} className="flex items-center gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${isComplete ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}
                    `}>
                      {isComplete ? '✓' : idx + 1}
                    </div>
                    <span className={`
                      ${isCurrent ? 'font-bold' : ''}
                      ${isComplete ? 'text-gray-900' : 'text-gray-500'}
                    `}>
                      {status}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-2">
              {order.items.map(item => (
                <div key={item.product.id} className="flex justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <Price amount={item.product.price * item.quantity} />
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
          <Button
            className="flex-1"
            onClick={() => navigate('/order/' + order.orderId)}
            disabled
          >
            Track Package
          </Button>
        </div>
      </div>
    </PageLayout>
  )
}
