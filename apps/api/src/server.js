import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './db.js';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import SSE handler
import { handleOrderStatusStream } from './sse/order-status.js';

// Import routes
import customersRouter from './routes/customers.js';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import analyticsRouter from './routes/analytics.js';
import dashboardRouter, { trackMetrics } from './routes/dashboard.js';
import assistantRouter from './routes/assistant.js';

dotenv.config({ path: path.join(__dirname, '../.env') });

// Environment variables loaded successfully

const app = express(); 
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'))

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Metrics tracking
app.use(trackMetrics);

console.log('✅ Middleware setup complete');
console.log('✅ Environment:', process.env.NODE_ENV);
console.log('✅ MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('✅ Port:', PORT);

// Add this route to handle the root URL
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Shoplite API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders', 
      customers: '/api/customers',
      analytics: '/api/analytics',
      assistant: '/api/assistant/query'
    },
    documentation: 'Check README for API documentation'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// API Routes - ✅ REGISTER ROUTES AFTER APP IS CREATED
app.use('/api/customers', customersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/assistant', assistantRouter);

// SSE endpoint for real-time order tracking
app.get('/api/orders/:id/stream', handleOrderStatusStream);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    code: 'ROUTE_NOT_FOUND'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    code: err.code || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API endpoints:`);
      console.log(`   GET  /health`);
      console.log(`   GET  /api/customers?email=demo@example.com`);
      console.log(`   GET  /api/products`);
      console.log(`   GET  /api/orders`);
      console.log(`   GET  /api/analytics/daily-revenue`);
      console.log(`   GET  /api/dashboard/business-metrics`);
      console.log(`   POST /api/assistant/query`);
      console.log(`   GET  /api/orders/:id/stream (SSE)`);
      console.log(`\n✨ Ready for requests!\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

console.log('✅ All routes registered');

startServer();