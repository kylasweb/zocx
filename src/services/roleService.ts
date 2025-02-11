export const checkRoleUpgrade = (user: User): User => {
  let updatedUser = {...user};
  
  // User to Investor upgrade
  if (user.role === 'user' && user.totalDeposits > 0) {
    updatedUser.role = 'investor';
  }

  // Investor to Leader upgrade
  if (user.role === 'investor' && 
      user.leftLegCount >= 100 && 
      user.rightLegCount >= 100) {
    updatedUser.role = 'leader';
    updatedUser.leaderRank = calculateLeaderRank(user);
  }

  return updatedUser;
};

const calculateLeaderRank = (user: User): LeaderRank => {
  const teamStrength = user.leftLegCount + user.rightLegCount;
  
  if (teamStrength >= 1000) return 'zocial';
  if (teamStrength >= 500) return 'crown';
  if (teamStrength >= 250) return 'elite';
  if (teamStrength >= 100) return 'pro';
  if (teamStrength >= 50) return 'interim';
  return 'novice';
}; 