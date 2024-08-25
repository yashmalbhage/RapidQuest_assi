const Customer = require('../models/Customer');

exports.getGeographicalDistribution = async(req, res, next) => {
    try {
        const distribution = await Customer.aggregate([{
                $group: {
                    _id: "$default_address.city",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.json(distribution);
    } catch (error) {
        next(error);
    }
};