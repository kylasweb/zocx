import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';

interface LineChartProps {
  data: Array<{
    time: string;
    value: number;
  }>;
  colors?: {
    backgroundColor?: string;
    lineColor?: string;
    textColor?: string;
    areaTopColor?: string;
    areaBottomColor?: string;
  };
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  colors = {
    backgroundColor: 'white',
    lineColor: '#2563eb',
    textColor: 'black',
    areaTopColor: '#2563eb',
    areaBottomColor: 'rgba(37, 99, 235, 0.1)',
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

    const areaSeries = chart.addAreaSeries({
      lineColor: colors.lineColor,
      topColor: colors.areaTopColor,
      bottomColor: colors.areaBottomColor,
    });

    areaSeries.setData(data);

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

export default LineChart;