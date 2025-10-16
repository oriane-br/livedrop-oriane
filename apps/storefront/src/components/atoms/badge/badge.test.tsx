import React from 'react'
import { render, screen } from '@testing-library/react'
import { Badge } from './badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800')
  })

  it('applies success variant styles', () => {
    render(<Badge variant="success">Success</Badge>)
    const badge = screen.getByText('Success')
    expect(badge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('applies warning variant styles', () => {
    render(<Badge variant="warning">Warning</Badge>)
    const badge = screen.getByText('Warning')
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800')
  })

  it('applies danger variant styles', () => {
    render(<Badge variant="danger">Danger</Badge>)
    const badge = screen.getByText('Danger')
    expect(badge).toHaveClass('bg-red-100', 'text-red-800')
  })

  it('applies info variant styles', () => {
    render(<Badge variant="info">Info</Badge>)
    const badge = screen.getByText('Info')
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
  })

  it('applies small size styles', () => {
    render(<Badge size="sm">Small</Badge>)
    const badge = screen.getByText('Small')
    expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs')
  })

  it('applies medium size styles by default', () => {
    render(<Badge>Medium</Badge>)
    const badge = screen.getByText('Medium')
    expect(badge).toHaveClass('px-2.5', 'py-1', 'text-sm')
  })

  it('applies large size styles', () => {
    render(<Badge size="lg">Large</Badge>)
    const badge = screen.getByText('Large')
    expect(badge).toHaveClass('px-3', 'py-1.5', 'text-base')
  })

  it('renders icon when provided', () => {
    const icon = <span data-testid="icon">★</span>
    render(<Badge icon={icon}>With Icon</Badge>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('With Icon')).toBeInTheDocument()
  })

  it('applies rounded-md class by default', () => {
    render(<Badge>Default Rounded</Badge>)
    const badge = screen.getByText('Default Rounded')
    expect(badge).toHaveClass('rounded-md')
    expect(badge).not.toHaveClass('rounded-full')
  })

  it('applies rounded-full class when rounded prop is true', () => {
    render(<Badge rounded>Fully Rounded</Badge>)
    const badge = screen.getByText('Fully Rounded')
    expect(badge).toHaveClass('rounded-full')
    expect(badge).not.toHaveClass('rounded-md')
  })

  it('applies base styles', () => {
    render(<Badge>Base Styles</Badge>)
    const badge = screen.getByText('Base Styles')
    expect(badge).toHaveClass('inline-flex', 'items-center', 'font-medium')
  })

  it('combines all props correctly', () => {
    const icon = <span data-testid="icon">✓</span>
    render(
      <Badge variant="success" size="lg" rounded icon={icon}>
        Complete Badge
      </Badge>
    )
    const badge = screen.getByText('Complete Badge')
    expect(badge).toHaveClass(
      'bg-green-100',
      'text-green-800',
      'px-3',
      'py-1.5',
      'text-base',
      'rounded-full',
      'inline-flex',
      'items-center',
      'font-medium'
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
