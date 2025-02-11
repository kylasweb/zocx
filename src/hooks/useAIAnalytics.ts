import { useEffect, useState } from 'react';
import { usePortfolio } from './usePortfolio';

interface Insight {
  title: string;
  description: string;
  action?: string;
}

export const useAIAnalytics = () => {
  const { portfolio } = usePortfolio();
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const generateInsights = () => {
      const newInsights: Insight[] = [];
      
      if (portfolio.hyipAllocation > 70) {
        newInsights.push({
          title: "High Risk Exposure",
          description: "Your portfolio has significant HYIP allocation",
          action: "Consider diversifying with bonds"
        });
      }
      
      if (portfolio.totalValue > 50000) {
        newInsights.push({
          title: "Premium Tier Unlocked",
          description: "You qualify for exclusive investment opportunities",
          action: "View premium options"
        });
      }

      setInsights(newInsights);
    };

    generateInsights();
    const interval = setInterval(generateInsights, 3600000); // Refresh hourly
    return () => clearInterval(interval);
  }, [portfolio]);

  return { insights };
}; 