import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const MainNav: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="ZocMLM" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ZocMLM</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <div className="relative group">
                <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2">
                  Features
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 w-48 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    <Link to="#network" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Network Building</Link>
                    <Link to="#rewards" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Rewards System</Link>
                    <Link to="#training" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Training Platform</Link>
                  </div>
                </div>
              </div>
              <Link to="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2">
                Pricing
              </Link>
              <Link to="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2">
                About
              </Link>
              <Link to="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;