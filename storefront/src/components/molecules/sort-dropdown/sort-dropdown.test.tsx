import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SortDropdown, SortOption } from './sort-dropdown'

describe('SortDropdown', () => {
  it('renders all options', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
      />
    )
    
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    
    // Check all options are present
    expect(screen.getByText('Price: Low to High')).toBeInTheDocument()
    expect(screen.getByText('Price: High to Low')).toBeInTheDocument()
    expect(screen.getByText('Name: A to Z')).toBeInTheDocument()
    expect(screen.getByText('Name: Z to A')).toBeInTheDocument()
  })

  it('shows current value selected', () => {
    render(
      <SortDropdown 
        value="price-desc" 
        onChange={vi.fn()} 
      />
    )
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('price-desc')
  })

  it('calls onChange when option selected', () => {
    const onChange = vi.fn()
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={onChange} 
      />
    )
    
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'name-asc' } })
    
    expect(onChange).toHaveBeenCalledWith('name-asc')
  })

  it('displays label', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
        label="Sort by:"
      />
    )
    
    expect(screen.getByText('Sort by:')).toBeInTheDocument()
  })

  it('uses default label when not provided', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
      />
    )
    
    expect(screen.getByText('Sort by:')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
      />
    )
    
    const select = screen.getByRole('combobox')
    const label = screen.getByText('Sort by:')
    
    expect(select).toHaveAttribute('id', 'sort-dropdown')
    expect(select).toHaveAttribute('name', 'sort')
    expect(label).toHaveAttribute('for', 'sort-dropdown')
  })

  it('handles all sort options', () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <SortDropdown 
        value="price-asc" 
        onChange={onChange} 
      />
    )
    
    const select = screen.getByRole('combobox')
    
    // Test price-asc
    expect(select).toHaveValue('price-asc')
    
    // Test price-desc
    rerender(
      <SortDropdown 
        value="price-desc" 
        onChange={onChange} 
      />
    )
    expect(select).toHaveValue('price-desc')
    
    // Test name-asc
    rerender(
      <SortDropdown 
        value="name-asc" 
        onChange={onChange} 
      />
    )
    expect(select).toHaveValue('name-asc')
    
    // Test name-desc
    rerender(
      <SortDropdown 
        value="name-desc" 
        onChange={onChange} 
      />
    )
    expect(select).toHaveValue('name-desc')
  })

  it('applies correct styling classes', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
      />
    )
    
    const select = screen.getByRole('combobox')
    expect(select).toHaveClass(
      'px-3',
      'py-2',
      'text-sm',
      'border',
      'border-gray-300',
      'rounded-md',
      'shadow-sm',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-500',
      'focus:border-blue-500',
      'bg-white',
      'appearance-none',
      'cursor-pointer',
      'min-w-[180px]'
    )
  })

  it('has proper layout structure', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
      />
    )
    
    const container = screen.getByText('Sort by:').closest('div')
    expect(container).toHaveClass('flex', 'items-center', 'gap-2')
  })

  it('handles onChange with all option values', () => {
    const onChange = vi.fn()
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={onChange} 
      />
    )
    
    const select = screen.getByRole('combobox')
    
    // Test each option
    const options: SortOption[] = ['price-asc', 'price-desc', 'name-asc', 'name-desc']
    
    options.forEach(option => {
      fireEvent.change(select, { target: { value: option } })
      expect(onChange).toHaveBeenCalledWith(option)
    })
    
    expect(onChange).toHaveBeenCalledTimes(4)
  })

  it('maintains focus state', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
      />
    )
    
    const select = screen.getByRole('combobox')
    select.focus()
    
    expect(select).toHaveFocus()
  })

  it('handles keyboard navigation', () => {
    const onChange = vi.fn()
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={onChange} 
      />
    )
    
    const select = screen.getByRole('combobox')
    
    // Focus the select first
    select.focus()
    expect(select).toHaveFocus()
    
    // Test arrow key navigation
    fireEvent.keyDown(select, { key: 'ArrowDown' })
    fireEvent.keyDown(select, { key: 'ArrowUp' })
    fireEvent.keyDown(select, { key: 'Enter' })
    
    // The select should still be focused
    expect(select).toHaveFocus()
  })

  it('renders with custom label', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
        label="Order by:"
      />
    )
    
    expect(screen.getByText('Order by:')).toBeInTheDocument()
    expect(screen.queryByText('Sort by:')).not.toBeInTheDocument()
  })

  it('has proper option values', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
      />
    )
    
    const select = screen.getByRole('combobox')
    const options = Array.from(select.querySelectorAll('option'))
    
    expect(options).toHaveLength(4)
    expect(options[0]).toHaveValue('price-asc')
    expect(options[1]).toHaveValue('price-desc')
    expect(options[2]).toHaveValue('name-asc')
    expect(options[3]).toHaveValue('name-desc')
  })

  it('has proper option text content', () => {
    render(
      <SortDropdown 
        value="price-asc" 
        onChange={vi.fn()} 
      />
    )
    
    const select = screen.getByRole('combobox')
    const options = Array.from(select.querySelectorAll('option'))
    
    expect(options[0]).toHaveTextContent('Price: Low to High')
    expect(options[1]).toHaveTextContent('Price: High to Low')
    expect(options[2]).toHaveTextContent('Name: A to Z')
    expect(options[3]).toHaveTextContent('Name: Z to A')
  })
})
