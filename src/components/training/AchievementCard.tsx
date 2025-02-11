import React from 'react';
import { Award, Star, Clock } from 'lucide-react';
import { Achievement } from '../../types/training';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
  progress?: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  unlocked,
  progress = 0,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${
      unlocked ? 'border-2 border-indigo-500' : 'border border-gray-200'
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${
          unlocked ? 'bg-indigo-100' : 'bg-gray-100'
        }`}>
          {unlocked ? (
            <Award className="h-6 w-6 text-indigo-600" />
          ) : (
            <Star className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900">
            {achievement.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {achievement.description}
          </p>
          {!unlocked && progress > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
          {unlocked && (
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Unlocked on {new Date().toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;