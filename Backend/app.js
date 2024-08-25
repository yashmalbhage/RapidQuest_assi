const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const totalSalesRoutes = require('./routes/totalSales');
const salesGrowthRoutes = require('./routes/salesGrowth');
const newCustomersRoutes = require('./routes/newCustomers');
const repeatCustomersRoutes = require('./routes/repeatCustomers');
const geographicalDistributionRoutes = require('./routes/geographicalDistribution');
const customerLifetimeValueRoutes = require('./routes/customerLifetimeValue');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/total-sales', totalSalesRoutes);
app.use('/api/sales-growth', salesGrowthRoutes);
app.use('/api/new-customers', newCustomersRoutes);
app.use('/api/repeat-customers', repeatCustomersRoutes);
app.use('/api/geographical-distribution', geographicalDistributionRoutes);
app.use('/api/customer-lifetime-value', customerLifetimeValueRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;