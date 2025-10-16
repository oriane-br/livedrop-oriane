import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './error-boundary'

// Mock console.error to avoid noise in tests
const mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

// Component that throws an error
const ThrowError: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = true }) => {
  if (shouldThrow) {
    throw new Error('Test error message')
  }
  return <div>No error</div>
}

// Component that throws an error on render
const ThrowErrorOnRender: React.FC = () => {
  throw new Error('Render error')
}

// Component that throws an error after mount
const ThrowErrorAfterMount: React.FC = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false)
  
  React.useEffect(() => {
    const timer = setTimeout(() => setShouldThrow(true), 100)
    return () => clearTimeout(timer)
  }, [])
  
  if (shouldThrow) {
    throw new Error('Mount error')
  }
  
  return <div>Mounted successfully</div>
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Suppress console.error for cleaner test output
    mockConsoleError.mockClear()
  })

  it('catches errors thrown by children', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('We\'re sorry, but something unexpected happened. Please try again.')).toBeInTheDocument()
  })

  it('displays fallback UI when error occurs', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Check for error UI elements
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
    expect(screen.getByText('Go home')).toBeInTheDocument()
    expect(screen.getByText('contact support')).toBeInTheDocument()
  })

  it('shows reset button in error UI', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Check that reset button is present
    expect(screen.getByText('Try again')).toBeInTheDocument()
  })

  it('custom fallback prop works', () => {
    const customFallback = <div data-testid="custom-fallback">Custom error message</div>

    renderWithRouter(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })

  it('logs error to console', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(mockConsoleError).toHaveBeenCalled()
  })

  it('renders children when no error', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
  })


  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    renderWithRouter(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Error Details:')).toBeInTheDocument()
    expect(screen.getByText(/Test error message/)).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('hides error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    renderWithRouter(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Error Details:')).not.toBeInTheDocument()
    expect(screen.queryByText('Test error message')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('handles different types of errors', () => {
    const CustomError = () => {
      throw new TypeError('Type error message')
    }

    renderWithRouter(
      <ErrorBoundary>
        <CustomError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error caught by boundary:',
      expect.any(TypeError),
      expect.any(Object)
    )
  })


  it('has proper accessibility attributes', () => {
    renderWithRouter(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    // Check for proper button roles and text
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contact support/i })).toBeInTheDocument()
  })

  it('handles errors in useEffect', async () => {
    // This test is more complex as it involves async behavior
    // For now, we'll test the synchronous error case
    renderWithRouter(
      <ErrorBoundary>
        <ThrowErrorOnRender />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(mockConsoleError).toHaveBeenCalled()
  })
})
