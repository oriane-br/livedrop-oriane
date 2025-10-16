import React from 'react'

export interface LoadingProps {
  text?: string
  fullScreen?: boolean
}

export const Loading: React.FC<LoadingProps> = ({
  text = 'Loading...',
  fullScreen = false,
}) => {
  const Spinner = () => (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  )

  const content = (
    <div
      className="flex flex-col items-center justify-center space-y-3"
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <Spinner />
      {text && (
        <p className="text-sm text-gray-600 font-medium">
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
        {content}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-8">
      {content}
    </div>
  )
}
