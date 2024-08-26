import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartContainer from '../components/ChartContainer';

const CustomerLifetimeValue = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://rapid-quest-assi-back.vercel.app/api/customer-lifetime-value');
        const chartData = {
          labels: response.data.map(item => item._id),
          datasets: [
            {
              label: 'Average Lifetime Value',
              data: response.data.map(item => item.averageLTV),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Customer Lifetime Value by Cohorts</h2>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {data && <ChartContainer title="Customer Lifetime Value" data={data} />}
    </div>
  );
};

export default CustomerLifetimeValue;