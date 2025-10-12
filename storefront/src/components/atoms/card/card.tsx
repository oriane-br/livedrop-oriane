import React from 'react'

export interface CardProps {
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  className?: string
  onClick?: (e: React.MouseEvent) => void
}

export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  hoverable = false,
  className = '',
  onClick,
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  const baseStyles = 'bg-white rounded-lg border shadow-sm'
  const hoverStyles = hoverable ? 'hover:shadow-md transition-shadow duration-200' : ''
  const clickableStyles = onClick ? 'cursor-pointer' : ''

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <div
      className={`${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}
