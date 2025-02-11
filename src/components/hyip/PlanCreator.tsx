import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { LogicGenerator } from './LogicGenerator';
import { PresetTemplates } from './PresetTemplates';

interface InvestmentPlan {
  name: string;
  roi: { base: number; volatility: number; marketFactor: number };
  duration: number;
  minDeposit: number;
  maxDeposit: number;
  liquidityPool: number;
  riskModel: string;
  logicRules: LogicRule[];
}

const PlanCreator = () => {
  const [plan, setPlan] = useState<InvestmentPlan>({
    name: '',
    roi: { base: 5, volatility: 2, marketFactor: 1.2 },
    duration: 30,
    minDeposit: 100,
    maxDeposit: 10000,
    liquidityPool: 20,
    riskModel: 'dynamic',
    logicRules: []
  });

  const calculateProjectedROI = () => {
    let total = plan.roi.base * plan.roi.marketFactor;
    let dailyROI = [total];
    
    plan.logicRules.forEach(rule => {
      for (let day = rule.dayRange[0]; day <= rule.dayRange[1]; day++) {
        const change = rule.changeType === 'increase' ? rule.percentage :
                      rule.changeType === 'decrease' ? -rule.percentage : 0;
        total += (total * change) / 100;
        dailyROI[day] = total;
      }
    });

    return {
      total: total + (Math.random() * plan.roi.volatility),
      dailyBreakdown: dailyROI
    };
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">AI Investment Plan Creator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Plan Name</Label>
          <Input value={plan.name} onChange={e => setPlan({...plan, name: e.target.value})} />
        </div>
        
        <div className="space-y-2">
          <Label>ROI Parameters</Label>
          <div className="flex gap-2">
            <Input type="number" value={plan.roi.base} 
              onChange={e => setPlan({...plan, roi: {...plan.roi, base: +e.target.value}})} />
            <Input type="number" value={plan.roi.volatility} 
              onChange={e => setPlan({...plan, roi: {...plan.roi, volatility: +e.target.value}})} />
            <Input type="number" step="0.1" value={plan.roi.marketFactor} 
              onChange={e => setPlan({...plan, roi: {...plan.roi, marketFactor: +e.target.value}})} />
          </div>
        </div>

        <div>
          <Label>Deposit Range ($)</Label>
          <div className="flex gap-2">
            <Input type="number" value={plan.minDeposit} 
              onChange={e => setPlan({...plan, minDeposit: +e.target.value})} />
            <Input type="number" value={plan.maxDeposit} 
              onChange={e => setPlan({...plan, maxDeposit: +e.target.value})} />
          </div>
        </div>

        <div className="space-y-6">
          <PresetTemplates 
            onApply={templateRules => setPlan({
              ...plan,
              logicRules: [...plan.logicRules, ...templateRules]
            })} 
          />
          
          <LogicGenerator
            rules={plan.logicRules}
            setRules={rules => setPlan({...plan, logicRules: rules})}
          />
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Projected Returns</h4>
        <div className="flex justify-between">
          <span>30 Days:</span>
          <Badge variant="success">
            {calculateProjectedROI().total.toFixed(2)}%
          </Badge>
        </div>
      </div>

      <Button className="w-full">Create AI Investment Plan</Button>
    </div>
  );
}; 