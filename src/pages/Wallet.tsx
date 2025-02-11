import React, { useState } from 'react';
import { useWalletStore } from '../store/walletStore';
import BalanceSummary from '../components/wallet/BalanceSummary';
import PaymentMethodList from '../components/wallet/PaymentMethodList';
import TransactionHistory from '../components/wallet/TransactionHistory';
import WithdrawalForm from '../components/wallet/WithdrawalForm';

const Wallet: React.FC = () => {
  const {
    balance,
    pendingBalance,
    transactions,
    withdrawalMethods,
    requestWithdrawal,
    loading,
  } = useWalletStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalEarned = transactions
    .filter(t => t.type === 'credit' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleWithdrawal = async (amount: number, methodId: string) => {
    await requestWithdrawal({
      amount,
      methodId,
      userId: 'current-user', // This should come from auth context
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Wallet</h1>
      </div>

      <BalanceSummary
        availableBalance={balance}
        pendingBalance={pendingBalance}
        totalEarned={totalEarned}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <WithdrawalForm
            balance={balance}
            methods={withdrawalMethods}
            onSubmit={handleWithdrawal}
            loading={loading}
          />
          <PaymentMethodList
            methods={[]} // This should come from settings store
            onRemove={() => {}} // Implement these handlers
            onSetDefault={() => {}}
            onAdd={() => {}}
          />
        </div>

        <TransactionHistory
          transactions={filteredTransactions}
          onSearch={setSearchTerm}
          onFilter={setStatusFilter}
        />
      </div>
    </div>
  );
};

export default Wallet;