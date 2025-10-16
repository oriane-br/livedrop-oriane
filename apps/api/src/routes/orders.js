import express from 'express';
import Order from '../models/order.js';
import Customer from '../models/customer.js';
import Product from '../models/product.js';

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res, next) => {
  try {
    const { customerId, items } = req.body;

    // Validation
    if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'customerId and items array are required',
        code: 'INVALID_INPUT'
      });
    }

    // Verify customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        error: 'Customer not found',
        code: 'CUSTOMER_NOT_FOUND'
      });
    }

    // Verify products and check stock
    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({
          error: `Product not found: ${item.productId}`,
          code: 'PRODUCT_NOT_FOUND'
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
          code: 'INSUFFICIENT_STOCK'
        });
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });

      total += product.price * item.quantity;

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create order
    const order = await Order.create({
      customerId,
      items: orderItems,
      total,
      status: 'PENDING'
    });

    // Populate customer info
    await order.populate('customerId', 'name email');

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customerId', 'name email phone address')
      .populate('items.productId', 'name imageUrl');

    if (!order) {
      return res.status(404).json({
        error: 'Order not found',
        code: 'ORDER_NOT_FOUND'
      });
    }

    res.json(order);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid order ID format',
        code: 'INVALID_ID'
      });
    }
    next(error);
  }
});

// GET /api/orders?customerId=xxx
router.get('/', async (req, res, next) => {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res.status(400).json({
        error: 'customerId query parameter is required',
        code: 'MISSING_CUSTOMER_ID'
      });
    }

    const orders = await Order.find({ customerId })
      .sort({ createdAt: -1 })
      .populate('customerId', 'name email');

    res.json(orders);
  } catch (error) {
    next(error);
  }
});

export default router;