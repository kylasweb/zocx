import React, { useState } from 'react';
import { Calendar, Plus, Filter, Clock, Users, Target, CheckCircle } from 'lucide-react';
import TaskCalendar from '../components/tasks/TaskCalendar';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import { useTaskStore } from '../store/admin/taskStore';
import { Button } from '../ui/button';

const TaskManager: React.FC = () => {
  const {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    loading,
    error,
  } = useTaskStore();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: new Date(),
    reward: 0,
    cronSchedule: ''
  });

  const handleCreateTask = async (taskData: any) => {
    await createTask({
      ...taskData,
      startDate: selectedDate?.toISOString() || new Date().toISOString(),
    });
    setShowTaskForm(false);
  };

  const stats = [
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: Target,
      color: 'bg-blue-500',
    },
    {
      label: 'Completed Tasks',
      value: tasks.filter(t => t.status === 'completed').length,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'Pending Tasks',
      value: tasks.filter(t => t.status === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      label: 'Assigned Users',
      value: new Set(tasks.flatMap(t => t.assignedTo)).size,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Task Management</h1>
        <button
          onClick={() => setShowTaskForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Task Calendar</h2>
            <Calendar
              mode="multiple"
              selected={tasks.map(t => t.dueDate)}
              className="rounded-md border"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Create New Task</h3>
            <div className="space-y-4">
              <input
                placeholder="Task Title"
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={newTask.dueDate.toISOString().split('T')[0]}
                onChange={e => setNewTask({...newTask, dueDate: new Date(e.target.value)})}
                className="w-full p-2 border rounded"
              />
              <input
                placeholder="Reward Amount"
                type="number"
                value={newTask.reward}
                onChange={e => setNewTask({...newTask, reward: +e.target.value})}
                className="w-full p-2 border rounded"
              />
              <Button onClick={() => handleCreateTask(newTask)} className="w-full">
                Schedule Task
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <TaskList
          tasks={tasks.filter(task => 
            filterStatus === 'all' || task.status === filterStatus
          )}
          onStatusChange={updateTask}
          onDelete={deleteTask}
        />
      </div>

      {/* Task Creation Modal */}
      {showTaskForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onClose={() => setShowTaskForm(false)}
          loading={loading}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default TaskManager;