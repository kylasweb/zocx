import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add auth interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const processPayment = (data: PaymentRequest) => api.post('/payments/process', data);
export const requestWithdrawal = (data: WithdrawalRequest) => api.post('/withdrawals/request', data);
export const updateUserRole = (userId: string, newRole: string) => 
  api.put(`/user-roles/${userId}/role`, { newRole }); 