export const updateLeaderboards = async () => {
  const types = ['investment', 'network', 'commission'];
  
  await Promise.all(types.map(async (type) => {
    const users = await getRankedUsers(type);
    await api.post(`/leaderboards/${type}`, { rankings: users });
  }));
}; 