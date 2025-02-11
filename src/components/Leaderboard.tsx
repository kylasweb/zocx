import { useLeaderboard } from '../hooks/useLeaderboard';
import { Button } from '../components/shared/ui';
import { useAuthStore } from '../store/shared/authStore';
import { useNavigate } from 'react-router-dom';
import { useFeatureFlags } from '../contexts/FeatureFlags';

export const Leaderboard = ({ type }: { type: 'investment' | 'network' | 'commission' }) => {
  const { getFeatureState } = useFeatureFlags();
  const { data, loading } = useLeaderboard(type);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!getFeatureState('leaderboards')) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">
        {type === 'investment' ? 'Top Investors' : 
         type === 'network' ? 'Network Leaders' : 'Commission Leaders'}
      </h3>
      
      <div className="space-y-3">
        {data.map((entry, index) => (
          <div key={entry.userId} className={`p-4 rounded-lg ${
            entry.userId === user?.id ? 'bg-blue-50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium">#{index + 1}</span>
                <div>
                  <p className="font-medium">{entry.userName}</p>
                  <p className="text-sm text-gray-600">{entry.role} • {entry.rank}</p>
                </div>
              </div>
              <span className="font-mono">
                ${type === 'investment' ? entry.totalInvestment :
                  type === 'network' ? entry.networkSize : entry.totalCommission}
              </span>
            </div>
          </div>
        ))}
      </div>

      {user?.role === 'admin' && (
        <div className="mt-4 flex gap-2">
          <Button size="sm" onClick={() => navigate('/admin/leaderboards')}>
            Manage Leaderboards
          </Button>
        </div>
      )}
    </div>
  );
}; 