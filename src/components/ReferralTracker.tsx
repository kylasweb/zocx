import React from 'react';
import { Button } from './ui';

export const ReferralTracker = ({ code, count }: { code: string; count: number }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h3 className="text-lg font-bold mb-4">Your Referral Network</h3>
    <div className="space-y-2">
      <p>Your Referral Code: <strong>{code}</strong></p>
      <p>Total Referrals: <strong>{count}</strong></p>
      <Button
        variant="outline"
        onClick={() => navigator.clipboard.writeText(code)}
      >
        Copy Referral Link
      </Button>
    </div>
  </div>
); 