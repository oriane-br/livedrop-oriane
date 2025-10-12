import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import * as supportEngine from '@/assistant/engine'
import { CartProvider } from '@/lib/store'
import Catalog from '../catalog'
import Product from '../product'
import Cart from '../cart'
import OrderStatus from '../order-status'

// Mock modules
vi.mock('@/assistant/engine')
vi.mock('@/lib/api')

describe('Ask Support Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Support Panel Availability', () => {
    it('should be accessible from catalog page', () => {
      render(
        <BrowserRouter>
          <CartProvider>
            <Catalog />
          </CartProvider>
        </BrowserRouter>
      )
      const supportButton = screen.getByLabelText(/ask support/i)
      expect(supportButton).toBeInTheDocument()
    })

    it('should be accessible from product page', () => {
      render(
        <BrowserRouter>
          <CartProvider>
            <Product />
          </CartProvider>
        </BrowserRouter>
      )
      const supportButton = screen.getByLabelText(/ask support/i)
      expect(supportButton).toBeInTheDocument()
    })

    it('should be accessible from cart page', () => {
      render(
        <BrowserRouter>
          <CartProvider>
            <Cart />
          </CartProvider>
        </BrowserRouter>
      )
      const supportButton = screen.getByLabelText(/ask support/i)
      expect(supportButton).toBeInTheDocument()
    })

    it('should be accessible from order status page', () => {
      render(
        <BrowserRouter>
          <CartProvider>
            <OrderStatus />
          </CartProvider>
        </BrowserRouter>
      )
      const supportButton = screen.getByLabelText(/ask support/i)
      expect(supportButton).toBeInTheDocument()
    })
  })

  describe('Required Test Cases from Assignment', () => {
    it('known policy question returns answer with citation [Qxx]', async () => {
      vi.mocked(supportEngine.askSupport).mockResolvedValue({
        answer: 'Shoplite offers a 30-day return window for most items.',
        citation: 'Q02',
        confidence: 'high'
      })

      render(<Catalog />, { wrapper: BrowserRouter })
      
      // Open support panel
      const supportButton = screen.getByLabelText(/ask support/i)
      fireEvent.click(supportButton)

      // Enter question
      const textarea = screen.getByPlaceholderText(/ask a question/i)
      fireEvent.change(textarea, { target: { value: 'What is the return policy?' } })

      // Submit
      const submitButton = screen.getByRole('button', { name: /ask question/i })
      fireEvent.click(submitButton)

      // Verify response with citation
      await waitFor(() => {
        expect(screen.getByText(/30-day return window/i)).toBeInTheDocument()
        expect(screen.getByText('[Q02]')).toBeInTheDocument()
      })
    })

    it('out-of-scope question refuses politely', async () => {
      vi.mocked(supportEngine.askSupport).mockResolvedValue({
        answer: "I'm unable to answer this question based on available Shoplite documentation. Please contact support at support@shoplite.com",
        citation: null,
        confidence: 'none'
      })

      render(<Catalog />, { wrapper: BrowserRouter })
      
      const supportButton = screen.getByLabelText(/ask support/i)
      fireEvent.click(supportButton)

      const textarea = screen.getByPlaceholderText(/ask a question/i)
      fireEvent.change(textarea, { target: { value: 'What is the weather today?' } })

      const submitButton = screen.getByRole('button', { name: /ask question/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/unable to answer/i)).toBeInTheDocument()
        expect(screen.queryByText(/\[Q\d+\]/)).not.toBeInTheDocument()
      })
    })

    it('question with valid order ID includes status and citation', async () => {
      vi.mocked(supportEngine.askSupport).mockResolvedValue({
        answer: 'Your order ****K2M5 is currently Shipped via DHL Express. Expected delivery by Oct 14, 2025.',
        citation: 'Q09',
        confidence: 'high',
        orderStatus: {
          orderId: 'ORD7X9K2M5',
          status: 'Shipped',
          carrier: 'DHL Express',
          eta: 'Oct 14, 2025'
        }
      })

      render(<Catalog />, { wrapper: BrowserRouter })
      
      const supportButton = screen.getByLabelText(/ask support/i)
      fireEvent.click(supportButton)

      const textarea = screen.getByPlaceholderText(/ask a question/i)
      fireEvent.change(textarea, { target: { value: 'What is status of ORD7X9K2M5?' } })

      const submitButton = screen.getByRole('button', { name: /ask question/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        // Verify masked order ID (PII protection)
        expect(screen.getByText(/\*\*\*\*K2M5/)).toBeInTheDocument()
        
        // Verify status included
        expect(screen.getByText(/Shipped/i)).toBeInTheDocument()
        expect(screen.getByText(/DHL Express/i)).toBeInTheDocument()
        
        // Verify citation
        expect(screen.getByText('[Q09]')).toBeInTheDocument()
      })
    })
  })

  describe('PII Protection', () => {
    it('never echoes full order IDs', async () => {
      vi.mocked(supportEngine.askSupport).mockResolvedValue({
        answer: 'Your order ****K2M5 is Placed.',
        citation: 'Q09',
        confidence: 'high',
        orderStatus: {
          orderId: 'ORD7X9K2M5',
          status: 'Placed'
        }
      })

      render(<Catalog />, { wrapper: BrowserRouter })
      
      const supportButton = screen.getByLabelText(/ask support/i)
      fireEvent.click(supportButton)

      const textarea = screen.getByPlaceholderText(/ask a question/i)
      fireEvent.change(textarea, { target: { value: 'Status of ORD7X9K2M5?' } })

      const submitButton = screen.getByRole('button', { name: /ask question/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        // Should NOT show full order ID
        expect(screen.queryByText('ORD7X9K2M5')).not.toBeInTheDocument()
        
        // Should show masked version
        expect(screen.getByText(/\*\*\*\*K2M5/)).toBeInTheDocument()
      })
    })
  })
})
