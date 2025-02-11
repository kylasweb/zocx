import React from 'react';
import { CheckCircle, Trash2, Clock, AlertTriangle } from 'lucide-react';
import { Task } from '../../types/admin/tasks';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: Task['status']) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onStatusChange,
  onDelete,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onStatusChange(
                  task.id,
                  task.status === 'completed' ? 'pending' : 'completed'
                )}
                className={`p-1 rounded-full ${
                  task.status === 'completed'
                    ? 'text-green-600 hover:text-green-700'
                    : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
              </button>
              <div>
                <h4 className={`text-sm font-medium ${
                  task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {task.title}
                </h4>
                <p className="text-sm text-gray-500">{task.description}</p>
              </div>
            </div>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                getPriorityColor(task.priority)
              }`}>
                {task.priority}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
                {isOverdue(task.dueDate) && task.status !== 'completed' && (
                  <span className="ml-2 flex items-center text-red-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Overdue
                  </span>
                )}
              </div>
            </div>
            {(task.rewards.points > 0 || task.rewards.bonus > 0) && (
              <div className="flex items-center space-x-2 text-sm">
                {task.rewards.points > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {task.rewards.points} Points
                  </span>
                )}
                {task.rewards.bonus > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ${task.rewards.bonus} Bonus
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create a new task to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;