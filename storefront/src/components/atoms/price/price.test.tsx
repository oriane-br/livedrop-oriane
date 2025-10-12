import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Price } from './price'

// Mock the formatCurrency function
vi.mock('@/lib/format', () => ({
  formatCurrency: vi.fn((amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  })
}))

describe('Price', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('formats price correctly with currency', () => {
    render(<Price amount={129.99} />)
    expect(screen.getByText('$129.99')).toBeInTheDocument()
  })

  it('formats price correctly without currency', () => {
    render(<Price amount={129.99} showCurrency={false} />)
    expect(screen.getByText('129.99')).toBeInTheDocument()
  })

  it('shows currency symbol when showCurrency is true', () => {
    render(<Price amount={99.99} showCurrency={true} />)
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  it('hides currency symbol when showCurrency is false', () => {
    render(<Price amount={99.99} showCurrency={false} />)
    expect(screen.getByText('99.99')).toBeInTheDocument()
  })

  it('applies small size classes', () => {
    render(<Price amount={99.99} size="sm" />)
    const price = screen.getByText('$99.99')
    expect(price).toHaveClass('text-sm')
  })

  it('applies medium size classes by default', () => {
    render(<Price amount={99.99} />)
    const price = screen.getByText('$99.99')
    expect(price).toHaveClass('text-base')
  })

  it('applies large size classes', () => {
    render(<Price amount={99.99} size="lg" />)
    const price = screen.getByText('$99.99')
    expect(price).toHaveClass('text-lg', 'font-semibold')
  })

  it('applies extra large size classes', () => {
    render(<Price amount={99.99} size="xl" />)
    const price = screen.getByText('$99.99')
    expect(price).toHaveClass('text-2xl', 'font-bold')
  })

  it('handles decimal amounts correctly', () => {
    render(<Price amount={12.50} />)
    expect(screen.getByText('$12.50')).toBeInTheDocument()
  })

  it('handles large numbers correctly', () => {
    render(<Price amount={1234567.89} />)
    expect(screen.getByText('$1,234,567.89')).toBeInTheDocument()
  })

  it('handles zero amount', () => {
    render(<Price amount={0} />)
    expect(screen.getByText('$0.00')).toBeInTheDocument()
  })

  it('handles negative amounts', () => {
    render(<Price amount={-50.00} />)
    expect(screen.getByText('-$50.00')).toBeInTheDocument()
  })

  it('applies strikethrough styles when strikethrough is true', () => {
    render(<Price amount={99.99} strikethrough={true} />)
    const price = screen.getByText('$99.99')
    expect(price).toHaveClass('line-through', 'text-gray-500')
  })

  it('does not apply strikethrough styles by default', () => {
    render(<Price amount={99.99} />)
    const price = screen.getByText('$99.99')
    expect(price).not.toHaveClass('line-through', 'text-gray-500')
  })

  it('applies custom className', () => {
    render(<Price amount={99.99} className="custom-class" />)
    const price = screen.getByText('$99.99')
    expect(price).toHaveClass('custom-class')
  })

  it('applies base styles', () => {
    render(<Price amount={99.99} />)
    const price = screen.getByText('$99.99')
    expect(price).toHaveClass('inline-block')
  })

  it('uses different currency when provided', () => {
    render(<Price amount={99.99} currency="EUR" />)
    expect(screen.getByText('€99.99')).toBeInTheDocument()
  })

  it('combines all props correctly', () => {
    render(
      <Price 
        amount={299.99} 
        currency="GBP" 
        size="lg" 
        className="custom-class" 
        showCurrency={true}
        strikethrough={true}
      />
    )
    const price = screen.getByText('£299.99')
    expect(price).toHaveClass(
      'inline-block',
      'text-lg',
      'font-semibold',
      'line-through',
      'text-gray-500',
      'custom-class'
    )
  })

  it('formats numbers without currency correctly', () => {
    render(<Price amount={1234.56} showCurrency={false} />)
    expect(screen.getByText('1,234.56')).toBeInTheDocument()
  })
})
