import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ProductGrid } from './product-grid'
import { Product } from '@/lib/api'

const meta: Meta<typeof ProductGrid> = {
  title: 'Organisms/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onAddToCart: { action: 'added' },
    onProductClick: { action: 'clicked' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const makeProducts = (count: number): Product[] => [...Array(count)].map((_, i) => ({
  id: `${i + 1}`,
  title: `Sample Product ${i + 1}`,
  price: 20 + i,
  image: 'https://via.placeholder.com/300',
  tags: ['demo', 'product', i % 2 ? 'tag1' : 'tag2'],
  stockQty: i % 3 === 0 ? 0 : 10 + i
}))

export const FourProducts: Story = {
  args: {
    products: makeProducts(4),
  },
}

export const EightProducts: Story = {
  args: {
    products: makeProducts(8),
  },
}

export const TwelveProducts: Story = {
  args: {
    products: makeProducts(12),
  },
}

export const EmptyState: Story = {
  args: {
    products: [],
    emptyStateMessage: 'Nothing to show!'
  },
}

export const SingleProduct: Story = {
  args: {
    products: makeProducts(1),
  },
}

export const LoadingState: Story = {
  args: {
    loading: true,
    products: [],
  },
}

export const WithHandlers: Story = {
  render: () => {
    const products = makeProducts(8)
    const [lastAdd, setLastAdd] = useState<string>('none')
    const [lastClick, setLastClick] = useState<string>('none')
    return (
      <div className="space-y-4 w-full h-full">
        <ProductGrid
          products={products}
          onAddToCart={p => setLastAdd(p.title)}
          onProductClick={p => setLastClick(p.title)}
        />
        <div className="fixed bottom-2 left-4 text-xs bg-gray-50 border rounded px-3 py-1.5 shadow">
          <div>Last Add to Cart: {lastAdd}</div>
          <div>Last Product Click: {lastClick}</div>
        </div>
      </div>
    )
  },
}
