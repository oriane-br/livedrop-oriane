import React, { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isRequired?: boolean
}

/**
 * Input component with label, error states, helper text, and icon support
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      isRequired = false,
      className = '',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    // Base input classes
    const baseInputClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed'

    // Input state classes
    const inputStateClasses = error
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'

    // Icon padding classes
    const iconPaddingClasses = {
      left: leftIcon ? 'pl-10' : 'pl-3',
      right: rightIcon ? 'pr-10' : 'pr-3'
    }

    const inputClasses = [
      baseInputClasses,
      inputStateClasses,
      iconPaddingClasses.left,
      iconPaddingClasses.right,
      className
    ].filter(Boolean).join(' ')

    // Label classes
    const labelClasses = 'block text-sm font-medium text-gray-700 mb-1'

    // Error message classes
    const errorClasses = 'mt-1 text-sm text-red-600'

    // Helper text classes
    const helperClasses = 'mt-1 text-sm text-gray-500'

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input container with icons */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">
                {leftIcon}
              </div>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-required={isRequired}
            aria-describedby={[
              error ? errorId : '',
              helperText ? helperId : ''
            ].filter(Boolean).join(' ') || undefined}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="h-5 w-5 text-gray-400">
                {rightIcon}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p id={errorId} className={errorClasses}>
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p id={helperId} className={helperClasses}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
