import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartContainer from '../components/ChartContainer';

const GeographicalDistribution = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/geographical-distribution');
        const chartData = {
          labels: response.data.map(item => item._id),
          datasets: [
            {
              label: 'Customer Count',
              data: response.data.map(item => item.count),
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
              borderColor: 'rgb(153, 102, 255)',
              borderWidth: 1
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
      <h2 className="text-2xl font-bold">Geographical Distribution of Customers</h2>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {data && <ChartContainer title="Geographical Distribution" data={data} type="bar" />}
    </div>
  );
};

export default GeographicalDistribution;