import type { Meta, StoryObj } from '@storybook/react'
import { RelatedProducts } from './related-products'
import { Product } from '@/lib/api'

const meta: Meta<typeof RelatedProducts> = {
  title: 'Organisms/RelatedProducts',
  component: RelatedProducts,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onAddToCart: { action: 'add to cart' },
    onProductClick: { action: 'product clicked' },
  },
}

export default meta
type Story = StoryObj<typeof RelatedProducts>

const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Wireless Headphones',
    price: 199.99,
    image: '/api/placeholder/300/300',
    tags: ['electronics', 'audio'],
    stockQty: 10,
  },
  {
    id: '2',
    title: 'Smart Watch',
    price: 299.99,
    image: '/api/placeholder/300/300',
    tags: ['electronics', 'wearables'],
    stockQty: 5,
  },
  {
    id: '3',
    title: 'Bluetooth Speaker',
    price: 89.99,
    image: '/api/placeholder/300/300',
    tags: ['electronics', 'audio'],
    stockQty: 15,
  },
]

const twoProducts: Product[] = sampleProducts.slice(0, 2)
const oneProduct: Product[] = sampleProducts.slice(0, 1)

export const Default: Story = {
  args: {
    products: sampleProducts,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default related products section with 3 products. Shows grid layout on desktop and horizontal scroll on mobile.',
      },
    },
  },
}

export const WithThreeProducts: Story = {
  args: {
    products: sampleProducts,
    title: 'You Might Also Like',
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with custom title and exactly 3 products.',
      },
    },
  },
}

export const WithFewerThanThree: Story = {
  args: {
    products: twoProducts,
    title: 'Similar Products',
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with only 2 products available. Still shows proper layout.',
      },
    },
  },
}

export const WithOneProduct: Story = {
  args: {
    products: oneProduct,
    title: 'Recommended',
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with only 1 product available.',
      },
    },
  },
}

export const EmptyState: Story = {
  args: {
    products: [],
    title: 'Related Products',
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no related products are available. Shows a helpful message and icon.',
      },
    },
  },
}

export const CustomTitle: Story = {
  args: {
    products: sampleProducts,
    title: 'Customers Also Bought',
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with a custom section title.',
      },
    },
  },
}

export const WithHandlers: Story = {
  args: {
    products: sampleProducts,
    title: 'Interactive Demo',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with click handlers. Try clicking on products or the add to cart buttons.',
      },
    },
  },
}

export const MobileView: Story = {
  args: {
    products: sampleProducts,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Related products on mobile devices. Shows horizontal scroll with snap points.',
      },
    },
  },
}

export const TabletView: Story = {
  args: {
    products: sampleProducts,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Related products on tablet devices. Shows grid layout.',
      },
    },
  },
}

export const DesktopView: Story = {
  args: {
    products: sampleProducts,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Related products on desktop devices. Shows 3-column grid layout.',
      },
    },
  },
}

export const ManyProducts: Story = {
  args: {
    products: [
      ...sampleProducts,
      {
        id: '4',
        title: 'Gaming Mouse',
        price: 79.99,
        image: '/api/placeholder/300/300',
        tags: ['electronics', 'gaming'],
        stockQty: 20,
      },
      {
        id: '5',
        title: 'Mechanical Keyboard',
        price: 149.99,
        image: '/api/placeholder/300/300',
        tags: ['electronics', 'gaming'],
        stockQty: 8,
      },
    ],
    title: 'More Products',
  },
  parameters: {
    docs: {
      description: {
        story: 'Related products with more than 3 products available. Only shows the first 3 products.',
      },
    },
  },
}
