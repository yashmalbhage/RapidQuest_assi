const Order = require('../models/Order');

exports.getCustomerLifetimeValue = async(req, res, next) => {
    try {
        const cohorts = await Order.aggregate([{
                $group: {
                    _id: {
                        customer: "$customer.id",
                        cohort: { $dateToString: { format: "%Y-%m", date: "$created_at" } }
                    },
                    totalSpent: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
                }
            },
            {
                $group: {
                    _id: "$_id.cohort",
                    averageLTV: { $avg: "$totalSpent" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(cohorts);
    } catch (error) {
        next(error);
    }
};