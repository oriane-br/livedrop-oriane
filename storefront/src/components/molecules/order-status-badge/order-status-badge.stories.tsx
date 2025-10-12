import type { Meta, StoryObj } from '@storybook/react'
import { OrderStatusBadge } from './order-status-badge'
import { OrderStatus } from '@/lib/api'

const meta: Meta<typeof OrderStatusBadge> = {
  title: 'Molecules/OrderStatusBadge',
  component: OrderStatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['Placed', 'Packed', 'Shipped', 'Delivered'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Placed: Story = {
  args: {
    status: 'Placed',
  },
}

export const Packed: Story = {
  args: {
    status: 'Packed',
  },
}

export const Shipped: Story = {
  args: {
    status: 'Shipped',
    carrier: 'DHL Express',
    eta: '2024-01-15',
  },
}

export const Delivered: Story = {
  args: {
    status: 'Delivered',
    carrier: 'UPS',
    eta: '2024-01-10',
  },
}

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">All Order Statuses:</div>
      <div className="space-y-3">
        <OrderStatusBadge status="Placed" />
        <OrderStatusBadge status="Packed" />
        <OrderStatusBadge 
          status="Shipped" 
          carrier="DHL Express" 
          eta="2024-01-15" 
        />
        <OrderStatusBadge 
          status="Delivered" 
          carrier="UPS" 
          eta="2024-01-10" 
        />
      </div>
    </div>
  ),
}

export const DifferentSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">Different Sizes:</div>
      <div className="space-y-3">
        <div>
          <div className="text-xs text-gray-500 mb-1">Small</div>
          <OrderStatusBadge 
            status="Shipped" 
            size="sm" 
            carrier="FedEx" 
            eta="2024-01-20" 
          />
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Medium (Default)</div>
          <OrderStatusBadge 
            status="Shipped" 
            size="md" 
            carrier="FedEx" 
            eta="2024-01-20" 
          />
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Large</div>
          <OrderStatusBadge 
            status="Shipped" 
            size="lg" 
            carrier="FedEx" 
            eta="2024-01-20" 
          />
        </div>
      </div>
    </div>
  ),
}

export const ShippedWithCarrierOnly: Story = {
  args: {
    status: 'Shipped',
    carrier: 'DHL Express',
  },
}

export const ShippedWithETAOnly: Story = {
  args: {
    status: 'Shipped',
    eta: '2024-01-25',
  },
}

export const DeliveredWithCarrierOnly: Story = {
  args: {
    status: 'Delivered',
    carrier: 'UPS',
  },
}

export const InOrderList: Story = {
  render: () => (
    <div className="bg-white p-6 w-full max-w-2xl">
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-gray-900">Order History</h1>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Order #ORD1234567890</h3>
              <p className="text-sm text-gray-600">Placed on Jan 5, 2024</p>
            </div>
            <OrderStatusBadge status="Placed" />
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Order #ORD1234567891</h3>
              <p className="text-sm text-gray-600">Placed on Jan 3, 2024</p>
            </div>
            <OrderStatusBadge status="Packed" />
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Order #ORD1234567892</h3>
              <p className="text-sm text-gray-600">Placed on Jan 1, 2024</p>
            </div>
            <OrderStatusBadge 
              status="Shipped" 
              carrier="DHL Express" 
              eta="2024-01-15" 
            />
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Order #ORD1234567893</h3>
              <p className="text-sm text-gray-600">Placed on Dec 28, 2023</p>
            </div>
            <OrderStatusBadge 
              status="Delivered" 
              carrier="UPS" 
              eta="2024-01-10" 
            />
          </div>
        </div>
      </div>
    </div>
  ),
}

export const InOrderDetail: Story = {
  render: () => (
    <div className="bg-white p-6 w-full max-w-2xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <OrderStatusBadge 
            status="Shipped" 
            size="lg" 
            carrier="DHL Express" 
            eta="2024-01-15" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono">ORD1234567890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span>Jan 5, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold">$199.99</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Carrier:</span>
                <span>DHL Express</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking:</span>
                <span className="font-mono">1234567890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ETA:</span>
                <span>Jan 15, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const MobileLayout: Story = {
  render: () => (
    <div className="bg-white p-4 w-80">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Order Status</h1>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Order #1234</span>
              <OrderStatusBadge status="Shipped" size="sm" />
            </div>
            <div className="text-xs text-gray-600">
              <div>Carrier: DHL Express</div>
              <div>ETA: 2024-01-15</div>
            </div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Order #1235</span>
              <OrderStatusBadge status="Delivered" size="sm" />
            </div>
            <div className="text-xs text-gray-600">
              <div>Carrier: UPS</div>
              <div>Delivered: 2024-01-10</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="text-sm text-gray-600">
        <p>This order status badge has proper accessibility features:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Status has descriptive aria-label</li>
          <li>Icons provide visual context</li>
          <li>Carrier and ETA information is clearly labeled</li>
          <li>Proper semantic structure</li>
        </ul>
      </div>
      
      <div className="space-y-3">
        <OrderStatusBadge 
          status="Shipped" 
          carrier="DHL Express" 
          eta="2024-01-15" 
        />
        <OrderStatusBadge 
          status="Delivered" 
          carrier="UPS" 
          eta="2024-01-10" 
        />
      </div>
      
      <div className="text-xs text-gray-500">
        <p>Screen readers will announce the full status information</p>
      </div>
    </div>
  ),
}

export const StatusProgression: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="text-sm font-medium text-gray-700 mb-2">Order Status Progression:</div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-semibold">1</div>
          <OrderStatusBadge status="Placed" />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm font-semibold">2</div>
          <OrderStatusBadge status="Packed" />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold">3</div>
          <OrderStatusBadge 
            status="Shipped" 
            carrier="DHL Express" 
            eta="2024-01-15" 
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-semibold">4</div>
          <OrderStatusBadge 
            status="Delivered" 
            carrier="UPS" 
            eta="2024-01-10" 
          />
        </div>
      </div>
    </div>
  ),
}
