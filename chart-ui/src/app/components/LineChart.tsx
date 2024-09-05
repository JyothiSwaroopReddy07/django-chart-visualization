// src/app/components/LineChart.tsx
"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchLineData } from '../store/chartSlice';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the core Chart.js functionality

const LineChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { line, loading, error } = useSelector((state: RootState) => state.charts);

  useEffect(() => {
    dispatch(fetchLineData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!line) return null;

  const chartData = {
    labels: line.labels,
    datasets: [
      {
        label: 'Line Chart Data',
        data: line.data,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
