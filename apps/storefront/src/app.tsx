import { useState, useEffect } from 'react';
import UserLogin from './components/UserLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SupportAssistant from './components/SupportAssistant';
import Catalog from './pages/catalog';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import OrderStatusPage from './pages/order-status';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/not-found';
import { CartProvider } from './lib/store';
import Product from './pages/product';

export default function App() {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session
  useEffect(() => {
    const stored = localStorage.getItem('shoplite_customer');
    if (stored) {
      setCustomer(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleLogin = (customerData: any) => {
    setCustomer(customerData);
  };

  const handleLogout = () => {
    localStorage.removeItem('shoplite_customer');
    setCustomer(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Show login if no customer
  if (!customer) {
    return <UserLogin onLogin={handleLogin} />;
  }

  // Show main app
  return (
    <BrowserRouter>
      <CartProvider>
        <div>
          {/* Your existing navigation with logout button */}
          <nav>
            <span>
              Welcome, {customer && (customer as any)?.name ? (customer as any).name : 'Customer'}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </nav>

          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:orderId" element={<OrderStatusPage />} />
            <Route path="/p/:id" element={<Product />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Add Support Assistant */}
          <SupportAssistant customerId={(customer as any)?._id} />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}