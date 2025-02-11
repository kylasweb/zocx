export const useVoiceCommands = () => {
  const [commands] = useState({
    'navigate to dashboard': () => navigate('/dashboard'),
    'show my balance': () => alert('Your balance is $5000'),
  });

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      commands[command]?.();
    };
    recognition.start();
  }, []);
}; 