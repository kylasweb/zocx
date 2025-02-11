import React, { useState } from 'react';
import { Table, Button, Modal, Select } from '../components/ui';
import { User, UserRole, LeaderRank } from '../types/RoleTypes';
import { api } from '../services/api';

export default function UserRoles() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Admin User', role: 'admin', email: 'admin@example.com' },
    { id: 2, name: 'Manager', role: 'manager', email: 'manager@example.com' }
  ]);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const leaderRanks: LeaderRank[] = ['novice', 'interim', 'pro', 'elite', 'crown', 'zocial'];

  const updateRole = (newRole: string) => {
    // API call to update role
    setShowRoleModal(false);
  };

  const updateLeaderRank = (userId: string, newRank: LeaderRank) => {
    // API call to update leader rank
  };

  const deleteUser = async (userId: string) => {
    await api.delete(`/users/${userId}`);
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const createUser = async (userData: Omit<User, 'id'>) => {
    const newUser = await api.post('/users', userData);
    setUsers(prev => [...prev, newUser]);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <Table
        headers={['Name', 'Email', 'Role', 'Leader Rank', 'Actions']}
        data={users.map(user => [
          user.name,
          user.email,
          user.role,
          user.leaderRank || '-',
          <div className="flex gap-2">
            <Button size="sm" onClick={() => {
              setSelectedUser(user);
              setShowRoleModal(true);
            }}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" 
              onClick={() => deleteUser(user.id)}>
              Delete
            </Button>
          </div>
        ])}
      />

      <Modal
        title="Edit User Role"
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
      >
        <div className="space-y-4">
          <Select
            label="New Role"
            options={['user', 'investor', 'leader', 'admin']}
            value={selectedUser?.role}
            onChange={updateRole}
          />
          <Button className="w-full">Save Changes</Button>
        </div>
      </Modal>
    </div>
  );
} 