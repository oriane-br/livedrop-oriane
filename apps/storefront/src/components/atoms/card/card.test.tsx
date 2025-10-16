import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Card } from './card'

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <div>Card Content</div>
      </Card>
    )
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('applies base styles', () => {
    render(
      <Card>
        <div>Test</div>
      </Card>
    )
    const card = screen.getByText('Test').parentElement
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'border', 'shadow-sm')
  })

  it('applies no padding when padding is none', () => {
    render(
      <Card padding="none">
        <div>No Padding</div>
      </Card>
    )
    const card = screen.getByText('No Padding').parentElement
    expect(card).not.toHaveClass('p-3', 'p-4', 'p-6')
  })

  it('applies small padding when padding is sm', () => {
    render(
      <Card padding="sm">
        <div>Small Padding</div>
      </Card>
    )
    const card = screen.getByText('Small Padding').parentElement
    expect(card).toHaveClass('p-3')
  })

  it('applies medium padding by default', () => {
    render(
      <Card>
        <div>Medium Padding</div>
      </Card>
    )
    const card = screen.getByText('Medium Padding').parentElement
    expect(card).toHaveClass('p-4')
  })

  it('applies large padding when padding is lg', () => {
    render(
      <Card padding="lg">
        <div>Large Padding</div>
      </Card>
    )
    const card = screen.getByText('Large Padding').parentElement
    expect(card).toHaveClass('p-6')
  })

  it('applies hover effect when hoverable is true', () => {
    render(
      <Card hoverable>
        <div>Hoverable Card</div>
      </Card>
    )
    const card = screen.getByText('Hoverable Card').parentElement
    expect(card).toHaveClass('hover:shadow-md', 'transition-shadow', 'duration-200')
  })

  it('does not apply hover effect by default', () => {
    render(
      <Card>
        <div>Non-hoverable Card</div>
      </Card>
    )
    const card = screen.getByText('Non-hoverable Card').parentElement
    expect(card).not.toHaveClass('hover:shadow-md', 'transition-shadow', 'duration-200')
  })

  it('applies cursor-pointer when onClick is provided', () => {
    const handleClick = vi.fn()
    render(
      <Card onClick={handleClick}>
        <div>Clickable Card</div>
      </Card>
    )
    const card = screen.getByText('Clickable Card').parentElement
    expect(card).toHaveClass('cursor-pointer')
  })

  it('does not apply cursor-pointer when onClick is not provided', () => {
    render(
      <Card>
        <div>Non-clickable Card</div>
      </Card>
    )
    const card = screen.getByText('Non-clickable Card').parentElement
    expect(card).not.toHaveClass('cursor-pointer')
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(
      <Card onClick={handleClick}>
        <div>Clickable Card</div>
      </Card>
    )
    const card = screen.getByText('Clickable Card').parentElement
    fireEvent.click(card!)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when not provided', () => {
    render(
      <Card>
        <div>Non-clickable Card</div>
      </Card>
    )
    const card = screen.getByText('Non-clickable Card').parentElement
    fireEvent.click(card!)
    // Should not throw an error
    expect(card).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Card className="custom-class">
        <div>Custom Styled Card</div>
      </Card>
    )
    const card = screen.getByText('Custom Styled Card').parentElement
    expect(card).toHaveClass('custom-class')
  })

  it('combines all props correctly', () => {
    const handleClick = vi.fn()
    render(
      <Card 
        padding="lg" 
        hoverable 
        className="custom-class" 
        onClick={handleClick}
      >
        <div>Complete Card</div>
      </Card>
    )
    const card = screen.getByText('Complete Card').parentElement
    expect(card).toHaveClass(
      'bg-white',
      'rounded-lg',
      'border',
      'shadow-sm',
      'p-6',
      'hover:shadow-md',
      'transition-shadow',
      'duration-200',
      'cursor-pointer',
      'custom-class'
    )
    
    fireEvent.click(card!)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders complex children structure', () => {
    render(
      <Card>
        <div className="header">Header</div>
        <div className="body">Body Content</div>
        <div className="footer">Footer</div>
      </Card>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
