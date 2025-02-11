import { featureFlagMiddleware } from './middleware/featureFlags';

// Leaderboard routes
router.get('/leaderboards/:type', 
  featureFlagMiddleware('leaderboards'),
  getLeaderboardData
);

router.post('/leaderboards/:type', 
  featureFlagMiddleware('leaderboards'),
  updateLeaderboardData
); 