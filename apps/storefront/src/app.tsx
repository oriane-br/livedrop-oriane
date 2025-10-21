import { useState, useEffect } from 'react';
import UserLogin from './components/UserLogin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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

  const handleLogin = (customerData) => {
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
      <div>
        {/* Your existing navigation with logout button */}
        <nav>
          <span>Welcome, {customer.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </nav>

        <Routes>
          {/* Your existing routes */}
        </Routes>

        {/* Add Support Assistant */}
        <SupportAssistant customerId={customer._id} />
      </div>
    </BrowserRouter>
  );
}