import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 left-4 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center group"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-yellow-400" />
      ) : (
        <Moon className="h-6 w-6 text-indigo-600" />
      )}
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-200 ease-in-out text-gray-600 dark:text-gray-300">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;