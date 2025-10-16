import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CartLineItem } from './cart-line-item'
import { CartItem } from '@/lib/api'

// Mock the atoms
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

describe('CartLineItem', () => {
  const mockCartItem: CartItem = {
    product: {
      id: '1',
      title: 'Test Product',
      price: 99.99,
      image: 'test-image.jpg',
      tags: ['electronics'],
      stockQty: 10
    },
    quantity: 2
  }

  it('renders item information', () => {
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByTestId('image')).toHaveAttribute('src', 'test-image.jpg')
    expect(screen.getByTestId('image')).toHaveAttribute('alt', 'Test Product')
    expect(screen.getByText('Stock: 10')).toBeInTheDocument()
  })

  it('shows correct quantity', () => {
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('shows correct line total', () => {
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    const prices = screen.getAllByTestId('price')
    const lineTotalPrice = prices.find(price => price.getAttribute('data-amount') === '199.98')
    expect(lineTotalPrice).toBeInTheDocument()
    expect(lineTotalPrice).toHaveAttribute('data-size', 'md')
  })

  it('increment button increases quantity', () => {
    const onUpdateQuantity = vi.fn()
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={onUpdateQuantity} 
        onRemove={vi.fn()} 
      />
    )
    
    const buttons = screen.getAllByTestId('button')
    const incrementButton = buttons.find(button => 
      button.getAttribute('aria-label')?.includes('Increase quantity')
    )
    
    fireEvent.click(incrementButton!)
    expect(onUpdateQuantity).toHaveBeenCalledWith('1', 3)
  })

  it('decrement button decreases quantity', () => {
    const onUpdateQuantity = vi.fn()
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={onUpdateQuantity} 
        onRemove={vi.fn()} 
      />
    )
    
    const buttons = screen.getAllByTestId('button')
    const decrementButton = buttons.find(button => 
      button.getAttribute('aria-label')?.includes('Decrease quantity')
    )
    
    fireEvent.click(decrementButton!)
    expect(onUpdateQuantity).toHaveBeenCalledWith('1', 1)
  })

  it('remove button calls onRemove', () => {
    const onRemove = vi.fn()
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={onRemove} 
      />
    )
    
    const buttons = screen.getAllByTestId('button')
    const removeButton = buttons.find(button => 
      button.getAttribute('aria-label')?.includes('Remove')
    )
    
    fireEvent.click(removeButton!)
    expect(onRemove).toHaveBeenCalledWith('1')
  })

  it('disables decrement at quantity 1', () => {
    const minQuantityItem: CartItem = {
      ...mockCartItem,
      quantity: 1
    }
    
    render(
      <CartLineItem 
        item={minQuantityItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    const buttons = screen.getAllByTestId('button')
    const decrementButton = buttons.find(button => 
      button.getAttribute('aria-label')?.includes('Decrease quantity')
    )
    
    expect(decrementButton).toBeDisabled()
  })

  it('disables increment at stock limit', () => {
    const maxQuantityItem: CartItem = {
      ...mockCartItem,
      quantity: 10 // Same as stockQty
    }
    
    render(
      <CartLineItem 
        item={maxQuantityItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    const buttons = screen.getAllByTestId('button')
    const incrementButton = buttons.find(button => 
      button.getAttribute('aria-label')?.includes('Increase quantity')
    )
    
    expect(incrementButton).toBeDisabled()
  })

  it('shows correct price per unit', () => {
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    const prices = screen.getAllByTestId('price')
    const unitPrice = prices.find(price => price.getAttribute('data-amount') === '99.99')
    expect(unitPrice).toBeInTheDocument()
    expect(unitPrice).toHaveAttribute('data-size', 'sm')
  })

  it('applies correct image props', () => {
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    const image = screen.getByTestId('image')
    expect(image).toHaveAttribute('data-aspect-ratio', '1/1')
    expect(image).toHaveAttribute('data-object-fit', 'cover')
    expect(image).toHaveClass('w-16', 'h-16', 'rounded-md')
  })

  it('has proper accessibility attributes', () => {
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    const buttons = screen.getAllByTestId('button')
    const incrementButton = buttons.find(button => 
      button.getAttribute('aria-label')?.includes('Increase quantity')
    )
    const decrementButton = buttons.find(button => 
      button.getAttribute('aria-label')?.includes('Decrease quantity')
    )
    const removeButton = buttons.find(button => 
      button.getAttribute('aria-label')?.includes('Remove')
    )
    
    expect(incrementButton).toHaveAttribute('aria-label', 'Increase quantity of Test Product')
    expect(decrementButton).toHaveAttribute('aria-label', 'Decrease quantity of Test Product')
    expect(removeButton).toHaveAttribute('aria-label', 'Remove Test Product from cart')
  })

  it('handles zero stock correctly', () => {
    const zeroStockItem: CartItem = {
      ...mockCartItem,
      product: {
        ...mockCartItem.product,
        stockQty: 0
      },
      quantity: 1
    }
    
    render(
      <CartLineItem 
        item={zeroStockItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    expect(screen.getByText('Stock: 0')).toBeInTheDocument()
    
    const buttons = screen.getAllByTestId('button')
    const incrementButton = buttons.find(button => 
      button.getAttribute('aria-label')?.includes('Increase quantity')
    )
    
    expect(incrementButton).toBeDisabled()
  })

  it('handles large quantities correctly', () => {
    const largeQuantityItem: CartItem = {
      ...mockCartItem,
      quantity: 5
    }
    
    render(
      <CartLineItem 
        item={largeQuantityItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    expect(screen.getByText('5')).toBeInTheDocument()
    
    const prices = screen.getAllByTestId('price')
    const lineTotalPrice = prices.find(price => price.getAttribute('data-amount') === '499.95')
    expect(lineTotalPrice).toBeInTheDocument()
  })

  it('has proper responsive classes', () => {
    render(
      <CartLineItem 
        item={mockCartItem} 
        onUpdateQuantity={vi.fn()} 
        onRemove={vi.fn()} 
      />
    )
    
    const container = screen.getByText('Test Product').closest('div')?.parentElement
    expect(container).toHaveClass('flex', 'flex-col', 'sm:flex-row')
  })
})
