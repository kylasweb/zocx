import React, { useState } from 'react';
import { Input, Button } from '../ui';

export const TwoFactorSetup = ({ onVerify }: { onVerify: (code: string) => void }) => {
  const [code, setCode] = useState('');

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Two-Factor Authentication</h3>
      <p className="mb-4 text-sm">Enter the 6-digit code from your authenticator app</p>
      <Input
        type="text"
        pattern="\d{6}"
        placeholder="123456"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button 
        className="w-full mt-4"
        onClick={() => onVerify(code)}
      >
        Verify Code
      </Button>
    </div>
  );
}; 