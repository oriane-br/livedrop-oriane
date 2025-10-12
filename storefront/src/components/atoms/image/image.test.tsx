import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Image } from './image'

// Mock image loading
const mockImage = () => {
  const img = new Image()
  Object.defineProperty(img, 'complete', {
    get: () => true,
  })
  return img
}

// Mock global Image
Object.defineProperty(global, 'Image', {
  value: mockImage,
})

describe('Image', () => {
  it('renders image with correct src and alt', () => {
    render(<Image src="test.jpg" alt="Test image" />)
    
    const img = screen.getByAltText('Test image')
    expect(img).toHaveAttribute('src', 'test.jpg')
    expect(img).toHaveAttribute('alt', 'Test image')
  })

  it('shows loading state initially', () => {
    render(<Image src="test.jpg" alt="Test image" />)
    
    // Should show loading skeleton
    expect(screen.getByRole('img')).toHaveClass('opacity-0')
  })

  it('shows error state on load failure', async () => {
    const onLoadError = vi.fn()
    render(<Image src="invalid.jpg" alt="Test image" onLoadError={onLoadError} />)
    
    const img = screen.getByAltText('Test image')
    
    // Simulate error
    fireEvent.error(img)
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load image')).toBeInTheDocument()
      expect(onLoadError).toHaveBeenCalled()
    })
  })

  it('uses fallback image when provided', async () => {
    const onLoadError = vi.fn()
    render(
      <Image 
        src="invalid.jpg" 
        alt="Test image" 
        fallbackSrc="fallback.jpg"
        onLoadError={onLoadError}
      />
    )
    
    const img = screen.getByAltText('Test image')
    
    // Simulate error
    fireEvent.error(img)
    
    await waitFor(() => {
      expect(img).toHaveAttribute('src', 'fallback.jpg')
      expect(onLoadError).not.toHaveBeenCalled()
    })
  })

  it('applies lazy loading attribute', () => {
    render(<Image src="test.jpg" alt="Test image" />)
    
    const img = screen.getByAltText('Test image')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('applies eager loading when lazy is false', () => {
    render(<Image src="test.jpg" alt="Test image" lazy={false} />)
    
    const img = screen.getByAltText('Test image')
    expect(img).toHaveAttribute('loading', 'eager')
  })

  it('applies correct aspect ratio classes', () => {
    const { rerender } = render(<Image src="test.jpg" alt="Test" aspectRatio="1/1" />)
    expect(screen.getByAltText('Test').closest('div')).toHaveClass('aspect-square')

    rerender(<Image src="test.jpg" alt="Test" aspectRatio="4/3" />)
    expect(screen.getByAltText('Test').closest('div')).toHaveClass('aspect-[4/3]')

    rerender(<Image src="test.jpg" alt="Test" aspectRatio="16/9" />)
    expect(screen.getByAltText('Test').closest('div')).toHaveClass('aspect-video')

    rerender(<Image src="test.jpg" alt="Test" aspectRatio="auto" />)
    expect(screen.getByAltText('Test').closest('div')).not.toHaveClass('aspect-square', 'aspect-[4/3]', 'aspect-video')
  })

  it('applies correct object-fit classes', () => {
    const { rerender } = render(<Image src="test.jpg" alt="Test" objectFit="cover" />)
    expect(screen.getByAltText('Test')).toHaveClass('object-cover')

    rerender(<Image src="test.jpg" alt="Test" objectFit="contain" />)
    expect(screen.getByAltText('Test')).toHaveClass('object-contain')

    rerender(<Image src="test.jpg" alt="Test" objectFit="fill" />)
    expect(screen.getByAltText('Test')).toHaveClass('object-fill')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Image src="test.jpg" alt="Test" ref={ref} />)
    expect(ref).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Image src="test.jpg" alt="Test" className="custom-class" />)
    expect(screen.getByAltText('Test').closest('div')).toHaveClass('custom-class')
  })

  it('forwards other img props', () => {
    render(<Image src="test.jpg" alt="Test" data-testid="custom-img" />)
    expect(screen.getByTestId('custom-img')).toBeInTheDocument()
  })

  it('handles successful load', async () => {
    const onLoad = vi.fn()
    render(<Image src="test.jpg" alt="Test" onLoad={onLoad} />)
    
    const img = screen.getByAltText('Test')
    fireEvent.load(img)
    
    await waitFor(() => {
      expect(img).toHaveClass('opacity-100')
      expect(onLoad).toHaveBeenCalled()
    })
  })

  it('shows loading skeleton during load', () => {
    render(<Image src="test.jpg" alt="Test" />)
    
    // Should show loading skeleton
    const container = screen.getByAltText('Test').closest('div')
    expect(container?.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('switches to fallback on error and then shows error if fallback fails', async () => {
    const onLoadError = vi.fn()
    render(
      <Image 
        src="invalid.jpg" 
        alt="Test" 
        fallbackSrc="also-invalid.jpg"
        onLoadError={onLoadError}
      />
    )
    
    const img = screen.getByAltText('Test')
    
    // First error - should switch to fallback
    fireEvent.error(img)
    
    await waitFor(() => {
      expect(img).toHaveAttribute('src', 'also-invalid.jpg')
    })
    
    // Second error - should call onLoadError but not show error state
    fireEvent.error(img)
    
    await waitFor(() => {
      expect(onLoadError).toHaveBeenCalled()
    })
    
    // Error state should not be shown when fallbackSrc is provided
    expect(screen.queryByText('Failed to load image')).not.toBeInTheDocument()
  })

  it('has proper container classes', () => {
    render(<Image src="test.jpg" alt="Test" />)
    
    const container = screen.getByAltText('Test').closest('div')
    expect(container).toHaveClass('relative', 'overflow-hidden', 'bg-gray-100')
  })

  it('has proper image classes', () => {
    render(<Image src="test.jpg" alt="Test" />)
    
    const img = screen.getByAltText('Test')
    expect(img).toHaveClass('w-full', 'h-full', 'object-cover', 'transition-opacity', 'duration-300')
  })
})
