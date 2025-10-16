import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Product from './product'
import { useCart } from '@/lib/store'
import * as api from '@/lib/api'
import * as format from '@/lib/format'

// Mock the API module
vi.mock('@/lib/api', () => ({
  getProduct: vi.fn(),
  listProducts: vi.fn(),
  getRelatedProducts: vi.fn()
}))

// Mock the format module
vi.mock('@/lib/format', () => ({
  getStockStatus: vi.fn(),
  formatCurrency: vi.fn((amount: number) => `$${amount.toFixed(2)}`),
  formatDate: vi.fn(),
  formatETA: vi.fn(),
  maskOrderId: vi.fn()
}))

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
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' })
  }
})

// Mock products data
const mockProduct = {
  id: '1',
  title: 'Wireless Headphones',
  price: 99.99,
  image: '/headphones.jpg',
  tags: ['electronics', 'audio'],
  stockQty: 10
}

const mockAllProducts = [
  mockProduct,
  {
    id: '2',
    title: 'Bluetooth Speaker',
    price: 79.99,
    image: '/speaker.jpg',
    tags: ['electronics', 'audio'],
    stockQty: 5
  },
  {
    id: '3',
    title: 'Coffee Maker',
    price: 49.99,
    image: '/coffee.jpg',
    tags: ['kitchen', 'appliances'],
    stockQty: 8
  },
  {
    id: '4',
    title: 'Running Shoes',
    price: 129.99,
    image: '/shoes.jpg',
    tags: ['sports', 'footwear'],
    stockQty: 12
  }
]

const mockRelatedProducts = [
  {
    id: '2',
    title: 'Bluetooth Speaker',
    price: 79.99,
    image: '/speaker.jpg',
    tags: ['electronics', 'audio'],
    stockQty: 5
  }
]

// Mock cart functions
const mockAddItem = vi.fn()
const mockCart = {
  items: [],
  addItem: mockAddItem,
  removeItem: vi.fn(),
  updateQuantity: vi.fn(),
  clearCart: vi.fn(),
  getTotal: vi.fn(() => 0),
  getItemCount: vi.fn(() => 0)
}

const renderProduct = () => {
  return render(
    <BrowserRouter>
      <Product />
    </BrowserRouter>
  )
}

describe('Product', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useCart).mockReturnValue(mockCart)
    vi.mocked(api.getProduct).mockResolvedValue(mockProduct)
    vi.mocked(api.listProducts).mockResolvedValue(mockAllProducts)
    vi.mocked(api.getRelatedProducts).mockReturnValue(mockRelatedProducts)
    vi.mocked(format.getStockStatus).mockReturnValue({
      label: 'In Stock',
      color: 'green'
    })
  })

  it('loads and displays product', async () => {
    renderProduct()
    
    // Should show loading initially
    expect(screen.getByText('Loading product...')).toBeInTheDocument()
    
    // Wait for product to load
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Should display product details
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('In Stock')).toBeInTheDocument()
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText('audio')).toBeInTheDocument()
  })

  it('shows stock status badge', async () => {
    vi.mocked(format.getStockStatus).mockReturnValue({
      label: 'Low Stock',
      color: 'yellow'
    })
    
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getByText('Low Stock')).toBeInTheDocument()
    })
  })

  it('quantity selector works (increment/decrement)', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Should start with quantity 1
    expect(screen.getByText('1')).toBeInTheDocument()
    
    // Increment quantity
    const incrementButton = screen.getByText('+')
    fireEvent.click(incrementButton)
    expect(screen.getByText('2')).toBeInTheDocument()
    
    // Decrement quantity
    const decrementButton = screen.getByText('-')
    fireEvent.click(decrementButton)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('quantity limited by stock', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Increment to max stock (10)
    const incrementButton = screen.getByText('+')
    for (let i = 0; i < 10; i++) {
      fireEvent.click(incrementButton)
    }
    
    expect(screen.getByText('10')).toBeInTheDocument()
    
    // + button should be disabled at max stock
    expect(incrementButton).toBeDisabled()
    
    // Decrement back to 1
    const decrementButton = screen.getByText('-')
    for (let i = 0; i < 9; i++) {
      fireEvent.click(decrementButton)
    }
    
    expect(screen.getByText('1')).toBeInTheDocument()
    
    // - button should be disabled at min quantity
    expect(decrementButton).toBeDisabled()
  })

  it('add to cart with correct quantity', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Set quantity to 3
    const incrementButton = screen.getByText('+')
    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)
    
    // Add to cart
    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)
    
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct, 3)
  })

  it('shows related products (max 3)', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Should show related products section
    expect(screen.getByText('You might also like')).toBeInTheDocument()
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
    
    // Should call getRelatedProducts with correct parameters
    expect(api.getRelatedProducts).toHaveBeenCalledWith(mockProduct, mockAllProducts)
  })

  it('related products share tags with current product', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Related product should share 'electronics' and 'audio' tags
    expect(api.getRelatedProducts).toHaveBeenCalledWith(
      expect.objectContaining({
        tags: ['electronics', 'audio']
      }),
      mockAllProducts
    )
  })

  it('navigate to related product works', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Click on related product
    const relatedProduct = screen.getByText('Bluetooth Speaker')
    fireEvent.click(relatedProduct)
    
    expect(mockNavigate).toHaveBeenCalledWith('/p/2')
  })

  it('shows 404 for invalid product ID', async () => {
    vi.mocked(api.getProduct).mockResolvedValue(null)
    
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getByText('Product Not Found')).toBeInTheDocument()
      expect(screen.getByText("The product you're looking for doesn't exist.")).toBeInTheDocument()
    })
  })

  it('disables add to cart when out of stock', async () => {
    const outOfStockProduct = { ...mockProduct, stockQty: 0 }
    vi.mocked(api.getProduct).mockResolvedValue(outOfStockProduct)
    vi.mocked(format.getStockStatus).mockReturnValue({
      label: 'Out of Stock',
      color: 'red'
    })
    
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    const addToCartButton = screen.getByText('Out of Stock')
    expect(addToCartButton).toBeDisabled()
  })

  it('breadcrumb navigation works', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Should show breadcrumb
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2)
    
    // Products link should navigate to home
    const productsLink = screen.getByText('Products')
    expect(productsLink.closest('a')).toHaveAttribute('href', '/')
  })

  it('shows loading state', () => {
    // Mock a slow API response
    vi.mocked(api.getProduct).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    renderProduct()
    
    expect(screen.getByText('Loading product...')).toBeInTheDocument()
  })

  it('handles API errors gracefully', async () => {
    vi.mocked(api.getProduct).mockRejectedValue(new Error('API Error'))
    
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getByText('Product Not Found')).toBeInTheDocument()
    })
  })

  it('back to products button works in 404 state', async () => {
    vi.mocked(api.getProduct).mockResolvedValue(null)
    
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getByText('Product Not Found')).toBeInTheDocument()
    })
    
    const backButton = screen.getByText('Back to Products')
    fireEvent.click(backButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('shows product description', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('High-quality wireless headphones available now.')).toBeInTheDocument()
  })

  it('displays product image with correct attributes', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    const image = screen.getByAltText('Wireless Headphones')
    expect(image).toHaveAttribute('src', '/headphones.jpg')
  })

  it('handles missing product ID in URL', async () => {
    // Mock useParams to return undefined id
    vi.mocked(require('react-router-dom')).useParams.mockReturnValue({ id: undefined });
    
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getByText('Product Not Found')).toBeInTheDocument()
    })
  })

  it('loads product and related products in parallel', async () => {
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Both API calls should have been made
    expect(api.getProduct).toHaveBeenCalledWith('1')
    expect(api.listProducts).toHaveBeenCalled()
    expect(api.getRelatedProducts).toHaveBeenCalledWith(mockProduct, mockAllProducts)
  })

  it('shows no related products when none available', async () => {
    vi.mocked(api.getRelatedProducts).mockReturnValue([])
    
    renderProduct()
    
    await waitFor(() => {
      expect(screen.getAllByText('Wireless Headphones')).toHaveLength(2) // Breadcrumb and title
    })
    
    // Should not show related products section
    expect(screen.queryByText('You might also like')).not.toBeInTheDocument()
  })
})
