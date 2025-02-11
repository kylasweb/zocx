import React from 'react';
import { Users, TrendingUp, DollarSign, Award, ArrowRight, Eye, GitBranch } from 'lucide-react';
import { TreeNode } from '../../types/network';

interface UserPreviewProps {
  user: TreeNode;
  position: { x: number; y: number };
  onViewAsUser: () => void;
  onViewDownline: () => void;
}

const UserPreview: React.FC<UserPreviewProps> = ({
  user,
  position,
  onViewAsUser,
  onViewDownline,
}) => {
  return (
    <div
      className="absolute bg-white rounded-lg shadow-lg p-4 z-50 w-80 transform transition-transform duration-200 ease-out hover:scale-105"
      style={{
        left: position.x + 20,
        top: position.y + 20,
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user.fullName}</h3>
            <p className="text-sm text-gray-500">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {user.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2 text-indigo-500" />
            <span>Level {user.level}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
            <span>PV: {user.personalVolume}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
            <span>GV: {user.groupVolume}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Award className="h-4 w-4 mr-2 text-yellow-500" />
            <span>{user.rank}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="flex items-center text-sm text-gray-500">
            <GitBranch className="h-4 w-4 mr-2 text-purple-500" />
            <span>Left Leg: {user.leftLeg ? 'Active' : 'Empty'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <GitBranch className="h-4 w-4 mr-2 text-purple-500" />
            <span>Right Leg: {user.rightLeg ? 'Active' : 'Empty'}</span>
          </div>
        </div>

        <div className="flex space-x-2 pt-2 border-t">
          <button
            onClick={onViewAsUser}
            className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            View as User
          </button>
          <button
            onClick={onViewDownline}
            className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors duration-200"
          >
            <Users className="h-4 w-4 mr-2" />
            View Downline
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPreview;