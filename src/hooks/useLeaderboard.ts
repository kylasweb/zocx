import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useLeaderboard = (type: 'investment' | 'network' | 'commission') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/leaderboards/${type}`);
        setData(response.data);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [type]);

  return { data, loading };
}; 