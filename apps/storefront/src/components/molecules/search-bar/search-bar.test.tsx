import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SearchBar } from './search-bar'

// Mock the Input atom
vi.mock('@/components/atoms/input', () => ({
  Input: ({ 
    value, 
    onChange, 
    onKeyDown, 
    placeholder, 
    'aria-label': ariaLabel, 
    leftIcon, 
    rightIcon, 
    className,
    type 
  }: any) => (
    <div className={className}>
      <input
        data-testid="search-input"
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      {leftIcon && <div data-testid="left-icon">{leftIcon}</div>}
      {rightIcon && <div data-testid="right-icon">{rightIcon}</div>}
    </div>
  )
}))

describe('SearchBar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with placeholder', () => {
    render(
      <SearchBar 
        value="" 
        onChange={vi.fn()} 
        placeholder="Search for products..." 
      />
    )
    
    expect(screen.getByPlaceholderText('Search for products...')).toBeInTheDocument()
  })

  it('shows value', () => {
    render(
      <SearchBar 
        value="test search" 
        onChange={vi.fn()} 
      />
    )
    
    const input = screen.getByTestId('search-input')
    expect(input).toHaveValue('test search')
  })

  it('calls onChange when typing', async () => {
    const onChange = vi.fn()
    render(
      <SearchBar 
        value="" 
        onChange={onChange} 
      />
    )
    
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'new search' } })
    
    // Fast-forward timers to trigger debounced onChange
    await vi.advanceTimersByTimeAsync(300)
    
    expect(onChange).toHaveBeenCalledWith('new search')
  })

  it('shows clear button when value present', () => {
    render(
      <SearchBar 
        value="test search" 
        onChange={vi.fn()} 
      />
    )
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('does not show clear button when value is empty', () => {
    render(
      <SearchBar 
        value="" 
        onChange={vi.fn()} 
      />
    )
    
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument()
  })

  it('clear button clears input', () => {
    const onChange = vi.fn()
    render(
      <SearchBar 
        value="test search" 
        onChange={onChange} 
      />
    )
    
    const clearButton = screen.getByTestId('right-icon').querySelector('button')
    fireEvent.click(clearButton!)
    
    expect(onChange).toHaveBeenCalledWith('')
  })

  it('enter key triggers onSearch', () => {
    const onSearch = vi.fn()
    render(
      <SearchBar 
        value="test search" 
        onChange={vi.fn()} 
        onSearch={onSearch}
      />
    )
    
    const input = screen.getByTestId('search-input')
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(onSearch).toHaveBeenCalledWith('test search')
  })

  it('debounces onChange calls', async () => {
    const onChange = vi.fn()
    render(
      <SearchBar 
        value="" 
        onChange={onChange} 
      />
    )
    
    const input = screen.getByTestId('search-input')
    
    // Type multiple characters quickly
    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.change(input, { target: { value: 'ab' } })
    fireEvent.change(input, { target: { value: 'abc' } })
    
    // onChange should not be called yet
    expect(onChange).not.toHaveBeenCalled()
    
    // Fast-forward timers
    await vi.advanceTimersByTimeAsync(300)
    
    expect(onChange).toHaveBeenCalledWith('abc')
    // Should only be called once due to debouncing
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('has proper accessibility attributes', () => {
    render(
      <SearchBar 
        value="" 
        onChange={vi.fn()} 
      />
    )
    
    const input = screen.getByTestId('search-input')
    expect(input).toHaveAttribute('type', 'search')
    expect(input).toHaveAttribute('aria-label', 'Search products')
  })

  it('clear button has proper accessibility', () => {
    render(
      <SearchBar 
        value="test search" 
        onChange={vi.fn()} 
      />
    )
    
    const clearButton = screen.getByTestId('right-icon').querySelector('button')
    expect(clearButton).toHaveAttribute('aria-label', 'Clear search')
  })

  it('shows search icon', () => {
    render(
      <SearchBar 
        value="" 
        onChange={vi.fn()} 
      />
    )
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
  })

  it('syncs local value with prop value', () => {
    const { rerender } = render(
      <SearchBar 
        value="initial" 
        onChange={vi.fn()} 
      />
    )
    
    const input = screen.getByTestId('search-input')
    expect(input).toHaveValue('initial')
    
    rerender(
      <SearchBar 
        value="updated" 
        onChange={vi.fn()} 
      />
    )
    
    expect(input).toHaveValue('updated')
  })

  it('handles rapid prop changes correctly', async () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <SearchBar 
        value="initial" 
        onChange={onChange} 
      />
    )
    
    const input = screen.getByTestId('search-input')
    
    // Change prop value
    rerender(
      <SearchBar 
        value="updated" 
        onChange={onChange} 
      />
    )
    
    expect(input).toHaveValue('updated')
    
    // Type in input
    fireEvent.change(input, { target: { value: 'typed value' } })
    
    // Fast-forward timers
    await vi.advanceTimersByTimeAsync(300)
    
    expect(onChange).toHaveBeenCalledWith('typed value')
  })

  it('applies custom className', () => {
    render(
      <SearchBar 
        value="" 
        onChange={vi.fn()} 
        className="custom-class"
      />
    )
    
    const container = screen.getByTestId('search-input').closest('div')?.parentElement
    expect(container).toHaveClass('custom-class')
  })

  it('has full width by default', () => {
    render(
      <SearchBar 
        value="" 
        onChange={vi.fn()} 
      />
    )
    
    const container = screen.getByTestId('search-input').closest('div')?.parentElement
    expect(container).toHaveClass('w-full')
  })

  it('handles empty onSearch gracefully', () => {
    render(
      <SearchBar 
        value="test search" 
        onChange={vi.fn()} 
      />
    )
    
    const input = screen.getByTestId('search-input')
    
    // Should not throw error when pressing Enter without onSearch
    expect(() => {
      fireEvent.keyDown(input, { key: 'Enter' })
    }).not.toThrow()
  })
})
