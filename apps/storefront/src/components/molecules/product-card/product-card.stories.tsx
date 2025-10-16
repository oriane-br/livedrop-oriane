import type { Meta, StoryObj } from '@storybook/react'
import { ProductCard } from './product-card'
import { Product } from '@/lib/api'

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onAddToCart: {
      action: 'addToCart',
    },
    onClick: {
      action: 'click',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultProduct: Product = {
  id: '1',
  title: 'Wireless Bluetooth Headphones',
  price: 199.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  tags: ['electronics', 'audio', 'wireless'],
  stockQty: 25
}

export const Default: Story = {
  args: {
    product: defaultProduct,
  },
}

export const LowStock: Story = {
  args: {
    product: {
      ...defaultProduct,
      title: 'Gaming Mechanical Keyboard',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
      tags: ['gaming', 'keyboard'],
      stockQty: 8
    },
  },
}

export const OutOfStock: Story = {
  args: {
    product: {
      ...defaultProduct,
      title: 'Premium Smartphone',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      tags: ['smartphone', 'premium'],
      stockQty: 0
    },
  },
}

export const WithClickHandler: Story = {
  args: {
    product: defaultProduct,
    onClick: (product) => alert(`Navigating to ${product.title}`),
  },
}

export const LongTitle: Story = {
  args: {
    product: {
      ...defaultProduct,
      title: 'Ultra-Premium Professional Wireless Noise-Cancelling Bluetooth Headphones with Advanced Audio Technology and Long Battery Life',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      tags: ['premium', 'noise-cancelling'],
      stockQty: 15
    },
  },
}

export const MultipleTags: Story = {
  args: {
    product: {
      ...defaultProduct,
      title: 'Smart Fitness Tracker',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop',
      tags: ['fitness', 'wearable', 'health', 'smart', 'tracker', 'sports'],
      stockQty: 50
    },
  },
}

export const HighStock: Story = {
  args: {
    product: {
      ...defaultProduct,
      title: 'Basic USB Cable',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
      tags: ['cable', 'usb'],
      stockQty: 150
    },
  },
}

export const ExpensiveProduct: Story = {
  args: {
    product: {
      ...defaultProduct,
      title: 'Professional Camera Lens',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
      tags: ['camera', 'lens', 'professional'],
      stockQty: 3
    },
  },
}

export const CheapProduct: Story = {
  args: {
    product: {
      ...defaultProduct,
      title: 'Phone Case',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
      tags: ['case', 'protection'],
      stockQty: 200
    },
  },
}

export const InteractiveExample: Story = {
  args: {
    product: defaultProduct,
    onAddToCart: (product) => {
      console.log('Added to cart:', product.title)
      alert(`Added ${product.title} to cart!`)
    },
    onClick: (product) => {
      console.log('Clicked product:', product.title)
      alert(`Viewing details for ${product.title}`)
    },
  },
}

export const ProductGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 bg-gray-100">
      <ProductCard 
        product={{
          id: '1',
          title: 'Wireless Headphones',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
          tags: ['electronics', 'audio'],
          stockQty: 25
        }}
        onAddToCart={(product) => alert(`Added ${product.title} to cart`)}
        onClick={(product) => alert(`Viewing ${product.title}`)}
      />
      
      <ProductCard 
        product={{
          id: '2',
          title: 'Gaming Keyboard',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
          tags: ['gaming', 'keyboard'],
          stockQty: 8
        }}
        onAddToCart={(product) => alert(`Added ${product.title} to cart`)}
        onClick={(product) => alert(`Viewing ${product.title}`)}
      />
      
      <ProductCard 
        product={{
          id: '3',
          title: 'Smartphone',
          price: 899.99,
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
          tags: ['smartphone', 'premium'],
          stockQty: 0
        }}
        onAddToCart={(product) => alert(`Added ${product.title} to cart`)}
        onClick={(product) => alert(`Viewing ${product.title}`)}
      />
      
      <ProductCard 
        product={{
          id: '4',
          title: 'Fitness Tracker',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=400&h=400&fit=crop',
          tags: ['fitness', 'wearable'],
          stockQty: 50
        }}
        onAddToCart={(product) => alert(`Added ${product.title} to cart`)}
        onClick={(product) => alert(`Viewing ${product.title}`)}
      />
      
      <ProductCard 
        product={{
          id: '5',
          title: 'USB Cable',
          price: 9.99,
          image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
          tags: ['cable', 'usb'],
          stockQty: 150
        }}
        onAddToCart={(product) => alert(`Added ${product.title} to cart`)}
        onClick={(product) => alert(`Viewing ${product.title}`)}
      />
      
      <ProductCard 
        product={{
          id: '6',
          title: 'Camera Lens',
          price: 1299.99,
          image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop',
          tags: ['camera', 'lens'],
          stockQty: 3
        }}
        onAddToCart={(product) => alert(`Added ${product.title} to cart`)}
        onClick={(product) => alert(`Viewing ${product.title}`)}
      />
    </div>
  ),
}
