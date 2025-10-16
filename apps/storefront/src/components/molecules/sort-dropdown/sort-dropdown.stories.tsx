import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SortDropdown, SortOption } from './sort-dropdown'

const meta: Meta<typeof SortDropdown> = {
  title: 'Molecules/SortDropdown',
  component: SortDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: {
      action: 'changed',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'price-asc',
    onChange: () => {},
  },
}

export const PriceDescending: Story = {
  args: {
    value: 'price-desc',
    onChange: () => {},
  },
}

export const NameAscending: Story = {
  args: {
    value: 'name-asc',
    onChange: () => {},
  },
}

export const NameDescending: Story = {
  args: {
    value: 'name-desc',
    onChange: () => {},
  },
}

export const WithoutLabel: Story = {
  args: {
    value: 'price-asc',
    onChange: () => {},
    label: '',
  },
}

export const CustomLabel: Story = {
  args: {
    value: 'price-asc',
    onChange: () => {},
    label: 'Order by:',
  },
}

export const AllSortOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700 mb-2">All Sort Options:</div>
      <div className="space-y-2">
        <SortDropdown 
          value="price-asc" 
          onChange={() => {}} 
        />
        <SortDropdown 
          value="price-desc" 
          onChange={() => {}} 
        />
        <SortDropdown 
          value="name-asc" 
          onChange={() => {}} 
        />
        <SortDropdown 
          value="name-desc" 
          onChange={() => {}} 
        />
      </div>
    </div>
  ),
}

export const ControlledComponent: Story = {
  render: () => {
    const [sortValue, setSortValue] = useState<SortOption>('price-asc')
    
    return (
      <div className="space-y-4 w-80">
        <SortDropdown
          value={sortValue}
          onChange={setSortValue}
        />
        
        <div className="text-sm text-gray-600">
          Current sort: <span className="font-mono">{sortValue}</span>
        </div>
        
        <div className="text-xs text-gray-500">
          Select different options to see the value change
        </div>
      </div>
    )
  },
}

export const InProductGrid: Story = {
  render: () => (
    <div className="bg-white p-6 w-full max-w-4xl">
      <div className="space-y-6">
        {/* Header with search and sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600">Showing 24 products</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <SortDropdown 
              value="price-asc" 
              onChange={(value) => console.log('Sort changed to:', value)} 
            />
          </div>
        </div>
        
        {/* Product grid placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center">
              <span className="text-gray-500">Product {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const InFilterSidebar: Story = {
  render: () => (
    <div className="bg-gray-50 p-6 w-80">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters & Sort</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Sort</h3>
              <SortDropdown 
                value="price-asc" 
                onChange={(value) => console.log('Sort changed to:', value)} 
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Electronics</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Clothing</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Books</span>
                </label>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
              <div className="space-y-2">
                <input 
                  type="range" 
                  className="w-full" 
                  min="0" 
                  max="1000" 
                  defaultValue="500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
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
          <h1 className="text-lg font-bold text-gray-900">Products</h1>
          <button className="text-gray-600">☰</button>
        </div>
        
        <div className="flex flex-col gap-2">
          <SortDropdown 
            value="price-asc" 
            onChange={(value) => console.log('Sort changed to:', value)} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button className="p-2 text-sm bg-gray-100 rounded-md">Categories</button>
          <button className="p-2 text-sm bg-gray-100 rounded-md">Filters</button>
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

export const InteractiveDemo: Story = {
  render: () => {
    const [sortValue, setSortValue] = useState<SortOption>('price-asc')
    const [sortHistory, setSortHistory] = useState<SortOption[]>([])
    
    const handleSortChange = (value: SortOption) => {
      setSortValue(value)
      setSortHistory(prev => [value, ...prev.slice(0, 4)])
      console.log('Sort changed to:', value)
    }
    
    return (
      <div className="space-y-6 w-96">
        <SortDropdown
          value={sortValue}
          onChange={handleSortChange}
        />
        
        {sortHistory.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Sorts</h3>
            <div className="space-y-1">
              {sortHistory.map((sort, index) => (
                <button
                  key={index}
                  onClick={() => setSortValue(sort)}
                  className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-1"
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>• Select different sort options to see them in action</p>
          <p>• Recent sorts are tracked and can be clicked to restore</p>
        </div>
      </div>
    )
  },
}

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="text-sm text-gray-600">
        <p>This dropdown has proper accessibility features:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Label associated with select via htmlFor/id</li>
          <li>Proper name attribute for form submission</li>
          <li>Keyboard navigation support</li>
          <li>Focus states for visual feedback</li>
        </ul>
      </div>
      
      <SortDropdown 
        value="price-asc" 
        onChange={(value) => console.log('Sort changed to:', value)} 
      />
      
      <div className="text-xs text-gray-500">
        <p>Try using Tab to focus and Arrow keys to navigate</p>
      </div>
    </div>
  ),
}
