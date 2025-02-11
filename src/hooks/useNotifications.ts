import { useEffect } from 'react';

export const useNotifications = () => {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Notifications Enabled', {
            body: 'You will receive important system updates'
          });
        }
      });
    }
  }, []);

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  };

  return { showNotification };
}; 