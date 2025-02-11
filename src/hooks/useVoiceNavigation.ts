import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useVoiceNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const commands = {
      'go home': () => navigate('/'),
      'open dashboard': () => navigate('/dashboard'),
      'show wallet': () => navigate('/wallet'),
      'view network': () => navigate('/network'),
    };

    const enhancedCommands = {
      ...commands,
      'show my portfolio': () => navigate('/dashboard/ai-investment'),
      'open security settings': () => navigate('/dashboard/settings/security'),
      'enable dark mode': () => document.documentElement.classList.add('dark'),
      'enable light mode': () => document.documentElement.classList.remove('dark'),
      'refresh data': () => window.location.reload(),
    };

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      enhancedCommands[command]?.();
    };

    recognition.start();

    return () => recognition.stop();
  }, [navigate]);
}; 