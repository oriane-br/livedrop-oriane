import groundTruthData from './ground-truth.json'
import { getOrderStatus } from '@/lib/api'

export interface SupportResponse {
  answer: string
  citation: string | null
  confidence: 'high' | 'medium' | 'low' | 'none'
  orderStatus?: {
    orderId: string
    status: string
    carrier?: string
    eta?: string
  }
}

export interface GroundTruthQA {
  qid: string
  category: string
  question: string
  answer: string
}

// Enhanced stop words to filter out for better matching
const STOP_WORDS = new Set([
  'do', 'does', 'have', 'has', 'what', 'how', 'is', 'are', 
  'can', 'could', 'would', 'should', 'i', 'my', 'a', 'an', 
  'the', 'you', 'your', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'from', 'up', 'about', 'into', 'through', 
  'during', 'before', 'after', 'above', 'below', 'between', 
  'among', 'we', 'our', 'they', 'their', 'this', 'that', 
  'these', 'those', 'will', 'shall', 'may', 'might', 'must'
])

// Enhanced category keywords for boosting scores
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Returns': ['return', 'refund', 'exchange', 'send back', 'sendback', 'policy', 'refunds'],
  'Payments': ['payment', 'pay', 'credit', 'card', 'paypal', 'billing', 'charge', 'money', 'wallet'],
  'Delivery': ['delivery', 'shipping', 'ship', 'arrive', 'carrier', 'tracking', 'track', 'shipped'],
  'Loyalty': ['loyalty', 'rewards', 'points', 'program', 'tier', 'silver', 'gold', 'platinum', 'bonus'],
  'Seller Accounts': ['seller', 'account', 'vendor', 'merchant', 'business', 'registration', 'verification'],
  'Commissions': ['commission', 'fee', 'rate', 'percentage', 'pricing', 'cost'],
  'Mobile App': ['app', 'mobile', 'phone', 'ios', 'android', 'application', 'scan', 'barcode'],
  'Support': ['support', 'help', 'contact', 'customer service', 'assistance', 'service'],
  'Orders': ['order', 'purchase', 'buy', 'bought', 'status', 'history', 'tracking'],
  'Inventory': ['inventory', 'stock', 'product', 'listing', 'quality', 'standards'],
  'Promotions': ['promotion', 'promo', 'code', 'discount', 'sale', 'deal', 'offer'],
  'International': ['international', 'global', 'worldwide', 'overseas', 'customs', 'duty'],
  'API': ['api', 'developer', 'integration', 'oauth', 'rest', 'endpoint'],
  'Reviews': ['review', 'rating', 'feedback', 'comment', 'moderation', 'star']
}

/**
 * Detect order ID in query string
 * @param query - User's question
 * @returns Order ID if found, null otherwise
 */
export function detectOrderId(query: string): string | null {
  const orderIdRegex = /\b[A-Z0-9]{10,}\b/g
  const matches = query.match(orderIdRegex)
  return matches ? matches[0] : null
}

/**
 * Mask order ID for PII protection
 * @param orderId - Order ID to mask
 * @returns Masked order ID showing exactly 4 asterisks + last 4 characters
 */
export function maskOrderId(orderId: string): string {
  if (orderId.length <= 4) return '*'.repeat(orderId.length)
  return '****' + orderId.slice(-4)
}

/**
 * Tokenize text into lowercase words, removing stop words and short words
 * @param text - Text to tokenize
 * @returns Array of filtered tokens
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !STOP_WORDS.has(word))
}


/**
 * Score a Q&A pair against a query using enhanced matching algorithm
 * @param query - User's question
 * @param qa - Q&A pair to score
 * @returns Score from 0-100
 */
export function scoreQA(query: string, qa: GroundTruthQA): number {
  const queryTokens = tokenize(query)
  const questionTokens = tokenize(qa.question)
  const answerTokens = tokenize(qa.answer)
  
  if (queryTokens.length === 0) return 0
  
  // Count matches in question (weight: 3x)
  const questionMatches = queryTokens.filter(qt => 
    questionTokens.some(at => at.includes(qt) || qt.includes(at))
  ).length
  
  // Count matches in answer (weight: 1x)
  const answerMatches = queryTokens.filter(qt =>
    answerTokens.some(at => at.includes(qt) || qt.includes(at))
  ).length
  
  // Category boost - check if query contains category keywords
  const categoryKeywords = CATEGORY_KEYWORDS[qa.category] || []
  const categoryMatches = queryTokens.filter(qt =>
    categoryKeywords.some(ck => ck.includes(qt) || qt.includes(ck))
  ).length
  
  // Calculate base score
  let score = (questionMatches * 3) + answerMatches + (categoryMatches * 2)
  
  // Normalize by query length
  score = (score / queryTokens.length) * 100
  
  // Bonus for exact question match (case insensitive)
  if (query.toLowerCase().trim() === qa.question.toLowerCase().trim()) {
    score = 100
  }
  
  // Bonus for exact phrase matches in question
  const queryLower = query.toLowerCase()
  const questionLower = qa.question.toLowerCase()
  if (questionLower.includes(queryLower) || queryLower.includes(questionLower)) {
    score = Math.max(score, 85)
  }
  
  return Math.min(score, 100)
}

/**
 * Find the best matching Q&A for a query
 * @param query - User's question
 * @param threshold - Minimum score threshold (default: 40)
 * @returns Best match with score, or null if no match above threshold
 */
export function findBestMatch(query: string, threshold: number = 40): { qa: GroundTruthQA, score: number } | null {
  const groundTruth = groundTruthData as GroundTruthQA[]
  
  let bestMatch: { qa: GroundTruthQA, score: number } | null = null
  
  for (const qa of groundTruth) {
    const score = scoreQA(query, qa)
    if (score >= threshold && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { qa, score }
    }
  }
  
  return bestMatch
}

/**
 * Format order status information
 * @param orderStatus - Order status data
 * @returns Formatted order status string
 */
function formatOrderStatus(orderStatus: any): string {
  const maskedId = maskOrderId(orderStatus.orderId)
  let statusText = `Your order ${maskedId} is currently ${orderStatus.status}`
  
  if (orderStatus.carrier) {
    statusText += ` via ${orderStatus.carrier}`
  }
  
  if (orderStatus.eta) {
    statusText += `. Expected delivery by ${orderStatus.eta}`
  }
  
  return statusText
}

/**
 * Main support engine function
 * @param query - User's question
 * @returns Support response with answer, citation, and confidence
 */
export async function supportEngine(query: string): Promise<SupportResponse> {
  // Detect order ID first
  const orderId = detectOrderId(query)
  let orderStatus: any = null
  
  // Fetch order status if order ID found
  if (orderId) {
    try {
      orderStatus = await getOrderStatus(orderId)
    } catch (error) {
      console.warn('Failed to fetch order status:', error)
    }
  }
  
  // Find best matching Q&A
  const bestMatch = findBestMatch(query)
  
  // If no match found
  if (!bestMatch) {
    return {
      answer: "I'm unable to answer this question based on available Shoplite documentation. I can help with questions about:\n\n• Returns and Refunds\n• Payments and Billing\n• Shipping and Delivery\n• Loyalty Programs\n• Seller Accounts\n• Order Status\n• Mobile App Features\n• Promotions and Discounts\n\nPlease rephrase your question or contact support@shoplite.com for further assistance.",
      citation: null,
      confidence: 'none',
      orderStatus: orderStatus ? {
        orderId: orderStatus.orderId,
        status: orderStatus.status,
        carrier: orderStatus.carrier,
        eta: orderStatus.eta
      } : undefined
    }
  }
  
  // Determine confidence level
  let confidence: 'high' | 'medium' | 'low' | 'none'
  if (bestMatch.score >= 70) {
    confidence = 'high'
  } else if (bestMatch.score >= 50) {
    confidence = 'medium'
  } else if (bestMatch.score >= 40) {
    confidence = 'low'
  } else {
    confidence = 'none'
  }
  
  // If confidence is none, refuse to answer
  if (confidence === 'none') {
    return {
      answer: "I'm unable to answer this question based on available Shoplite documentation. I can help with questions about:\n\n• Returns and Refunds\n• Payments and Billing\n• Shipping and Delivery\n• Loyalty Programs\n• Seller Accounts\n• Order Status\n• Mobile App Features\n• Promotions and Discounts\n\nPlease rephrase your question or contact support@shoplite.com for further assistance.",
      citation: null,
      confidence: 'none',
      orderStatus: orderStatus ? {
        orderId: orderStatus.orderId,
        status: orderStatus.status,
        carrier: orderStatus.carrier,
        eta: orderStatus.eta
      } : undefined
    }
  }
  
  // Build response
  let answer = bestMatch.qa.answer
  
  // Add order status if available
  if (orderStatus) {
    const statusText = formatOrderStatus(orderStatus)
    answer = `${statusText}. ${answer}`
  }
  
  // Add disclaimer for low confidence
  if (confidence === 'low') {
    answer += " This may not fully answer your question."
  }
  
  return {
    answer,
    citation: bestMatch.qa.qid,
    confidence,
    orderStatus: orderStatus ? {
      orderId: orderStatus.orderId,
      status: orderStatus.status,
      carrier: orderStatus.carrier,
      eta: orderStatus.eta
    } : undefined
  }
}

// Export the main function with a more user-friendly name
export const askSupport = supportEngine
