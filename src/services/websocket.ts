import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_WS_URL || 'http://localhost:5000');

export const initWebSocket = (userId: string) => {
  socket.emit('register', userId);
  
  return {
    onTransactionUpdate: (callback: (data: Transaction) => void) => {
      socket.on('transaction-update', callback);
    },
    disconnect: () => socket.disconnect()
  };
}; 