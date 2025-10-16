import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Loading } from './loading'

describe('Loading', () => {
  it('renders spinner', () => {
    render(<Loading />)
    
    const statusElement = screen.getByRole('status')
    expect(statusElement).toBeInTheDocument()
    
    const spinner = statusElement.querySelector('.animate-spin')
    expect(spinner).toHaveClass('animate-spin', 'rounded-full', 'h-8', 'w-8', 'border-b-2', 'border-blue-600')
  })

  it('shows loading text when provided', () => {
    render(<Loading text="Please wait..." />)
    
    expect(screen.getByText('Please wait...')).toBeInTheDocument()
    expect(screen.getByText('Please wait...')).toHaveClass('text-sm', 'text-gray-600', 'font-medium')
  })

  it('shows default text when no text provided', () => {
    render(<Loading />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('hides text when text is empty string', () => {
    render(<Loading text="" />)
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    // Don't check for empty string as it's not rendered
  })

  it('applies fullScreen styles when prop true', () => {
    render(<Loading fullScreen={true} />)
    
    const container = screen.getByRole('status').closest('.fixed')
    expect(container).toHaveClass('fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center', 'bg-white', 'bg-opacity-90', 'backdrop-blur-sm')
  })

  it('applies inline styles when fullScreen is false', () => {
    render(<Loading fullScreen={false} />)
    
    const statusElement = screen.getByRole('status')
    const container = statusElement.parentElement
    expect(container).toHaveClass('flex', 'items-center', 'justify-center', 'py-8')
    expect(container).not.toHaveClass('fixed', 'inset-0', 'z-50')
  })

  it('has proper ARIA attributes', () => {
    render(<Loading text="Loading data..." />)
    
    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveAttribute('aria-live', 'polite')
    expect(statusElement).toHaveAttribute('aria-label', 'Loading data...')
  })

  it('has proper ARIA attributes with default text', () => {
    render(<Loading />)
    
    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveAttribute('aria-live', 'polite')
    expect(statusElement).toHaveAttribute('aria-label', 'Loading...')
  })

  it('renders with custom text and fullScreen', () => {
    render(<Loading text="Processing..." fullScreen={true} />)
    
    expect(screen.getByText('Processing...')).toBeInTheDocument()
    
    const container = screen.getByRole('status').closest('.fixed')
    expect(container).toHaveClass('fixed', 'inset-0', 'z-50')
  })

  it('has correct structure for inline loading', () => {
    render(<Loading text="Loading..." />)
    
    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'space-y-3')
    
    const spinner = statusElement.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
    
    const text = statusElement.querySelector('p')
    expect(text).toHaveTextContent('Loading...')
  })

  it('has correct structure for fullScreen loading', () => {
    render(<Loading text="Loading..." fullScreen={true} />)
    
    const overlay = screen.getByRole('status').closest('.fixed')
    expect(overlay).toBeInTheDocument()
    
    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'space-y-3')
  })

  it('spinner has correct classes', () => {
    render(<Loading />)
    
    const spinner = screen.getByRole('status').querySelector('.animate-spin')
    expect(spinner).toHaveClass(
      'animate-spin',
      'rounded-full',
      'h-8',
      'w-8',
      'border-b-2',
      'border-blue-600'
    )
  })

  it('text element has correct classes', () => {
    render(<Loading text="Custom loading text" />)
    
    const textElement = screen.getByText('Custom loading text')
    expect(textElement).toHaveClass('text-sm', 'text-gray-600', 'font-medium')
  })
})
