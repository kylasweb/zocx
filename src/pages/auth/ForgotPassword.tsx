import React, { useState } from 'react';
import { Input, Button } from '../../components/ui';
import { sendPasswordResetEmail } from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      setMessage('Password reset instructions sent to your email');
    } catch (error) {
      setMessage('Error sending reset email');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Password Recovery</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
        {message && <p className="text-sm text-center text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword; 