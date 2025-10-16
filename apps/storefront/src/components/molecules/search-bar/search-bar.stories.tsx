import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SearchBar } from './search-bar'

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: {
      action: 'changed',
    },
    onSearch: {
      action: 'searched',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
}

export const WithValue: Story = {
  args: {
    value: 'wireless headphones',
    onChange: () => {},
  },
}

export const WithPlaceholder: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: 'Search for electronics, clothing, books...',
  },
}

export const WithSearchHandler: Story = {
  args: {
    value: 'gaming keyboard',
    onChange: () => {},
    onSearch: (value) => {
      console.log('Searching for:', value)
      alert(`Searching for: ${value}`)
    },
  },
}

export const ControlledComponent: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('')
    
    return (
      <div className="space-y-4 w-96">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={(value) => {
            console.log('Searching for:', value)
            alert(`Searching for: ${value}`)
          }}
          placeholder="Search products..."
        />
        
        <div className="text-sm text-gray-600">
          Current value: <span className="font-mono">{searchValue || '(empty)'}</span>
        </div>
        
        <div className="text-xs text-gray-500">
          Type to see debounced onChange, press Enter to trigger onSearch
        </div>
      </div>
    )
  },
}

export const InHeader: Story = {
  render: () => (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">Storefront</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Categories</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Deals</a>
            </nav>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <SearchBar
              value=""
              onChange={() => {}}
              onSearch={(value) => alert(`Searching for: ${value}`)}
              placeholder="Search products..."
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">Cart (0)</button>
            <button className="text-gray-600 hover:text-gray-900">Account</button>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const InSidebar: Story = {
  render: () => (
    <div className="bg-gray-50 p-6 w-80">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search & Filters</h2>
          
          <SearchBar
            value=""
            onChange={() => {}}
            onSearch={(value) => alert(`Searching for: ${value}`)}
            placeholder="Search products..."
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
  ),
}

export const MobileLayout: Story = {
  render: () => (
    <div className="bg-white p-4 w-80">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Storefront</h1>
          <button className="text-gray-600">☰</button>
        </div>
        
        <SearchBar
          value=""
          onChange={() => {}}
          onSearch={(value) => alert(`Searching for: ${value}`)}
          placeholder="Search products..."
        />
        
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

export const WithLongPlaceholder: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: 'Search for electronics, clothing, books, home & garden, sports, and more...',
  },
}

export const WithLongValue: Story = {
  args: {
    value: 'ultra-premium professional wireless noise-cancelling bluetooth headphones with advanced audio technology',
    onChange: () => {},
  },
}

export const InteractiveDemo: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('')
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    
    const handleSearch = (value: string) => {
      if (value.trim()) {
        setSearchHistory(prev => [value, ...prev.slice(0, 4)])
        alert(`Searching for: ${value}`)
      }
    }
    
    return (
      <div className="space-y-6 w-96">
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="Search products..."
        />
        
        {searchHistory.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Searches</h3>
            <div className="space-y-1">
              {searchHistory.map((term, index) => (
                <button
                  key={index}
                  onClick={() => setSearchValue(term)}
                  className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 py-1"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>• Type to see debounced onChange (300ms delay)</p>
          <p>• Press Enter to trigger onSearch</p>
          <p>• Click X to clear the input</p>
        </div>
      </div>
    )
  },
}
