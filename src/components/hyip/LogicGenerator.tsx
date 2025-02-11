import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { PresetTemplates } from './PresetTemplates';
import { RuleTimeline } from './RuleTimeline';
import { SimulationPreview } from './SimulationPreview';

interface LogicRule {
  id: string;
  name: string;
  period: 'daily' | 'weekly' | 'monthly';
  dayRange: [number, number];
  changeType: 'static' | 'increase' | 'decrease';
  percentage: number;
  outcome: 'win' | 'loss';
}

const LogicGenerator = ({ rules, setRules }: {
  rules: LogicRule[];
  setRules: React.Dispatch<React.SetStateAction<LogicRule[]>>;
}) => {
  const [editingRule, setEditingRule] = useState<LogicRule | null>(null);
  const [newRule, setNewRule] = useState<Partial<LogicRule>>({
    period: 'daily',
    changeType: 'static',
    outcome: 'win'
  });
  const [showDialog, setShowDialog] = useState(false);

  const validateRule = () => {
    if (!newRule.name?.trim()) return 'Name is required';
    if (!newRule.percentage && newRule.percentage !== 0) return 'Percentage is required';
    if (newRule.dayRange?.[0] >= newRule.dayRange?.[1]) return 'Invalid day range';
    
    if (newRule.percentage < -100 || newRule.percentage > 1000) return 'Percentage must be between -100% and 1000%';
    if (newRule.dayRange?.[1] > 365) return 'Max 365 days duration';
    if (newRule.dayRange?.[0] < 1) return 'Start day must be ≥ 1';
    if (rules.some(r => 
      r.id !== newRule.id && 
      r.period === newRule.period &&
      (
        (newRule.dayRange[0] >= r.dayRange[0] && newRule.dayRange[0] <= r.dayRange[1]) ||
        (newRule.dayRange[1] >= r.dayRange[0] && newRule.dayRange[1] <= r.dayRange[1])
      )
    )) return 'Overlapping day ranges in same period';

    return true;
  };

  const handleSaveRule = () => {
    const validation = validateRule();
    if (typeof validation === 'string') {
      alert(validation);
      return;
    }
    
    const rule: LogicRule = {
      id: editingRule?.id || `rule_${Date.now()}`,
      name: newRule.name!,
      period: newRule.period!,
      dayRange: newRule.dayRange!,
      changeType: newRule.changeType!,
      percentage: newRule.percentage!,
      outcome: newRule.outcome!
    };

    setRules(prev => editingRule 
      ? prev.map(r => r.id === rule.id ? rule : r)
      : [...prev, rule]
    );
    setShowDialog(false);
    setNewRule({});
  };

  return (
    <div className="space-y-6">
      <PresetTemplates onApply={rules => setRules([...rules, ...rules])} />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">ROI Logic Rules</h3>
          <Button onClick={() => setShowDialog(true)}>+ Add Logic</Button>
        </div>

        <RuleTimeline rules={rules} />
        <SimulationPreview rules={rules} />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Days</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>% Change</TableHead>
              <TableHead>Outcome</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map(rule => (
              <TableRow key={rule.id}>
                <TableCell>{rule.name}</TableCell>
                <TableCell>{rule.period}</TableCell>
                <TableCell>{rule.dayRange[0]}-{rule.dayRange[1]}</TableCell>
                <TableCell>
                  <Badge variant={rule.changeType === 'increase' ? 'success' : 'destructive'}>
                    {rule.changeType}
                  </Badge>
                </TableCell>
                <TableCell>{rule.percentage}%</TableCell>
                <TableCell>
                  <Badge variant={rule.outcome === 'win' ? 'success' : 'destructive'}>
                    {rule.outcome}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => {
                    setEditingRule(rule);
                    setNewRule(rule);
                    setShowDialog(true);
                  }}>Edit</Button>
                  <Button variant="ghost" onClick={() => 
                    setRules(rules.filter(r => r.id !== rule.id))}
                  >Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRule ? 'Edit' : 'Add'} Logic Rule</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label>Rule Name</label>
              <input
                value={newRule.name || ''}
                onChange={e => setNewRule({...newRule, name: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Period</label>
                <select
                  value={newRule.period}
                  onChange={e => setNewRule({...newRule, period: e.target.value as any})}
                  className="w-full p-2 border rounded"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label>Day Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Start"
                    value={newRule.dayRange?.[0] || ''}
                    onChange={e => setNewRule({
                      ...newRule,
                      dayRange: [Number(e.target.value), newRule.dayRange?.[1] || 0]
                    })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="End"
                    value={newRule.dayRange?.[1] || ''}
                    onChange={e => setNewRule({
                      ...newRule, 
                      dayRange: [newRule.dayRange?.[0] || 0, Number(e.target.value)]
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Change Type</label>
                <select
                  value={newRule.changeType}
                  onChange={e => setNewRule({...newRule, changeType: e.target.value as any})}
                  className="w-full p-2 border rounded"
                >
                  <option value="increase">Increase</option>
                  <option value="decrease">Decrease</option>
                  <option value="static">Static</option>
                </select>
              </div>

              <div>
                <label>Percentage</label>
                <input
                  type="number"
                  value={newRule.percentage || ''}
                  onChange={e => setNewRule({...newRule, percentage: Number(e.target.value)})}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label>Outcome</label>
              <select
                value={newRule.outcome}
                onChange={e => setNewRule({...newRule, outcome: e.target.value as any})}
                className="w-full p-2 border rounded"
              >
                <option value="win">Win</option>
                <option value="loss">Loss</option>
              </select>
            </div>

            <Button onClick={handleSaveRule} className="w-full">
              {editingRule ? 'Update' : 'Add'} Rule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 