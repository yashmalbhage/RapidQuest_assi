import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-lg p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-commerce Dashboard</h1>
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto`}>
          <ul className="p-4">
            <li><Link to="/" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Total Sales</Link></li>
            <li><Link to="/sales-growth" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Sales Growth</Link></li>
            <li><Link to="/new-customers" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">New Customers</Link></li>
            <li><Link to="/repeat-customers" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Repeat Customers</Link></li>
            <li><Link to="/geographical-distribution" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Geographical Distribution</Link></li>
            <li><Link to="/customer-lifetime-value" className="block py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">Customer Lifetime Value</Link></li>
          </ul>
        </nav>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;