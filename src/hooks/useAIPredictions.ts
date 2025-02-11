import { useEffect, useState } from 'react';
import { usePortfolio } from './usePortfolio';

interface Prediction {
  date: Date;
  predictedValue: number;
  confidence: number;
}

export const useAIPredictions = () => {
  const { portfolio } = usePortfolio();
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    // Simulate ML model predictions
    const generatePredictions = () => {
      const newPredictions = [];
      let currentValue = portfolio.totalValue;
      
      for (let i = 0; i < 7; i++) { // 7-day forecast
        currentValue *= 1 + (Math.random() * 0.03 - 0.01);
        newPredictions.push({
          date: new Date(Date.now() + (i * 86400000)),
          predictedValue: currentValue,
          confidence: Math.random() * 0.4 + 0.6 // 60-100% confidence
        });
      }
      
      setPredictions(newPredictions);
    };

    generatePredictions();
  }, [portfolio.totalValue]);

  return { predictions };
}; 