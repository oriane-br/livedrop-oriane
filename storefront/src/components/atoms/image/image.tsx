import React, { useState, forwardRef } from 'react'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallbackSrc?: string
  aspectRatio?: '1/1' | '4/3' | '16/9' | 'auto'
  objectFit?: 'cover' | 'contain' | 'fill'
  lazy?: boolean
  onLoadError?: () => void
}

/**
 * Image component with lazy loading, fallback, aspect ratio, and error handling
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      fallbackSrc,
      aspectRatio = 'auto',
      objectFit = 'cover',
      lazy = true,
      onLoadError,
      className = '',
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [currentSrc, setCurrentSrc] = useState(src)

    // Handle successful image load
    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false)
      setHasError(false)
      onLoad?.(e)
    }

    // Handle image load error
    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false)
      setHasError(true)
      
      // Try fallback image if available and not already using it
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc)
        setIsLoading(true)
        setHasError(false)
      } else {
        onLoadError?.()
      }
      
      onError?.(e)
    }

    // Aspect ratio classes
    const aspectRatioClasses = {
      '1/1': 'aspect-square',
      '4/3': 'aspect-[4/3]',
      '16/9': 'aspect-video',
      'auto': ''
    }

    // Object fit classes
    const objectFitClasses = {
      'cover': 'object-cover',
      'contain': 'object-contain',
      'fill': 'object-fill'
    }

    // Container classes
    const containerClasses = [
      'relative',
      'overflow-hidden',
      'bg-gray-100',
      aspectRatioClasses[aspectRatio],
      className
    ].filter(Boolean).join(' ')

    // Image classes
    const imageClasses = [
      'w-full',
      'h-full',
      objectFitClasses[objectFit],
      'transition-opacity',
      'duration-300',
      isLoading ? 'opacity-0' : 'opacity-100'
    ].filter(Boolean).join(' ')

    // Loading skeleton
    const LoadingSkeleton = () => (
      <div className="absolute inset-0 bg-gray-200 animate-pulse">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      </div>
    )

    // Error state
    const ErrorState = () => (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-500">
          <svg
            className="w-8 h-8 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm">Failed to load image</p>
        </div>
      </div>
    )

    return (
      <div className={containerClasses}>
        {/* Loading skeleton */}
        {isLoading && <LoadingSkeleton />}
        
        {/* Error state */}
        {hasError && !fallbackSrc && <ErrorState />}
        
        {/* Image */}
        {!hasError && (
          <img
            ref={ref}
            src={currentSrc}
            alt={alt}
            className={imageClasses}
            loading={lazy ? 'lazy' : 'eager'}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        )}
      </div>
    )
  }
)

Image.displayName = 'Image'
