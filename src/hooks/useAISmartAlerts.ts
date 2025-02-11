import { useEffect } from 'react';
import { usePortfolio } from './usePortfolio';
import { useNetworkStore } from '../store/networkStore';

export const useAISmartAlerts = () => {
  const { portfolio } = usePortfolio();
  const { networkStats } = useNetworkStore();

  useEffect(() => {
    const checkConditions = () => {
      // Portfolio-based alerts
      if (portfolio.totalValue < 10000) {
        triggerAlert('Consider increasing your investment to reach minimum benefits');
      }
      
      // Network-based alerts
      if (networkStats.leftLegCount - networkStats.rightLegCount > 5) {
        triggerAlert('Your network is unbalanced - focus on right leg growth');
      }
    };

    const interval = setInterval(checkConditions, 300000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, [portfolio, networkStats]);

  const triggerAlert = (message: string) => {
    // Integrate with notification system
    console.log('AI Alert:', message);
    // Add actual notification dispatch here
  };

  return { triggerAlert };
}; 