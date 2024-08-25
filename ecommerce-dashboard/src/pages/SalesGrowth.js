import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartContainer from '../components/ChartContainer';

const SalesGrowth = () => {
  const [data, setData] = useState(null);
  const [interval, setInterval] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rapid-quest-assi-back.vercel.app/api/sales-growth/${interval}`);
        const chartData = {
          labels: response.data.map(item => item._id),
          datasets: [
            {
              label: 'Sales Growth Rate (%)',
              data: response.data.map(item => item.growthRate),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
      <h2 className="text-2xl font-bold">Sales Growth Rate Over Time</h2>
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
      {data && <ChartContainer title="Sales Growth Rate" data={data} />}
    </div>
  );
};

export default SalesGrowth;