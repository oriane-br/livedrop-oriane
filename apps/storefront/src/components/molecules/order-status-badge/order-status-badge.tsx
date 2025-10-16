import React from 'react'
import { Badge } from '@/components/atoms/badge'
import { OrderStatus } from '@/lib/api'

export interface OrderStatusBadgeProps {
  status: OrderStatus
  carrier?: string
  eta?: string
  size?: 'sm' | 'md' | 'lg'
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  carrier,
  eta,
  size = 'md',
}) => {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'Placed':
        return {
          variant: 'info' as const,
          icon: '📦',
          label: 'Placed',
          ariaLabel: 'Order placed'
        }
      case 'Packed':
        return {
          variant: 'warning' as const,
          icon: '📋',
          label: 'Packed',
          ariaLabel: 'Order packed'
        }
      case 'Shipped':
        return {
          variant: 'success' as const,
          icon: '🚚',
          label: 'Shipped',
          ariaLabel: 'Order shipped'
        }
      case 'Delivered':
        return {
          variant: 'success' as const,
          icon: '✅',
          label: 'Delivered',
          ariaLabel: 'Order delivered'
        }
      default:
        return {
          variant: 'default' as const,
          icon: '📦',
          label: status,
          ariaLabel: `Order ${status.toLowerCase()}`
        }
    }
  }

  const statusConfig = getStatusConfig(status)
  const showCarrierInfo = (status === 'Shipped' || status === 'Delivered') && (carrier || eta)

  return (
    <div className="flex flex-col items-start gap-1">
      <Badge
        variant={statusConfig.variant}
        size={size}
        icon={<span>{statusConfig.icon}</span>}
        aria-label={statusConfig.ariaLabel}
      >
        {statusConfig.label}
      </Badge>
      
      {showCarrierInfo && (
        <div className="text-xs text-gray-600 space-y-0.5" data-testid="carrier-info">
          {carrier && (
            <div>Carrier: {carrier}</div>
          )}
          {eta && (
            <div>ETA: {eta}</div>
          )}
        </div>
      )}
    </div>
  )
}
