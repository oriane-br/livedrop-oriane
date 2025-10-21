const axios = require('axios');

class FunctionRegistry {
  constructor(dbConnection) {
    this.db = dbConnection;
    this.functions = new Map();
    this.executionLog = [];
    
    this.registerDefaultFunctions();
  }

  /**
   * Register default functions
   * @private
   */
  registerDefaultFunctions() {
    // Function 1: Get Order Status
    this.register(
      'getOrderStatus',
      {
        description: 'Retrieves the current status and details of a customer order',
        parameters: [
          {
            name: 'orderId',
            type: 'string',
            description: 'The order ID to look up',
            required: true
          }
        ],
        returns: 'Order status, items, tracking info, and estimated delivery'
      },
      async (params, db) => {
        const { orderId } = params;
        
        // Query database for order
        const order = await db.collection('orders').findOne({ _id: orderId });
        
        if (!order) {
          throw new Error(`Order ${orderId} not found`);
        }

        return {
          orderId: order._id,
          status: order.status,
          items: order.items,
          total: order.total,
          carrier: order.carrier,
          trackingNumber: order.trackingNumber,
          estimatedDelivery: order.estimatedDelivery,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt
        };
      }
    );

    // Function 2: Search Products
    this.register(
      'searchProducts',
      {
        description: 'Searches for products matching a query with optional filters',
        parameters: [
          {
            name: 'query',
            type: 'string',
            description: 'Search query text',
            required: true
          },
          {
            name: 'limit',
            type: 'number',
            description: 'Maximum number of results to return (default: 5)',
            required: false
          },
          {
            name: 'category',
            type: 'string',
            description: 'Filter by product category',
            required: false
          }
        ],
        returns: 'Array of matching products with name, price, and availability'
      },
      async (params, db) => {
        const { query, limit = 5, category } = params;
        
        // Build search filter
        const filter = {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { tags: { $regex: query, $options: 'i' } }
          ]
        };

        if (category) {
          filter.category = category;
        }

        // Query database
        const products = await db.collection('products')
          .find(filter)
          .limit(limit)
          .toArray();

        return products.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          category: p.category,
          inStock: p.stock > 0,
          stock: p.stock,
          imageUrl: p.imageUrl
        }));
      }
    );

    // Function 3: Get Customer Orders
    this.register(
      'getCustomerOrders',
      {
        description: 'Retrieves all orders for a specific customer',
        parameters: [
          {
            name: 'email',
            type: 'string',
            description: 'Customer email address',
            required: true
          },
          {
            name: 'limit',
            type: 'number',
            description: 'Maximum number of orders to return (default: 10)',
            required: false
          }
        ],
        returns: 'Array of customer orders with status and details'
      },
      async (params, db) => {
        const { email, limit = 10 } = params;
        
        // Find customer by email
        const customer = await db.collection('customers').findOne({ email });
        
        if (!customer) {
          throw new Error(`Customer with email ${email} not found`);
        }

        // Get customer's orders
        const orders = await db.collection('orders')
          .find({ customerId: customer._id.toString() })
          .sort({ createdAt: -1 })
          .limit(limit)
          .toArray();

        return orders.map(o => ({
          orderId: o._id,
          status: o.status,
          total: o.total,
          itemCount: o.items.length,
          createdAt: o.createdAt,
          estimatedDelivery: o.estimatedDelivery
        }));
      }
    );
  }

  /**
   * Clear execution logs (for testing/cleanup)
   */
  clearLogs() {
    this.executionLog = [];
  }

/**
 * Get recent execution logs
 * @param {number} limit - Number of recent logs to return
 * @returns {Array}
 */
getRecentLogs(limit = 20) {
  return this.executionLog
    .slice(-limit)
    .reverse();
}

/**
 * Validate parameters against schema
 * @private
 */
validateParams(params, schemaParams) {
    for (const param of schemaParams) {
      if (param.required && !(param.name in params)) {
        return {
          valid: false,
          error: `Missing required parameter: ${param.name}`
        };
      }

      if (param.name in params && param.type) {
        const actualType = typeof params[param.name];
        if (actualType !== param.type) {
          return {
            valid: false,
            error: `Parameter '${param.name}' must be of type ${param.type}, got ${actualType}`
          };
        }
      }
    }

    return { valid: true };
}

/* @param {string} name - Function name
 * @param {Object} schema - Function schema (params, description)
 * @param {Function} implementation - The actual function to execute
 */
register(name, schema, implementation) {
    if (this.functions.has(name)) {
      throw new Error(`Function '${name}' is already registered`);
    }

    this.functions.set(name, {
      name,
      schema,
      implementation,
      callCount: 0,
      lastCalled: null
    });

    console.log(`✓ Registered function: ${name}`);
  }

  /**
   * Execute a function by name
   * @param {string} name - Function name
   * @param {Object} params - Function parameters
   * @returns {Promise<Object>} - { success: boolean, data: any, error: string }
   */
  async execute(name, params = {}) {
    const func = this.functions.get(name);
    
    if (!func) {
      return {
        success: false,
        error: `Function '${name}' not found`,
        data: null
      };
    }

    // Validate parameters against schema
    const validation = this.validateParams(params, func.schema.parameters);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
        data: null
      };
    }

    try {
      const startTime = Date.now();
      const result = await func.implementation(params, this.db);
      const duration = Date.now() - startTime;

      // Update stats
      func.callCount++;
      func.lastCalled = new Date();

      // Log execution
      this.executionLog.push({
        function: name,
        params,
        success: true,
        duration,
        timestamp: new Date()
      });

      return {
        success: true,
        data: result,
        error: null,
        executionTime: duration
      };
    } catch (error) {
      console.error(`Function '${name}' execution failed:`, error);
      
      this.executionLog.push({
        function: name,
        params,
        success: false,
        error: error.message,
        timestamp: new Date()
      });

      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  /**
   * Get all function schemas (for LLM context)
   * @returns {Array} - Array of function schemas
   */
  getAllSchemas() {
    return Array.from(this.functions.values()).map(func => ({
      name: func.name,
      ...func.schema
    }));
  }

  /**
   * Get function statistics
   * @returns {Object} - Usage statistics
   */
  getStats() {
    const stats = {
      totalFunctions: this.functions.size,
      totalCalls: this.executionLog.length,
      successRate: 0,
      functions: []
    };

    const successfulCalls = this.executionLog.filter(log => log.success).length;
    stats.successRate = this.executionLog.length > 0 
      ? (successfulCalls / this.executionLog.length * 100).toFixed(2) + '%'
      : '0%';

    for (const [name, func] of this.functions) {
      stats.functions.push({
        name,
        callCount: func.callCount,
        lastCalled: func.lastCalled
      });
    }

      return stats;
    }
  }
  
export default FunctionRegistry; 
