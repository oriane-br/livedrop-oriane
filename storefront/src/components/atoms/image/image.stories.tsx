import type { Meta, StoryObj } from '@storybook/react'
import { Image } from './image'

const meta: Meta<typeof Image> = {
  title: 'Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: { type: 'select' },
      options: ['1/1', '4/3', '16/9', 'auto'],
    },
    objectFit: {
      control: { type: 'select' },
      options: ['cover', 'contain', 'fill'],
    },
    lazy: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Random image',
  },
}

// Different aspect ratios
export const AspectRatios: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <div>
        <h3 className="text-sm font-medium mb-2">Square (1:1)</h3>
        <Image 
          src="https://picsum.photos/300/300" 
          alt="Square image" 
          aspectRatio="1/1" 
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">4:3</h3>
        <Image 
          src="https://picsum.photos/400/300" 
          alt="4:3 image" 
          aspectRatio="4/3" 
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">16:9</h3>
        <Image 
          src="https://picsum.photos/800/450" 
          alt="16:9 image" 
          aspectRatio="16/9" 
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Auto</h3>
        <Image 
          src="https://picsum.photos/400/600" 
          alt="Auto aspect image" 
          aspectRatio="auto" 
        />
      </div>
    </div>
  ),
}

// Different object-fit values
export const ObjectFit: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-96">
      <div>
        <h3 className="text-sm font-medium mb-2">Cover</h3>
        <Image 
          src="https://picsum.photos/400/300" 
          alt="Cover image" 
          aspectRatio="1/1"
          objectFit="cover" 
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Contain</h3>
        <Image 
          src="https://picsum.photos/400/300" 
          alt="Contain image" 
          aspectRatio="1/1"
          objectFit="contain" 
        />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Fill</h3>
        <Image 
          src="https://picsum.photos/400/300" 
          alt="Fill image" 
          aspectRatio="1/1"
          objectFit="fill" 
        />
      </div>
    </div>
  ),
}

// With fallback
export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.jpg',
    alt: 'Image with fallback',
    fallbackSrc: 'https://picsum.photos/400/300',
  },
}

// Loading state (simulated)
export const LoadingState: Story = {
  args: {
    src: 'https://picsum.photos/400/300?delay=2000',
    alt: 'Loading image',
  },
}

// Error state
export const ErrorState: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.jpg',
    alt: 'Error image',
  },
}

// Lazy loading
export const LazyLoading: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="h-96 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Scroll down to see lazy loaded images</p>
      </div>
      <Image 
        src="https://picsum.photos/400/300" 
        alt="Lazy loaded image 1" 
        lazy={true}
      />
      <div className="h-96 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">More content</p>
      </div>
      <Image 
        src="https://picsum.photos/400/300" 
        alt="Lazy loaded image 2" 
        lazy={true}
      />
    </div>
  ),
}

// Product card example
export const ProductCard: Story = {
  render: () => (
    <div className="w-64 border rounded-lg overflow-hidden shadow-sm">
      <Image 
        src="https://picsum.photos/400/300" 
        alt="Product image" 
        aspectRatio="4/3"
        objectFit="cover"
      />
      <div className="p-4">
        <h3 className="font-medium text-gray-900">Product Name</h3>
        <p className="text-sm text-gray-500">$29.99</p>
      </div>
    </div>
  ),
}

// Gallery example
export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-2 w-96">
      <Image 
        src="https://picsum.photos/200/200" 
        alt="Gallery image 1" 
        aspectRatio="1/1"
        objectFit="cover"
      />
      <Image 
        src="https://picsum.photos/200/300" 
        alt="Gallery image 2" 
        aspectRatio="1/1"
        objectFit="cover"
      />
      <Image 
        src="https://picsum.photos/300/200" 
        alt="Gallery image 3" 
        aspectRatio="1/1"
        objectFit="cover"
      />
      <Image 
        src="https://picsum.photos/250/250" 
        alt="Gallery image 4" 
        aspectRatio="1/1"
        objectFit="cover"
      />
    </div>
  ),
}

// Hero image example
export const HeroImage: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Image 
        src="https://picsum.photos/1200/600" 
        alt="Hero image" 
        aspectRatio="16/9"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  ),
}

// Avatar example
export const Avatar: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Image 
        src="https://picsum.photos/100/100" 
        alt="User avatar" 
        aspectRatio="1/1"
        objectFit="cover"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h4 className="font-medium">John Doe</h4>
        <p className="text-sm text-gray-500">Software Developer</p>
      </div>
    </div>
  ),
}

// Interactive story
export const Interactive: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: 'Interactive image',
    onLoadError: () => console.log('Image failed to load'),
    onLoad: () => console.log('Image loaded successfully'),
  },
}
