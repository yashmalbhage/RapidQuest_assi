const Order = require('../models/Order');
const { getDateRange } = require('../utils/dateUtils');

exports.getTotalSales = async(req, res, next) => {
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
                        { $dateToString: { format: "%Y-", date: "$created_at" } },
                        { $substr: [{ $add: [{ $divide: [{ $month: "$created_at" }, 3] }, 0.1] }, 0, 1] }
                    ]
                };
                break;
            case 'yearly':
                groupBy = { $dateToString: { format: "%Y", date: "$created_at" } };
                break;
            default:
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
        }

        const sales = await Order.aggregate([{
                $addFields: {
                    created_at: {
                        $dateFromString: {
                            dateString: "$created_at"
                        }
                    }
                }
            },
            { $match: { created_at: { $gte: start, $lte: end } } },
            {
                $group: {
                    _id: groupBy,
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(sales);
    } catch (error) {
        next(error);
    }
};