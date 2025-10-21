// apps/storefront/src/lib/sse-client.ts

/**
 * SSE Client for Real-Time Order Tracking
 * Handles connection, reconnection, and cleanup
 */

export interface OrderStatusUpdate {
  orderId: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  timestamp: string;
  carrier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  message?: string;
}

export type SSEEventHandler = (data: OrderStatusUpdate) => void;
export type SSEErrorHandler = (error: Event) => void;
export type SSECloseHandler = () => void;

export class OrderTrackingSSE {
  private eventSource: EventSource | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000; // 2 seconds
  private reconnectTimer: number | null = null;
  private isManualClose = false;

  private onUpdateHandler: SSEEventHandler | null = null;
  private onErrorHandler: SSEErrorHandler | null = null;
  private onCloseHandler: SSECloseHandler | null = null;

  constructor(streamUrl: string) {
    this.url = streamUrl;
  }

  /**
   * Connect to SSE stream
   */
  connect(): void {
    if (this.eventSource) {
      console.warn('SSE already connected');
      return;
    }

    this.isManualClose = false;
    this.eventSource = new EventSource(this.url);

    // Handle incoming messages
    this.eventSource.onmessage = (event: MessageEvent) => {
      try {
        const data: OrderStatusUpdate = JSON.parse(event.data);
        console.log('SSE Update:', data);
        
        if (this.onUpdateHandler) {
          this.onUpdateHandler(data);
        }

        // Auto-close if order is delivered
        if (data.status === 'DELIVERED') {
          console.log('Order delivered, closing SSE connection');
          this.disconnect();
        }
      } catch (error) {
        console.error('Failed to parse SSE message:', error);
      }
    };

    // Handle errors
    this.eventSource.onerror = (event: Event) => {
      console.error('SSE Error:', event);
      
      if (this.onErrorHandler) {
        this.onErrorHandler(event);
      }

      // Attempt reconnection if not manually closed
      if (!this.isManualClose && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnect();
      } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
        this.disconnect();
      }
    };

    // Handle connection open
    this.eventSource.onopen = () => {
      console.log('SSE Connected');
      this.reconnectAttempts = 0; // Reset on successful connection
    };

    console.log('SSE Connection initiated to:', this.url);
  }

  /**
   * Disconnect from SSE stream
   */
  disconnect(): void {
    this.isManualClose = true;
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      console.log('SSE Disconnected');
    }

    if (this.onCloseHandler) {
      this.onCloseHandler();
    }
  }

  /**
   * Reconnect with exponential backoff
   */
  private reconnect(): void {
    if (this.reconnectTimer) {
      return; // Already reconnecting
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Reconnecting SSE in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
      this.connect();
    }, delay);
  }

  /**
   * Register event handlers
   */
  onUpdate(handler: SSEEventHandler): this {
    this.onUpdateHandler = handler;
    return this;
  }

  onError(handler: SSEErrorHandler): this {
    this.onErrorHandler = handler;
    return this;
  }

  onClose(handler: SSECloseHandler): this {
    this.onCloseHandler = handler;
    return this;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.eventSource !== null && this.eventSource.readyState === EventSource.OPEN;
  }

  /**
   * Get connection state
   */
  getState(): 'CONNECTING' | 'OPEN' | 'CLOSED' {
    if (!this.eventSource) return 'CLOSED';
    
    switch (this.eventSource.readyState) {
      case EventSource.CONNECTING:
        return 'CONNECTING';
      case EventSource.OPEN:
        return 'OPEN';
      case EventSource.CLOSED:
        return 'CLOSED';
      default:
        return 'CLOSED';
    }
  }
}

/**
 * React Hook for SSE Order Tracking
 * Usage:
 * 
 * const { status, updates, error, isConnected } = useOrderTracking(orderId);
 */
export function createOrderTrackingHook() {
  // This will be implemented in the React component
  // Exported here for type consistency
  return null;
}