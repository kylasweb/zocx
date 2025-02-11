import { useState } from 'react';
import { Button, Table, Modal, Input, Select } from '../components/ui';
import { useFeatureFlags } from '../../contexts/FeatureFlags';

interface Leaderboard {
  id: string;
  name: string;
  criteria: 'investment' | 'network' | 'commission';
  scope: 'global' | 'team';
  status: 'active' | 'archived';
}

export default function LeaderboardManager() {
  const { features } = useFeatureFlags();
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([...]);
  const [editingBoard, setEditingBoard] = useState<Leaderboard | null>(null);
  const [showForm, setShowForm] = useState(false);

  if (!features.leaderboards) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold">Leaderboards are currently disabled</h2>
        <p className="mt-2 text-gray-600">
          Enable this feature in the Feature Manager settings
        </p>
      </div>
    );
  }

  const handleSubmit = (formData: Leaderboard) => {
    if (editingBoard) {
      setLeaderboards(prev => prev.map(l => l.id === formData.id ? formData : l));
    } else {
      setLeaderboards(prev => [...prev, { ...formData, id: Date.now().toString() }]);
    }
    setShowForm(false);
  };

  const deleteLeaderboard = (id: string) => {
    setLeaderboards(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Leaderboards</h2>
        <Button onClick={() => {
          setEditingBoard(null);
          setShowForm(true);
        }}>
          Create New
        </Button>
      </div>

      <Table
        headers={['Name', 'Criteria', 'Scope', 'Status', 'Actions']}
        data={leaderboards.map(board => [
          board.name,
          board.criteria,
          board.scope,
          board.status,
          <div className="flex gap-2">
            <Button size="sm" onClick={() => {
              setEditingBoard(board);
              setShowForm(true);
            }}>Edit</Button>
            <Button variant="destructive" size="sm" 
              onClick={() => deleteLeaderboard(board.id)}>
              Delete
            </Button>
          </div>
        ])}
      />

      <LeaderboardForm 
        open={showForm}
        initialData={editingBoard}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

const LeaderboardForm = ({ open, initialData, onClose, onSubmit }) => (
  <Modal isOpen={open} onClose={onClose} title={`${initialData ? 'Edit' : 'Create'} Leaderboard`}>
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit({
        name: formData.get('name'),
        criteria: formData.get('criteria'),
        scope: formData.get('scope'),
        status: formData.get('status')
      });
    }}>
      <div className="space-y-4">
        <Input name="name" label="Name" defaultValue={initialData?.name} required />
        
        <Select
          name="criteria"
          label="Ranking Criteria"
          options={[
            { value: 'investment', label: 'Total Investment' },
            { value: 'network', label: 'Network Size' },
            { value: 'commission', label: 'Total Commission' }
          ]}
          defaultValue={initialData?.criteria}
        />
        
        <Select
          name="scope"
          label="Scope"
          options={[
            { value: 'global', label: 'Global' },
            { value: 'team', label: 'Team' }
          ]}
          defaultValue={initialData?.scope}
        />
        
        <Select
          name="status"
          label="Status"
          options={[
            { value: 'active', label: 'Active' },
            { value: 'archived', label: 'Archived' }
          ]}
          defaultValue={initialData?.status || 'active'}
        />
        
        <Button type="submit" className="w-full">
          {initialData ? 'Update' : 'Create'} Leaderboard
        </Button>
      </div>
    </form>
  </Modal>
); 