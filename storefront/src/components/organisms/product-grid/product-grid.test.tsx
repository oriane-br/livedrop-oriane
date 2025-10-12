import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ProductGrid } from './product-grid'
import { Product } from '@/lib/api'

vi.mock('@/components/molecules/product-card', () => ({
  ProductCard: ({ product, onAddToCart, onClick }: any) => (
    <div 
      data-testid={`product-card-${product.id}`}
      onClick={() => onClick?.(product)}
    >
      <span>{product.title}</span>
      <button onClick={() => onAddToCart?.(product)}>Add to Cart</button>
    </div>
  ),
}))

describe('ProductGrid', () => {
  const sampleProducts: Product[] = [
    { id: '1', title: 'Prod A', price: 10, image: '', tags: [], stockQty: 5 },
    { id: '2', title: 'Prod B', price: 11, image: '', tags: [], stockQty: 10 },
    { id: '3', title: 'Prod C', price: 12, image: '', tags: [], stockQty: 2 },
    { id: '4', title: 'Prod D', price: 13, image: '', tags: [], stockQty: 0 },
  ]

  it('renders correct number of mocked cards', () => {
    render(<ProductGrid products={sampleProducts} />)
    sampleProducts.forEach(prod => {
      expect(screen.getByTestId(`product-card-${prod.id}`)).toBeInTheDocument()
    })
    expect(screen.queryAllByTestId(/product-card-/)).toHaveLength(sampleProducts.length)
  })

  it('passes product data to each card', () => {
    render(<ProductGrid products={sampleProducts} />)
    sampleProducts.forEach(prod => {
      expect(screen.getByText(prod.title)).toBeInTheDocument()
    })
  })

  it('onAddToCart prop forwarded and called', () => {
    const onAddToCart = vi.fn()
    render(<ProductGrid products={sampleProducts} onAddToCart={onAddToCart} />)
    const button = screen.getByTestId('product-card-2').querySelector('button')
    fireEvent.click(button!)
    expect(onAddToCart).toHaveBeenCalledWith(sampleProducts[1])
  })

  it('onProductClick prop forwarded and called', () => {
    const onProductClick = vi.fn()
    render(<ProductGrid products={sampleProducts} onProductClick={onProductClick} />)
    fireEvent.click(screen.getByTestId('product-card-3'))
    expect(onProductClick).toHaveBeenCalledWith(sampleProducts[2])
  })

  it('shows empty state when products array is empty', () => {
    render(<ProductGrid products={[]} emptyStateMessage="Custom empty!" />)
    expect(screen.getByText('Custom empty!')).toBeInTheDocument()
    expect(screen.queryAllByTestId(/product-card-/)).toHaveLength(0)
  })

  it('renders grid with proper classes', () => {
    render(<ProductGrid products={sampleProducts} />)
    const grid = screen.getByRole('list')
    expect(grid).toHaveClass(
      'grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-6', 'p-2', 'sm:p-4'
    )
  })

  it('each card is a listitem with role', () => {
    render(<ProductGrid products={sampleProducts} />)
    const items = screen.getAllByRole('listitem')
    expect(items.length).toBe(sampleProducts.length)
    items.forEach((item) => {
      expect(item).toHaveAttribute('role', 'listitem')
    })
  })

  it('grid has role="list" for accessibility', () => {
    render(<ProductGrid products={sampleProducts} />)
    const grid = screen.getByRole('list')
    expect(grid).toBeInTheDocument()
  })
})
