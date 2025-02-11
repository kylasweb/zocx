import React from 'react';

const WalletSystem = () => {
  const wallets = [
    { type: 'deposit', balance: 4500 },
    { type: 'referral', balance: 1200 },
    { type: 'withdrawal', balance: 3000 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {wallets.map(wallet => (
        <div key={wallet.type} className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-bold capitalize mb-2">{wallet.type} Wallet</h3>
          <div className="text-2xl font-mono">${wallet.balance.toFixed(2)}</div>
          <button className="mt-4 w-full bg-indigo-100 text-indigo-600 py-2 rounded">
            {wallet.type === 'withdrawal' ? 'Request Withdrawal' : 'Transfer Funds'}
          </button>
        </div>
      ))}
    </div>
  );
}; 