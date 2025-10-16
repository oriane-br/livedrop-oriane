import type { Meta, StoryObj } from '@storybook/react'
import { CartDrawer } from './cart-drawer'
import { CartItem } from '@/lib/api'

const meta: Meta<typeof CartDrawer> = {
  title: 'Organisms/CartDrawer',
  component: CartDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    onClose: { action: 'closed' },
    onUpdateQuantity: { action: 'quantity updated' },
    onRemove: { action: 'item removed' },
    onCheckout: { action: 'checkout clicked' },
  },
}

export default meta
type Story = StoryObj<typeof CartDrawer>

const sampleItems: CartItem[] = [
  {
    product: {
      id: '1',
      title: 'Wireless Headphones',
      price: 199.99,
      image: '/api/placeholder/300/300',
      tags: ['electronics', 'audio'],
      stockQty: 10,
    },
    quantity: 2,
  },
  {
    product: {
      id: '2',
      title: 'Smart Watch',
      price: 299.99,
      image: '/api/placeholder/300/300',
      tags: ['electronics', 'wearables'],
      stockQty: 5,
    },
    quantity: 1,
  },
  {
    product: {
      id: '3',
      title: 'Bluetooth Speaker',
      price: 89.99,
      image: '/api/placeholder/300/300',
      tags: ['electronics', 'audio'],
      stockQty: 15,
    },
    quantity: 3,
  },
]

const manyItems: CartItem[] = Array.from({ length: 15 }, (_, i) => ({
  product: {
    id: `item-${i}`,
    title: `Product ${i + 1}`,
    price: 29.99 + i * 10,
    image: '/api/placeholder/300/300',
    tags: ['electronics'],
    stockQty: 20,
  },
  quantity: Math.floor(Math.random() * 3) + 1,
}))

export const Default: Story = {
  args: {
    isOpen: true,
    items: sampleItems,
  },
}

export const Empty: Story = {
  args: {
    isOpen: true,
    items: [],
  },
}

export const Closed: Story = {
  args: {
    isOpen: false,
    items: sampleItems,
  },
}

export const ManyItems: Story = {
  args: {
    isOpen: true,
    items: manyItems,
  },
}

export const SingleItem: Story = {
  args: {
    isOpen: true,
    items: [sampleItems[0]],
  },
}

export const Interactive: Story = {
  args: {
    isOpen: true,
    items: sampleItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Try interacting with the cart - update quantities, remove items, or checkout. Use ESC key or click outside to close.',
      },
    },
  },
}
