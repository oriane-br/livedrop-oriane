import express from 'express';
import Order from '../models/order.js';
import Product from '../models/product.js';
import Customer from '../models/customer.js';
import mongoose from 'mongoose';

const router = express.Router();

// In-memory metrics storage (for demo purposes)
const metrics = {
  apiCalls: 0,
  sseConnections: 0,
  assistantQueries: {
    total: 0,
    byIntent: {},
    functionCalls: {}
  },
  apiLatency: []
};

// Middleware to track API calls and latency
export function trackMetrics(req, res, next) {
  const start = Date.now();
  metrics.apiCalls++;

  res.on('finish', () => {
    const latency = Date.now() - start;
    metrics.apiLatency.push({
      endpoint: req.path,
      method: req.method,
      latency,
      timestamp: new Date()
    });

    // Keep only last 100 requests
    if (metrics.apiLatency.length > 100) {
      metrics.apiLatency.shift();
    }
  });

  next();
}

// Track SSE connections
export function incrementSSE() {
  metrics.sseConnections++;
}

export function decrementSSE() {
  metrics.sseConnections--;
}

// Track assistant queries
export function trackAssistantQuery(intent, functionsCalled = []) {
  metrics.assistantQueries.total++;
  metrics.assistantQueries.byIntent[intent] = (metrics.assistantQueries.byIntent[intent] || 0) + 1;
  
  functionsCalled.forEach(func => {
    metrics.assistantQueries.functionCalls[func] = (metrics.assistantQueries.functionCalls[func] || 0) + 1;
  });
}

// GET /api/dashboard/business-metrics
router.get('/business-metrics', async (req, res, next) => {
  try {
    const [orderMetrics, productCount, customerCount] = await Promise.all([
      Order.aggregate([
        {
          $facet: {
            overall: [
              {
                $group: {
                  _id: null,
                  totalRevenue: { $sum: '$total' },
                  totalOrders: { $sum: 1 },
                  avgOrderValue: { $avg: '$total' }
                }
              }
            ],
            byStatus: [
              {
                $group: {
                  _id: '$status',
                  count: { $sum: 1 }
                }
              }
            ],
            recentOrders: [
              { $sort: { createdAt: -1 } },
              { $limit: 5 },
              {
                $lookup: {
                  from: 'customers',
                  localField: 'customerId',
                  foreignField: '_id',
                  as: 'customer'
                }
              },
              {
                $project: {
                  _id: 1,
                  total: 1,
                  status: 1,
                  createdAt: 1,
                  customerName: { $arrayElemAt: ['$customer.name', 0] }
                }
              }
            ]
          }
        }
      ]),
      Product.countDocuments(),
      Customer.countDocuments()
    ]);

    const result = orderMetrics[0];

    res.json({
      revenue: {
        total: Math.round((result.overall[0]?.totalRevenue || 0) * 100) / 100,
        avgOrderValue: Math.round((result.overall[0]?.avgOrderValue || 0) * 100) / 100
      },
      orders: {
        total: result.overall[0]?.totalOrders || 0,
        byStatus: result.byStatus.reduce((acc, item) => {
          acc[item._id.toLowerCase()] = item.count;
          return acc;
        }, {})
      },
      counts: {
        products: productCount,
        customers: customerCount
      },
      recentOrders: result.recentOrders
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/dashboard/performance
router.get('/performance', async (req, res, next) => {
  try {
    // Calculate average latency per endpoint
    const latencyByEndpoint = metrics.apiLatency.reduce((acc, item) => {
      if (!acc[item.endpoint]) {
        acc[item.endpoint] = { total: 0, count: 0, avg: 0 };
      }
      acc[item.endpoint].total += item.latency;
      acc[item.endpoint].count++;
      return acc;
    }, {});

    Object.keys(latencyByEndpoint).forEach(endpoint => {
      const data = latencyByEndpoint[endpoint];
      data.avg = Math.round(data.total / data.count);
      delete data.total;
      delete data.count;
    });

    res.json({
      apiCalls: {
        total: metrics.apiCalls,
        recent: metrics.apiLatency.length
      },
      latency: latencyByEndpoint,
      avgLatency: metrics.apiLatency.length > 0
        ? Math.round(metrics.apiLatency.reduce((sum, item) => sum + item.latency, 0) / metrics.apiLatency.length)
        : 0,
      sseConnections: metrics.sseConnections,
      database: {
        status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        name: mongoose.connection.db?.databaseName || 'N/A'
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/dashboard/assistant-stats
router.get('/assistant-stats', async (req, res, next) => {
  try {
    res.json({
      totalQueries: metrics.assistantQueries.total,
      intentDistribution: metrics.assistantQueries.byIntent,
      functionCalls: metrics.assistantQueries.functionCalls,
      avgResponseTime: 0 // Will be tracked when we build assistant
    });
  } catch (error) {
    next(error);
  }
});

export default router;