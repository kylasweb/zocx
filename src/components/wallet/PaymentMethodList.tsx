import React from 'react';
import { CreditCard, Trash2, Plus } from 'lucide-react';
import { PaymentMethod } from '../../types/settings';

interface PaymentMethodListProps {
  methods: PaymentMethod[];
  onRemove: (id: string) => void;
  onSetDefault: (id: string) => void;
  onAdd: () => void;
}

const PaymentMethodList: React.FC<PaymentMethodListProps> = ({
  methods,
  onRemove,
  onSetDefault,
  onAdd,
}) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Method
          </button>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {methods.map((method) => (
          <li key={method.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {method.type === 'card'
                      ? `•••• •••• •••• ${method.lastFour}`
                      : `${method.bankName} - ****${method.accountNumber}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {method.type === 'card'
                      ? `Expires ${method.expiryMonth}/${method.expiryYear}`
                      : 'Bank Account'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onSetDefault(method.id)}
                  className={`text-sm ${
                    method.isDefault
                      ? 'text-indigo-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {method.isDefault ? 'Default' : 'Set as Default'}
                </button>
                <button
                  onClick={() => onRemove(method.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
        {methods.length === 0 && (
          <li className="p-6 text-center text-gray-500">
            No payment methods added yet
          </li>
        )}
      </ul>
    </div>
  );
};

export default PaymentMethodList;