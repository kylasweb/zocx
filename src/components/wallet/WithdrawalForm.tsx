import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { WithdrawalMethod } from '../../types/wallet';
import { formatCurrency } from '../../utils/format';

interface WithdrawalFormProps {
  balance: number;
  methods: WithdrawalMethod[];
  onSubmit: (amount: number, methodId: string) => void;
  loading: boolean;
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  balance,
  methods,
  onSubmit,
  loading,
}) => {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(methods[0]?.id || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawalAmount = parseFloat(amount);
    
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (withdrawalAmount > balance) {
      setError('Insufficient balance');
      return;
    }

    const method = methods.find(m => m.id === selectedMethod);
    if (!method) {
      setError('Please select a withdrawal method');
      return;
    }

    if (withdrawalAmount < method.minAmount) {
      setError(`Minimum withdrawal amount is ${formatCurrency(method.minAmount)}`);
      return;
    }

    if (withdrawalAmount > method.maxAmount) {
      setError(`Maximum withdrawal amount is ${formatCurrency(method.maxAmount)}`);
      return;
    }

    setError('');
    onSubmit(withdrawalAmount, selectedMethod);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Withdraw Funds</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Available balance: {formatCurrency(balance)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Withdrawal Method
          </label>
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {methods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name} ({method.fee}% fee)
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Withdraw Funds'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WithdrawalForm;