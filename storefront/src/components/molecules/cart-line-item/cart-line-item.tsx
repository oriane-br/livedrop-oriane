import React from 'react'
import { Image } from '@/components/atoms/image'
import { Price } from '@/components/atoms/price'
import { Button } from '@/components/atoms/button'
import { CartItem } from '@/lib/api'

export interface CartLineItemProps {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export const CartLineItem: React.FC<CartLineItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const { product, quantity } = item
  const lineTotal = product.price * quantity
  const isMinQuantity = quantity <= 1
  const isMaxQuantity = quantity >= product.stockQty

  const handleIncrement = () => {
    if (!isMaxQuantity) {
      onUpdateQuantity(product.id, quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (!isMinQuantity) {
      onUpdateQuantity(product.id, quantity - 1)
    }
  }

  const handleRemove = () => {
    onRemove(product.id)
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src={product.image}
          alt={product.title}
          aspectRatio="1/1"
          objectFit="cover"
          className="w-16 h-16 rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {product.title}
        </h3>
        <Price amount={product.price} size="sm" />
        <div className="text-xs text-gray-500 mt-1">
          Stock: {product.stockQty}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isMinQuantity}
          onClick={handleDecrement}
          aria-label={`Decrease quantity of ${product.title}`}
          className="w-8 h-8 p-0 flex items-center justify-center"
        >
          −
        </Button>
        
        <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
          {quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          disabled={isMaxQuantity}
          onClick={handleIncrement}
          aria-label={`Increase quantity of ${product.title}`}
          className="w-8 h-8 p-0 flex items-center justify-center"
        >
          +
        </Button>
      </div>

      {/* Line Total */}
      <div className="text-right">
        <Price amount={lineTotal} size="md" />
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        aria-label={`Remove ${product.title} from cart`}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </Button>
    </div>
  )
}
