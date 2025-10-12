/**
 * Cart state management system using React Context + localStorage persistence
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Product, CartItem } from './api'

// Cart state structure
interface CartState {
  items: CartItem[]
}

// Cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: { items: CartItem[] } }

// Cart context type
export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

// Create cart context
const CartContext = createContext<CartContextType | undefined>(undefined)

// localStorage key
const CART_STORAGE_KEY = 'shoplite-cart'

// Initial cart state
const initialState: CartState = {
  items: []
}

/**
 * Cart reducer with immutable operations
 */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload
      const existingItem = state.items.find(item => item.product.id === product.id)
      
      if (existingItem) {
        // If item exists, increment quantity (check stock)
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > product.stockQty) {
          console.warn(`Cannot add ${quantity} more of ${product.title}. Only ${product.stockQty} in stock.`)
          return state
        }
        
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          )
        }
      } else {
        // Add new item (check stock)
        if (quantity > product.stockQty) {
          console.warn(`Cannot add ${quantity} of ${product.title}. Only ${product.stockQty} in stock.`)
          return state
        }
        
        return {
          ...state,
          items: [...state.items, { product, quantity }]
        }
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.productId)
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId)
        }
      }
      
      // Find the product to check stock
      const item = state.items.find(item => item.product.id === productId)
      if (item && quantity > item.product.stockQty) {
        console.warn(`Cannot set quantity to ${quantity} for ${item.product.title}. Only ${item.product.stockQty} in stock.`)
        return state
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      }

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload.items
      }

    default:
      return state
  }
}

/**
 * Load cart from localStorage
 */
function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
  }
  return []
}

/**
 * Save cart to localStorage
 */
function saveCartToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

/**
 * Cart provider component
 */
export function CartProvider({ children }: { children: ReactNode }): JSX.Element {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedItems = loadCartFromStorage()
    if (savedItems.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: { items: savedItems } })
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    saveCartToStorage(state.items)
  }, [state.items])

  /**
   * Add item to cart
   */
  const addItem = (product: Product, quantity: number = 1): void => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
  }

  /**
   * Remove item from cart
   */
  const removeItem = (productId: string): void => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
  }

  /**
   * Update item quantity
   */
  const updateQuantity = (productId: string, quantity: number): void => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  /**
   * Clear all items from cart
   */
  const clearCart = (): void => {
    dispatch({ type: 'CLEAR_CART' })
  }

  /**
   * Calculate total price of all items
   */
  const getTotal = (): number => {
    return state.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }

  /**
   * Get total number of items in cart
   */
  const getItemCount = (): number => {
    return state.items.reduce((count, item) => count + item.quantity, 0)
  }

  const value: CartContextType = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount
  }

  return React.createElement(
    CartContext.Provider,
    { value },
    children
  )
}

/**
 * Hook to access cart context
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
