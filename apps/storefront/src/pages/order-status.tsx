// apps/storefront/src/pages/order-status.tsx
import { useParams } from 'react-router-dom';
import OrderTracking from '../components/OrderTracking';

export default function OrderStatusPage() {
  const { orderId } = useParams();
  
  const customer = JSON.parse(localStorage.getItem('shoplite_customer') || '{}');
  
  return <OrderTracking orderId={orderId!} customerId={customer._id} />;
}