import React from 'react';
import { Task } from '../../types/admin/tasks';

interface TaskCalendarProps {
  tasks: Task[];
  onDateSelect: (date: Date) => void;
  onTaskClick: (taskId: string) => void;
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({
  tasks,
  onDateSelect,
  onTaskClick,
}) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState(today.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 bg-gray-50 border border-gray-200" />
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayTasks = getTasksForDate(date);
      const isToday = date.toDateString() === today.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => onDateSelect(date)}
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 ${
            isToday ? 'bg-indigo-50' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isToday ? 'font-bold text-indigo-600' : ''}`}>
              {day}
            </span>
            {dayTasks.length > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {dayTasks.length}
              </span>
            )}
          </div>
          <div className="mt-2 space-y-1">
            {dayTasks.slice(0, 2).map(task => (
              <div
                key={task.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onTaskClick(task.id);
                }}
                className={`text-xs truncate rounded px-1 py-0.5 ${
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : task.status === 'in_progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {task.title}
              </div>
            ))}
            {dayTasks.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayTasks.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          ←
        </button>
        <h3 className="text-lg font-medium text-gray-900">
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <button
          onClick={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default TaskCalendar;