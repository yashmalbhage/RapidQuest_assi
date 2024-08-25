import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import TotalSales from './pages/TotalSales';
import SalesGrowth from './pages/SalesGrowth';
import NewCustomers from './pages/NewCustomers';
import RepeatCustomers from './pages/RepeatCustomer';
import GeographicalDistribution from './pages/GeographicalDistribution';
import CustomerLifetimeValue from './pages/CustomerLifetimeValue';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<TotalSales />} />
            <Route path="/sales-growth" element={<SalesGrowth />} />
            <Route path="/new-customers" element={<NewCustomers />} />
            <Route path="/repeat-customers" element={<RepeatCustomers />} />
            <Route path="/geographical-distribution" element={<GeographicalDistribution />} />
            <Route path="/customer-lifetime-value" element={<CustomerLifetimeValue />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;