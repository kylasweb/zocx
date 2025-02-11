import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useNetworkStore } from '../stores/networkStore';
import { LeaderRank } from '../types/RoleTypes';

const RoleProgression = () => {
  const { user } = useAuthStore();
  const ranks: LeaderRank[] = ['novice', 'interim', 'pro', 'elite', 'crown', 'zocial'];

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Leadership Progression</h3>
      <div className="flex justify-between items-center">
        {ranks.map((rank) => (
          <div key={rank} className={`text-center p-2 ${
            user.leaderRank === rank ? 'bg-purple-100' : ''
          }`}>
            <div className={`h-2 w-12 mb-2 ${
              ranks.indexOf(rank) <= ranks.indexOf(user.leaderRank || 'novice') 
                ? 'bg-purple-500' 
                : 'bg-gray-200'
            }`} />
            <span className="text-xs capitalize">{rank}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleProgression; 