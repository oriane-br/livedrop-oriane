// apps/storefront/src/pages/order-status.tsx
import { useParams } from 'react-router-dom';
import OrderTracking from '../components/OrderTracking';

export default function OrderStatusPage() {
  const { orderId } = useParams();
  
  // Get customer data with proper error handling
  const customerData = localStorage.getItem('shoplite_customer');
  
  if (!customerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in to view your order status.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  let customer;
  try {
    customer = JSON.parse(customerData);
  } catch (error) {
    console.error('Failed to parse customer data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Session Error</h1>
          <p className="text-gray-600 mb-6">Your session data is corrupted. Please log in again.</p>
          <button 
            onClick={() => {
              localStorage.removeItem('shoplite_customer');
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In Again
          </button>
        </div>
      </div>
    );
  }

  if (!customer?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Session</h1>
          <p className="text-gray-600 mb-6">Your session is invalid. Please log in again.</p>
          <button 
            onClick={() => {
              localStorage.removeItem('shoplite_customer');
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Log In Again
          </button>
        </div>
      </div>
    );
  }
  
  return <OrderTracking orderId={orderId!} customerId={customer._id} />;
}