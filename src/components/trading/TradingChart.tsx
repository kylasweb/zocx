import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

interface TradingChartProps {
  pair: string;
}

const TradingChart: React.FC<TradingChartProps> = ({ pair }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#333',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });

    // Create candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    // Add sample data
    const data = generateSampleData();
    candlestickSeries.setData(data);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    const volumeData = data.map(item => ({
      time: item.time,
      value: item.volume || Math.random() * 100,
      color: item.close >= item.open ? '#26a69a' : '#ef5350',
    }));
    volumeSeries.setData(volumeData);

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    chartRef.current = chart;

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [pair]);

  return (
    <div className="w-full">
      <div ref={chartContainerRef} />
    </div>
  );
};

// Helper function to generate sample data
const generateSampleData = () => {
  const data = [];
  const numberOfPoints = 100;
  let basePrice = 100;
  let time = new Date();
  time.setUTCHours(0, 0, 0, 0);
  let baseTimestamp = time.getTime() / 1000;

  for (let i = 0; i < numberOfPoints; i++) {
    const open = basePrice + (Math.random() - 0.5) * 2;
    const high = open + Math.random() * 2;
    const low = open - Math.random() * 2;
    const close = (high + low) / 2;
    basePrice = close;

    data.push({
      time: baseTimestamp + i * 86400,
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000),
    });
  }

  return data;
};

export default TradingChart;