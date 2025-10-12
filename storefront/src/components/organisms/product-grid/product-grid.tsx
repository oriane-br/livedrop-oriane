import React from 'react'
import { Product } from '@/lib/api'
import { ProductCard } from '@/components/molecules/product-card'

export interface ProductGridProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
  onProductClick?: (product: Product) => void
  emptyStateMessage?: string
  loading?: boolean
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onProductClick,
  emptyStateMessage = 'No products found.',
  loading = false,
}) => {
  // Loading skeletons: optional, show 8 gray cards
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 sm:p-4" role="list" aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} role="listitem" className="animate-pulse w-full max-w-sm h-80 bg-gray-100 rounded-lg shadow-sm" />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center py-12">
        <svg width="56" height="56" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300 mb-4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m-3.978 9.728a2.25 2.25 0 002.228 1.897h9a2.25 2.25 0 002.228-1.897l.772-5.4A2.25 2.25 0 0016.775 11.4H7.225a2.25 2.25 0 00-2.205 2.328l.752 5.4z"/></svg>
        <div className="text-gray-600 font-medium mb-2">{emptyStateMessage}</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 sm:p-4" role="list">
      {products.map((product) => (
        <div key={product.id} role="listitem" className="w-full flex">
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onClick={onProductClick}
          />
        </div>
      ))}
    </div>
  )
}
