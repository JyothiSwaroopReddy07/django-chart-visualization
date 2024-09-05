// app/components/BarChart.tsx
"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchBarData } from '../store/chartSlice';
import { Bar } from 'react-chartjs-2';

const BarChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bar, loading, error } = useSelector((state: RootState) => state.charts);

  useEffect(() => {
    dispatch(fetchBarData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!bar) return null;

  const chartData = {
    labels: bar.labels,
    datasets: [
      {
        label: 'Bar Chart Data',
        data: bar.data,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
