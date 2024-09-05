// src/app/components/CandlestickChart.tsx
"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchCandlestickData } from '../store/chartSlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Title,
  Legend,
  ChartOptions,
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import { Chart } from 'react-chartjs-2';
import 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

// Register necessary components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Title,
  Legend
);

const CandleStickChart = () => {
  const dispatch = useAppDispatch();
  const { candlestick, loading, error } = useSelector((state: RootState) => state.charts);

  useEffect(() => {
    dispatch(fetchCandlestickData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!candlestick || !candlestick.data || candlestick.data.length === 0) return <p>No data available</p>;

  const chartData = {
    datasets: [
      {
        label: 'Candlestick Data',
        data: candlestick.data.map((d: any) => ({
          x: new Date(d.x),  // Ensure x is a Date object
          o: d.open,
          h: d.high,
          l: d.low,
          c: d.close,
        })),
        borderColor: '#3e95cd',
        backgroundColor: '#8e5ea2',
      },
    ],
  };

  const options: ChartOptions<'candlestick'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',  // This is crucial to handle time-based data
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Candlestick Chart',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Chart type="candlestick" data={chartData} options={options} />
    </div>
  );
};

export default CandleStickChart;
