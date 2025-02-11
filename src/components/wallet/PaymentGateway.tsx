```typescript
import React, { useState } from 'react';
import { CreditCard, DollarSign, Wallet, AlertTriangle } from 'lucide-react';
import { PaymentMethod } from '../../types/wallet';

interface PaymentGatewayProps {
  methods: PaymentMethod[];
  onSubmit: (amount: number, methodId: string) => Promise<void>;
  loading: boolean;
  minAmount: number;
  maxAmount: number;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  methods,
  onSubmit,
  loading,
  minAmount,
  maxAmount,
}) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(methods[0]?.id || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const paymentAmount = parseFloat(amount);

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (paymentAmount < minAmount) {
      setError(`Minimum amount is ${minAmount}`);
      return;
    }

    if (paymentAmount > maxAmount) {
      setError(`Maximum amount is ${maxAmount}`);
      return;
    }

    try {
      await onSubmit(paymentAmount, selectedMethod);
      setAmount('');
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Make a Payment</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              min={minAmount}
              max={maxAmount}
              step="0.01"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Min: ${minAmount} | Max: ${maxAmount}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <div className="mt-2 space-y-4">
            {methods.map((method) => (
              <div
                key={method.id}
                className={`relative rounded-lg border p-4 flex cursor-pointer focus:outline-none ${
                  selectedMethod === method.id
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center">
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {method.name}
                    </p>
                    <p className="text-gray-500">
                      Fee: {method.fee}%
                    </p>
                  </div>
                </div>
                <div className="ml-3 flex-1 flex justify-end">
                  {method.type === 'card' ? (
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Wallet className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            disabled={loading || !amount || !selectedMethod}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Make Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentGateway;
```