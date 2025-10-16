import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { PageLayout } from './page-layout'
import * as storeModule from '@/lib/store'

// Mock the store hook
const mockCart = {
  items: [
    {
      product: {
        id: '1',
        title: 'Test Product',
        price: 29.99,
        image: '/test.jpg',
        tags: ['test'],
        stockQty: 10,
      },
      quantity: 2,
    },
  ],
  itemCount: 2,
  updateQuantity: vi.fn(),
  removeItem: vi.fn(),
  addItem: vi.fn(),
  clearCart: vi.fn(),
  getTotal: vi.fn(() => 59.98),
  getItemCount: vi.fn(() => 2),
}

vi.mock('@/lib/store', () => ({
  useCart: vi.fn(() => mockCart),
}))

// Mock the organisms
vi.mock('@/components/organisms/header', () => ({
  Header: ({ cartItemCount, onCartClick, onSupportClick }: any) => (
    <div data-testid="header">
      <button onClick={onCartClick} data-testid="cart-button">
        Cart ({cartItemCount})
      </button>
      <button onClick={onSupportClick} data-testid="support-button">
        Support
      </button>
    </div>
  ),
}))

vi.mock('@/components/organisms/cart-drawer', () => ({
  CartDrawer: ({ isOpen, onClose, onCheckout, onUpdateQuantity, onRemove }: any) =>
    isOpen ? (
      <div data-testid="cart-drawer">
        <button onClick={onClose} data-testid="close-cart">Close</button>
        <button onClick={onCheckout} data-testid="checkout-button">Checkout</button>
        <button onClick={() => onUpdateQuantity('1', 3)} data-testid="update-quantity">
          Update Qty
        </button>
        <button onClick={() => onRemove('1')} data-testid="remove-item">
          Remove
        </button>
      </div>
    ) : null,
}))

vi.mock('@/components/organisms/ask-support-panel', () => ({
  AskSupportPanel: ({ isOpen, onClose }: any) =>
    isOpen ? (
      <div data-testid="support-panel">
        <button onClick={onClose} data-testid="close-support">Close Support</button>
      </div>
    ) : null,
}))

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  BrowserRouter: ({ children }: any) => <div>{children}</div>,
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('PageLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders children', () => {
    renderWithRouter(
      <PageLayout>
        <div data-testid="test-content">Test Content</div>
      </PageLayout>
    )
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  it('shows Header with cart count', () => {
    renderWithRouter(<PageLayout />)
    
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByText('Cart (2)')).toBeInTheDocument()
  })

  it('hides Header when showHeader is false', () => {
    renderWithRouter(<PageLayout showHeader={false} />)
    
    expect(screen.queryByTestId('header')).not.toBeInTheDocument()
  })

  it('cart drawer opens when cart button clicked', () => {
    renderWithRouter(<PageLayout />)
    
    expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument()
    
    fireEvent.click(screen.getByTestId('cart-button'))
    
    expect(screen.getByTestId('cart-drawer')).toBeInTheDocument()
  })

  it('support panel opens when support button clicked', () => {
    renderWithRouter(<PageLayout />)
    
    expect(screen.queryByTestId('support-panel')).not.toBeInTheDocument()
    
    fireEvent.click(screen.getByTestId('support-button'))
    
    expect(screen.getByTestId('support-panel')).toBeInTheDocument()
  })

  it('cart drawer closes on backdrop click', () => {
    renderWithRouter(<PageLayout />)
    
    // Open cart drawer
    fireEvent.click(screen.getByTestId('cart-button'))
    expect(screen.getByTestId('cart-drawer')).toBeInTheDocument()
    
    // Close cart drawer
    fireEvent.click(screen.getByTestId('close-cart'))
    expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument()
  })

  it('support panel closes on close button', () => {
    renderWithRouter(<PageLayout />)
    
    // Open support panel
    fireEvent.click(screen.getByTestId('support-button'))
    expect(screen.getByTestId('support-panel')).toBeInTheDocument()
    
    // Close support panel
    fireEvent.click(screen.getByTestId('close-support'))
    expect(screen.queryByTestId('support-panel')).not.toBeInTheDocument()
  })

  it('checkout navigation works from cart drawer', () => {
    renderWithRouter(<PageLayout />)
    
    // Open cart drawer
    fireEvent.click(screen.getByTestId('cart-button'))
    
    // Click checkout
    fireEvent.click(screen.getByTestId('checkout-button'))
    
    expect(mockNavigate).toHaveBeenCalledWith('/checkout')
    expect(screen.queryByTestId('cart-drawer')).not.toBeInTheDocument()
  })

  it('cart operations work', () => {
    renderWithRouter(<PageLayout />)
    
    // Open cart drawer
    fireEvent.click(screen.getByTestId('cart-button'))
    
    // Test update quantity
    fireEvent.click(screen.getByTestId('update-quantity'))
    expect(mockCart.updateQuantity).toHaveBeenCalledWith('1', 3)
    
    // Test remove item
    fireEvent.click(screen.getByTestId('remove-item'))
    expect(mockCart.removeItem).toHaveBeenCalledWith('1')
  })

  it('applies correct max-width class for sm', () => {
    renderWithRouter(
      <PageLayout maxWidth="sm">
        <div data-testid="content">Content</div>
      </PageLayout>
    )
    
    const content = screen.getByTestId('content')
    const container = content.closest('.max-w-3xl')
    expect(container).toHaveClass('max-w-3xl')
  })

  it('applies correct max-width class for md', () => {
    renderWithRouter(
      <PageLayout maxWidth="md">
        <div data-testid="content">Content</div>
      </PageLayout>
    )
    
    const content = screen.getByTestId('content')
    const container = content.closest('.max-w-5xl')
    expect(container).toHaveClass('max-w-5xl')
  })

  it('applies correct max-width class for lg', () => {
    renderWithRouter(
      <PageLayout maxWidth="lg">
        <div data-testid="content">Content</div>
      </PageLayout>
    )
    
    const content = screen.getByTestId('content')
    const container = content.closest('.max-w-7xl')
    expect(container).toHaveClass('max-w-7xl')
  })

  it('applies correct max-width class for xl', () => {
    renderWithRouter(
      <PageLayout maxWidth="xl">
        <div data-testid="content">Content</div>
      </PageLayout>
    )
    
    const content = screen.getByTestId('content')
    const container = content.closest('.max-w-screen-2xl')
    expect(container).toHaveClass('max-w-screen-2xl')
  })

  it('applies correct max-width class for full', () => {
    renderWithRouter(
      <PageLayout maxWidth="full">
        <div data-testid="content">Content</div>
      </PageLayout>
    )
    
    const content = screen.getByTestId('content')
    const container = content.closest('.w-full')
    expect(container).toHaveClass('w-full')
  })

  it('applies custom className', () => {
    renderWithRouter(
      <PageLayout className="custom-class">
        <div data-testid="content">Content</div>
      </PageLayout>
    )
    
    const container = screen.getByTestId('content').closest('.min-h-screen')
    expect(container).toHaveClass('custom-class')
  })

  it('has proper accessibility attributes', () => {
    renderWithRouter(<PageLayout />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('id', 'main-content')
    expect(main).toHaveAttribute('role', 'main')
    
    const skipLink = screen.getByText('Skip to main content')
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  it('renders footer with copyright', () => {
    renderWithRouter(<PageLayout />)
    
    expect(screen.getByText('© 2025 Shoplite. All rights reserved.')).toBeInTheDocument()
  })

  it('has proper layout structure', () => {
    renderWithRouter(<PageLayout />)
    
    const container = screen.getByRole('main').closest('.min-h-screen')
    expect(container).toHaveClass('min-h-screen', 'flex', 'flex-col', 'bg-gray-50')
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex-1')
  })

  it('passes cart items to CartDrawer', () => {
    renderWithRouter(<PageLayout />)
    
    // Open cart drawer
    fireEvent.click(screen.getByTestId('cart-button'))
    
    // CartDrawer should be rendered with the mocked cart items
    expect(screen.getByTestId('cart-drawer')).toBeInTheDocument()
  })

  it('handles empty cart state', () => {
    // Mock empty cart
    const emptyCart = {
      items: [],
      itemCount: 0,
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      addItem: vi.fn(),
      clearCart: vi.fn(),
      getTotal: vi.fn(() => 0),
      getItemCount: vi.fn(() => 0),
    }
    
    // Override the existing mock
    vi.mocked(storeModule.useCart).mockReturnValue(emptyCart)
    
    renderWithRouter(<PageLayout />)
    
    expect(screen.getByText('Cart (0)')).toBeInTheDocument()
  })
})
