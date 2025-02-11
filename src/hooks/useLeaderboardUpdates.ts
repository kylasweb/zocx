export const useLeaderboardUpdates = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      updateLeaderboards();
    }, 3600000); // Update hourly
    
    return () => clearInterval(interval);
  }, []);
}; 