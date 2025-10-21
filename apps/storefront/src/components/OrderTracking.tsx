import { useState, useEffect } from 'react';
import { ordersAPI } from '../lib/api';
import { OrderTrackingSSE, OrderStatusUpdate } from '../lib/sse-client';

interface OrderTrackingProps {
  orderId: string;
  customerId?: string;
}

export default function OrderTracking({ orderId, customerId }: OrderTrackingProps) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liveStatus, setLiveStatus] = useState<OrderStatusUpdate | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  // Fetch initial order data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderData = await ordersAPI.getById(orderId);
        setOrder(orderData);
        setError('');
      } catch (err: any) {
        setError(err.message || 'Failed to load order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Connect to SSE for live updates
  useEffect(() => {
    if (!orderId) return;

    const streamUrl = ordersAPI.getStreamURL(orderId);
    const sseClient = new OrderTrackingSSE(streamUrl);

    sseClient
      .onUpdate((update) => {
        console.log('Live update received:', update);
        setLiveStatus(update);
        setIsLiveConnected(true);
        
        // Update order object
        setOrder((prev: any) => ({
          ...prev,
          status: update.status,
          carrier: update.carrier,
          trackingNumber: update.trackingNumber,
          estimatedDelivery: update.estimatedDelivery,
          updatedAt: update.timestamp
        }));
      })
      .onError((err) => {
        console.error('SSE Error:', err);
        setIsLiveConnected(false);
      })
      .onClose(() => {
        console.log('SSE Connection closed');
        setIsLiveConnected(false);
      });

    sseClient.connect();

    // Cleanup on unmount
    return () => {
      sseClient.disconnect();
    };
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-red-800 font-semibold">Error Loading Order</h3>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const currentStatus = order.status;
  const statusSteps = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
  const currentStepIndex = statusSteps.indexOf(currentStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-500';
      case 'PROCESSING': return 'bg-blue-500';
      case 'SHIPPED': return 'bg-purple-500';
      case 'DELIVERED': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />;
      case 'PROCESSING':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />;
      case 'SHIPPED':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />;
      case 'DELIVERED':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Order #{order._id}</h1>
              <p className="text-indigo-100 mt-1">Track your order in real-time</p>
            </div>
            {isLiveConnected && (
              <div className="flex items-center bg-white/20 px-3 py-2 rounded-full">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium">Live Updates</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Timeline */}
        <div className="p-8">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200" style={{ left: '19px' }}></div>
            
            {statusSteps.map((step, index) => {
              const isPast = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isActive = isPast || isCurrent;

              return (
                <div key={step} className="relative flex items-start mb-8 last:mb-0">
                  <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white ${isActive ? getStatusColor(step) : 'bg-gray-300'} transition-all duration-500`}>
                    {isActive && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {getStatusIcon(step)}
                      </svg>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className={`font-semibold text-lg ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.charAt(0) + step.slice(1).toLowerCase()}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {isCurrent && liveStatus?.message && (
                        <span className="text-indigo-600 font-medium">{liveStatus.message}</span>
                      )}
                      {isPast && <span className="text-green-600">✓ Completed</span>}
                      {!isActive && <span className="text-gray-400">Pending</span>}
                    </div>
                    {isCurrent && order.estimatedDelivery && (
                      <div className="text-sm text-gray-500 mt-1">
                        Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Order Total</p>
              <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Items</p>
              <p className="text-xl font-bold text-gray-900">{order.items.length}</p>
            </div>
            {order.carrier && (
              <div>
                <p className="text-sm text-gray-600">Carrier</p>
                <p className="text-lg font-semibold text-gray-900">{order.carrier}</p>
              </div>
            )}
            {order.trackingNumber && (
              <div>
                <p className="text-sm text-gray-600">Tracking Number</p>
                <p className="text-lg font-mono font-semibold text-indigo-600">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="mt-6">
            <h3 className="text-md font-semibold mb-3">Items in this order</h3>
            <div className="space-y-2">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center bg-white p-3 rounded">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="border-t border-gray-200 px-6 py-3 bg-gray-100 text-sm text-gray-600 flex items-center justify-between">
          <span>Last updated: {new Date(order.updatedAt || order.createdAt).toLocaleString()}</span>
          {isLiveConnected && (
            <span className="text-green-600 font-medium">● Connected</span>
          )}
        </div>
      </div>
    </div>
  );
}