import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { TagFilter } from './tag-filter'

const meta: Meta<typeof TagFilter> = {
  title: 'Molecules/TagFilter',
  component: TagFilter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onToggleTag: {
      action: 'toggled',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultTags = ['electronics', 'clothing', 'books', 'home', 'sports']

export const NoTagsSelected: Story = {
  args: {
    availableTags: defaultTags,
    selectedTags: [],
    onToggleTag: () => {},
  },
}

export const SomeTagsSelected: Story = {
  args: {
    availableTags: defaultTags,
    selectedTags: ['electronics', 'books'],
    onToggleTag: () => {},
  },
}

export const AllTagsSelected: Story = {
  args: {
    availableTags: defaultTags,
    selectedTags: defaultTags,
    onToggleTag: () => {},
  },
}

export const ManyTags: Story = {
  args: {
    availableTags: [
      'electronics', 'clothing', 'books', 'home', 'sports', 'automotive',
      'beauty', 'toys', 'garden', 'office', 'health', 'food', 'travel',
      'music', 'movies', 'games', 'fitness', 'baby', 'pet', 'jewelry'
    ],
    selectedTags: ['electronics', 'books', 'sports'],
    onToggleTag: () => {},
  },
}

export const SingleTag: Story = {
  args: {
    availableTags: ['electronics'],
    selectedTags: ['electronics'],
    onToggleTag: () => {},
  },
}

export const EmptyTags: Story = {
  args: {
    availableTags: [],
    selectedTags: [],
    onToggleTag: () => {},
  },
}

export const CustomLabel: Story = {
  args: {
    availableTags: defaultTags,
    selectedTags: ['electronics'],
    onToggleTag: () => {},
    label: 'Filter by category',
  },
}

export const ControlledComponent: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['electronics', 'books'])
    
    const handleToggleTag = (tag: string) => {
      setSelectedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      )
    }
    
    return (
      <div className="space-y-4 w-96">
        <TagFilter
          availableTags={defaultTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
        />
        
        <div className="text-sm text-gray-600">
          Selected tags: <span className="font-mono">{selectedTags.join(', ') || 'none'}</span>
        </div>
        
        <div className="text-xs text-gray-500">
          Click tags to toggle selection, or use "Clear all" to remove all selections
        </div>
      </div>
    )
  },
}

export const InProductFilters: Story = {
  render: () => (
    <div className="bg-gray-50 p-6 w-80">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          
          <div className="space-y-4">
            <TagFilter
              availableTags={['electronics', 'clothing', 'books', 'home', 'sports']}
              selectedTags={['electronics', 'books']}
              onToggleTag={(tag) => console.log('Tag toggled:', tag)}
            />
            
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
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Brand</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Apple</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Samsung</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Google</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const MobileScrollable: Story = {
  render: () => (
    <div className="bg-white p-4 w-80">
      <div className="space-y-4">
        <h1 className="text-lg font-bold text-gray-900">Product Filters</h1>
        
        <TagFilter
          availableTags={[
            'electronics', 'clothing', 'books', 'home', 'sports', 'automotive',
            'beauty', 'toys', 'garden', 'office', 'health', 'food', 'travel'
          ]}
          selectedTags={['electronics', 'books', 'sports']}
          onToggleTag={(tag) => console.log('Tag toggled:', tag)}
        />
        
        <div className="text-xs text-gray-500">
          Tags are horizontally scrollable on mobile devices
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
    const [selectedTags, setSelectedTags] = useState<string[]>(['electronics'])
    const [tagHistory, setTagHistory] = useState<string[]>(['electronics'])
    
    const handleToggleTag = (tag: string) => {
      const newSelectedTags = selectedTags.includes(tag) 
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
      
      setSelectedTags(newSelectedTags)
      setTagHistory(prev => [tag, ...prev.slice(0, 9)])
      console.log('Tag toggled:', tag)
    }
    
    return (
      <div className="space-y-6 w-96">
        <TagFilter
          availableTags={defaultTags}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
        />
        
        {tagHistory.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Recent Actions</h3>
            <div className="space-y-1">
              {tagHistory.slice(0, 5).map((tag, index) => (
                <div key={index} className="text-sm text-gray-600">
                  Toggled: <span className="font-mono">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>• Click tags to toggle selection</p>
          <p>• Use "Clear all" to remove all selections</p>
          <p>• Recent actions are tracked</p>
        </div>
      </div>
    )
  },
}

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="text-sm text-gray-600">
        <p>This tag filter has proper accessibility features:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Tags are buttons with role="button"</li>
          <li>Selected tags have aria-pressed="true"</li>
          <li>Each tag has descriptive aria-label</li>
          <li>Clear all button has aria-label</li>
          <li>Keyboard navigation support</li>
        </ul>
      </div>
      
      <TagFilter
        availableTags={defaultTags}
        selectedTags={['electronics', 'books']}
        onToggleTag={(tag) => console.log('Tag toggled:', tag)}
      />
      
      <div className="text-xs text-gray-500">
        <p>Try using Tab to navigate and Enter/Space to activate tags</p>
      </div>
    </div>
  ),
}

export const LongTagNames: Story = {
  args: {
    availableTags: [
      'electronics',
      'clothing and accessories',
      'books and media',
      'home and garden',
      'sports and outdoor',
      'automotive and tools',
      'beauty and personal care',
      'toys and games',
      'office supplies',
      'health and wellness'
    ],
    selectedTags: ['clothing and accessories', 'books and media'],
    onToggleTag: () => {},
  },
}
