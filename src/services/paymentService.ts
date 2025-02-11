export const handleDepositSuccess = async (userId: string, amount: number) => {
  const user = await getUser(userId);
  const updatedUser = await updateUser(userId, {
    totalDeposits: user.totalDeposits + amount
  });
  
  // Check for role upgrade after deposit
  const upgradedUser = checkRoleUpgrade(updatedUser);
  if (upgradedUser.role !== updatedUser.role) {
    await updateUserRole(userId, upgradedUser.role);
  }
  
  return upgradedUser;
}; 