const RuleTimeline = ({ rules }: { rules: LogicRule[] }) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto p-4 bg-gray-50 rounded-lg">
      <div className="flex" style={{ width: `${30 * 40}px` }}>
        {days.map(day => (
          <div key={day} className="w-10 h-10 border-r flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      {rules.map((rule, idx) => (
        <div 
          key={idx}
          className="h-8 bg-blue-100 rounded absolute"
          style={{ 
            marginLeft: `${(rule.dayRange[0] - 1) * 40}px`,
            width: `${(rule.dayRange[1] - rule.dayRange[0] + 1) * 40}px`
          }}
        >
          <div className="text-xs p-1 truncate">
            {rule.name} ({rule.percentage}%)
          </div>
        </div>
      ))}
    </div>
  );
}; 