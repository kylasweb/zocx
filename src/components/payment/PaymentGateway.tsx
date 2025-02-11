import React, { useState } from 'react';
import { Button, Input, Select } from '../ui';

export default function PaymentGateway() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    currency: 'USD',
    account: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API integration logic here
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Payment Processing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          label="Payment Method"
          options={['Bank Transfer', 'Crypto', 'E-Wallet']}
          value={paymentMethod}
          onChange={setPaymentMethod}
        />
        
        {paymentMethod && (
          <>
            <Input
              type="number"
              label="Amount"
              value={paymentDetails.amount}
              onChange={(e) => setPaymentDetails({...paymentDetails, amount: e.target.value})}
            />
            
            <Input
              label={`${paymentMethod} Account`}
              value={paymentDetails.account}
              onChange={(e) => setPaymentDetails({...paymentDetails, account: e.target.value})}
            />
            
            <Button type="submit" className="w-full">
              Process Payment
            </Button>
          </>
        )}
      </form>
    </div>
  );
} 