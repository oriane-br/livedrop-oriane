import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Checkout from './checkout'
import { useCart } from '@/lib/store'
import * as api from '@/lib/api'

// Mock the cart store
vi.mock('@/lib/store', () => ({
  useCart: vi.fn()
}))

// Mock the API module
vi.mock('@/lib/api', () => ({
  placeOrder: vi.fn()
}))

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

// Mock cart items data
const mockCartItems = [
  {
    product: {
      id: '1',
      title: 'Wireless Headphones',
      price: 99.99,
      image: '/headphones.jpg',
      tags: ['electronics', 'audio'],
      stockQty: 10
    },
    quantity: 2
  },
  {
    product: {
      id: '2',
      title: 'Bluetooth Speaker',
      price: 79.99,
      image: '/speaker.jpg',
      tags: ['electronics', 'audio'],
      stockQty: 5
    },
    quantity: 1
  }
]

// Mock cart functions
const mockClearCart = vi.fn()
const mockGetTotal = vi.fn()
const mockGetItemCount = vi.fn()

const mockCart = {
  items: mockCartItems,
  addItem: vi.fn(),
  removeItem: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: mockClearCart,
  getTotal: mockGetTotal,
  getItemCount: mockGetItemCount
}

const renderCheckout = () => {
  return render(
    <BrowserRouter>
      <Checkout />
    </BrowserRouter>
  )
}

describe('Checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useCart).mockReturnValue(mockCart)
    mockGetTotal.mockReturnValue(279.97) // 99.99 * 2 + 79.99 * 1
    mockGetItemCount.mockReturnValue(3) // 2 + 1 items
  })

  it('displays order summary', () => {
    renderCheckout()
    
    expect(screen.getByText('Checkout')).toBeInTheDocument()
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
  })

  it('shows all cart items', () => {
    renderCheckout()
    
    expect(screen.getAllByText('Wireless Headphones')).toHaveLength(1)
    expect(screen.getAllByText('Bluetooth Speaker')).toHaveLength(1)
    
    // Should show quantities
    expect(screen.getByText('Qty: 2 ×')).toBeInTheDocument()
    expect(screen.getByText('Qty: 1 ×')).toBeInTheDocument()
  })

  it('calculates totals correctly', () => {
    renderCheckout()
    
    // Subtotal
    expect(screen.getAllByText('$279.97')).toHaveLength(1)
    
    // Tax (10% of 279.97 = 27.997)
    expect(screen.getByText('$27.997')).toBeInTheDocument()
    
    // Total (279.97 + 27.997 = 307.967)
    expect(screen.getByText('$307.967')).toBeInTheDocument()
  })

  it('place order creates order', async () => {
    const mockOrderId = 'ORDER123ABC'
    vi.mocked(api.placeOrder).mockResolvedValue({ orderId: mockOrderId })
    
    renderCheckout()
    
    const placeOrderButton = screen.getByText('Place Order')
    fireEvent.click(placeOrderButton)
    
    expect(api.placeOrder).toHaveBeenCalledWith(mockCartItems)
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(`/order/${mockOrderId}`)
    })
  })

  it('redirects to order status after order', async () => {
    const mockOrderId = 'ORDER456DEF'
    vi.mocked(api.placeOrder).mockResolvedValue({ orderId: mockOrderId })
    
    renderCheckout()
    
    const placeOrderButton = screen.getByText('Place Order')
    fireEvent.click(placeOrderButton)
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(`/order/${mockOrderId}`)
    })
  })

  it('clears cart after successful order', async () => {
    const mockOrderId = 'ORDER789GHI'
    vi.mocked(api.placeOrder).mockResolvedValue({ orderId: mockOrderId })
    
    renderCheckout()
    
    const placeOrderButton = screen.getByText('Place Order')
    fireEvent.click(placeOrderButton)
    
    await waitFor(() => {
      expect(mockClearCart).toHaveBeenCalled()
    })
  })

  it('shows loading state during order', async () => {
    // Mock a slow API response
    vi.mocked(api.placeOrder).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ orderId: 'ORDER123' }), 100))
    )
    
    renderCheckout()
    
    const placeOrderButton = screen.getByText('Place Order')
    fireEvent.click(placeOrderButton)
    
    // Should show loading state
    expect(screen.getByText('Placing Order...')).toBeInTheDocument()
    expect(placeOrderButton).toBeDisabled()
    
    // Back to cart button should also be disabled
    const backToCartButton = screen.getByText('Back to Cart')
    expect(backToCartButton).toBeDisabled()
  })

  it('shows error on order failure', async () => {
    vi.mocked(api.placeOrder).mockRejectedValue(new Error('API Error'))
    
    renderCheckout()
    
    const placeOrderButton = screen.getByText('Place Order')
    fireEvent.click(placeOrderButton)
    
    await waitFor(() => {
      expect(screen.getByText('Failed to place order. Please try again.')).toBeInTheDocument()
    })
    
    // Should not clear cart on error
    expect(mockClearCart).not.toHaveBeenCalled()
    
    // Should not navigate on error
    expect(mockNavigate).not.toHaveBeenCalledWith(expect.stringContaining('/order/'))
  })

  it('back to cart button works', () => {
    renderCheckout()
    
    const backToCartButton = screen.getByText('Back to Cart')
    fireEvent.click(backToCartButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/cart')
  })

  it('redirects to cart if cart empty', () => {
    const emptyCart = {
      ...mockCart,
      items: []
    }
    vi.mocked(useCart).mockReturnValue(emptyCart)
    
    renderCheckout()
    
    expect(mockNavigate).toHaveBeenCalledWith('/cart')
  })

  it('shows demo payment note', () => {
    renderCheckout()
    
    expect(screen.getByText('Note:')).toBeInTheDocument()
    expect(screen.getByText('This is a demo checkout. No payment will be processed.')).toBeInTheDocument()
  })

  it('displays item line totals correctly', () => {
    renderCheckout()
    
    // First item: 99.99 * 2 = 199.98
    expect(screen.getAllByText('$199.98')).toHaveLength(2) // Appears in line item and total
    
    // Second item: 79.99 * 1 = 79.99
    expect(screen.getAllByText('$79.99')).toHaveLength(2) // Appears in line item and total
  })

  it('shows individual product prices', () => {
    renderCheckout()
    
    // Should show individual prices in quantity line
    const prices = screen.getAllByText('$99.99')
    expect(prices.length).toBeGreaterThan(0)
    
    const speakerPrices = screen.getAllByText('$79.99')
    expect(speakerPrices.length).toBeGreaterThan(0)
  })

  it('has proper layout structure', () => {
    renderCheckout()
    
    // Should have proper heading
    expect(screen.getAllByText('Checkout')).toHaveLength(2) // Header and page title
    
    // Should have order summary card
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    
    // Should have action buttons
    expect(screen.getByText('Back to Cart')).toBeInTheDocument()
    expect(screen.getByText('Place Order')).toBeInTheDocument()
  })

  it('handles zero tax correctly', () => {
    mockGetTotal.mockReturnValue(0)
    
    renderCheckout()
    
    expect(screen.getAllByText('$0.00')).toHaveLength(3) // Tax, Total, and Subtotal should all be 0
  })

  it('handles large totals correctly', () => {
    mockGetTotal.mockReturnValue(1000)
    
    renderCheckout()
    
    expect(screen.getByText('$1,000.00')).toBeInTheDocument() // Subtotal
    expect(screen.getByText('$100.00')).toBeInTheDocument() // Tax (10%)
    expect(screen.getByText('$1,100.00')).toBeInTheDocument() // Total
  })

  it('shows correct number of items in summary', () => {
    renderCheckout()
    
    // Should show both items in the order summary (may appear multiple times due to layout)
    const itemTitles = screen.getAllByText(/Wireless Headphones|Bluetooth Speaker/)
    expect(itemTitles.length).toBeGreaterThanOrEqual(2)
  })

  it('displays proper error styling', async () => {
    vi.mocked(api.placeOrder).mockRejectedValue(new Error('API Error'))
    
    renderCheckout()
    
    const placeOrderButton = screen.getByText('Place Order')
    fireEvent.click(placeOrderButton)
    
    await waitFor(() => {
      const errorMessage = screen.getByText('Failed to place order. Please try again.')
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage.closest('div')).toHaveClass('bg-red-50', 'border-red-200')
    })
  })

  it('shows proper demo note styling', () => {
    renderCheckout()
    
    const demoNote = screen.getByText('Note: This is a demo checkout. No payment will be processed.')
    expect(demoNote.closest('div')).toHaveClass('bg-blue-50', 'border-blue-200')
  })

  it('button states work correctly during loading', async () => {
    vi.mocked(api.placeOrder).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ orderId: 'ORDER123' }), 100))
    )
    
    renderCheckout()
    
    const placeOrderButton = screen.getByText('Place Order')
    const backToCartButton = screen.getByText('Back to Cart')
    
    // Initially enabled
    expect(placeOrderButton).not.toBeDisabled()
    expect(backToCartButton).not.toBeDisabled()
    
    // Click place order
    fireEvent.click(placeOrderButton)
    
    // Should be disabled during loading
    expect(placeOrderButton).toBeDisabled()
    expect(backToCartButton).toBeDisabled()
  })

  it('does not render content when cart is empty', () => {
    const emptyCart = {
      ...mockCart,
      items: []
    }
    vi.mocked(useCart).mockReturnValue(emptyCart)
    
    const { container } = renderCheckout()
    
    // Should not render the main content
    expect(screen.queryByText('Checkout')).not.toBeInTheDocument()
    expect(container.firstChild).toBeNull()
  })

  it('calls getTotal to calculate subtotal', () => {
    renderCheckout()
    
    expect(mockGetTotal).toHaveBeenCalled()
  })

  it('shows proper tax calculation', () => {
    mockGetTotal.mockReturnValue(100)
    
    renderCheckout()
    
    // Tax should be 10% of 100 = 10
    expect(screen.getByText('$10.00')).toBeInTheDocument()
  })
})
