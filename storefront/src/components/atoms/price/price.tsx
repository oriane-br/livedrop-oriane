import React from 'react'
import { formatCurrency } from '@/lib/format'

export interface PriceProps {
  amount: number
  currency?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showCurrency?: boolean
  strikethrough?: boolean
}

export const Price: React.FC<PriceProps> = ({
  amount,
  currency = 'USD',
  size = 'md',
  className = '',
  showCurrency = true,
  strikethrough = false,
}) => {
  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold',
    xl: 'text-2xl font-bold',
  }

  const baseStyles = 'inline-block'
  const strikethroughStyles = strikethrough ? 'line-through text-gray-500' : ''

  const formattedPrice = showCurrency 
    ? formatCurrency(amount, currency)
    : amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${strikethroughStyles} ${className}`}
    >
      {formattedPrice}
    </span>
  )
}
