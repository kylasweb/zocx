import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';

interface BarChartProps {
  data: Array<{
    time: string;
    value: number;
  }>;
  colors?: {
    backgroundColor?: string;
    barUpColor?: string;
    barDownColor?: string;
    textColor?: string;
  };
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  colors = {
    backgroundColor: 'white',
    barUpColor: '#10B981',
    barDownColor: '#EF4444',
    textColor: 'black',
  },
  height = 300,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: height,
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.3)',
        },
      },
    });

    const barSeries = chart.addHistogramSeries({
      color: colors.barUpColor,
    });

    barSeries.setData(data);

    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    chartRef.current = chart;

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, colors, height]);

  return <div ref={chartContainerRef} />;
};

export default BarChart;