import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '../contexts/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartContainer = ({ title, data, type = 'line' }) => {
  const { isDarkMode } = useTheme();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)',
        },
      },
      title: {
        display: true,
        text: title,
        color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)',
        },
        grid: {
          color: isDarkMode ? 'rgba(229, 231, 235, 0.1)' : 'rgba(17, 24, 39, 0.1)',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? 'rgb(229, 231, 235)' : 'rgb(17, 24, 39)',
        },
        grid: {
          color: isDarkMode ? 'rgba(229, 231, 235, 0.1)' : 'rgba(17, 24, 39, 0.1)',
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      {type === 'line' ? (
        <Line options={options} data={data} />
      ) : (
        <Bar options={options} data={data} />
      )}
    </div>
  );
};

export default ChartContainer;