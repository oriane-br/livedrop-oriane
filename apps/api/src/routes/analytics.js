import express from 'express';
import Order from '../models/order.js';

const router = express.Router();


// GET /api/analytics/daily-revenue?from=2025-10-01&to=2025-10-14
router.get('/daily-revenue', async (req, res, next) => {
  try {
    const { from, to } = req.query;

    // Validate dates
    if (!from || !to) {
      return res.status(400).json({
        error: 'Both from and to date parameters are required (YYYY-MM-DD)',
        code: 'MISSING_DATES'
      });
    }

    const startDate = new Date(from);
    const endDate = new Date(to);
    endDate.setHours(23, 59, 59, 999); // End of day

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({
        error: 'Invalid date format. Use YYYY-MM-DD',
        code: 'INVALID_DATE'
      });
    }

    // MongoDB Aggregation Pipeline
    const dailyData = await Order.aggregate([
      // Match orders in date range (exclude cancelled if you add that status later)
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      // Group by date
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      },
      // Sort by date
      {
        $sort: { _id: 1 }
      },
      // Reshape output
      {
        $project: {
          _id: 0,
          date: '$_id',
          revenue: { $round: ['$revenue', 2] },
          orderCount: 1
        }
      }
    ]);

    // Calculate summary
    const summary = dailyData.reduce(
      (acc, day) => ({
        totalRevenue: acc.totalRevenue + day.revenue,
        totalOrders: acc.totalOrders + day.orderCount
      }),
      { totalRevenue: 0, totalOrders: 0 }
    );

    summary.totalRevenue = Math.round(summary.totalRevenue * 100) / 100;
    summary.avgOrderValue = summary.totalOrders > 0 
      ? Math.round((summary.totalRevenue / summary.totalOrders) * 100) / 100 
      : 0;

    res.json({
      data: dailyData,
      summary
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/analytics/dashboard-metrics
router.get('/dashboard-metrics', async (req, res, next) => {
  try {
    // Get all-time metrics using aggregation
    const metrics = await Order.aggregate([
      {
        $facet: {
          // Total revenue and orders
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
          // Orders by status
          byStatus: [
            {
              $group: {
                _id: '$status',
                count: { $sum: 1 }
              }
            }
          ],
          // Today's revenue
          today: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(new Date().setHours(0, 0, 0, 0))
                }
              }
            },
            {
              $group: {
                _id: null,
                revenue: { $sum: '$total' },
                count: { $sum: 1 }
              }
            }
          ],
          // This week's revenue
          thisWeek: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                }
              }
            },
            {
              $group: {
                _id: null,
                revenue: { $sum: '$total' },
                count: { $sum: 1 }
              }
            }
          ],
          // This month's revenue
          thisMonth: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                }
              }
            },
            {
              $group: {
                _id: null,
                revenue: { $sum: '$total' },
                count: { $sum: 1 }
              }
            }
          ]
        }
      }
    ]);

    const result = metrics[0];

    // Format response
    const response = {
      revenue: {
        total: result.overall[0]?.totalRevenue || 0,
        today: result.today[0]?.revenue || 0,
        thisWeek: result.thisWeek[0]?.revenue || 0,
        thisMonth: result.thisMonth[0]?.revenue || 0
      },
      orders: {
        total: result.overall[0]?.totalOrders || 0,
        today: result.today[0]?.count || 0,
        thisWeek: result.thisWeek[0]?.count || 0,
        thisMonth: result.thisMonth[0]?.count || 0
      },
      ordersByStatus: result.byStatus.reduce((acc, item) => {
        acc[item._id.toLowerCase()] = item.count;
        return acc;
      }, { pending: 0, processing: 0, shipped: 0, delivered: 0 }),
      avgOrderValue: result.overall[0]?.avgOrderValue || 0
    };

    // Round all numbers to 2 decimals
    response.revenue.total = Math.round(response.revenue.total * 100) / 100;
    response.revenue.today = Math.round(response.revenue.today * 100) / 100;
    response.revenue.thisWeek = Math.round(response.revenue.thisWeek * 100) / 100;
    response.revenue.thisMonth = Math.round(response.revenue.thisMonth * 100) / 100;
    response.avgOrderValue = Math.round(response.avgOrderValue * 100) / 100;

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default router;