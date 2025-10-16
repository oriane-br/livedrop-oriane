import React from 'react'
import { Product } from '@/lib/api'
import { ProductCard } from '@/components/molecules/product-card'

export interface RelatedProductsProps {
  products: Product[]
  title?: string
  onAddToCart?: (product: Product) => void
  onProductClick?: (product: Product) => void
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title = 'Related Products',
  onAddToCart,
  onProductClick,
}) => {
  // Take only the first 3 products
  const displayProducts = products.slice(0, 3)

  if (displayProducts.length === 0) {
    return (
      <section className="bg-gray-50 py-8" aria-label="Related products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
          <div className="text-center py-12">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <p className="text-gray-500 text-sm">No related products available</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-8" aria-label="Related products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        
        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onClick={onProductClick}
              />
            </div>
          ))}
        </div>

        {/* Mobile: Horizontal scroll with snap */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-64 snap-start"
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onClick={onProductClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
