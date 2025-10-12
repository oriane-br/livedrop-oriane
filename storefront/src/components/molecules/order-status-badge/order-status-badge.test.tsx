import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { OrderStatusBadge } from './order-status-badge'
import { OrderStatus } from '@/lib/api'

// Mock the Badge atom
vi.mock('@/components/atoms/badge', () => ({
  Badge: ({ children, variant, size, icon, 'aria-label': ariaLabel }: any) => (
    <div
      data-testid="badge"
      data-variant={variant}
      data-size={size}
      aria-label={ariaLabel}
    >
      {icon && <span data-testid="icon">{icon}</span>}
      {children}
    </div>
  )
}))

describe('OrderStatusBadge', () => {
  it('renders correct badge variant per status', () => {
    const { rerender } = render(
      <OrderStatusBadge status="Placed" />
    )
    
    let badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-variant', 'info')
    
    rerender(<OrderStatusBadge status="Packed" />)
    badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-variant', 'warning')
    
    rerender(<OrderStatusBadge status="Shipped" />)
    badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-variant', 'success')
    
    rerender(<OrderStatusBadge status="Delivered" />)
    badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-variant', 'success')
  })

  it('shows correct icon/text', () => {
    const { rerender } = render(
      <OrderStatusBadge status="Placed" />
    )
    
    expect(screen.getByText('📦')).toBeInTheDocument()
    expect(screen.getByText('Placed')).toBeInTheDocument()
    
    rerender(<OrderStatusBadge status="Packed" />)
    expect(screen.getByText('📋')).toBeInTheDocument()
    expect(screen.getByText('Packed')).toBeInTheDocument()
    
    rerender(<OrderStatusBadge status="Shipped" />)
    expect(screen.getByText('🚚')).toBeInTheDocument()
    expect(screen.getByText('Shipped')).toBeInTheDocument()
    
    rerender(<OrderStatusBadge status="Delivered" />)
    expect(screen.getByText('✅')).toBeInTheDocument()
    expect(screen.getByText('Delivered')).toBeInTheDocument()
  })

  it('shows carrier when Shipped', () => {
    render(
      <OrderStatusBadge 
        status="Shipped" 
        carrier="DHL Express" 
      />
    )
    
    expect(screen.getByText('Carrier: DHL Express')).toBeInTheDocument()
  })

  it('shows ETA when provided', () => {
    render(
      <OrderStatusBadge 
        status="Shipped" 
        eta="2024-01-15" 
      />
    )
    
    expect(screen.getByText('ETA: 2024-01-15')).toBeInTheDocument()
  })

  it('shows both carrier and ETA when provided', () => {
    render(
      <OrderStatusBadge 
        status="Shipped" 
        carrier="FedEx" 
        eta="2024-01-20" 
      />
    )
    
    expect(screen.getByText('Carrier: FedEx')).toBeInTheDocument()
    expect(screen.getByText('ETA: 2024-01-20')).toBeInTheDocument()
  })

  it('applies correct size', () => {
    const { rerender } = render(
      <OrderStatusBadge status="Placed" size="sm" />
    )
    
    let badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-size', 'sm')
    
    rerender(<OrderStatusBadge status="Placed" size="md" />)
    badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-size', 'md')
    
    rerender(<OrderStatusBadge status="Placed" size="lg" />)
    badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-size', 'lg')
  })

  it('uses default size when not provided', () => {
    render(<OrderStatusBadge status="Placed" />)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-size', 'md')
  })

  it('does not show carrier info for Placed status', () => {
    render(
      <OrderStatusBadge 
        status="Placed" 
        carrier="DHL Express" 
        eta="2024-01-15" 
      />
    )
    
    expect(screen.queryByText('Carrier: DHL Express')).not.toBeInTheDocument()
    expect(screen.queryByText('ETA: 2024-01-15')).not.toBeInTheDocument()
  })

  it('does not show carrier info for Packed status', () => {
    render(
      <OrderStatusBadge 
        status="Packed" 
        carrier="DHL Express" 
        eta="2024-01-15" 
      />
    )
    
    expect(screen.queryByText('Carrier: DHL Express')).not.toBeInTheDocument()
    expect(screen.queryByText('ETA: 2024-01-15')).not.toBeInTheDocument()
  })

  it('shows carrier info for Delivered status', () => {
    render(
      <OrderStatusBadge 
        status="Delivered" 
        carrier="UPS" 
        eta="2024-01-10" 
      />
    )
    
    expect(screen.getByText('Carrier: UPS')).toBeInTheDocument()
    expect(screen.getByText('ETA: 2024-01-10')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    const { rerender } = render(
      <OrderStatusBadge status="Placed" />
    )
    
    let badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('aria-label', 'Order placed')
    
    rerender(<OrderStatusBadge status="Packed" />)
    badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('aria-label', 'Order packed')
    
    rerender(<OrderStatusBadge status="Shipped" />)
    badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('aria-label', 'Order shipped')
    
    rerender(<OrderStatusBadge status="Delivered" />)
    badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('aria-label', 'Order delivered')
  })

  it('has proper layout structure', () => {
    render(
      <OrderStatusBadge 
        status="Shipped" 
        carrier="DHL Express" 
        eta="2024-01-15" 
      />
    )
    
    const container = screen.getByTestId('badge').closest('div')?.parentElement
    expect(container).toHaveClass('flex', 'flex-col', 'items-start', 'gap-1')
  })

  it('handles carrier info styling', () => {
    render(
      <OrderStatusBadge 
        status="Shipped" 
        carrier="DHL Express" 
        eta="2024-01-15" 
      />
    )
    
    const carrierInfo = screen.getByTestId('carrier-info')
    expect(carrierInfo).toHaveClass('text-xs', 'text-gray-600', 'space-y-0.5')
  })

  it('shows only carrier when ETA not provided', () => {
    render(
      <OrderStatusBadge 
        status="Shipped" 
        carrier="FedEx" 
      />
    )
    
    expect(screen.getByText('Carrier: FedEx')).toBeInTheDocument()
    expect(screen.queryByText(/ETA:/)).not.toBeInTheDocument()
  })

  it('shows only ETA when carrier not provided', () => {
    render(
      <OrderStatusBadge 
        status="Shipped" 
        eta="2024-01-25" 
      />
    )
    
    expect(screen.getByText('ETA: 2024-01-25')).toBeInTheDocument()
    expect(screen.queryByText(/Carrier:/)).not.toBeInTheDocument()
  })

  it('does not show carrier info section when neither carrier nor ETA provided', () => {
    render(<OrderStatusBadge status="Shipped" />)
    
    expect(screen.queryByText(/Carrier:/)).not.toBeInTheDocument()
    expect(screen.queryByText(/ETA:/)).not.toBeInTheDocument()
  })

  it('handles unknown status gracefully', () => {
    render(<OrderStatusBadge status={'Unknown' as OrderStatus} />)
    
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('data-variant', 'default')
    expect(screen.getByText('📦')).toBeInTheDocument()
    expect(screen.getByText('Unknown')).toBeInTheDocument()
    expect(badge).toHaveAttribute('aria-label', 'Order unknown')
  })
})
