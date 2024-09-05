// app/components/PieChart.tsx
"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchPieData } from '../store/chartSlice';
import { Pie } from 'react-chartjs-2';

const PieChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pie, loading, error } = useSelector((state: RootState) => state.charts);

  useEffect(() => {
    dispatch(fetchPieData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pie) return null;

  const chartData = {
    labels: pie.labels,
    datasets: [
      {
        label: 'Pie Chart Data',
        data: pie.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
