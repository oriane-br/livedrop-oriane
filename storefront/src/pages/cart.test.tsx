import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Cart from './cart'
import { useCart } from '@/lib/store'

// Mock the cart store
vi.mock('@/lib/store', () => ({
  useCart: vi.fn()
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

// Mock window.confirm
const mockConfirm = vi.fn()
Object.defineProperty(window, 'confirm', {
  value: mockConfirm,
  writable: true
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
const mockUpdateQuantity = vi.fn()
const mockRemoveItem = vi.fn()
const mockClearCart = vi.fn()
const mockGetTotal = vi.fn()
const mockGetItemCount = vi.fn()

const mockCart = {
  items: mockCartItems,
  addItem: vi.fn(),
  removeItem: mockRemoveItem,
  updateQuantity: mockUpdateQuantity,
  clearCart: mockClearCart,
  getTotal: mockGetTotal,
  getItemCount: mockGetItemCount
}

const renderCart = () => {
  return render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>
  )
}

describe('Cart', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useCart).mockReturnValue(mockCart)
    mockGetTotal.mockReturnValue(279.97) // 99.99 * 2 + 79.99 * 1
    mockGetItemCount.mockReturnValue(3) // 2 + 1
  })

  it('displays all cart items', () => {
    renderCart()
    
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument()
  })

  it('update quantity works', () => {
    renderCart()
    
    // Find increment button for first item
    const incrementButtons = screen.getAllByText('+')
    fireEvent.click(incrementButtons[0])
    
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 3)
  })

  it('remove item works', () => {
    renderCart()
    
    // Find remove button for first item (trash icon)
    const removeButtons = screen.getAllByLabelText(/Remove .* from cart/)
    fireEvent.click(removeButtons[0])
    
    expect(mockRemoveItem).toHaveBeenCalledWith('1')
  })

  it('calculates subtotal correctly', () => {
    renderCart()
    
    expect(screen.getByText('$279.97')).toBeInTheDocument()
    expect(mockGetTotal).toHaveBeenCalled()
  })

  it('calculates tax correctly', () => {
    renderCart()
    
    // Tax should be 10% of subtotal (279.97 * 0.1 = 27.997)
    expect(screen.getByText('$27.997')).toBeInTheDocument()
  })

  it('calculates total correctly', () => {
    renderCart()
    
    // Total should be subtotal + tax (279.97 + 27.997 = 307.967)
    expect(screen.getByText('$307.967')).toBeInTheDocument()
  })

  it('shows item count', () => {
    renderCart()
    
    expect(screen.getByText('Subtotal (3 items)')).toBeInTheDocument()
    expect(mockGetItemCount).toHaveBeenCalled()
  })

  it('proceed to checkout navigates', () => {
    renderCart()
    
    const checkoutButton = screen.getByText('Proceed to Checkout')
    fireEvent.click(checkoutButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/checkout')
  })

  it('continue shopping navigates', () => {
    renderCart()
    
    const continueShoppingButton = screen.getByText('Continue Shopping')
    fireEvent.click(continueShoppingButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('clear cart works', () => {
    mockConfirm.mockReturnValue(true)
    
    renderCart()
    
    const clearCartButton = screen.getByText('Clear Cart')
    fireEvent.click(clearCartButton)
    
    expect(mockConfirm).toHaveBeenCalledWith('Clear all items from cart?')
    expect(mockClearCart).toHaveBeenCalled()
  })

  it('clear cart does not work when user cancels', () => {
    mockConfirm.mockReturnValue(false)
    
    renderCart()
    
    const clearCartButton = screen.getByText('Clear Cart')
    fireEvent.click(clearCartButton)
    
    expect(mockConfirm).toHaveBeenCalledWith('Clear all items from cart?')
    expect(mockClearCart).not.toHaveBeenCalled()
  })

  it('shows empty state when cart empty', () => {
    const emptyCart = {
      ...mockCart,
      items: []
    }
    vi.mocked(useCart).mockReturnValue(emptyCart)
    
    renderCart()
    
    expect(screen.getByText('🛒')).toBeInTheDocument()
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.getByText('Start shopping to add items to your cart')).toBeInTheDocument()
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument()
  })

  it('empty state navigate to catalog works', () => {
    const emptyCart = {
      ...mockCart,
      items: []
    }
    vi.mocked(useCart).mockReturnValue(emptyCart)
    
    renderCart()
    
    const continueShoppingButton = screen.getByText('Continue Shopping')
    fireEvent.click(continueShoppingButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('displays order summary with correct layout', () => {
    renderCart()
    
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('Subtotal (3 items)')).toBeInTheDocument()
    expect(screen.getByText('Tax (10%)')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('shows cart items in correct layout', () => {
    renderCart()
    
    // Should show both cart items
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
    
    // Should show quantities
    expect(screen.getByText('2')).toBeInTheDocument() // First item quantity
    expect(screen.getByText('1')).toBeInTheDocument() // Second item quantity
  })

  it('displays product prices correctly', () => {
    renderCart()
    
    // Should show individual product prices
    const prices = screen.getAllByText('$99.99')
    expect(prices.length).toBeGreaterThan(0)
    
    const speakerPrices = screen.getAllByText('$79.99')
    expect(speakerPrices.length).toBeGreaterThan(0)
  })

  it('shows line totals for each item', () => {
    renderCart()
    
    // First item: 99.99 * 2 = 199.98
    expect(screen.getByText('$199.98')).toBeInTheDocument()
    
    // Second item: 79.99 * 1 = 79.99
    expect(screen.getByText('$79.99')).toBeInTheDocument()
  })

  it('has proper responsive layout classes', () => {
    renderCart()
    
    // Check for grid layout classes
    const gridContainer = screen.getByText('Shopping Cart').closest('.py-8')?.nextElementSibling
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'lg:grid-cols-3', 'gap-8')
  })

  it('order summary card is sticky', () => {
    renderCart()
    
    const orderSummaryCard = screen.getByText('Order Summary').closest('.sticky')
    expect(orderSummaryCard).toHaveClass('sticky', 'top-4')
  })

  it('handles zero tax correctly', () => {
    mockGetTotal.mockReturnValue(0)
    
    renderCart()
    
    expect(screen.getByText('$0.00')).toBeInTheDocument() // Tax should be 0
    expect(screen.getByText('$0.00')).toBeInTheDocument() // Total should be 0
  })

  it('handles large totals correctly', () => {
    mockGetTotal.mockReturnValue(1000)
    
    renderCart()
    
    expect(screen.getByText('$1,000.00')).toBeInTheDocument() // Subtotal
    expect(screen.getByText('$100.00')).toBeInTheDocument() // Tax (10%)
    expect(screen.getByText('$1,100.00')).toBeInTheDocument() // Total
  })

  it('shows correct number of cart line items', () => {
    renderCart()
    
    // Should render CartLineItem components for each item
    const cartItems = screen.getAllByText(/Wireless Headphones|Bluetooth Speaker/)
    expect(cartItems).toHaveLength(2)
  })

  it('passes correct props to CartLineItem components', () => {
    renderCart()
    
    // CartLineItem components should receive the correct props
    // This is tested indirectly by checking that the items are displayed
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
  })
})
