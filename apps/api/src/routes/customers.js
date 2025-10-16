import express from 'express';
import Customer from '../models/customer.js';

const router = express.Router();

// GET /api/customers?email=user@example.com
router.get('/', async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        error: 'Email query parameter is required',
        code: 'MISSING_EMAIL'
      });
    }

    const customer = await Customer.findOne({ 
      email: email.toLowerCase() 
    });

    if (!customer) {
      return res.status(404).json({
        error: 'Customer not found',
        code: 'CUSTOMER_NOT_FOUND'
      });
    }

    res.json(customer);
  } catch (error) {
    next(error);
  }
});

// GET /api/customers/:id
router.get('/:id', async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        error: 'Customer not found',
        code: 'CUSTOMER_NOT_FOUND'
      });
    }

    res.json(customer);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid customer ID format',
        code: 'INVALID_ID'
      });
    }
    next(error);
  }
});

export default router;