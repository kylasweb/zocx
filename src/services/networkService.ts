export const monitorNetworkGrowth = (userId: string) => {
  setInterval(async () => {
    const user = await getUser(userId);
    const updatedUser = checkRoleUpgrade(user);
    
    if (updatedUser.role !== user.role || updatedUser.leaderRank !== user.leaderRank) {
      await updateUser(userId, updatedUser);
      sendRoleUpdateNotification(userId, updatedUser);
    }
  }, 3600000); // Check hourly
}; 