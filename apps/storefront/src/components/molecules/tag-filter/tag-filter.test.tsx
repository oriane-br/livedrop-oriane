import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TagFilter } from './tag-filter'

// Mock the Badge atom
vi.mock('@/components/atoms/badge', () => ({
  Badge: ({ children, variant, size, className, onClick, role, 'aria-pressed': ariaPressed, 'aria-label': ariaLabel }: any) => (
    <button
      data-testid="badge"
      data-variant={variant}
      data-size={size}
      className={className}
      onClick={onClick}
      role={role}
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}))

describe('TagFilter', () => {
  const mockAvailableTags = ['electronics', 'clothing', 'books', 'home']
  const mockSelectedTags = ['electronics', 'books']

  it('renders all available tags', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={[]}
        onToggleTag={vi.fn()}
      />
    )
    
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText('clothing')).toBeInTheDocument()
    expect(screen.getByText('books')).toBeInTheDocument()
    expect(screen.getByText('home')).toBeInTheDocument()
  })

  it('shows selected state correctly', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={mockSelectedTags}
        onToggleTag={vi.fn()}
      />
    )
    
    const badges = screen.getAllByTestId('badge')
    
    // Check selected tags have success variant
    const electronicsBadge = badges.find(badge => badge.textContent === 'electronics')
    const booksBadge = badges.find(badge => badge.textContent === 'books')
    
    expect(electronicsBadge).toHaveAttribute('data-variant', 'success')
    expect(booksBadge).toHaveAttribute('data-variant', 'success')
    expect(electronicsBadge).toHaveAttribute('aria-pressed', 'true')
    expect(booksBadge).toHaveAttribute('aria-pressed', 'true')
    
    // Check unselected tags have default variant
    const clothingBadge = badges.find(badge => badge.textContent === 'clothing')
    const homeBadge = badges.find(badge => badge.textContent === 'home')
    
    expect(clothingBadge).toHaveAttribute('data-variant', 'default')
    expect(homeBadge).toHaveAttribute('data-variant', 'default')
    expect(clothingBadge).toHaveAttribute('aria-pressed', 'false')
    expect(homeBadge).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onToggleTag when tag clicked', () => {
    const onToggleTag = vi.fn()
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={[]}
        onToggleTag={onToggleTag}
      />
    )
    
    const electronicsBadge = screen.getByText('electronics')
    fireEvent.click(electronicsBadge)
    
    expect(onToggleTag).toHaveBeenCalledWith('electronics')
  })

  it('clear all removes all selections', () => {
    const onToggleTag = vi.fn()
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={mockSelectedTags}
        onToggleTag={onToggleTag}
      />
    )
    
    const clearAllButton = screen.getByText('Clear all')
    fireEvent.click(clearAllButton)
    
    expect(onToggleTag).toHaveBeenCalledWith('electronics')
    expect(onToggleTag).toHaveBeenCalledWith('books')
    expect(onToggleTag).toHaveBeenCalledTimes(2)
  })

  it('shows selection count in label', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={mockSelectedTags}
        onToggleTag={vi.fn()}
      />
    )
    
    expect(screen.getByText('Filter by tags (2 selected)')).toBeInTheDocument()
  })

  it('does not show count when no tags selected', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={[]}
        onToggleTag={vi.fn()}
      />
    )
    
    expect(screen.getByText('Filter by tags')).toBeInTheDocument()
    expect(screen.queryByText(/selected/)).not.toBeInTheDocument()
  })

  it('does not show clear all button when no tags selected', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={[]}
        onToggleTag={vi.fn()}
      />
    )
    
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
  })

  it('shows clear all button when tags are selected', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={mockSelectedTags}
        onToggleTag={vi.fn()}
      />
    )
    
    expect(screen.getByText('Clear all')).toBeInTheDocument()
  })

  it('uses custom label', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={mockSelectedTags}
        onToggleTag={vi.fn()}
        label="Custom filter"
      />
    )
    
    expect(screen.getByText('Custom filter (2 selected)')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={mockSelectedTags}
        onToggleTag={vi.fn()}
      />
    )
    
    const badges = screen.getAllByTestId('badge')
    const electronicsBadge = badges.find(badge => badge.textContent === 'electronics')
    
    expect(electronicsBadge).toHaveAttribute('role', 'button')
    expect(electronicsBadge).toHaveAttribute('aria-pressed', 'true')
    expect(electronicsBadge).toHaveAttribute('aria-label', 'Filter by electronics')
  })

  it('clear all button has proper accessibility', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={mockSelectedTags}
        onToggleTag={vi.fn()}
      />
    )
    
    const clearAllButton = screen.getByText('Clear all')
    expect(clearAllButton).toHaveAttribute('aria-label', 'Clear all selected tags')
  })

  it('applies correct styling classes', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={[]}
        onToggleTag={vi.fn()}
      />
    )
    
    const container = screen.getByText('Filter by tags').closest('div')?.parentElement
    expect(container).toHaveClass('space-y-3')
    
    const tagsContainer = screen.getByText('electronics').closest('div')
    expect(tagsContainer).toHaveClass('flex', 'flex-wrap', 'gap-2', 'overflow-x-auto', 'sm:overflow-x-visible')
  })

  it('handles empty available tags', () => {
    render(
      <TagFilter 
        availableTags={[]}
        selectedTags={[]}
        onToggleTag={vi.fn()}
      />
    )
    
    expect(screen.getByText('Filter by tags')).toBeInTheDocument()
    expect(screen.queryByTestId('badge')).not.toBeInTheDocument()
  })

  it('handles single tag selection', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={['electronics']}
        onToggleTag={vi.fn()}
      />
    )
    
    expect(screen.getByText('Filter by tags (1 selected)')).toBeInTheDocument()
    expect(screen.getByText('Clear all')).toBeInTheDocument()
  })

  it('handles all tags selected', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={mockAvailableTags}
        onToggleTag={vi.fn()}
      />
    )
    
    expect(screen.getByText('Filter by tags (4 selected)')).toBeInTheDocument()
    
    const badges = screen.getAllByTestId('badge')
    badges.forEach(badge => {
      expect(badge).toHaveAttribute('data-variant', 'success')
      expect(badge).toHaveAttribute('aria-pressed', 'true')
    })
  })

  it('handles tag toggle correctly', () => {
    const onToggleTag = vi.fn()
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={['electronics']}
        onToggleTag={onToggleTag}
      />
    )
    
    // Click selected tag to deselect
    const electronicsBadge = screen.getByText('electronics')
    fireEvent.click(electronicsBadge)
    expect(onToggleTag).toHaveBeenCalledWith('electronics')
    
    // Click unselected tag to select
    const clothingBadge = screen.getByText('clothing')
    fireEvent.click(clothingBadge)
    expect(onToggleTag).toHaveBeenCalledWith('clothing')
  })

  it('has proper badge styling', () => {
    render(
      <TagFilter 
        availableTags={mockAvailableTags}
        selectedTags={[]}
        onToggleTag={vi.fn()}
      />
    )
    
    const badges = screen.getAllByTestId('badge')
    badges.forEach(badge => {
      expect(badge).toHaveClass('cursor-pointer', 'hover:opacity-80', 'transition-opacity', 'duration-200')
    })
  })
})
