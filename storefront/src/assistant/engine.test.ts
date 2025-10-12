import { describe, it, expect, vi } from 'vitest'
import { askSupport, detectOrderId, maskOrderId } from './engine'
import * as api from '@/lib/api'

// Mock api module
vi.mock('@/lib/api', () => ({
  getOrderStatus: vi.fn()
}))

describe('Support Engine', () => {
  describe('detectOrderId', () => {
    it('should detect valid order IDs', () => {
      const orderId = detectOrderId('What is status of ORD7X9K2M5?')
      expect(orderId).toBe('ORD7X9K2M5')
    })

    it('should return null for no order ID', () => {
      const orderId = detectOrderId('What is the return policy?')
      expect(orderId).toBeNull()
    })
  })

  describe('maskOrderId', () => {
    it('should mask order ID correctly', () => {
      expect(maskOrderId('ORD7X9K2M5')).toBe('****K2M5')
      expect(maskOrderId('ABC123')).toBe('****C123')
    })
  })

  describe('askSupport', () => {
    it('should return answer for known policy question', async () => {
      const response = await askSupport('What is the return window?')
      expect(response.confidence).not.toBe('none')
      expect(response.citation).toMatch(/^Q\d+$/)
      expect(response.answer).toContain('30-day')
    })

    it('should refuse out-of-scope questions', async () => {
      const response = await askSupport('What is the weather today?')
      expect(response.confidence).toBe('none')
      expect(response.citation).toBeNull()
      expect(response.answer).toContain('unable to answer')
    })

    it('should detect order ID and fetch status', async () => {
      vi.mocked(api.getOrderStatus).mockResolvedValue({
        orderId: 'ORD7X9K2M5',
        items: [],
        status: 'Shipped',
        carrier: 'DHL Express',
        eta: '2025-10-14',
        createdAt: new Date()
      })

      const response = await askSupport('Status of ORD7X9K2M5?')
      expect(response.orderStatus).toBeDefined()
      expect(response.orderStatus?.status).toBe('Shipped')
      expect(response.answer).toContain('****K2M5')
    })
  })
})
