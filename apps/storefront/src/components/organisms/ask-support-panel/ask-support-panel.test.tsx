import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AskSupportPanel } from './ask-support-panel'

// Mock the support engine
vi.mock('@/assistant/engine', () => ({
  supportEngine: vi.fn()
}))

describe('AskSupportPanel', () => {
  const mockOnClose = vi.fn()
  const mockSupportEngine = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset the mock implementation
    vi.doMock('@/assistant/engine', () => ({
      supportEngine: mockSupportEngine
    }))
  })

  const renderPanel = (props: any = {}) => render(
    <AskSupportPanel
      isOpen={props.isOpen ?? true}
      onClose={props.onClose ?? mockOnClose}
    />
  )

  it('renders when open', () => {
    renderPanel()
    expect(screen.getByRole('dialog')).toBeVisible()
    expect(screen.getByText('Ask Support')).toBeInTheDocument()
  })

  it('hidden when closed', () => {
    renderPanel({ isOpen: false })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows empty state when no questions asked', () => {
    renderPanel()
    expect(screen.getByText('Ask me anything about orders, returns, or policies!')).toBeInTheDocument()
  })

  it('submit calls support engine with question', async () => {
    mockSupportEngine.mockResolvedValue({
      answer: 'Here is the answer to your question.',
      citation: '[Q01]'
    })

    renderPanel()
    
    const textarea = screen.getByPlaceholderText('Ask a question about orders, returns, payments...')
    const submitButton = screen.getByRole('button', { name: /ask question/i })
    
    fireEvent.change(textarea, { target: { value: 'How do I return an item?' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSupportEngine).toHaveBeenCalledWith('How do I return an item?')
    })
  })

  it('displays response correctly', async () => {
    mockSupportEngine.mockResolvedValue({
      answer: 'You can return items within 30 days.',
      citation: '[Q01]'
    })

    renderPanel()
    
    const textarea = screen.getByPlaceholderText('Ask a question about orders, returns, payments...')
    const submitButton = screen.getByRole('button', { name: /ask question/i })
    
    fireEvent.change(textarea, { target: { value: 'How do I return an item?' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('You can return items within 30 days.')).toBeInTheDocument()
      expect(screen.getByText('[Q01]')).toBeInTheDocument()
    })
  })

  it('shows loading state while processing', async () => {
    mockSupportEngine.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

    renderPanel()
    
    const textarea = screen.getByPlaceholderText('Ask a question about orders, returns, payments...')
    const submitButton = screen.getByRole('button', { name: /ask question/i })
    
    fireEvent.change(textarea, { target: { value: 'Test question' } })
    fireEvent.click(submitButton)

    expect(screen.getByText('Processing your question...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /processing/i })).toBeDisabled()
  })

  it('shows citation badge', async () => {
    mockSupportEngine.mockResolvedValue({
      answer: 'Answer with citation',
      citation: '[Q05]'
    })

    renderPanel()
    
    const textarea = screen.getByPlaceholderText('Ask a question about orders, returns, payments...')
    const submitButton = screen.getByRole('button', { name: /ask question/i })
    
    fireEvent.change(textarea, { target: { value: 'Test question' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('[Q05]')).toBeInTheDocument()
    })
  })

  it('close button works', () => {
    renderPanel()
    fireEvent.click(screen.getByLabelText(/close support panel/i))
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('ESC key closes panel', () => {
    renderPanel()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('backdrop click closes panel', () => {
    renderPanel()
    const backdrop = screen.getByRole('dialog').parentElement
    fireEvent.click(backdrop!)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('focus trapped inside panel', () => {
    renderPanel()
    const textarea = screen.getByPlaceholderText('Ask a question about orders, returns, payments...')
    
    // Focus should start on textarea
    textarea.focus()
    expect(document.activeElement).toBe(textarea)

    // Focus should stay within the panel
    const panel = screen.getByRole('dialog')
    expect(panel.contains(document.activeElement)).toBe(true)
  })

  it('handles support engine errors', async () => {
    mockSupportEngine.mockRejectedValue(new Error('Engine error'))

    renderPanel()
    
    const textarea = screen.getByPlaceholderText('Ask a question about orders, returns, payments...')
    const submitButton = screen.getByRole('button', { name: /ask question/i })
    
    fireEvent.change(textarea, { target: { value: 'Test question' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again or contact support directly.')).toBeInTheDocument()
    })
  })

  it('handles empty response from support engine', async () => {
    mockSupportEngine.mockResolvedValue(null)

    renderPanel()
    
    const textarea = screen.getByPlaceholderText('Ask a question about orders, returns, payments...')
    const submitButton = screen.getByRole('button', { name: /ask question/i })
    
    fireEvent.change(textarea, { target: { value: 'Test question' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Sorry, I couldn\'t find an answer to your question. Please try rephrasing or contact support directly.')).toBeInTheDocument()
    })
  })

  it('submits on Ctrl+Enter', async () => {
    mockSupportEngine.mockResolvedValue({
      answer: 'Answer via keyboard shortcut',
      citation: '[Q01]'
    })

    renderPanel()
    
    const textarea = screen.getByPlaceholderText('Ask a question about orders, returns, payments...')
    
    fireEvent.change(textarea, { target: { value: 'Test question' } })
    fireEvent.keyDown(textarea, { key: 'Enter', ctrlKey: true })

    await waitFor(() => {
      expect(mockSupportEngine).toHaveBeenCalledWith('Test question')
    })
  })

  it('disables submit when question is empty', () => {
    renderPanel()
    const submitButton = screen.getByRole('button', { name: /ask question/i })
    expect(submitButton).toBeDisabled()
  })

  it('disables submit when loading', async () => {
    mockSupportEngine.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

    renderPanel()
    
    const textarea = screen.getByPlaceholderText('Ask a question about orders, returns, payments...')
    const submitButton = screen.getByRole('button', { name: /ask question/i })
    
    fireEvent.change(textarea, { target: { value: 'Test question' } })
    fireEvent.click(submitButton)

    expect(screen.getByRole('button', { name: /processing/i })).toBeDisabled()
  })


  it('uses proper accessibility attributes', () => {
    renderPanel()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby')
    expect(screen.getByText('Ask Support').id).toBe(dialog.getAttribute('aria-labelledby'))
  })
})
