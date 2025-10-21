import Order from '../models/order.js';
import { incrementSSE, decrementSSE } from '../routes/dashboard.js';

// Store active SSE connections
const activeConnections = new Map();

/**
 * SSE endpoint for real-time order status updates
 * Automatically progresses order through statuses for demo purposes
 */
export async function handleOrderStatusStream(req, res) {
  const { id } = req.params;

  try {
    // Find order
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        error: 'Order not found',
        code: 'ORDER_NOT_FOUND'
      });
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Track connection
    incrementSSE();
    console.log(`📡 SSE connected for order ${id} - Current status: ${order.status}`);

    // Send initial status immediately
    sendEvent(res, {
      orderId: order._id,
      status: order.status,
      carrier: order.carrier,
      trackingNumber: order.trackingNumber,
      estimatedDelivery: order.estimatedDelivery,
      updatedAt: order.updatedAt
    });

    // If already delivered, close immediately
    if (order.status === 'DELIVERED') {
      console.log(`✅ Order ${id} already delivered - closing stream`);
      res.write('event: complete\ndata: Order delivered\n\n');
      return res.end();
    }

    // Auto-progression logic
    let currentStatus = order.status;
    const progressionInterval = setInterval(async () => {
      try {
        // Get fresh order data
        const latestOrder = await Order.findById(id);
        if (!latestOrder) {
          clearInterval(progressionInterval);
          return res.end();
        }

        // Determine next status
        let nextStatus = null;
        let waitTime = 0;

        switch (latestOrder.status) {
          case 'PENDING':
            nextStatus = 'PROCESSING';
            waitTime = 3000; // 3 seconds
            break;
          case 'PROCESSING':
            nextStatus = 'SHIPPED';
            waitTime = 5000; // 5 seconds
            break;
          case 'SHIPPED':
            nextStatus = 'DELIVERED';
            waitTime = 5000; // 5 seconds
            break;
          case 'DELIVERED':
            // Already delivered, stop progression
            clearInterval(progressionInterval);
            res.write('event: complete\ndata: Order delivered\n\n');
            return res.end();
          default:
            clearInterval(progressionInterval);
            return res.end();
        }

        // Wait before progressing
        if (nextStatus && latestOrder.status !== 'DELIVERED') {
          await new Promise(resolve => setTimeout(resolve, waitTime));

          // Update order status in database
          latestOrder.status = nextStatus;

          // Add carrier and tracking for SHIPPED status
          if (nextStatus === 'SHIPPED') {
            latestOrder.carrier = 'DHL Express';
            latestOrder.trackingNumber = `TRK${Date.now().toString(36).toUpperCase()}`;
            latestOrder.estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
          }

          await latestOrder.save();

          console.log(`📦 Order ${id} progressed: ${latestOrder.status}`);

          // Send update to client
          sendEvent(res, {
            orderId: latestOrder._id,
            status: latestOrder.status,
            carrier: latestOrder.carrier,
            trackingNumber: latestOrder.trackingNumber,
            estimatedDelivery: latestOrder.estimatedDelivery,
            updatedAt: latestOrder.updatedAt
          });

          // If delivered, close stream
          if (nextStatus === 'DELIVERED') {
            clearInterval(progressionInterval);
            setTimeout(() => {
              res.write('event: complete\ndata: Order delivered\n\n');
              res.end();
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Error in SSE progression:', error);
        clearInterval(progressionInterval);
        res.end();
      }
    }, 1000); // Check every second

    // Store connection for cleanup
    activeConnections.set(id, { res, interval: progressionInterval });

    // Handle client disconnect
    req.on('close', () => {
      console.log(`🔌 SSE disconnected for order ${id}`);
      decrementSSE();
      clearInterval(progressionInterval);
      activeConnections.delete(id);
      res.end();
    });

  } catch (error) {
    console.error('SSE Error:', error);
    res.status(500).json({
      error: 'Failed to establish SSE connection',
      code: 'SSE_ERROR'
    });
  }
}

/**
 * Send SSE event to client
 */
function sendEvent(res, data) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

/**
 * Close all active SSE connections (for server shutdown)
 */
export function closeAllConnections() {
  activeConnections.forEach((connection, orderId) => {
    console.log(`Closing SSE connection for order ${orderId}`);
    clearInterval(connection.interval);
    connection.res.end();
  });
  activeConnections.clear();
}