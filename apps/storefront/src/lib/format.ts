/**
 * Currency and date formatting utilities
 */

/**
 * Formats a number as currency using Intl.NumberFormat
 * @param amount - The amount to format
 * @param currency - The currency code (defaults to 'USD')
 * @returns Formatted currency string
 * @example formatCurrency(129.99) → "$129.99"
 * @example formatCurrency(1299.99) → "$1,299.99"
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

/**
 * Formats a date as a readable string
 * @param date - Date object or date string to format
 * @returns Formatted date string in "Oct 11, 2025" format
 * @example formatDate(new Date()) → "Oct 11, 2025"
 * @example formatDate("2025-10-11") → "Oct 11, 2025"
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(dateObj)
}

/**
 * Formats an ETA (Expected Time of Arrival) date
 * @param days - Number of days from now
 * @returns Formatted ETA string
 * @example formatETA(2) → "Expected by Oct 13, 2025"
 */
export function formatETA(days: number): string {
  const etaDate = new Date()
  etaDate.setDate(etaDate.getDate() + days)
  
  const formattedDate = formatDate(etaDate)
  return `Expected by ${formattedDate}`
}

/**
 * Masks an order ID for PII protection, showing exactly 4 asterisks + last 4 characters
 * @param orderId - The order ID to mask
 * @returns Masked order ID string
 * @example maskOrderId("ORD7X9K2M5") → "****K2M5"
 */
export function maskOrderId(orderId: string): string {
  if (orderId.length <= 4) {
    return '*'.repeat(orderId.length)
  }
  
  return '****' + orderId.slice(-4)
}

/**
 * Stock status information type
 */
export interface StockStatus {
  label: string
  color: 'green' | 'yellow' | 'red'
}

/**
 * Determines stock status based on quantity
 * @param quantity - The stock quantity
 * @returns Stock status object with label and color
 * @example getStockStatus(100) → { label: 'In Stock', color: 'green' }
 * @example getStockStatus(25) → { label: 'Low Stock', color: 'yellow' }
 * @example getStockStatus(5) → { label: 'Limited', color: 'red' }
 * @example getStockStatus(0) → { label: 'Out of Stock', color: 'red' }
 */
export function getStockStatus(quantity: number): StockStatus {
  if (quantity === 0) {
    return { label: 'Out of Stock', color: 'red' }
  }
  
  if (quantity < 10) {
    return { label: 'Limited', color: 'red' }
  }
  
  if (quantity <= 50) {
    return { label: 'Low Stock', color: 'yellow' }
  }
  
  return { label: 'In Stock', color: 'green' }
}
