import React from 'react'
import { Badge } from '@/components/atoms/badge'

export interface TagFilterProps {
  availableTags: string[]
  selectedTags: string[]
  onToggleTag: (tag: string) => void
  label?: string
}

export const TagFilter: React.FC<TagFilterProps> = ({
  availableTags,
  selectedTags,
  onToggleTag,
  label = 'Filter by tags',
}) => {
  const selectedCount = selectedTags.length
  const hasSelectedTags = selectedCount > 0

  const handleClearAll = () => {
    selectedTags.forEach(tag => {
      onToggleTag(tag)
    })
  }

  const handleTagClick = (tag: string) => {
    onToggleTag(tag)
  }

  return (
    <div className="space-y-3">
      {/* Label with count */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {label} {hasSelectedTags && `(${selectedCount} selected)`}
        </span>
        
        {hasSelectedTags && (
          <button
            onClick={handleClearAll}
            aria-label="Clear all selected tags"
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Tags container */}
      <div className="flex flex-wrap gap-2 overflow-x-auto sm:overflow-x-visible">
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          
          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
              role="button"
              aria-pressed={isSelected}
              aria-label={`Filter by ${tag}`}
            >
              <Badge
                variant={isSelected ? 'success' : 'default'}
                size="sm"
              >
                {tag}
              </Badge>
            </button>
          )
        })}
      </div>
    </div>
  )
}
