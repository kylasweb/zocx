import React, { useState } from 'react';
import { Select, Progress, Card } from '../ui';
import { usePortfolio } from '../../hooks/usePortfolio';

export const AIWealthAdvisor = () => {
  const { portfolio } = usePortfolio();
  const [riskProfile, setRiskProfile] = useState('moderate');
  
  const allocation = calculateAllocation(riskProfile, portfolio);

  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 
      backdrop-blur-sm border border-white/20 shadow-xl 
      hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
        AI Investment Strategy
      </h3>
      
      <div className="space-y-4">
        <Select
          label="Risk Profile"
          options={['Conservative', 'Moderate', 'Aggressive']}
          value={riskProfile}
          onChange={setRiskProfile}
          className="bg-white/90 backdrop-blur-sm"
        />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>HYIP Allocation</span>
            <span className="font-mono">{allocation.hyip}%</span>
          </div>
          <Progress value={allocation.hyip} className="h-2 bg-blue-100" />
        </div>
      </div>
    </Card>
  );
};

const calculateAllocation = (profile: string, portfolio: any) => {
  const profiles = {
    conservative: { hyip: 40, bonds: 60 },
    moderate: { hyip: 65, bonds: 35 },
    aggressive: { hyip: 85, bonds: 15 }
  };
  
  return profiles[profile.toLowerCase()] || profiles.moderate;
}; 