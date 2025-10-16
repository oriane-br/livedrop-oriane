import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './input'

describe('Input', () => {
  it('renders label correctly', () => {
    render(<Input label="Test Label" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
  })

  it('shows error state and message', () => {
    render(<Input error="This field is required" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('shows helper text', () => {
    render(<Input helperText="Enter your email address" />)
    expect(screen.getByText('Enter your email address')).toBeInTheDocument()
  })

  it('renders icons', () => {
    const LeftIcon = () => <span data-testid="left-icon">@</span>
    const RightIcon = () => <span data-testid="right-icon">✓</span>
    
    render(
      <Input 
        leftIcon={<LeftIcon />} 
        rightIcon={<RightIcon />} 
      />
    )
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument()
    expect(screen.getByTestId('right-icon')).toBeInTheDocument()
  })

  it('required indicator appears', () => {
    render(<Input label="Required Field" isRequired />)
    
    expect(screen.getByText('Required Field')).toBeInTheDocument()
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Input ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('onChange handler works', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" />)
    expect(screen.getByRole('textbox')).toHaveClass('custom-class')
  })

  it('forwards other input props', () => {
    render(<Input type="email" placeholder="Enter email" data-testid="email-input" />)
    
    const input = screen.getByTestId('email-input')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'Enter email')
  })

  it('disabled state styling', () => {
    render(<Input disabled />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:bg-gray-50', 'disabled:text-gray-500', 'disabled:cursor-not-allowed')
  })

  it('generates unique ID when not provided', () => {
    render(<Input label="Test" />)
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Test')
    
    expect(input).toHaveAttribute('id')
    expect(label).toHaveAttribute('for', input.getAttribute('id'))
  })

  it('uses provided ID', () => {
    render(<Input id="custom-id" label="Test" />)
    
    const input = screen.getByRole('textbox')
    const label = screen.getByText('Test')
    
    expect(input).toHaveAttribute('id', 'custom-id')
    expect(label).toHaveAttribute('for', 'custom-id')
  })

  it('shows helper text when no error', () => {
    render(<Input helperText="Helper text" error="Error message" />)
    
    expect(screen.getByText('Error message')).toBeInTheDocument()
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
  })

  it('shows helper text when no error present', () => {
    render(<Input helperText="Helper text" />)
    
    expect(screen.getByText('Helper text')).toBeInTheDocument()
    expect(screen.queryByText('Error message')).not.toBeInTheDocument()
  })

  it('has proper aria attributes', () => {
    render(
      <Input 
        label="Test" 
        error="Error" 
        helperText="Helper" 
        isRequired 
      />
    )
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-required', 'true')
    expect(input).toHaveAttribute('aria-describedby')
  })

  it('focus states work correctly', () => {
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500')
  })

  it('error state has correct focus classes', () => {
    render(<Input error="Error message" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-300', 'focus:border-red-500', 'focus:ring-red-500')
  })
})
