import { useEffect } from 'react';
import { useAuth } from './useAuth';

export const useBiometricAuth = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;

    let mouseMovement: number[] = [];
    let keyTimes: number[] = [];
    
    const trackMouse = (e: MouseEvent) => {
      mouseMovement.push(e.clientX, e.clientY, Date.now());
      if (mouseMovement.length > 300) mouseMovement.splice(0, 100);
    };

    const trackKeystrokes = (e: KeyboardEvent) => {
      keyTimes.push(Date.now());
      if (keyTimes.length > 100) keyTimes.splice(0, 20);
    };

    window.addEventListener('mousemove', trackMouse);
    window.addEventListener('keydown', trackKeystrokes);

    const analyzeBehavior = () => {
      const typingSpeed = calculateTypingSpeed(keyTimes);
      const mouseRegularity = analyzeMousePattern(mouseMovement);
      
      if (Math.abs(typingSpeed - user.typingBaseline) > 30 || 
          mouseRegularity < 0.5) {
        triggerReauthentication();
      }
    };

    const analysisInterval = setInterval(analyzeBehavior, 10000);

    return () => {
      clearInterval(analysisInterval);
      window.removeEventListener('mousemove', trackMouse);
      window.removeEventListener('keydown', trackKeystrokes);
    };
  }, [user]);
}; 