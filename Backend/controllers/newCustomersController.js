const Customer = require('../models/Customer');
const { getDateRange } = require('../utils/dateUtils');

exports.getNewCustomers = async(req, res, next) => {
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
                        {
                            $toString: {
                                $ceil: {
                                    $divide: [{ $month: "$created_at" }, 3]
                                }
                            }
                        }
                    ]
                };
                break;
            case 'yearly':
                groupBy = { $dateToString: { format: "%Y", date: "$created_at" } };
                break;
            default:
                groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$created_at" } };
        }

        const newCustomers = await Customer.aggregate([
            { $match: { created_at: { $gte: start, $lte: end } } },
            {
                $group: {
                    _id: groupBy,
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(newCustomers);
    } catch (error) {
        next(error);
    }
};