import { Button } from '../ui/button';
import { LogicRule } from './LogicGenerator';

const PRESETS = [
  {
    name: "Starter Growth",
    rules: [
      {
        name: "Weekly Boost",
        period: 'weekly',
        changeType: 'increase',
        percentage: 15,
        dayRange: [1, 7],
        outcome: 'win'
      },
      {
        name: "Mid-Month Stability",
        period: 'monthly', 
        changeType: 'static',
        percentage: 0,
        dayRange: [15, 30],
        outcome: 'win'
      }
    ] as LogicRule[]
  },
  {
    name: "Aggressive Trader",
    rules: [
      {
        name: "Early Surge",
        period: 'daily',
        changeType: 'increase',
        percentage: 25,
        dayRange: [1, 5],
        outcome: 'win'
      },
      {
        name: "Profit Lock",
        period: 'daily',
        changeType: 'decrease', 
        percentage: 10,
        dayRange: [6, 10],
        outcome: 'loss'
      }
    ] as LogicRule[]
  },
  {
    name: "Long-Term Investor",
    rules: [
      {
        name: "Quarterly Growth",
        period: 'monthly',
        changeType: 'increase',
        percentage: 8,
        dayRange: [1, 90],
        outcome: 'win'
      }
    ] as LogicRule[]
  }
];

export const PresetTemplates = ({ onApply }: { 
  onApply: (rules: LogicRule[]) => void 
}) => (
  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
    <h3 className="font-medium">Strategy Templates</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {PRESETS.map(preset => (
        <div key={preset.name} className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-medium mb-2">{preset.name}</h4>
          <ul className="text-sm space-y-1 mb-4">
            {preset.rules.map((rule, i) => (
              <li key={i} className="flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
                {rule.name} ({rule.percentage}%)
              </li>
            ))}
          </ul>
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => onApply(preset.rules)}
          >
            Apply Template
          </Button>
        </div>
      ))}
    </div>
  </div>
); 