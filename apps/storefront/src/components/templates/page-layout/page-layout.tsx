import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/organisms/header'
import { CartDrawer } from '@/components/organisms/cart-drawer'
import { AskSupportPanel } from '@/components/organisms/ask-support-panel'
import { useCart } from '@/lib/store'

export interface PageLayoutProps {
  children: React.ReactNode
  showHeader?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-screen-2xl',
  full: 'w-full'
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showHeader = true,
  maxWidth = 'lg',
  className = '',
}) => {
  const [cartOpen, setCartOpen] = useState(false)
  const [supportOpen, setSupportOpen] = useState(false)
  const navigate = useNavigate()
  const cart = useCart()

  const maxWidthClass = maxWidthClasses[maxWidth]

  const handleCheckout = () => {
    setCartOpen(false)
    navigate('/checkout')
  }

  const handleCartUpdateQuantity = (productId: string, quantity: number) => {
    cart.updateQuantity(productId, quantity)
  }

  const handleCartRemove = (productId: string) => {
    cart.removeItem(productId)
  }

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`}>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Header */}
      {showHeader && (
        <Header
          cartItemCount={cart.getItemCount()}
          onCartClick={() => setCartOpen(true)}
          onSupportClick={() => setSupportOpen(true)}
        />
      )}

      {/* Main content */}
      <main
        id="main-content"
        role="main"
        className="flex-1"
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-6 ${maxWidthClass}`}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            © 2025 Shoplite. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        onUpdateQuantity={handleCartUpdateQuantity}
        onRemove={handleCartRemove}
        onCheckout={handleCheckout}
      />

      {/* Support Panel */}
      <AskSupportPanel
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
    </div>
  )
}
