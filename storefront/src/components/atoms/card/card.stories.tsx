import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
    hoverable: {
      control: { type: 'boolean' },
    },
    onClick: {
      action: 'clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Card Title</h3>
        <p className="text-gray-600">This is a basic card with default styling.</p>
      </div>
    ),
  },
}

export const DifferentPadding: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-2">No Padding</h3>
        <Card padding="none">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>Content with no card padding</p>
          </div>
        </Card>
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Small Padding</h3>
        <Card padding="sm">
          <p>Small padding card</p>
        </Card>
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Medium Padding (Default)</h3>
        <Card padding="md">
          <p>Medium padding card</p>
        </Card>
      </div>
      
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Large Padding</h3>
        <Card padding="lg">
          <p>Large padding card</p>
        </Card>
      </div>
    </div>
  ),
}

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Hoverable Card</h3>
        <p className="text-gray-600">Hover over this card to see the shadow effect.</p>
      </div>
    ),
  },
}

export const Clickable: Story = {
  args: {
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3 className="text-lg font-semibold mb-2">Clickable Card</h3>
        <p className="text-gray-600">Click this card to trigger an action.</p>
      </div>
    ),
  },
}

export const WithComposedSections: Story = {
  render: () => (
    <Card>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold text-gray-900">Product Card</h3>
          <p className="text-sm text-gray-500">High-quality product</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-700">This is the main content area of the card.</p>
          <p className="text-gray-700">It can contain any content you need.</p>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="text-lg font-bold text-green-600">$99.99</span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </Card>
  ),
}

export const ProductCard: Story = {
  render: () => (
    <Card hoverable className="max-w-sm">
      <div className="space-y-4">
        <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
          <span className="text-gray-400">Product Image</span>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Premium Headphones</h3>
          <p className="text-sm text-gray-500">Wireless Bluetooth headphones</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-gray-900">$199.99</span>
            <span className="text-sm text-gray-500 line-through ml-2">$249.99</span>
          </div>
          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
            Buy Now
          </button>
        </div>
      </div>
    </Card>
  ),
}

export const UserProfileCard: Story = {
  render: () => (
    <Card padding="lg" className="max-w-md">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 text-xl">👤</span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
          <p className="text-sm text-gray-500">Software Engineer</p>
          <p className="text-sm text-gray-600">San Francisco, CA</p>
        </div>
        
        <button className="px-3 py-1 border border-gray-300 text-sm rounded-md hover:bg-gray-50">
          Follow
        </button>
      </div>
    </Card>
  ),
}

export const StatisticsCard: Story = {
  render: () => (
    <Card className="max-w-xs">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
        <div className="text-sm text-gray-600 mb-1">Total Sales</div>
        <div className="text-xs text-green-600">+12% from last month</div>
      </div>
    </Card>
  ),
}

export const CompleteExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
      <Card hoverable>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Basic Card</h3>
          <p className="text-gray-600">Simple card with default styling</p>
        </div>
      </Card>
      
      <Card hoverable onClick={() => alert('Clicked!')}>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Clickable Card</h3>
          <p className="text-gray-600">Card with hover and click effects</p>
        </div>
      </Card>
      
      <Card padding="lg" hoverable>
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 text-xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold">Analytics</h3>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">2,847</div>
            <div className="text-sm text-gray-500">Page Views</div>
          </div>
        </div>
      </Card>
      
      <Card padding="sm" className="col-span-1 md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Wide Card</h3>
            <p className="text-gray-600">This card spans multiple columns</p>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Action
          </button>
        </div>
      </Card>
      
      <Card padding="none">
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg">
          <h3 className="text-lg font-semibold">Gradient Card</h3>
          <p>Card with custom background and no padding</p>
        </div>
      </Card>
    </div>
  ),
}
