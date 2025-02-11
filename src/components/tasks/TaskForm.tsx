import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: any) => void;
  onClose: () => void;
  loading: boolean;
  selectedDate?: Date | null;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onClose,
  loading,
  selectedDate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(
    selectedDate?.toISOString().split('T')[0] || ''
  );
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [rewards, setRewards] = useState({
    points: 0,
    bonus: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      rewards,
      status: 'pending',
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Create New Task</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign To
              </label>
              <select
                multiple
                value={assignedTo}
                onChange={(e) => setAssignedTo(
                  Array.from(e.target.selectedOptions, option => option.value)
                )}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="all">All Members</option>
                <option value="leaders">Team Leaders</option>
                <option value="active">Active Members</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reward Points
                </label>
                <input
                  type="number"
                  value={rewards.points}
                  onChange={(e) => setRewards({
                    ...rewards,
                    points: parseInt(e.target.value),
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bonus Amount
                </label>
                <input
                  type="number"
                  value={rewards.bonus}
                  onChange={(e) => setRewards({
                    ...rewards,
                    bonus: parseInt(e.target.value),
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                />
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;