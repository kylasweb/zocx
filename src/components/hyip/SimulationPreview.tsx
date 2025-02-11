import { LogicRule } from './LogicGenerator';

export const SimulationPreview = ({ rules }: { rules: LogicRule[] }) => {
  const simulate = (days: number = 10) => {
    let balance = 1000;
    return Array.from({ length: days }, (_, day) => {
      rules.forEach(rule => {
        if (day >= rule.dayRange[0] && day <= rule.dayRange[1]) {
          balance += balance * (rule.percentage / 100);
        }
      });
      return balance;
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h4 className="font-medium mb-2">10-Day Simulation Preview</h4>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {simulate().map((value, day) => (
          <div key={day} className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
            <div className="text-xs text-gray-600">Day {day + 1}</div>
            <div className="text-sm font-mono text-green-600">
              ${value.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 