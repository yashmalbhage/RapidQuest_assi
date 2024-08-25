import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartContainer from '../components/ChartContainer';

const NewCustomers = () => {
  const [data, setData] = useState(null);
  const [interval, setInterval] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/new-customers/${interval}`);
        const chartData = {
          labels: response.data.map(item => item._id),
          datasets: [
            {
              label: 'New Customers',
              data: response.data.map(item => item.count),
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              tension: 0.1
            }
          ]
        };
        setData(chartData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      }
      setIsLoading(false);
    };
    fetchData();
  }, [interval]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">New Customers Added Over Time</h2>
      <select 
        value={interval} 
        onChange={(e) => setInterval(e.target.value)}
        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {data && <ChartContainer title="New Customers" data={data} />}
    </div>
  );
};

export default NewCustomers;