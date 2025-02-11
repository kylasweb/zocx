import { useState, useEffect } from 'react';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState({
    totalValue: 150000,
    hyipAllocation: 65,
    bondsAllocation: 35
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolio(prev => ({
        ...prev,
        totalValue: prev.totalValue * (1 + (Math.random() * 0.02 - 0.01))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { portfolio };
}; 