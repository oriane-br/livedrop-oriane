import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/atoms/button'
import { Badge } from '@/components/atoms/badge'

export interface AskSupportPanelProps {
  isOpen: boolean
  onClose: () => void
}


export const AskSupportPanel: React.FC<AskSupportPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [question, setQuestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null)
  const [currentCitation, setCurrentCitation] = useState<string | null>(null)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus the textarea when panel opens
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusableElements = panelRef.current?.querySelectorAll(
          'button, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = async () => {
    if (!question.trim()) return

    setIsLoading(true)
    setError(null)
    setCurrentAnswer(null)
    setCurrentCitation(null)

    try {
      // Import support engine dynamically to avoid SSR issues
      const { supportEngine } = await import('@/assistant/engine')
      
      const response = await supportEngine(question.trim())
      
      if (response && response.answer) {
        setCurrentAnswer(response.answer)
        setCurrentCitation(response.citation || null)
        setQuestion('')
      } else {
        setError('Sorry, I couldn\'t find an answer to your question. Please try rephrasing or contact support directly.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again or contact support directly.')
      console.error('Support engine error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
      
      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-panel-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 id="support-panel-title" className="text-lg font-semibold text-gray-900">
            Ask Support
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close support panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Input Area */}
          <div className="p-4 border-b border-gray-200">
            <div className="space-y-3">
              <div>
                <label htmlFor="support-question" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Question
                </label>
                <textarea
                  ref={textareaRef}
                  id="support-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask a question about orders, returns, payments..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  I can help with policy questions and order status. Press Ctrl+Enter to submit.
                </p>
              </div>
              
              <Button
                onClick={handleSubmit}
                disabled={!question.trim() || isLoading}
                className="w-full"
              >
                {isLoading ? 'Processing...' : 'Ask Question'}
              </Button>
            </div>
          </div>

          {/* Response Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Current Response */}
            {currentAnswer && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="text-gray-700 whitespace-pre-wrap">
                  {currentAnswer}
                </div>
                {currentCitation && (
                  <div className="flex justify-end">
                    <Badge variant="info" size="sm">
                      {currentCitation}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-800 text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  <span className="text-blue-800 text-sm">Processing your question...</span>
                </div>
              </div>
            )}


            {/* Empty State */}
            {!isLoading && !error && !currentAnswer && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-sm">
                  Ask me anything about orders, returns, or policies!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
