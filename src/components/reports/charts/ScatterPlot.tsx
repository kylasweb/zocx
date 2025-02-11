import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';

interface ScatterPlotProps {
  data: Array<{
    time: string;
    value: number;
    size?: number;
  }>;
  colors?: {
    backgroundColor?: string;
    pointColor?: string;
    textColor?: string;
  };
  height?: number;
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  colors = {
    backgroundColor: 'white',
    pointColor: '#6366F1',
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

    const scatterSeries = chart.addLineSeries({
      color: colors.pointColor,
      lineWidth: 0,
      pointMarkersVisible: true,
      pointMarkersRadius: 4,
    });

    scatterSeries.setData(data);

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

export default ScatterPlot;