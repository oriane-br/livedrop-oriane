import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  icon?: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  icon,
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }

  const baseStyles = 'inline-flex items-center font-medium'
  const roundedStyles = rounded ? 'rounded-full' : 'rounded-md'

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${roundedStyles} ${className}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  )
}
