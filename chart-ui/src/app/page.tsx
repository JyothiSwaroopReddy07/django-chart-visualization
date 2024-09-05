// src/app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import CandleStickChart from './components/CandleStickChart';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import styles from './Dashboard.module.css'; 

const Dashboard: React.FC = () => {
  const [activeChart, setActiveChart] = useState('candlestick');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      // Reset animation state after the animation duration
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleChartChange = (chartType: string) => {
    if (chartType !== activeChart) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveChart(chartType);
      }, 300); 
    }
  };

  const renderActiveChart = () => {
    switch (activeChart) {
      case 'candlestick':
        return <CandleStickChart />;
      case 'line':
        return <LineChart />;
      case 'bar':
        return <BarChart />;
      case 'pie':
        return <PieChart />;
      default:
        return <CandleStickChart />;
    }
  };

  return (
    <div className={styles.container}>

      <nav className={styles.navbar}>
        <button
          className={activeChart === 'candlestick' ? styles.activeButton : styles.navButton}
          onClick={() => handleChartChange('candlestick')}
        >
          Candlestick Chart
        </button>
        <button
          className={activeChart === 'line' ? styles.activeButton : styles.navButton}
          onClick={() => handleChartChange('line')}
        >
          Line Chart
        </button>
        <button
          className={activeChart === 'bar' ? styles.activeButton : styles.navButton}
          onClick={() => handleChartChange('bar')}
        >
          Bar Chart
        </button>
        <button
          className={activeChart === 'pie' ? styles.activeButton : styles.navButton}
          onClick={() => handleChartChange('pie')}
        >
          Pie Chart
        </button>
      </nav>

      {/* Chart Display with Animation */}
      <div className={`${styles.chartContainer} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
        {renderActiveChart()}
      </div>
    </div>
  );
};

export default Dashboard;
