// apps/storefront/src/lib/api.ts

/**
 * API Client for Shoplite Backend
 * Connects to real backend API (replacing mock data)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types
export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl: string;
  stock: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssistantResponse {
  text: string;
  intent: string;
  confidence: number;
  citations?: {
    hasCitations: boolean;
    validCitations: string[];
    invalidCitations: string[];
    allValid: boolean;
  };
  functionsCalled: string[];
  responseTime: number;
}

// Error handling
class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new APIError(response.status, error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

// ============================================================================
// CUSTOMER API
// ============================================================================

export const customerAPI = {
  /**
   * Look up customer by email (simple identification)
   */
  async getByEmail(email: string): Promise<Customer | null> {
    const response = await fetch(`${API_BASE_URL}/customers?email=${encodeURIComponent(email)}`);
    if (response.status === 404) return null;
    return handleResponse<Customer>(response);
  },

  /**
   * Get customer by ID
   */
  async getById(customerId: string): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/customers/${customerId}`);
    return handleResponse<Customer>(response);
  }
};

// ============================================================================
// PRODUCTS API
// ============================================================================

export const productsAPI = {
  /**
   * Get all products with filters
   */
  async getAll(params?: {
    search?: string;
    tag?: string;
    category?: string;
    sort?: 'price_asc' | 'price_desc' | 'name';
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number; page: number }> {
    const queryParams = new URLSearchParams();
    
    if (params?.search) queryParams.append('search', params.search);
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);
    return handleResponse(response);
  },

  /**
   * Get single product by ID
   */
  async getById(productId: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    return handleResponse<Product>(response);
  },

  /**
   * Search products
   */
  async search(query: string, limit = 10): Promise<Product[]> {
    const response = await fetch(
      `${API_BASE_URL}/products?search=${encodeURIComponent(query)}&limit=${limit}`
    );
    const data = await handleResponse<{ products: Product[] }>(response);
    return data.products;
  }
};

// ============================================================================
// ORDERS API
// ============================================================================

export const ordersAPI = {
  /**
   * Create new order
   */
  async create(orderData: {
    customerId: string;
    items: OrderItem[];
    total: number;
  }): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return handleResponse<Order>(response);
  },

  /**
   * Get order by ID
   */
  async getById(orderId: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    return handleResponse<Order>(response);
  },

  /**
   * Get orders for a customer
   */
  async getByCustomer(customerId: string): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders?customerId=${customerId}`);
    return handleResponse<Order[]>(response);
  },

  /**
   * Get SSE stream URL for order tracking
   */
  getStreamURL(orderId: string): string {
    return `${API_BASE_URL}/orders/${orderId}/stream`;
  }
};

// ============================================================================
// ANALYTICS API
// ============================================================================

export const analyticsAPI = {
  /**
   * Get daily revenue data
   */
  async getDailyRevenue(from: string, to: string): Promise<{
    date: string;
    revenue: number;
    orderCount: number;
  }[]> {
    const response = await fetch(
      `${API_BASE_URL}/analytics/daily-revenue?from=${from}&to=${to}`
    );
    return handleResponse(response);
  },

  /**
   * Get dashboard metrics
   */
  async getDashboardMetrics(): Promise<{
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
    revenueByCategory: { category: string; revenue: number }[];
  }> {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard-metrics`);
    return handleResponse(response);
  }
};

// ============================================================================
// DASHBOARD API (Admin)
// ============================================================================

export const dashboardAPI = {
  /**
   * Get business metrics
   */
  async getBusinessMetrics(): Promise<{
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
    ordersByStatus: { status: string; count: number }[];
  }> {
    const response = await fetch(`${API_BASE_URL}/dashboard/business-metrics`);
    return handleResponse(response);
  },

  /**
   * Get performance metrics
   */
  async getPerformance(): Promise<{
    apiLatency: number;
    sseConnections: number;
    llmResponseTimes: { intent: string; avgTime: number }[];
    failedRequests: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/dashboard/performance`);
    return handleResponse(response);
  },

  /**
   * Get assistant statistics
   */
  async getAssistantStats(): Promise<{
    totalQueries: number;
    intentDistribution: Record<string, number>;
    functionCalls: { name: string; count: number }[];
    avgResponseTime: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/dashboard/assistant-stats`);
    return handleResponse(response);
  }
};

// ============================================================================
// ASSISTANT API
// ============================================================================

export const assistantAPI = {
  /**
   * Send message to assistant
   */
  async chat(message: string, context?: {
    customerId?: string;
    orderId?: string;
  }): Promise<AssistantResponse> {
    const response = await fetch(`${API_BASE_URL}/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context })
    });
    return handleResponse<AssistantResponse>(response);
  },

  /**
   * Get assistant health status
   */
  async getHealth(): Promise<{
    assistant: string;
    llm: string;
    database: string;
    knowledgeBase: string;
  }> {
    const response = await fetch(`${API_BASE_URL}/assistant/health`);
    return handleResponse(response);
  },

  /**
   * Get assistant statistics
   */
  async getStats(): Promise<{
    totalQueries: number;
    intentDistribution: Record<string, number>;
    functionCalls: any;
    averageResponseTime: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/assistant/stats`);
    return handleResponse(response);
  }
};

// Export error class for error handling in components
export { APIError };