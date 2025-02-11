import React, { useState } from 'react';
import { 
  Save, 
  AlertCircle, 
  Plus, 
  Trash2, 
  CreditCard, 
  DollarSign,
  Settings,
  Clock,
  Wallet,
  RefreshCw,
  Calendar
} from 'lucide-react';
import { useAdminSettingsStore } from '../../../store/admin/settingsStore';

const PaymentSettings: React.FC = () => {
  const { settings, updateSettings, loading, error } = useAdminSettingsStore();
  const { payment } = settings;

  const [showAddProvider, setShowAddProvider] = useState(false);
  const [newProvider, setNewProvider] = useState({
    name: '',
    type: 'fiat' as 'fiat' | 'crypto',
    config: {},
  });

  const handleAddProvider = () => {
    const updatedProviders = [
      ...payment.providers,
      {
        ...newProvider,
        id: `${newProvider.type}-${Date.now()}`,
        enabled: true,
      },
    ];
    updateSettings('payment', { providers: updatedProviders });
    setNewProvider({ name: '', type: 'fiat', config: {} });
    setShowAddProvider(false);
  };

  const handleToggleProvider = (providerId: string) => {
    const updatedProviders = payment.providers.map(provider =>
      provider.id === providerId ? { ...provider, enabled: !provider.enabled } : provider
    );
    updateSettings('payment', { providers: updatedProviders });
  };

  const handleRemoveProvider = (providerId: string) => {
    const updatedProviders = payment.providers.filter(p => p.id !== providerId);
    updateSettings('payment', { providers: updatedProviders });
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawal Settings */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Withdrawal Settings
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Fiat Withdrawal
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={payment.minimumWithdrawal.fiat}
                  onChange={(e) => updateSettings('payment', {
                    minimumWithdrawal: {
                      ...payment.minimumWithdrawal,
                      fiat: parseFloat(e.target.value),
                    },
                  })}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Crypto Withdrawal
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={payment.minimumWithdrawal.crypto}
                  onChange={(e) => updateSettings('payment', {
                    minimumWithdrawal: {
                      ...payment.minimumWithdrawal,
                      crypto: parseFloat(e.target.value),
                    },
                  })}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fiat Withdrawal Fee (%)
              </label>
              <input
                type="number"
                value={payment.withdrawalFees.fiat}
                onChange={(e) => updateSettings('payment', {
                  withdrawalFees: {
                    ...payment.withdrawalFees,
                    fiat: parseFloat(e.target.value),
                  },
                })}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Crypto Withdrawal Fee (%)
              </label>
              <input
                type="number"
                value={payment.withdrawalFees.crypto}
                onChange={(e) => updateSettings('payment', {
                  withdrawalFees: {
                    ...payment.withdrawalFees,
                    crypto: parseFloat(e.target.value),
                  },
                })}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Automated Payouts */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Automated Payouts
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure automatic commission payouts
              </p>
            </div>
            <button
              type="button"
              onClick={() => updateSettings('payment', {
                automatedPayouts: {
                  ...payment.automatedPayouts,
                  enabled: !payment.automatedPayouts?.enabled,
                },
              })}
              className={`
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${payment.automatedPayouts?.enabled ? 'bg-indigo-600' : 'bg-gray-200'}
              `}
            >
              <span className="sr-only">Toggle automated payouts</span>
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
                  transition ease-in-out duration-200
                  ${payment.automatedPayouts?.enabled ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {payment.automatedPayouts?.enabled && (
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payout Schedule
                </label>
                <select
                  value={payment.automatedPayouts.schedule}
                  onChange={(e) => updateSettings('payment', {
                    automatedPayouts: {
                      ...payment.automatedPayouts,
                      schedule: e.target.value,
                    },
                  })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum Payout Amount
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    value={payment.automatedPayouts.minimumAmount}
                    onChange={(e) => updateSettings('payment', {
                      automatedPayouts: {
                        ...payment.automatedPayouts,
                        minimumAmount: parseFloat(e.target.value),
                      },
                    })}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Processing Time
                </label>
                <select
                  value={payment.automatedPayouts.processingTime}
                  onChange={(e) => updateSettings('payment', {
                    automatedPayouts: {
                      ...payment.automatedPayouts,
                      processingTime: e.target.value,
                    },
                  })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="instant">Instant</option>
                  <option value="same-day">Same Day</option>
                  <option value="next-day">Next Day</option>
                  <option value="3-days">3 Business Days</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Multi-Currency Support */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Multi-Currency Support
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure supported currencies and exchange rates
              </p>
            </div>
            <button
              type="button"
              onClick={() => updateSettings('payment', {
                multiCurrency: {
                  ...payment.multiCurrency,
                  enabled: !payment.multiCurrency?.enabled,
                },
              })}
              className={`
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${payment.multiCurrency?.enabled ? 'bg-indigo-600' : 'bg-gray-200'}
              `}
            >
              <span className="sr-only">Toggle multi-currency support</span>
              <span
                className={`
                  pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
                  transition ease-in-out duration-200
                  ${payment.multiCurrency?.enabled ? 'translate-x-5' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {payment.multiCurrency?.enabled && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900">Supported Currencies</h4>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Currency
                </button>
              </div>

              <div className="space-y-4">
                {payment.multiCurrency.currencies?.map((currency) => (
                  <div key={currency.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{currency.name}</h5>
                      <p className="text-sm text-gray-500">{currency.code}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        Rate: {currency.exchangeRate} USD
                      </span>
                      <button
                        onClick={() => {
                          const updatedCurrencies = payment.multiCurrency?.currencies.filter(
                            c => c.code !== currency.code
                          );
                          updateSettings('payment', {
                            multiCurrency: {
                              ...payment.multiCurrency,
                              currencies: updatedCurrencies,
                            },
                          });
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Last exchange rate update: {new Date(payment.multiCurrency.lastUpdate || Date.now()).toLocaleString()}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Update Rates
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default PaymentSettings;