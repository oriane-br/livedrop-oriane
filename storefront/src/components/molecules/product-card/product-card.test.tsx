import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProductCard } from './product-card'
import { Product } from '@/lib/api'

// Mock the atoms
vi.mock('@/components/atoms/card', () => ({
  Card: ({ children, onClick, className, hoverable }: any) => (
    <div 
      data-testid="card" 
      onClick={onClick} 
      className={className}
      data-hoverable={hoverable}
    >
      {children}
    </div>
  )
}))

vi.mock('@/components/atoms/image', () => ({
  Image: ({ src, alt, aspectRatio, objectFit, className }: any) => (
    <img 
      data-testid="image" 
      src={src} 
      alt={alt} 
      data-aspect-ratio={aspectRatio}
      data-object-fit={objectFit}
      className={className}
    />
  )
}))

vi.mock('@/components/atoms/price', () => ({
  Price: ({ amount, size }: any) => (
    <span data-testid="price" data-amount={amount} data-size={size}>
      ${amount}
    </span>
  )
}))

vi.mock('@/components/atoms/badge', () => ({
  Badge: ({ children, variant, size }: any) => (
    <span data-testid="badge" data-variant={variant} data-size={size}>
      {children}
    </span>
  )
}))

vi.mock('@/components/atoms/button', () => ({
  Button: ({ children, disabled, onClick, variant, size, className, 'aria-label': ariaLabel }: any) => (
    <button 
      data-testid="button" 
      disabled={disabled} 
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}))

// Mock the format utility
vi.mock('@/lib/format', () => ({
  getStockStatus: vi.fn((quantity: number) => {
    if (quantity === 0) return { label: 'Out of Stock', color: 'red' }
    if (quantity < 10) return { label: 'Limited', color: 'red' }
    if (quantity <= 50) return { label: 'Low Stock', color: 'yellow' }
    return { label: 'In Stock', color: 'green' }
  })
}))

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg',
    tags: ['electronics', 'gadgets', 'tech'],
    stockQty: 25
  }

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByTestId('image')).toHaveAttribute('src', 'test-image.jpg')
    expect(screen.getByTestId('image')).toHaveAttribute('alt', 'Test Product')
    expect(screen.getByTestId('price')).toHaveAttribute('data-amount', '99.99')
  })

  it('shows correct stock status badge', () => {
    render(<ProductCard product={mockProduct} />)
    
    const badges = screen.getAllByTestId('badge')
    const stockBadge = badges.find(badge => badge.textContent === 'Low Stock')
    expect(stockBadge).toBeInTheDocument()
    expect(stockBadge).toHaveAttribute('data-variant', 'warning')
  })

  it('displays price formatted', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByTestId('price')).toHaveAttribute('data-size', 'lg')
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  it('shows tags (max 2)', () => {
    render(<ProductCard product={mockProduct} />)
    
    const badges = screen.getAllByTestId('badge')
    const tagBadges = badges.filter(badge => 
      badge.textContent === 'electronics' || badge.textContent === 'gadgets'
    )
    
    expect(tagBadges).toHaveLength(2)
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText('gadgets')).toBeInTheDocument()
    expect(screen.queryByText('tech')).not.toBeInTheDocument()
  })

  it('add to cart button calls onAddToCart handler', () => {
    const onAddToCart = vi.fn()
    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />)
    
    const button = screen.getByTestId('button')
    fireEvent.click(button)
    
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('card click calls onClick handler', () => {
    const onClick = vi.fn()
    render(<ProductCard product={mockProduct} onClick={onClick} />)
    
    const card = screen.getByTestId('card')
    fireEvent.click(card)
    
    expect(onClick).toHaveBeenCalledWith(mockProduct)
  })

  it('button click does not trigger card click', () => {
    const onClick = vi.fn()
    const onAddToCart = vi.fn()
    render(
      <ProductCard 
        product={mockProduct} 
        onClick={onClick} 
        onAddToCart={onAddToCart} 
      />
    )
    
    const button = screen.getByTestId('button')
    fireEvent.click(button)
    
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows out of stock state correctly', () => {
    const outOfStockProduct: Product = {
      ...mockProduct,
      stockQty: 0
    }
    
    render(<ProductCard product={outOfStockProduct} />)
    
    const button = screen.getByTestId('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Out of Stock')
    
    const badges = screen.getAllByTestId('badge')
    const stockBadge = badges.find(badge => badge.textContent === 'Out of Stock')
    expect(stockBadge).toBeInTheDocument()
    expect(stockBadge).toHaveAttribute('data-variant', 'danger')
  })

  it('shows in stock state correctly', () => {
    const inStockProduct: Product = {
      ...mockProduct,
      stockQty: 100
    }
    
    render(<ProductCard product={inStockProduct} />)
    
    const button = screen.getByTestId('button')
    expect(button).not.toBeDisabled()
    expect(button).toHaveTextContent('Add to Cart')
    
    const badges = screen.getAllByTestId('badge')
    const stockBadge = badges.find(badge => badge.textContent === 'In Stock')
    expect(stockBadge).toBeInTheDocument()
    expect(stockBadge).toHaveAttribute('data-variant', 'success')
  })

  it('shows limited stock state correctly', () => {
    const limitedStockProduct: Product = {
      ...mockProduct,
      stockQty: 5
    }
    
    render(<ProductCard product={limitedStockProduct} />)
    
    const button = screen.getByTestId('button')
    expect(button).not.toBeDisabled()
    expect(button).toHaveTextContent('Add to Cart')
    
    const badges = screen.getAllByTestId('badge')
    const stockBadge = badges.find(badge => badge.textContent === 'Limited')
    expect(stockBadge).toBeInTheDocument()
    expect(stockBadge).toHaveAttribute('data-variant', 'danger')
  })

  it('handles product with no tags', () => {
    const productNoTags: Product = {
      ...mockProduct,
      tags: []
    }
    
    render(<ProductCard product={productNoTags} />)
    
    const badges = screen.getAllByTestId('badge')
    const tagBadges = badges.filter(badge => 
      badge.textContent === 'electronics' || 
      badge.textContent === 'gadgets' || 
      badge.textContent === 'tech'
    )
    
    expect(tagBadges).toHaveLength(0)
  })

  it('handles product with single tag', () => {
    const productOneTag: Product = {
      ...mockProduct,
      tags: ['electronics']
    }
    
    render(<ProductCard product={productOneTag} />)
    
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.queryByText('gadgets')).not.toBeInTheDocument()
  })

  it('applies correct image props', () => {
    render(<ProductCard product={mockProduct} />)
    
    const image = screen.getByTestId('image')
    expect(image).toHaveAttribute('data-aspect-ratio', '1/1')
    expect(image).toHaveAttribute('data-object-fit', 'cover')
  })

  it('applies correct button props', () => {
    render(<ProductCard product={mockProduct} />)
    
    const button = screen.getByTestId('button')
    expect(button).toHaveAttribute('data-variant', 'primary')
    expect(button).toHaveAttribute('data-size', 'md')
    expect(button).toHaveAttribute('aria-label', 'Add Test Product to cart')
    expect(button).toHaveClass('w-full')
  })

  it('applies correct card props', () => {
    render(<ProductCard product={mockProduct} />)
    
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('data-hoverable', 'true')
    expect(card).toHaveClass('w-full', 'max-w-sm', 'cursor-pointer')
  })
})
