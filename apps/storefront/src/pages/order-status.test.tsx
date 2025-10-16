import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '@/lib/store'
import OrderStatus from './order-status'
import * as api from '@/lib/api'

// Mock the API module
vi.mock('@/lib/api', () => ({
  getOrderStatus: vi.fn()
}))

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: 'ORDER123ABC' })
  }
})

// Mock order data
const mockOrder = {
  orderId: 'ORDER123ABC',
  items: [
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
  ],
  status: 'Shipped' as const,
  carrier: 'DHL Express',
  eta: '2024-01-15T10:00:00.000Z',
  createdAt: new Date('2024-01-10T10:00:00.000Z')
}

const renderOrderStatus = () => {
  return render(
    <BrowserRouter>
      <CartProvider>
        <OrderStatus />
      </CartProvider>
    </BrowserRouter>
  )
}

describe('OrderStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads and displays order', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    // Should show loading initially
    expect(screen.getByText('Loading order details...')).toBeInTheDocument()
    
    // Wait for order to load
    await waitFor(() => {
      expect(screen.getByText('Order Status')).toBeInTheDocument()
    })
    
    // Should display order details
    expect(screen.getByText('ORDER123ABC')).toBeInTheDocument()
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
  })

  it('shows correct status badge', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Shipped')).toBeInTheDocument()
    })
  })

  it('shows carrier when Shipped', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Carrier: DHL Express')).toBeInTheDocument()
    })
  })

  it('shows ETA when Shipped', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText(/Expected:/)).toBeInTheDocument()
    })
  })

  it('displays order items', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Order Items')).toBeInTheDocument()
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
      expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
      expect(screen.getByText('Qty: 2')).toBeInTheDocument()
      expect(screen.getByText('Qty: 1')).toBeInTheDocument()
    })
  })

  it('shows order ID', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Order ID')).toBeInTheDocument()
      expect(screen.getByText('ORDER123ABC')).toBeInTheDocument()
    })
  })

  it('progress timeline reflects current status', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Order Progress')).toBeInTheDocument()
      
      // Should show completed steps (Placed, Packed, Shipped)
      expect(screen.getAllByText('✓')).toHaveLength(3)
      
      // Should show current status as bold
      const shippedText = screen.getByText('Shipped')
      expect(shippedText).toHaveClass('font-bold')
    })
  })

  it('shows 404 for invalid order ID', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(null)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Order Not Found')).toBeInTheDocument()
      expect(screen.getByText("The order you're looking for doesn't exist.")).toBeInTheDocument()
    })
  })

  it('continue shopping navigates', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Continue Shopping')).toBeInTheDocument()
    })
    
    const continueShoppingButton = screen.getByText('Continue Shopping')
    continueShoppingButton.click()
    
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('all statuses display correctly (Placed)', async () => {
    const placedOrder = { ...mockOrder, status: 'Placed' as const }
    vi.mocked(api.getOrderStatus).mockResolvedValue(placedOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Placed')).toBeInTheDocument()
      expect(screen.getAllByText('✓')).toHaveLength(1) // Only Placed is complete
    })
  })

  it('all statuses display correctly (Packed)', async () => {
    const packedOrder = { ...mockOrder, status: 'Packed' as const }
    vi.mocked(api.getOrderStatus).mockResolvedValue(packedOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Packed')).toBeInTheDocument()
      expect(screen.getAllByText('✓')).toHaveLength(2) // Placed and Packed are complete
    })
  })

  it('all statuses display correctly (Delivered)', async () => {
    const deliveredOrder = { ...mockOrder, status: 'Delivered' as const }
    vi.mocked(api.getOrderStatus).mockResolvedValue(deliveredOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Delivered')).toBeInTheDocument()
      expect(screen.getAllByText('✓')).toHaveLength(4) // All steps are complete
    })
  })

  it('shows shipping info for Shipped status', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('In Transit')).toBeInTheDocument()
      expect(screen.getByText('📦')).toBeInTheDocument()
    })
  })

  it('shows shipping info for Delivered status', async () => {
    const deliveredOrder = { ...mockOrder, status: 'Delivered' as const }
    vi.mocked(api.getOrderStatus).mockResolvedValue(deliveredOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Delivered')).toBeInTheDocument()
      expect(screen.getByText('📦')).toBeInTheDocument()
    })
  })

  it('does not show shipping info for Placed status', async () => {
    const placedOrder = { ...mockOrder, status: 'Placed' as const }
    vi.mocked(api.getOrderStatus).mockResolvedValue(placedOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.queryByText('In Transit')).not.toBeInTheDocument()
      expect(screen.queryByText('Carrier: DHL Express')).not.toBeInTheDocument()
    })
  })

  it('does not show shipping info for Packed status', async () => {
    const packedOrder = { ...mockOrder, status: 'Packed' as const }
    vi.mocked(api.getOrderStatus).mockResolvedValue(packedOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.queryByText('In Transit')).not.toBeInTheDocument()
      expect(screen.queryByText('Carrier: DHL Express')).not.toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    // Mock a slow API response
    vi.mocked(api.getOrderStatus).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockOrder), 100))
    )
    
    renderOrderStatus()
    
    expect(screen.getByText('Loading order details...')).toBeInTheDocument()
  })

  it('handles API errors gracefully', async () => {
    vi.mocked(api.getOrderStatus).mockRejectedValue(new Error('API Error'))
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Order Not Found')).toBeInTheDocument()
    })
  })

  it('back to products button works in 404 state', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(null)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Order Not Found')).toBeInTheDocument()
    })
    
    const backButton = screen.getByText('Back to Products')
    backButton.click()
    
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('displays item prices correctly', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      // Should show line totals for each item
      expect(screen.getByText('$199.98')).toBeInTheDocument() // 99.99 * 2
      expect(screen.getByText('$79.99')).toBeInTheDocument() // 79.99 * 1
    })
  })

  it('shows proper order ID formatting', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      const orderIdElement = screen.getByText('ORDER123ABC')
      expect(orderIdElement).toHaveClass('font-mono', 'font-semibold')
    })
  })

  it('has proper layout structure', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Order Status')).toBeInTheDocument()
      expect(screen.getByText('Order ID')).toBeInTheDocument()
      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Order Progress')).toBeInTheDocument()
      expect(screen.getByText('Order Items')).toBeInTheDocument()
    })
  })

  it('track package button is disabled', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      const trackButton = screen.getByText('Track Package')
      expect(trackButton).toBeDisabled()
    })
  })

  it('handles missing order ID in URL', async () => {
    // Mock useParams to return undefined id
    vi.mocked(require('react-router-dom')).useParams.mockReturnValue({ id: undefined });
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(screen.getByText('Order Not Found')).toBeInTheDocument()
    })
  })

  it('calls getOrderStatus with correct ID', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      expect(api.getOrderStatus).toHaveBeenCalledWith('ORDER123ABC')
    })
  })

  it('shows proper timeline styling for completed steps', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      // Check that completed steps have green background
      const completedSteps = screen.getAllByText('✓')
      completedSteps.forEach(step => {
        expect(step.closest('div')).toHaveClass('bg-green-500', 'text-white')
      })
    })
  })

  it('shows proper timeline styling for incomplete steps', async () => {
    const placedOrder = { ...mockOrder, status: 'Placed' as const }
    vi.mocked(api.getOrderStatus).mockResolvedValue(placedOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      // Check that incomplete steps have gray background
      const incompleteSteps = screen.getAllByText(/^[2-4]$/) // Steps 2, 3, 4
      incompleteSteps.forEach(step => {
        expect(step.closest('div')).toHaveClass('bg-gray-200', 'text-gray-600')
      })
    })
  })

  it('formats ETA date correctly', async () => {
    vi.mocked(api.getOrderStatus).mockResolvedValue(mockOrder)
    
    renderOrderStatus()
    
    await waitFor(() => {
      // Should show formatted date
      expect(screen.getByText(/Expected:/)).toBeInTheDocument()
    })
  })
})
