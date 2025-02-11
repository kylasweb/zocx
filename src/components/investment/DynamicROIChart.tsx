```typescript
import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

interface DynamicROIChartProps {
  data: Array<{
    time: string;
    value: number;
  }>;
  height?: number;
}

const DynamicROIChart: React.FC<DynamicROIChartProps> = ({
  data,
  height = 300,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current?.clientWidth || 0,
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: 'black',
      },
      width: chartContainerRef.current.clientWidth,
      height: height,
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: '#2563eb',
      topColor: 'rgba(37, 99, 235, 0.4)',
      bottomColor: 'rgba(37, 99, 235, 0.1)',
    });

    areaSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, height]);

  return <div ref={chartContainerRef} />;
};

export default DynamicROIChart;
```