const Order = require('../models/Order');
const { getDateRange } = require('../utils/dateUtils');

exports.getSalesGrowth = async(req, res, next) => {
    try {
        const { interval } = req.params;
        const { start, end } = getDateRange(interval);

        let groupBy;
        switch (interval) {
            case 'daily':
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$created_at" } } };
                break;
            case 'monthly':
                groupBy = { $dateToString: { format: "%Y-%m", date: { $toDate: "$created_at" } } };
                break;
            case 'quarterly':
                groupBy = {
                    $concat: [
                        { $dateToString: { format: "%Y-", date: { $toDate: "$created_at" } } },
                        { $substr: [{ $add: [{ $divide: [{ $month: { $toDate: "$created_at" } }, 3] }, 0.1] }, 0, 1] }
                    ]
                };
                break;
            case 'yearly':
                groupBy = { $dateToString: { format: "%Y", date: { $toDate: "$created_at" } } };
                break;
            default:
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$created_at" } } };
        }

        const sales = await Order.aggregate([
            { $match: { created_at: { $gte: start, $lte: end } } },
            {
                $group: {
                    _id: groupBy,
                    totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const salesGrowth = sales.map((sale, index) => {
            if (index === 0) return {...sale, growthRate: 0 };
            const previousSale = sales[index - 1].totalSales;
            const growthRate = ((sale.totalSales - previousSale) / previousSale) * 100;
            return {...sale, growthRate };
        });

        res.json(salesGrowth);
    } catch (error) {
        next(error);
    }
};