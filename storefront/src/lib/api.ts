/**
 * API module for storefront data fetching and mocking
 */

// Type definitions
export interface Product {
  id: string
  title: string
  price: number
  image: string
  tags: string[]
  stockQty: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  orderId: string
  items: CartItem[]
  status: OrderStatus
  carrier?: string
  eta?: string
  createdAt: Date
}

export type OrderStatus = 'Placed' | 'Packed' | 'Shipped' | 'Delivered'

// In-memory storage for orders (in a real app, this would be a database)
const orderStorage = new Map<string, Order>()

/**
 * Fetches all products from the mock catalog
 * @returns Promise<Product[]> - Array of all products
 */
export async function listProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/mock-catalog.json')
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }
    const products: Product[] = await response.json()
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

/**
 * Fetches a specific product by ID
 * @param id - Product ID to search for
 * @returns Promise<Product | null> - Product if found, null otherwise
 */
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const products = await listProducts()
    const product = products.find(p => p.id === id)
    return product || null
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    return null
  }
}

/**
 * Gets the status of an order by order ID
 * @param orderId - Order ID to check
 * @returns Promise<Order | null> - Order details if found, null otherwise
 */
export async function getOrderStatus(orderId: string): Promise<Order | null> {
  try {
    // Check if order exists in storage
    const storedOrder = orderStorage.get(orderId)
    if (storedOrder) {
      return storedOrder
    }

    // For demo purposes, generate mock status based on orderId pattern
    if (!orderId || orderId.length !== 10) {
      return null
    }

    const lastDigit = parseInt(orderId.slice(-1))
    let status: OrderStatus
    let carrier: string | undefined
    let eta: string | undefined

    if (lastDigit >= 0 && lastDigit <= 2) {
      status = 'Placed'
    } else if (lastDigit >= 3 && lastDigit <= 5) {
      status = 'Packed'
    } else if (lastDigit >= 6 && lastDigit <= 8) {
      status = 'Shipped'
      carrier = 'DHL Express'
      const etaDate = new Date()
      etaDate.setDate(etaDate.getDate() + 2)
      eta = etaDate.toISOString()
    } else if (lastDigit === 9) {
      status = 'Delivered'
    } else {
      return null
    }

    // Create mock order
    const mockOrder: Order = {
      orderId,
      items: [], // Would be populated from actual order data
      status,
      carrier,
      eta,
      createdAt: new Date()
    }

    return mockOrder
  } catch (error) {
    console.error(`Error fetching order status for ${orderId}:`, error)
    return null
  }
}

/**
 * Places a new order and returns the order ID
 * @param cartItems - Array of cart items to order
 * @returns Promise<{ orderId: string }> - Object containing the generated order ID
 */
export async function placeOrder(cartItems: CartItem[]): Promise<{ orderId: string }> {
  try {
    // Generate fake orderId: 10 uppercase alphanumeric characters
    const orderId = generateOrderId()
    
    // Create order object
    const order: Order = {
      orderId,
      items: cartItems,
      status: 'Placed',
      createdAt: new Date()
    }

    // Store order in memory
    orderStorage.set(orderId, order)

    return { orderId }
  } catch (error) {
    console.error('Error placing order:', error)
    throw error
  }
}

/**
 * Finds related products based on shared tags
 * @param product - Product to find related items for
 * @param allProducts - Array of all available products
 * @returns Product[] - Array of related products (max 3)
 */
export function getRelatedProducts(product: Product, allProducts: Product[]): Product[] {
  try {
    const relatedProducts = allProducts
      .filter(p => p.id !== product.id) // Exclude the product itself
      .filter(p => p.tags.some(tag => product.tags.includes(tag))) // Share at least one tag
      .slice(0, 3) // Return first 3 matches

    return relatedProducts
  } catch (error) {
    console.error('Error finding related products:', error)
    return []
  }
}

/**
 * Generates a random 10-character uppercase alphanumeric order ID
 * @returns string - Generated order ID
 */
function generateOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
