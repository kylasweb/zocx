import React, { useState } from 'react';
import { Select, Progress } from '@/components/ui/select';

const AIWealthAdvisor = () => {
  const [riskProfile, setRiskProfile] = useState('moderate');
  
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">AI Investment Strategy</h3>
      <Select
        label="Risk Tolerance"
        options={['Conservative', 'Moderate', 'Aggressive']}
        value={riskProfile}
        onChange={setRiskProfile}
      />
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <span>Recommended Allocation:</span>
          <span className="font-mono">65% HYIP / 35% Bonds</span>
        </div>
        <Progress value={65} className="h-2" />
      </div>
    </div>
  );
};

export default AIWealthAdvisor; 