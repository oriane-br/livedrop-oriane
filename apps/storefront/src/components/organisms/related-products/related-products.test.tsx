import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RelatedProducts } from './related-products'
import { Product } from '@/lib/api'

// Mock the ProductCard component
vi.mock('@/components/molecules/product-card', () => ({
  ProductCard: ({ product, onAddToCart, onClick }: any) => (
    <div
      data-testid={`product-card-${product.id}`}
      onClick={() => onClick?.(product)}
    >
      <span>{product.title}</span>
      <button onClick={(e) => { e.stopPropagation(); onAddToCart?.(product) }}>
        Add to Cart
      </button>
    </div>
  ),
}))

describe('RelatedProducts', () => {
  const sampleProducts: Product[] = [
    {
      id: '1',
      title: 'Product One',
      price: 29.99,
      image: '/api/placeholder/300/300',
      tags: ['electronics'],
      stockQty: 10,
    },
    {
      id: '2',
      title: 'Product Two',
      price: 49.99,
      image: '/api/placeholder/300/300',
      tags: ['clothing'],
      stockQty: 5,
    },
    {
      id: '3',
      title: 'Product Three',
      price: 19.99,
      image: '/api/placeholder/300/300',
      tags: ['accessories'],
      stockQty: 15,
    },
  ]

  const renderRelatedProducts = (props: any = {}) => render(
    <RelatedProducts
      products={props.products ?? sampleProducts}
      title={props.title}
      onAddToCart={props.onAddToCart ?? vi.fn()}
      onProductClick={props.onProductClick ?? vi.fn()}
    />
  )

  it('renders title', () => {
    renderRelatedProducts()
    expect(screen.getByText('Related Products')).toBeInTheDocument()
  })

  it('renders custom title', () => {
    renderRelatedProducts({ title: 'You Might Also Like' })
    expect(screen.getByText('You Might Also Like')).toBeInTheDocument()
  })

  it('renders exactly 3 products when available', () => {
    renderRelatedProducts()
    expect(screen.getAllByTestId('product-card-1')).toHaveLength(2) // Desktop + Mobile
    expect(screen.getAllByTestId('product-card-2')).toHaveLength(2) // Desktop + Mobile
    expect(screen.getAllByTestId('product-card-3')).toHaveLength(2) // Desktop + Mobile
  })

  it('renders fewer than 3 products when less available', () => {
    const twoProducts = sampleProducts.slice(0, 2)
    renderRelatedProducts({ products: twoProducts })
    
    expect(screen.getAllByTestId('product-card-1')).toHaveLength(2) // Desktop + Mobile
    expect(screen.getAllByTestId('product-card-2')).toHaveLength(2) // Desktop + Mobile
    expect(screen.queryByTestId('product-card-3')).not.toBeInTheDocument()
  })

  it('renders single product when only one available', () => {
    const oneProduct = sampleProducts.slice(0, 1)
    renderRelatedProducts({ products: oneProduct })
    
    expect(screen.getAllByTestId('product-card-1')).toHaveLength(2) // Desktop + Mobile
    expect(screen.queryByTestId('product-card-2')).not.toBeInTheDocument()
    expect(screen.queryByTestId('product-card-3')).not.toBeInTheDocument()
  })

  it('shows empty state if no products', () => {
    renderRelatedProducts({ products: [] })
    
    expect(screen.getByText('No related products available')).toBeInTheDocument()
    expect(screen.queryByTestId('product-card-1')).not.toBeInTheDocument()
  })

  it('passes onAddToCart handler to ProductCards', () => {
    const onAddToCart = vi.fn()
    renderRelatedProducts({ onAddToCart })
    
    const addToCartButton = screen.getAllByText('Add to Cart')[0]
    fireEvent.click(addToCartButton)
    
    expect(onAddToCart).toHaveBeenCalledWith(sampleProducts[0])
  })

  it('passes onProductClick handler to ProductCards', () => {
    const onProductClick = vi.fn()
    renderRelatedProducts({ onProductClick })
    
    const productCards = screen.getAllByTestId('product-card-1')
    fireEvent.click(productCards[0]) // Use first instance (desktop)
    
    expect(onProductClick).toHaveBeenCalledWith(sampleProducts[0])
  })

  it('handles multiple products with different handlers', () => {
    const onAddToCart = vi.fn()
    const onProductClick = vi.fn()
    renderRelatedProducts({ onAddToCart, onProductClick })
    
    // Test first product
    const firstProductCards = screen.getAllByTestId('product-card-1')
    const firstAddButton = screen.getAllByText('Add to Cart')[0]
    
    fireEvent.click(firstProductCards[0]) // Use desktop version
    fireEvent.click(firstAddButton)
    
    expect(onProductClick).toHaveBeenCalledWith(sampleProducts[0])
    expect(onAddToCart).toHaveBeenCalledWith(sampleProducts[0])
    
    // Test second product - find the button within the second product card
    const secondProductCards = screen.getAllByTestId('product-card-2')
    const secondProductCard = secondProductCards[0] // Use desktop version
    const secondAddButton = secondProductCard.querySelector('button')
    
    fireEvent.click(secondProductCard)
    fireEvent.click(secondAddButton!)
    
    expect(onProductClick).toHaveBeenCalledWith(sampleProducts[1])
    expect(onAddToCart).toHaveBeenCalledWith(sampleProducts[1])
  })

  it('has proper accessibility attributes', () => {
    renderRelatedProducts()
    
    const section = screen.getByLabelText('Related products')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('aria-label', 'Related products')
  })

  it('has proper section structure', () => {
    renderRelatedProducts()
    
    const section = screen.getByLabelText('Related products')
    const heading = screen.getByRole('heading', { level: 2 })
    
    expect(section).toBeInTheDocument()
    expect(heading).toHaveTextContent('Related Products')
  })

  it('applies correct CSS classes for desktop grid', () => {
    renderRelatedProducts()
    
    const productCards = screen.getAllByTestId('product-card-1')
    const desktopGrid = productCards[0].closest('.hidden.md\\:grid')
    expect(desktopGrid).toHaveClass('hidden', 'md:grid', 'md:grid-cols-3', 'md:gap-6')
  })

  it('applies correct CSS classes for mobile scroll', () => {
    renderRelatedProducts()
    
    const productCards = screen.getAllByTestId('product-card-1')
    const mobileContainer = productCards[1].closest('.md\\:hidden') // Use mobile version
    expect(mobileContainer).toHaveClass('md:hidden')
    
    const scrollContainer = mobileContainer?.querySelector('.flex.overflow-x-auto')
    expect(scrollContainer).toHaveClass('flex', 'overflow-x-auto', 'snap-x', 'snap-mandatory')
  })

  it('limits to maximum 3 products even with more provided', () => {
    const manyProducts = [
      ...sampleProducts,
      {
        id: '4',
        title: 'Product Four',
        price: 39.99,
        image: '/api/placeholder/300/300',
        tags: ['electronics'],
        stockQty: 8,
      },
      {
        id: '5',
        title: 'Product Five',
        price: 59.99,
        image: '/api/placeholder/300/300',
        tags: ['clothing'],
        stockQty: 12,
      },
    ]
    
    renderRelatedProducts({ products: manyProducts })
    
    // Should only show first 3 products (2 instances each: desktop + mobile)
    expect(screen.getAllByTestId('product-card-1')).toHaveLength(2)
    expect(screen.getAllByTestId('product-card-2')).toHaveLength(2)
    expect(screen.getAllByTestId('product-card-3')).toHaveLength(2)
    expect(screen.queryByTestId('product-card-4')).not.toBeInTheDocument()
    expect(screen.queryByTestId('product-card-5')).not.toBeInTheDocument()
  })

  it('handles undefined handlers gracefully', () => {
    renderRelatedProducts({ onAddToCart: undefined, onProductClick: undefined })
    
    // Should not throw when clicking without handlers
    const productCards = screen.getAllByTestId('product-card-1')
    const addButtons = screen.getAllByText('Add to Cart')
    
    expect(() => {
      fireEvent.click(productCards[0]) // Use first desktop version
      fireEvent.click(addButtons[0])
    }).not.toThrow()
  })

  it('shows empty state with custom title', () => {
    renderRelatedProducts({ 
      products: [], 
      title: 'Similar Items' 
    })
    
    expect(screen.getByText('Similar Items')).toBeInTheDocument()
    expect(screen.getByText('No related products available')).toBeInTheDocument()
  })
})
