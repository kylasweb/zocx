import React, { useState } from 'react';
import { Button, Input, Modal } from '../../components/ui';

const WalletSystem = () => {
  const [wallets] = useState({
    deposit: 4500,
    referral: 1200,
    withdrawal: 3000
  });
  
  const [withdrawalRequest, setWithdrawalRequest] = useState({
    amount: '',
    wallet: 'withdrawal'
  });
  
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const handleWithdrawal = async () => {
    // API call to process withdrawal
    setShowWithdrawalModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(wallets).map(([type, balance]) => (
          <div key={type} className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-bold capitalize mb-2">{type} Wallet</h3>
            <div className="text-2xl font-mono mb-4">${balance.toFixed(2)}</div>
            <Button 
              onClick={() => type === 'withdrawal' 
                ? setShowWithdrawalModal(true)
                : console.log('Transfer initiated')}
              variant={type === 'withdrawal' ? 'primary' : 'outline'}
              className="w-full"
            >
              {type === 'withdrawal' ? 'Request Withdrawal' : 'Transfer Funds'}
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title="Withdrawal Request"
        isOpen={showWithdrawalModal}
        onClose={() => setShowWithdrawalModal(false)}
      >
        <div className="space-y-4">
          <Input
            type="number"
            label="Amount"
            value={withdrawalRequest.amount}
            onChange={(e) => setWithdrawalRequest({...withdrawalRequest, amount: e.target.value})}
          />
          <Button onClick={handleWithdrawal} className="w-full">
            Confirm Withdrawal
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default WalletSystem; 