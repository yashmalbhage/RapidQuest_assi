const Order = require('../models/Order');
const { getDateRange } = require('../utils/dateUtils');

exports.getRepeatCustomers = async(req, res, next) => {
    try {
        const { interval } = req.params;
        const { start, end } = getDateRange(interval);

        let groupBy;
        switch (interval) {
            case 'daily':
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
                break;
            case 'monthly':
                groupBy = { $dateToString: { format: "%Y-%m", date: "$created_at" } };
                break;
            case 'quarterly':
                groupBy = {
                    $concat: [
                        { $dateToString: { format: "%Y-Q", date: "$created_at" } },
                        { $toString: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } } }
                    ]
                };
                break;
            case 'yearly':
                groupBy = { $dateToString: { format: "%Y", date: "$created_at" } };
                break;
            default:
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
        }

        const repeatCustomers = await Order.aggregate([
            { $match: { created_at: { $gte: start, $lte: end } } },
            {
                $group: {
                    _id: { timePeriod: groupBy, customer: "$customer.id" },
                    orderCount: { $sum: 1 }
                }
            },
            {
                $match: { orderCount: { $gt: 1 } }
            },
            {
                $group: {
                    _id: "$_id.timePeriod",
                    repeatCustomers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(repeatCustomers);
    } catch (error) {
        next(error);
    }
};