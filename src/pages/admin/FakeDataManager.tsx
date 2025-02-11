import React, { useState } from 'react';
import { Users, Trash2, Plus, RefreshCw, Download, Upload, Search, Filter } from 'lucide-react';
import { useNetworkStore } from '../../store/networkStore';
import { faker } from '@faker-js/faker';
import { TreeNode } from '../../types/network';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
  'France', 'Spain', 'Italy', 'Japan', 'Singapore', 'India', 'Brazil'
];

const RANKS = ['Starter', 'Bronze', 'Silver', 'Gold', 'Diamond', 'Platinum', 'Elite'];

const FakeDataManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    country: '',
    rank: '',
    status: '',
  });
  const [bulkCount, setBulkCount] = useState(10);

  const generateFakeUser = (level: number = 1, sponsorId?: string): TreeNode => {
    const country = faker.helpers.arrayElement(COUNTRIES);
    const joinDate = faker.date.past(2);
    const personalVolume = faker.number.int({ min: 100, max: 1000 });
    const groupVolume = faker.number.int({ min: personalVolume, max: personalVolume * 10 });
    
    return {
      id: `fake-${faker.string.uuid()}`,
      userId: `user-${faker.string.uuid()}`,
      fullName: faker.person.fullName(),
      position: sponsorId ? faker.helpers.arrayElement(['left', 'right']) as 'left' | 'right' : null,
      level,
      personalVolume,
      groupVolume,
      leftLeg: null,
      rightLeg: null,
      sponsorId: sponsorId || null,
      rank: faker.helpers.arrayElement(RANKS),
      joinDate: joinDate.toISOString(),
      status: faker.helpers.arrayElement(['active', 'inactive']),
      country,
      email: faker.internet.email(),
      phone: faker.phone.number(),
      commissions: {
        direct: faker.number.float({ min: 100, max: 1000, precision: 0.01 }),
        binary: faker.number.float({ min: 200, max: 2000, precision: 0.01 }),
        matching: faker.number.float({ min: 50, max: 500, precision: 0.01 }),
        leadership: faker.number.float({ min: 0, max: 1000, precision: 0.01 }),
      },
      achievements: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
        id: faker.string.uuid(),
        name: faker.helpers.arrayElement([
          'Fast Start', 'Team Builder', 'Leadership Award', 'Top Recruiter', 'Volume Champion'
        ]),
        date: faker.date.recent(90).toISOString(),
      })),
    };
  };

  const generateFakeDownline = (
    parent: TreeNode,
    depth: number,
    maxDepth: number,
    minChildren: number = 0,
    maxChildren: number = 2
  ): TreeNode[] => {
    if (depth >= maxDepth) return [];

    const numChildren = faker.number.int({ min: minChildren, max: maxChildren });
    const children: TreeNode[] = [];

    for (let i = 0; i < numChildren; i++) {
      const child = generateFakeUser(depth + 1, parent.id);
      children.push(child);
      
      if (i === 0) {
        parent.leftLeg = child.id;
      } else {
        parent.rightLeg = child.id;
      }

      const grandchildren = generateFakeDownline(child, depth + 1, maxDepth);
      children.push(...grandchildren);
    }

    return children;
  };

  const handleGenerateSingle = () => {
    const user = generateFakeUser();
    const downline = generateFakeDownline(user, 1, 3);
    // Add to store
    console.log('Generated user and downline:', [user, ...downline]);
  };

  const handleGenerateBulk = () => {
    setLoading(true);
    const users: TreeNode[] = [];

    for (let i = 0; i < bulkCount; i++) {
      const user = generateFakeUser();
      const downline = generateFakeDownline(user, 1, 3, 1, 2);
      users.push(user, ...downline);
    }

    // Add to store
    console.log('Generated bulk users:', users);
    setLoading(false);
  };

  const handleDeleteSelected = () => {
    // Remove from store
    setSelectedUsers([]);
  };

  const handleExport = () => {
    const data = {
      users: selectedUsers,
      exportDate: new Date().toISOString(),
      metadata: {
        version: '1.0',
        type: 'fake-data-export',
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fake-data-export-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Fake Data Manager</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleExport}
            disabled={selectedUsers.length === 0}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Selected
          </button>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedUsers.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Generate Fake Users</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Country Filter</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Countries</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rank Filter</label>
              <select
                value={filters.rank}
                onChange={(e) => setFilters({ ...filters, rank: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Ranks</option>
                {RANKS.map(rank => (
                  <option key={rank} value={rank}>{rank}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status Filter</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bulk Generation Count</label>
              <input
                type="number"
                min="1"
                max="100"
                value={bulkCount}
                onChange={(e) => setBulkCount(parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleGenerateSingle}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Generate Single User
            </button>
            <button
              onClick={handleGenerateBulk}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Generate Bulk Users
            </button>
          </div>
        </div>

        {/* Fake Users List - To be implemented */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>

          {/* Table implementation will go here */}
          <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
            Fake users table will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeDataManager;