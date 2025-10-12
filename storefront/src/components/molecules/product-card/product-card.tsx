import React from 'react'
import { Card } from '@/components/atoms/card'
import { Image } from '@/components/atoms/image'
import { Price } from '@/components/atoms/price'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { Product } from '@/lib/api'
import { getStockStatus } from '@/lib/format'

export interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onClick?: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onClick,
}) => {
  const stockStatus = getStockStatus(product.stockQty)
  const isOutOfStock = product.stockQty === 0
  const displayTags = product.tags.slice(0, 2)

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on the button
    if ((e.target as HTMLElement).closest('button')) {
      return
    }
    onClick?.(product)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    onAddToCart?.(product)
  }

  const stockBadgeVariant = stockStatus.color === 'green' ? 'success' : 
                           stockStatus.color === 'yellow' ? 'warning' : 'danger'

  return (
    <Card 
      hoverable 
      onClick={handleCardClick}
      className="w-full max-w-sm cursor-pointer"
    >
      <div className="space-y-3">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.title}
          aspectRatio="1/1"
          objectFit="cover"
          className="w-full"
        />

        {/* Product Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        {/* Tags */}
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {displayTags.map((tag, index) => (
              <Badge key={index} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Price and Stock Status */}
        <div className="flex items-center justify-between">
          <Price amount={product.price} size="lg" />
          <Badge variant={stockBadgeVariant} size="sm">
            {stockStatus.label}
          </Badge>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="primary"
          size="md"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className="w-full"
          aria-label={`Add ${product.title} to cart`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </Card>
  )
}
