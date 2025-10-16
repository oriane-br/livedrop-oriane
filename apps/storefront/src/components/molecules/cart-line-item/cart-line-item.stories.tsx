import type { Meta, StoryObj } from '@storybook/react'
import { CartLineItem } from './cart-line-item'
import { CartItem } from '@/lib/api'

const meta: Meta<typeof CartLineItem> = {
  title: 'Molecules/CartLineItem',
  component: CartLineItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onUpdateQuantity: {
      action: 'updateQuantity',
    },
    onRemove: {
      action: 'remove',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultCartItem: CartItem = {
  product: {
    id: '1',
    title: 'Wireless Bluetooth Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
    tags: ['electronics', 'audio'],
    stockQty: 25
  },
  quantity: 2
}

export const Default: Story = {
  args: {
    item: defaultCartItem,
  },
}

export const MinimumQuantity: Story = {
  args: {
    item: {
      ...defaultCartItem,
      quantity: 1
    },
  },
}

export const MaximumQuantity: Story = {
  args: {
    item: {
      ...defaultCartItem,
      quantity: 25 // Same as stockQty
    },
  },
}

export const MultipleQuantities: Story = {
  args: {
    item: {
      ...defaultCartItem,
      quantity: 5
    },
  },
}

export const LowStock: Story = {
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'Gaming Mechanical Keyboard',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=64&h=64&fit=crop',
        stockQty: 3
      },
      quantity: 2
    },
  },
}

export const OutOfStock: Story = {
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'Premium Smartphone',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=64&h=64&fit=crop',
        stockQty: 0
      },
      quantity: 1
    },
  },
}

export const ExpensiveItem: Story = {
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'Professional Camera Lens',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=64&h=64&fit=crop',
        stockQty: 5
      },
      quantity: 1
    },
  },
}

export const CheapItem: Story = {
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'USB Cable',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=64&h=64&fit=crop',
        stockQty: 100
      },
      quantity: 3
    },
  },
}

export const LongTitle: Story = {
  args: {
    item: {
      product: {
        ...defaultCartItem.product,
        title: 'Ultra-Premium Professional Wireless Noise-Cancelling Bluetooth Headphones with Advanced Audio Technology',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
        stockQty: 15
      },
      quantity: 1
    },
  },
}

export const InteractiveExample: Story = {
  args: {
    item: defaultCartItem,
    onUpdateQuantity: (productId, quantity) => {
      console.log('Updated quantity:', productId, quantity)
      alert(`Updated quantity to ${quantity}`)
    },
    onRemove: (productId) => {
      console.log('Removed product:', productId)
      alert('Item removed from cart')
    },
  },
}

export const CartList: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      <CartLineItem 
        item={{
          product: {
            id: '1',
            title: 'Wireless Headphones',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
            tags: ['electronics', 'audio'],
            stockQty: 25
          },
          quantity: 2
        }}
        onUpdateQuantity={(productId, quantity) => alert(`Updated ${productId} to ${quantity}`)}
        onRemove={(productId) => alert(`Removed ${productId}`)}
      />
      
      <CartLineItem 
        item={{
          product: {
            id: '2',
            title: 'Gaming Keyboard',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=64&h=64&fit=crop',
            tags: ['gaming', 'keyboard'],
            stockQty: 8
          },
          quantity: 1
        }}
        onUpdateQuantity={(productId, quantity) => alert(`Updated ${productId} to ${quantity}`)}
        onRemove={(productId) => alert(`Removed ${productId}`)}
      />
      
      <CartLineItem 
        item={{
          product: {
            id: '3',
            title: 'Smartphone',
            price: 899.99,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=64&h=64&fit=crop',
            tags: ['smartphone', 'premium'],
            stockQty: 0
          },
          quantity: 1
        }}
        onUpdateQuantity={(productId, quantity) => alert(`Updated ${productId} to ${quantity}`)}
        onRemove={(productId) => alert(`Removed ${productId}`)}
      />
      
      <CartLineItem 
        item={{
          product: {
            id: '4',
            title: 'Fitness Tracker',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=64&h=64&fit=crop',
            tags: ['fitness', 'wearable'],
            stockQty: 50
          },
          quantity: 3
        }}
        onUpdateQuantity={(productId, quantity) => alert(`Updated ${productId} to ${quantity}`)}
        onRemove={(productId) => alert(`Removed ${productId}`)}
      />
      
      <CartLineItem 
        item={{
          product: {
            id: '5',
            title: 'USB Cable',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=64&h=64&fit=crop',
            tags: ['cable', 'usb'],
            stockQty: 100
          },
          quantity: 5
        }}
        onUpdateQuantity={(productId, quantity) => alert(`Updated ${productId} to ${quantity}`)}
        onRemove={(productId) => alert(`Removed ${productId}`)}
      />
    </div>
  ),
}

export const MobileLayout: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <CartLineItem 
        item={{
          product: {
            id: '1',
            title: 'Wireless Bluetooth Headphones with Noise Cancellation',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
            tags: ['electronics', 'audio'],
            stockQty: 25
          },
          quantity: 2
        }}
        onUpdateQuantity={(productId, quantity) => alert(`Updated ${productId} to ${quantity}`)}
        onRemove={(productId) => alert(`Removed ${productId}`)}
      />
      
      <CartLineItem 
        item={{
          product: {
            id: '2',
            title: 'Gaming Mechanical Keyboard RGB',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=64&h=64&fit=crop',
            tags: ['gaming', 'keyboard'],
            stockQty: 8
          },
          quantity: 1
        }}
        onUpdateQuantity={(productId, quantity) => alert(`Updated ${productId} to ${quantity}`)}
        onRemove={(productId) => alert(`Removed ${productId}`)}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
