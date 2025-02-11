import React from 'react';
import { Play, FileText, Book, Clock, CheckCircle } from 'lucide-react';
import { Training } from '../../types/training';

interface CourseCardProps {
  training: Training;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ training, onClick }) => {
  const getIcon = () => {
    switch (training.type) {
      case 'video':
        return <Play className="h-6 w-6 text-blue-500" />;
      case 'document':
        return <FileText className="h-6 w-6 text-green-500" />;
      case 'quiz':
        return <Book className="h-6 w-6 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-gray-100 rounded-lg">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              {training.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {training.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {Math.ceil(training.duration / 60)} minutes
              </div>
              {training.required && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Required
                </span>
              )}
            </div>
          </div>
        </div>

        {training.progress > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{training.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${training.progress}%` }}
              />
            </div>
          </div>
        )}

        {training.status === 'completed' && (
          <div className="mt-4 flex items-center text-sm text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;