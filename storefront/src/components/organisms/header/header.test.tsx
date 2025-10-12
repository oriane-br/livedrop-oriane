import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Header } from './header'

describe('Header', () => {
  const mockOnCartClick = vi.fn()
  const mockOnSupportClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderHeader = (props: any = {}) => render(
    <Header
      cartItemCount={props.cartItemCount ?? 0}
      onCartClick={props.onCartClick ?? mockOnCartClick}
      onSupportClick={props.onSupportClick ?? mockOnSupportClick}
    />
  )

  it('renders logo and links', () => {
    renderHeader()
    
    // Logo
    expect(screen.getByLabelText('Go to homepage')).toBeInTheDocument()
    expect(screen.getByText('Storefront')).toBeInTheDocument()
    
    // Navigation links (both desktop and mobile versions exist)
    expect(screen.getAllByText('Home')).toHaveLength(2) // Desktop + Mobile
    expect(screen.getAllByText('Products')).toHaveLength(2) // Desktop + Mobile
    
    // Action buttons
    expect(screen.getByLabelText('Ask support')).toBeInTheDocument()
    expect(screen.getByLabelText('Shopping cart with 0 items')).toBeInTheDocument()
  })

  it('shows cart count badge when count > 0', () => {
    renderHeader({ cartItemCount: 5 })
    
    const cartButton = screen.getByLabelText('Shopping cart with 5 items')
    expect(cartButton).toBeInTheDocument()
    
    // Check for badge with count
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('hides cart count badge when count is 0', () => {
    renderHeader({ cartItemCount: 0 })
    
    const cartButton = screen.getByLabelText('Shopping cart with 0 items')
    expect(cartButton).toBeInTheDocument()
    
    // Badge should not be visible
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('shows 99+ for counts over 99', () => {
    renderHeader({ cartItemCount: 150 })
    
    expect(screen.getByText('99+')).toBeInTheDocument()
    expect(screen.getByLabelText('Shopping cart with 150 items')).toBeInTheDocument()
  })

  it('cart button calls onCartClick', () => {
    renderHeader({ cartItemCount: 3 })
    
    const cartButton = screen.getByLabelText('Shopping cart with 3 items')
    fireEvent.click(cartButton)
    
    expect(mockOnCartClick).toHaveBeenCalledTimes(1)
  })

  it('support button calls onSupportClick', () => {
    renderHeader()
    
    const supportButton = screen.getByLabelText('Ask support')
    fireEvent.click(supportButton)
    
    expect(mockOnSupportClick).toHaveBeenCalledTimes(1)
  })

  it('logo links to home', () => {
    renderHeader()
    
    const logoLink = screen.getByLabelText('Go to homepage')
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('navigation links have correct hrefs', () => {
    renderHeader()
    
    const homeLinks = screen.getAllByText('Home')
    const productsLinks = screen.getAllByText('Products')
    
    // Check both desktop and mobile versions have correct hrefs
    homeLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/')
    })
    productsLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/products')
    })
  })

  it('badge shows correct count', () => {
    renderHeader({ cartItemCount: 42 })
    
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('badge is hidden when count is 0', () => {
    renderHeader({ cartItemCount: 0 })
    
    // Should not find any badge text
    const badgeTexts = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    badgeTexts.forEach(text => {
      expect(screen.queryByText(text)).not.toBeInTheDocument()
    })
  })

  it('has proper navigation structure', () => {
    renderHeader()
    
    // Desktop navigation
    const desktopNav = screen.getByLabelText('Main navigation')
    expect(desktopNav).toBeInTheDocument()
    expect(desktopNav).toHaveClass('hidden', 'md:flex')
    
    // Mobile navigation
    const mobileNav = screen.getByLabelText('Mobile navigation')
    expect(mobileNav).toBeInTheDocument()
    expect(mobileNav).toHaveClass('flex', 'flex-col', 'space-y-1')
    
    // Check that mobile nav container has md:hidden
    const mobileNavContainer = mobileNav.closest('.md\\:hidden')
    expect(mobileNavContainer).toHaveClass('md:hidden')
  })

  it('has proper accessibility attributes', () => {
    renderHeader({ cartItemCount: 5 })
    
    // Check aria-labels
    expect(screen.getByLabelText('Go to homepage')).toBeInTheDocument()
    expect(screen.getByLabelText('Ask support')).toBeInTheDocument()
    expect(screen.getByLabelText('Shopping cart with 5 items')).toBeInTheDocument()
    
    // Check navigation roles (both desktop and mobile)
    const navigationElements = screen.getAllByRole('navigation')
    expect(navigationElements).toHaveLength(2) // Desktop + Mobile
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('shows mobile menu button on small screens', () => {
    renderHeader()
    
    const mobileMenuButton = screen.getByLabelText('Open mobile menu')
    expect(mobileMenuButton).toBeInTheDocument()
    expect(mobileMenuButton).toHaveClass('md:hidden')
  })

  it('supports button shows text on larger screens', () => {
    renderHeader()
    
    const supportButton = screen.getByLabelText('Ask support')
    expect(supportButton).toContainHTML('Ask Support')
    expect(screen.getByText('Ask Support')).toHaveClass('hidden', 'sm:block')
  })

  it('cart button shows text on larger screens', () => {
    renderHeader()
    
    const cartButton = screen.getByLabelText('Shopping cart with 0 items')
    expect(cartButton).toContainHTML('Cart')
    expect(screen.getByText('Cart')).toHaveClass('hidden', 'sm:block')
  })

  it('logo shows text on larger screens', () => {
    renderHeader()
    
    const logoText = screen.getByText('Storefront')
    expect(logoText).toHaveClass('hidden', 'sm:block')
  })

  it('handles undefined callbacks gracefully', () => {
    renderHeader({ onCartClick: undefined, onSupportClick: undefined })
    
    // Should not throw when clicking buttons without handlers
    const cartButton = screen.getByLabelText('Shopping cart with 0 items')
    const supportButton = screen.getByLabelText('Ask support')
    
    expect(() => {
      fireEvent.click(cartButton)
      fireEvent.click(supportButton)
    }).not.toThrow()
  })

  it('has sticky positioning', () => {
    renderHeader()
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky', 'top-0')
  })

  it('has proper z-index for overlay', () => {
    renderHeader()
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('z-40')
  })
})
