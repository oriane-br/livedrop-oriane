import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Catalog from './catalog'
import { useCart } from '@/lib/store'
import * as api from '@/lib/api'

// Mock the API module
vi.mock('@/lib/api', () => ({
  listProducts: vi.fn()
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
    useNavigate: () => mockNavigate
  }
})

// Mock products data
const mockProducts = [
  {
    id: '1',
    title: 'Wireless Headphones',
    price: 99.99,
    image: '/headphones.jpg',
    tags: ['electronics', 'audio'],
    stockQty: 10
  },
  {
    id: '2',
    title: 'Coffee Maker',
    price: 49.99,
    image: '/coffee.jpg',
    tags: ['kitchen', 'appliances'],
    stockQty: 5
  },
  {
    id: '3',
    title: 'Running Shoes',
    price: 129.99,
    image: '/shoes.jpg',
    tags: ['sports', 'footwear'],
    stockQty: 8
  },
  {
    id: '4',
    title: 'Bluetooth Speaker',
    price: 79.99,
    image: '/speaker.jpg',
    tags: ['electronics', 'audio'],
    stockQty: 12
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

const renderCatalog = () => {
  return render(
    <BrowserRouter>
      <Catalog />
    </BrowserRouter>
  )
}

describe('Catalog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useCart).mockReturnValue(mockCart)
    vi.mocked(api.listProducts).mockResolvedValue(mockProducts)
  })

  it('loads and displays products', async () => {
    renderCatalog()
    
    // Should show loading initially
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Browse our collection of 4 products')).toBeInTheDocument()
    })
    
    // Should display all products
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    expect(screen.getByText('Coffee Maker')).toBeInTheDocument()
    expect(screen.getByText('Running Shoes')).toBeInTheDocument()
    expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
  })

  it('search filters products by title', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    const searchInput = screen.getByPlaceholderText('Search products...')
    fireEvent.change(searchInput, { target: { value: 'headphones' } })
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
      expect(screen.queryByText('Coffee Maker')).not.toBeInTheDocument()
      expect(screen.queryByText('Running Shoes')).not.toBeInTheDocument()
      expect(screen.queryByText('Bluetooth Speaker')).not.toBeInTheDocument()
    })
  })

  it('search filters products by tags', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    const searchInput = screen.getByPlaceholderText('Search products...')
    fireEvent.change(searchInput, { target: { value: 'electronics' } })
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
      expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
      expect(screen.queryByText('Coffee Maker')).not.toBeInTheDocument()
      expect(screen.queryByText('Running Shoes')).not.toBeInTheDocument()
    })
  })

  it('sort by price ascending works', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    const sortDropdown = screen.getByDisplayValue('Name: A to Z')
    fireEvent.change(sortDropdown, { target: { value: 'price-asc' } })
    
    await waitFor(() => {
      const productCards = screen.getAllByRole('listitem')
      // First product should be Coffee Maker (49.99)
      expect(productCards[0]).toHaveTextContent('Coffee Maker')
    })
  })

  it('sort by price descending works', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    const sortDropdown = screen.getByDisplayValue('Name: A to Z')
    fireEvent.change(sortDropdown, { target: { value: 'price-desc' } })
    
    await waitFor(() => {
      const productCards = screen.getAllByRole('listitem')
      // First product should be Running Shoes (129.99)
      expect(productCards[0]).toHaveTextContent('Running Shoes')
    })
  })

  it('sort by name works', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    const sortDropdown = screen.getByDisplayValue('Name: A to Z')
    fireEvent.change(sortDropdown, { target: { value: 'name-desc' } })
    
    await waitFor(() => {
      const productCards = screen.getAllByRole('listitem')
      // First product should be Wireless Headphones (Z to A)
      expect(productCards[0]).toHaveTextContent('Wireless Headphones')
    })
  })

  it('tag filter works (single tag)', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    // Click on electronics tag
    const electronicsTag = screen.getByText('electronics')
    fireEvent.click(electronicsTag)
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
      expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
      expect(screen.queryByText('Coffee Maker')).not.toBeInTheDocument()
      expect(screen.queryByText('Running Shoes')).not.toBeInTheDocument()
    })
  })

  it('tag filter works (multiple tags)', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    // Click on electronics tag
    const electronicsTag = screen.getByText('electronics')
    fireEvent.click(electronicsTag)
    
    // Click on audio tag
    const audioTag = screen.getByText('audio')
    fireEvent.click(audioTag)
    
    await waitFor(() => {
      // Only products with both electronics AND audio tags should show
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
      expect(screen.getByText('Bluetooth Speaker')).toBeInTheDocument()
      expect(screen.queryByText('Coffee Maker')).not.toBeInTheDocument()
      expect(screen.queryByText('Running Shoes')).not.toBeInTheDocument()
    })
  })

  it('combining search + sort + filter works', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    // Apply search
    const searchInput = screen.getByPlaceholderText('Search products...')
    fireEvent.change(searchInput, { target: { value: 'wireless' } })
    
    // Apply tag filter
    const electronicsTag = screen.getByText('electronics')
    fireEvent.click(electronicsTag)
    
    // Apply sort
    const sortDropdown = screen.getByDisplayValue('Name: A to Z')
    fireEvent.change(sortDropdown, { target: { value: 'price-desc' } })
    
    await waitFor(() => {
      // Should only show Wireless Headphones (matches search + tag filter, sorted by price desc)
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
      expect(screen.queryByText('Bluetooth Speaker')).not.toBeInTheDocument()
      expect(screen.queryByText('Coffee Maker')).not.toBeInTheDocument()
      expect(screen.queryByText('Running Shoes')).not.toBeInTheDocument()
    })
  })

  it('add to cart calls cart.addItem', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    // Find and click add to cart button for first product
    const addToCartButtons = screen.getAllByText(/add to cart/i)
    fireEvent.click(addToCartButtons[0])
    
    expect(mockAddItem).toHaveBeenCalledWith(mockProducts[0], 1)
  })

  it('product click navigates to detail page', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    // Click on product card
    const productCard = screen.getByText('Wireless Headphones').closest('[role="listitem"]')
    fireEvent.click(productCard!)
    
    expect(mockNavigate).toHaveBeenCalledWith('/p/1')
  })

  it('shows loading state', () => {
    // Mock a slow API response
    vi.mocked(api.listProducts).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    renderCatalog()
    
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('shows error state', async () => {
    vi.mocked(api.listProducts).mockRejectedValue(new Error('API Error'))
    
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load products')).toBeInTheDocument()
      expect(screen.getByText('Try Again')).toBeInTheDocument()
    })
  })

  it('retry button works in error state', async () => {
    vi.mocked(api.listProducts)
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValueOnce(mockProducts)
    
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load products')).toBeInTheDocument()
    })
    
    const retryButton = screen.getByText('Try Again')
    fireEvent.click(retryButton)
    
    await waitFor(() => {
      expect(screen.getByText('Browse our collection of 4 products')).toBeInTheDocument()
    })
  })

  it('shows empty state when no matches', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    // Search for something that doesn't exist
    const searchInput = screen.getByPlaceholderText('Search products...')
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })
    
    await waitFor(() => {
      expect(screen.getByText('No products match your filters. Try adjusting your search.')).toBeInTheDocument()
    })
  })

  it('shows product count correctly', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Showing 4 of 4 products')).toBeInTheDocument()
    })
    
    // Apply search to filter products
    const searchInput = screen.getByPlaceholderText('Search products...')
    fireEvent.change(searchInput, { target: { value: 'electronics' } })
    
    await waitFor(() => {
      expect(screen.getByText('Showing 2 of 4 products')).toBeInTheDocument()
    })
  })

  it('clears tag filters when clear all is clicked', async () => {
    renderCatalog()
    
    await waitFor(() => {
      expect(screen.getByText('Wireless Headphones')).toBeInTheDocument()
    })
    
    // Select a tag
    const electronicsTag = screen.getByText('electronics')
    fireEvent.click(electronicsTag)
    
    await waitFor(() => {
      expect(screen.getByText('Showing 2 of 4 products')).toBeInTheDocument()
    })
    
    // Click clear all
    const clearAllButton = screen.getByText('Clear all')
    fireEvent.click(clearAllButton)
    
    await waitFor(() => {
      expect(screen.getByText('Showing 4 of 4 products')).toBeInTheDocument()
    })
  })
})
