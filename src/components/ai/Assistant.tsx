import React, { useState } from 'react';
import { Button, Input, Card } from '../ui';

export const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{
    role: 'user' | 'ai';
    content: string;
  }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response
    const aiResponse = generateAIResponse(message);
    
    // Add AI response after delay
    setTimeout(() => {
      setChatHistory(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 800);

    setMessage('');
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <h3 className="text-xl font-bold mb-4">AI Investment Assistant</h3>
      
      <div className="h-64 overflow-y-auto mb-4 space-y-4">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`p-3 rounded-lg ${
            msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
          }`}>
            <p className="text-sm">{msg.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about investments..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
};

// Helper function for simulated AI responses
const generateAIResponse = (message: string) => {
  const lowerMessage = message.toLowerCase();
  const responses = {
    greeting: "Hello! I'm your AI investment advisor. How can I help you today?",
    risk: "Based on your portfolio, I recommend a moderate risk profile to balance growth and stability.",
    performance: "Your portfolio is performing 12% better than similar investors in your network.",
    default: "I analyze your portfolio in real-time to provide personalized investment recommendations."
  };

  if (lowerMessage.includes('hello')) return responses.greeting;
  if (lowerMessage.includes('risk')) return responses.risk;
  if (lowerMessage.includes('performance')) return responses.performance;
  return responses.default;
}; 